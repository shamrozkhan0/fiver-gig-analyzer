from entity.authentication import SignupUser
from services.jwt_token import create_token
from dotenv import load_dotenv
import logging as log
from os import getenv
import pymysql
import json


load_dotenv()
log.basicConfig(level=log.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",)

class Database:

    def __init__(self):
        self.auth_table_name = "user"
        self.data_table_name = "data"


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
            log.info(f"| Error while checking if database exist {e} ")
            return e


    def check_if_user_exist_by_email(self, conn, email):
        verify_user_query = f"""SELECT EXISTS(SELECT 1 FROM {self.auth_table_name} WHERE email = %s) AS email_exists"""
        with conn.cursor() as cursor:
            cursor.execute(verify_user_query, (email,))
            is_exist = cursor.fetchone()
            return is_exist[0]


    def check_if_username_exist_in_database(self, conn, username):
        query = f""" SELECT EXISTS(SELECT 1 FROM {self.auth_table_name} WHERE username = %s) AS username_exists """
        with conn.cursor() as cursor:
            cursor.execute(query, (username,))
            is_exist = cursor.fetchone()
            return is_exist[0]


    def register_user(self, user : SignupUser):
        create_table_query = f"""CREATE TABLE {self.auth_table_name} (
                                id INT PRIMARY KEY AUTO_INCREMENT,
                                username VARCHAR(15) UNIQUE NOT NULL,
                                email VARCHAR(50) UNIQUE NOT NULL,
                                password VARCHAR(20) NOT NULL
                                )"""
        register_user_query = f"""INSERT INTO {self.auth_table_name} (username, email, password) VALUES (%s, %s, %s)"""
        try:
            database_connection = self._connect_with_database()

            with database_connection.cursor() as cursor:

                if not self.is_table_exist(self.auth_table_name):
                    log.info(f"| Table '{self.auth_table_name}' does not exist in database")
                    cursor.execute(create_table_query)
                    log.info(f"| Success: created '{self.auth_table_name}' table in the database.")

                if self.check_if_user_exist_by_email(database_connection, user.email):
                    return {
                        "success": False,
                        "message": f"User with email {user.email} already exist."
                    }

                if self.check_if_username_exist_in_database(database_connection, user.username):
                    return {
                        "success": False,
                        "message": f"Username already exist try a different username"
                    }

                cursor.execute(
                    register_user_query,
                    (
                        user.username,
                        user.email,
                        user.password,
                ))
                log.info(f"| Successfully register a user with email {user.email}")

                database_connection.commit()
                database_connection.close()
                return {
                    "success": True,
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
                    "success": False,
                    "message": f"User with email {user.email} doesn't exist"
                }

            with conn.cursor() as cursor:
                cursor.execute(verify_user_query, (user.email,))
                email,password = cursor.fetchone()
                conn.close()
                jwt_token = create_token(user)

                if user.password == password:
                    return {
                        "success": True,
                        "message": "Login Successfully",
                        "token": jwt_token
                    }

                return {
                    "success": False,
                    "message": "Email or password is incorrect."
                }

        except pymysql.Error as e:
            log.error(e)


    def get_id_by_email(self, email):
        get_id_by_email_query = f"""SELECT id FROM {self.auth_table_name} WHERE email = %s"""
        conn = self._connect_with_database()
        try:
            with conn.cursor() as cursor:
                cursor.execute(get_id_by_email_query, (email,))
                return cursor.fetchone()
        except pymysql.Error as e:
            log.info(e)


    def setContent(self, data, email):
        table_query = """CREATE TABLE data (
            content_id INT PRIMARY KEY AUTO_INCREMENT,
            profile_id INT NOT NULL,
            url VARCHAR(150) NOT NULL,
            seller_status VARCHAR(10),
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            expertise JSON NOT NULL,
            category_and_subcategory VARCHAR(255) NOT NULL,
            packages JSON NOT NULL,
            tags TEXT NOT NULL,
            profile_description TEXT NOT NULL,
            ratings JSON,
            total_orders INT,
            gig_stars JSON,
            about_profile JSON NOT NULL,
            FOREIGN KEY (profile_id) REFERENCES user(id)
        )"""

        insert_content_query = f"""INSERT INTO {self.data_table_name} (
                profile_id,
                url,
                seller_status,
                title,
                description,
                expertise,
                category_and_subcategory, 
                packages,
                tags,
                profile_description,
                ratings,
                total_orders,
                gig_stars,
                about_profile 
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) """

        try:
            conn = self._connect_with_database();
            with conn.cursor() as cursor:
                if not self.is_table_exist(self.data_table_name):
                    log.info("| Creating table for storing data.")
                    cursor.execute(table_query)
                    log.info(f"| Successfully created table '{self.data_table_name}'.")

                log.info("Inserting gig data into database")
                profile_id = self.get_id_by_email(email)
                print(data.ratings)

                if type(data.ratings) == str:
                    data.ratings = {"message": data.ratings}

                if type(data.gig_stars) == str:
                    data.gig_stars = {"message": data.gig_stars}

                cursor.execute(
                    insert_content_query,
                    (
                        profile_id,
                        data.url,
                        data.seller_status,
                        data.title,
                        data.description,
                        json.dumps([e.model_dump() for e in data.expertise]),
                        data.category_and_subcategory,
                        json.dumps({k: v.model_dump() for k, v in data.packages.items()}),
                        data.tags,
                        data.profile_description,
                        json.dumps(data.ratings),
                        data.total_orders,
                        json.dumps(data.gig_stars),
                        json.dumps(data.seller_information)
                    )
                )
                conn.commit()
                content_id = cursor.lastrowid
            conn.close()
            return {"content_id": content_id, "user_id": profile_id}

        except pymysql.Error as e:
            log.error(f"| Failed to upload gig content into database: {e}")
            return False



    def get_content_by_id(self, user_id, content_id, email):
        get_user_id_by_email_query = f"""SELECT id FROM {self.auth_table_name} WHERE email = %s """
        get_content_by_id_query = f"""SELECT * FROM {self.data_table_name} WHERE content_id = %s """
        conn = self._connect_with_database()

        with conn.cursor(pymysql.cursors.DictCursor) as cursor:
            cursor.execute(get_user_id_by_email_query, (email,))
            original_content_user_id = cursor.fetchone()

            if not original_content_user_id["id"] == user_id:
                return {"success": False, "message": "You are not The Owner"}

            cursor.execute(get_content_by_id_query, (content_id,))
            content = cursor.fetchone()
            conn.close()
            content.pop("profile_id")
            content.pop("content_id")
            return {"success": True, "message": content}