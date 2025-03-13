import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import AuthForm from "../Components/AuthForm";

const SignUp = () => {
  return (
    <div className="flex h-screen flex-col bg-slate-100">
      <NavBar />
      <div className="flex p-10 flex-grow  justify-center items-center">
        <div className="p-10 w-fit md:w-[500px] flex flex-col gap-10 rounded-lg bg-white">
          <div className="flex gap-3 text-center flex-col">
            <h2 className="text-3xl font-semibold">Create Your Account</h2>
            <span className="text-gray-500">
              Start building your digital second brain today
            </span>
          </div>

        {/* form */}
        <AuthForm/>

          {/* buttons */}
            <div>
              Do you already have an account?
              <Link to="/signin">
                <span className="text-primary-500">
                  {" "}
                  Sign In
                  <IoIosArrowRoundForward className="inline h-4 w-4" />
                </span>
              </Link>
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUp;
