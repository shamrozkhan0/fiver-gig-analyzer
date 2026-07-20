const Notification = ({ show, success, message }) => {
  console.log("success", success)
  console.log("message", message)
  return (
    <div
      className={`fixed top-5 right-5 z-50 transition-all duration-300 ease-in-out ${
        show
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`w-80 rounded-md bg-white border-t-4 shadow-lg ${
          success ? "border-green-500" : "border-red-500"
        }`}
      >
        <p className="px-5 py-4 text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Notification;