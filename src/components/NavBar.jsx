import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";

const NavBar = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between  h-28 bg-secondary-background px-56 ">
        <div>LOGO</div>
        <div className="flex flex-row items-center space-x-4">
          <Link href="/">Submit Tool</Link>
          <Link href="/about">Bookmarks</Link>

          <LoginButton />
        </div>
      </div>
    </>
  );
};

export default NavBar;
