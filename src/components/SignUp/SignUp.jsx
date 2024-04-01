import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/Firebase.config";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";

const SignUp = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(false);

  //components
  const handleonSubmit = (e) => {
    e.preventDefault();
    //   reset warning messages
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const terms = e.target.terms.checked;

    //   conditions
    if (password.length < 6) {
      setError(
        "For better security, your password should be at least 6 characters long. Please choose a stronger password."
      );
      return;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!~!@#$%^&*-_])[^\s]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Please use at least one Uppercase, one Number and Special Characters"
      );
      return;
    } else if (!terms) {
      setError(
        "To continue, please check the box to accept the Terms and Conditions"
      );
      return;
    }

    //submit to firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // setSuccess("Your profile successfully created");

        // reset email and password that you are typed
        e.target.email.value = "";
        e.target.password.value = "";
        e.target.name.value = "";
        updateProfile(res.user, {
          displayName: name,
          photoURL: "https://i.ibb.co/p4YX4M9/book-3.png",
        }).then(() => {
          alert("profile updated");
        });

        // send email verification
        sendEmailVerification(res.user).then(() => {
          setSuccess("Please check your email to verify your account");
        });
      })
      .catch((error) =>
        setError("This email id already in used. please signIn")
      );
  };

  return (
    <div className="mx-4 lg:mx-auto lg:w-1/2  ">
      <div className="flex flex-col justify-center items-center  py-8">
        <h1 className=" text-2xl lg:text-4xl font-semibold text-center">
          Please Sign Up / Register Now
        </h1>

        <div className="my-10  lg:w-2/3 bg-green-100 rounded-3xl p-10 ">
          <form onSubmit={handleonSubmit}>
            <label htmlFor="name">Your Name</label>
            <input
              className="w-full py-4 px-2 rounded-xl border-2 border-green-300 outline-none my-4"
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your full name"
            />
            <label htmlFor="email">Your Email Address</label>
            <input
              className="w-full py-4 px-2 rounded-xl border-2 border-green-300 outline-none my-4"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Type email address"
            />
            <div className="relative">
              <label htmlFor="password">Your Password</label>
              <input
                className=" w-full py-4 px-2  rounded-xl border-2 border-green-300 outline-none my-4"
                type={password ? "text" : "password"}
                name="password"
                id="password"
                required
                placeholder="Type Password"
              />
              <span
                className="absolute bottom-9 right-4"
                onClick={() => setPassword(!password)}
              >
                {password ? <FaEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            <div className="pb-8 pt-2 flex flex-row gap-2">
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">
                Please accept the Terms and Conditions
              </label>
            </div>
            <input
              className=" btn btn-success w-full text-white  text-lg"
              type="submit"
              value="Sign Up"
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

export default SignUp;
