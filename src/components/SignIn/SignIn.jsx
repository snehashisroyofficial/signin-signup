import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import auth from "../Firebase/Firebase.config";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [password, setPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //components
  const handleSignin = (e) => {
    e.preventDefault();

    //   reset warning messages
    setError("");
    setSuccess("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        e.target.email.value = "";
        e.target.password.value = "";

        //conditions if email not verified
        if (res.user.emailVerified) {
          setSuccess("Sign in successful. Let's get started!");
        } else {
          setError("Please verify your account to Sign In");
        }
      })
      .catch((error) =>
        setError(
          "We couldn't locate your profile. To continue, please create a new profile"
        )
      );
  };

  return (
    <div className="mx-4 lg:mx-auto lg:w-1/2  ">
      <div className="flex flex-col justify-center items-center  py-8">
        <h1 className=" text-2xl lg:text-4xl font-semibold text-center">
          Please Sign In / Login Now
        </h1>

        <div className="my-10  lg:w-2/3 bg-blue-100 rounded-3xl p-10 ">
          <form onSubmit={handleSignin}>
            <label htmlFor="email">Your Email Address</label>
            <input
              className="w-full py-4 px-2 rounded-xl border-2 border-blue-300 outline-none my-4"
              type="email"
              name="email"
              id="email"
              required
              placeholder="Type email address"
            />
            <div className="relative">
              <label htmlFor="password">Your Password</label>
              <input
                className=" w-full py-4 px-2  rounded-xl border-2 border-blue-300 outline-none my-4"
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
            <p>
              forget your password ?{" "}
              <Link to="/forgetpassword">
                <span className="text-red-400">Reset now</span>
              </Link>
            </p>
            <input
              className=" mt-4 btn btn-primary w-full text-white  text-lg"
              type="submit"
              value="Sign In"
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

export default SignIn;
