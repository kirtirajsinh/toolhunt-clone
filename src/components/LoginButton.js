import React, { useEffect, useRef, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LoginButton = () => {
  const { data: sessionData } = useSession();
  const [optionsVisible, setOptionsVisible] = useState(false);
  const optionsRef = useRef(null);

  const handleLogoutClick = () => {
    signOut();
  };

  const handleOptionsClick = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setOptionsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [optionsRef]);

  return (
    <>
      {sessionData?.user ? (
        <div
          className="flex flex-row items-center border  p-2 rounded-full  cursor-pointer w-36  sm:w-fit"
          onClick={(event) => {
            event.preventDefault;
            setOptionsVisible(!optionsVisible);
          }}
        >
          <div className="flex flex-col items-center ">
            {sessionData?.user && (
              <div className="flex flex-row items-center space-x-4 ">
                <div className="flex flex-row rounded-full bg-white ">
                  {sessionData?.user?.image && (
                    <Image
                      src={sessionData?.user?.image ?? ""}
                      alt={sessionData?.user?.name ?? ""}
                      width={40}
                      height={40}
                      className="rounded-full min-w-[20%]"
                    />
                  )}
                </div>
                <p className="text-sm sm:text-md ">{sessionData?.user?.name}</p>
              </div>
            )}
            {optionsVisible && (
              <div
                className="absolute mt-14  w-32 bg-secondary-background rounded-lg border border-border  shadow-lg z-10 "
                onClick={handleOptionsClick}
                ref={optionsRef}
              >
                <div className="py-1">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-primary-foreground"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </div>
                <Link
                  href="/profile"
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-primary-foreground "
                >
                  Profile
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="font-semibold flex gap-2 items-center rounded-full hover:shadow-md px-6 md:px-8 py-2 bg-gradient-to-r from-[#0eca90] to-[#11c2b6]  bg-clip-text text-transparent border-[1px] border-[#0eca90] hover:bg-transparent hover:text-[#0eca90]"
        >
          <span className="text-primary-button">Login</span>
          <Image src="/icons/arrow.svg" width={16} height={16} alt="" />
        </button>
      )}
    </>
  );
};

export default LoginButton;
