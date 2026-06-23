import os

import jwt
from dotenv import load_dotenv
from entity.user import User
import logging as log
from services.jwt_token import create_token
from os import getenv
import pymysql

load_dotenv()
log.basicConfig(level=log.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",)

class Database:

    def __init__(self):
        self.auth_table_name = "user"


    def _connect_with_database(self):
        try:
            connection = pymysql.connect(
                host="localhost",
                user="root",
                password=f"{getenv('MYSQL_PASSWORD')}",
                database=f"{getenv('MYSQL_DATABASE')}"
            )
            return connection
        except pymysql.Error as e:
            log.info(f"| Error connecting with Database {e}")
            return e


    def is_table_exist(self, table_name:str):
        is_table_exist_query = f"""SHOW TABLES LIKE %s"""
        connection = self._connect_with_database()
        try:
            with connection.cursor() as cursor:
                cursor.execute(is_table_exist_query, (table_name,))
                result = cursor.fetchone()
                connection.close()
                return True if result else False
        except pymysql.Error as e:
            log.info(f"| Error while check checking id database exist {e} ")
            return e


    def check_if_user_exist_by_email(self, conn, email):
        verify_user_query = f"""SELECT EXISTS(SELECT 1 FROM {self.auth_table_name} WHERE email = %s) AS email_exists"""
        with conn.cursor() as cursor:
            cursor.execute(verify_user_query, (email,))
            is_exist = cursor.fetchone()
            print("is exist: ",is_exist[0])
            return is_exist[0]


    def register_user(self, user : User):
        create_table_query = f"""CREATE TABLE {self.auth_table_name} (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                email VARCHAR(50) UNIQUE NOT NULL,
                                password VARCHAR(20) NOT NULL,
                                is_logged Boolean DEFAULT FALSE
                                )"""
        register_user_query = f"""INSERT INTO {self.auth_table_name} (email, password, is_logged) VALUES (%s, %s, %s)"""
        try:
            database_connection = self._connect_with_database()

            with database_connection.cursor() as cursor:

                if not self.is_table_exist(self.auth_table_name):
                    log.info(f"| Table '{self.auth_table_name}' does not exist in database")
                    cursor.execute(create_table_query)
                    log.info(f"| Success: created '{self.auth_table_name}' table in the database.")

                if self.check_if_user_exist_by_email(database_connection, user.email):
                    return {
                        "status": False,
                        "message": f"User with email {user.email} already exist."
                    }

                cursor.execute(
                    register_user_query,
                    (
                        user.email,
                        user.password,
                        user.is_logged)
                )
                log.info(f"| Successfully register a user with email {user.email}")

                database_connection.commit()
                database_connection.close()
                return {
                    "status": True,
                    "message": "Signup Completed"
                }

        except pymysql.Error as e:
            log.error(e)
            return {
                "success": False,
                "message": e,
            }



    def verify_user(self, user):
        verify_user_query = f"""SELECT email,password FROM {self.auth_table_name} WHERE email = %s"""
        try:
            conn = self._connect_with_database()
            if not self.check_if_user_exist_by_email(conn, user.email):
                return {
                    "status": False,
                    "message": f"User with email: {user.email} doesn't exist"
                }

            with conn.cursor() as cursor:
                cursor.execute(verify_user_query, (user.email,))
                email,password = cursor.fetchone()
                conn.close()
                jwt_token = create_token(user)

                if user.password == password:
                    return {
                        "status": True,
                        "message": "Login Successfully",
                        "token": jwt_token
                    }

                return {
                    "status": False,
                    "message": "Email or password is incorrect."
                }

        except pymysql.Error as e:
            log.error(e)


    def verify_jwt(self, jwt_token: str):
        user = jwt.decode(jwt=jwt_token, key=os.getenv("JWT_SECRET_KEY"), algorithms=os.getenv("JWT_ALGORITHM"))
        print(user)
        return user

