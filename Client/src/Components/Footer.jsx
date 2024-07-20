import React from "react";

function Footer() {
  return (
    <div className=" bg-gray-50">
      <footer className="bg-gradient-to-r from-[#0f172a] to-[#1e304b] text-white py-6 ">
        <div className="container px-6 mx-auto text-center">
          <p>
            &copy; {new Date().getFullYear()} GupShup. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
