import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

function AccessDenied() {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-[#0f172a] to-[#1e304b]">
      <div className="w-[80%] md:w-[40%] lg:w-[30%] bg-[#0B1120] p-8 rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-semibold text-center text-white">
          Access Denied
        </h2>
        <p className="text-center text-white text-md ">
          You are not authorized to access this page. Please login to continue.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Button color="gray" size="md">
            <Link to="/register" className="">
              Register
            </Link>
          </Button>
          <Button color="gray" size="md">
            <Link to="/login" className="">
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AccessDenied;