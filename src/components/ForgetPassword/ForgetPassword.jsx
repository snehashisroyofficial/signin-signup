import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import auth from "../Firebase/Firebase.config";

const ForgetPassword = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  //components
  const handleResetPassword = (e) => {
    e.preventDefault();

    //rest warning messages
    setError("");
    setSuccess("");
    const email = e.target.email.value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        e.target.email.value = "";
        setSuccess("please check you email id to reset your password");
      })
      .catch(() => {
        setError("Please provide an vaild account details");
      });
  };

  return (
    <div className="mx-auto lg:w-1/2 w-4/5 ">
      <div className="flex flex-col justify-center items-center  py-8">
        <h1 className=" text-2xl lg:text-4xl font-semibold text-center">
          Reset Your Password
        </h1>

        <div className="my-10  lg:w-2/3 bg-gray-100 rounded-3xl p-10 ">
          <form onSubmit={handleResetPassword}>
            <label htmlFor="email">Your Email Address</label>
            <input
              className="w-full py-4 px-2 rounded-xl border-2 border-gray-300 outline-none my-4"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Type email address"
            />

            <input
              className=" mt-4 btn btn-primary w-full text-white  text-lg"
              type="submit"
              value="Send Link"
            />
          </form>

          {success && (
            <div className="text-center pt-8">
              <p className="font-semibold text-green-600">{success}</p>
            </div>
          )}
          {error && (
            <div className="text-center pt-8">
              <p className="font-semibold text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
