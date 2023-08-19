import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import Button from "./constants/Button";
import { useRouter } from "next/router";
import { FaBars } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import DarkModeBtn from "./constants/DarkModeBtn";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  }, []);

  const router = useRouter();

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    } else {
      router.push(`/#${id}`);
    }
  };

  const [toggle, setToggle] = useState(false);

  return (
    <>
      <header
        className={`fixed top-0 z-[1] w-full bg-white dark:bg-dark text-black dark:text-white ${
          scrolled
            ? "shadow-navbar transition-shadow duration-200 ease-in-out"
            : ""
        }`}
      >
        <nav className="relative w-full mx-auto max-w-screen-xl h-[100px] pt-4">
          <div className="flex flex-row items-center justify-between px-8">
            <div className="mb-6 min-w-[200px]">
              <Link href="/">
                <Image
                  src="/assets/Atrialogics.png"
                  alt="Logo here"
                  width={200}
                  height={100}
                />
              </Link>
            </div>
            <ul
              className={
                "hidden lg:flex flex-row justify-center items-center space-x-8"
              }
            >
              {navItems.map((item) => (
                <li className="py-2 tracking-wide ">
                  <Link
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      smoothScrollTo(item.id);
                    }}
                  >
                    <p className="text-base font-normal tracking-wide">
                      {item.text}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="hidden lg:flex justify-between items-center space-x-2">
              <Link href="/portfolio">
                <Button type="text" text="Portfolio" px="8" />
              </Link>
              <DarkModeBtn />
            </div>

            <div className="flex lg:hidden justify-end items-center">
              <FaBars
                size={25}
                className="cursor-pointer"
                onClick={() => setToggle((prev) => !prev)}
              />
              <div
                className={`${
                  toggle ? "flex" : "hidden"
                } absolute top-0 left-0 bg-white w-full h-screen text-center rounded-lg`}
              >
                <ul className="flex flex-col items-center justify-center w-full h-full space-y-8 text-black">
                  <li className="px-4 py-2 tracking-wide">
                    <Link onClick={() => setToggle((prev) => !prev)} href="/">
                      <p className="text-base font-normal tracking-wide">
                        Home
                      </p>
                    </Link>
                  </li>
                  {navItems.map((item) => (
                    <li className="px-4 py-2 tracking-wide">
                      <Link
                        href={item.href}
                        onClick={(event) => {
                          event.preventDefault();
                          smoothScrollTo(item.id);
                          setToggle((prev) => !prev);
                        }}
                      >
                        <p className="text-base font-normal tracking-wide">
                          {item.text}
                        </p>
                      </Link>
                    </li>
                  ))}
                  <div className="flex flex-col justify-between space-y-4">
                    <Link href="/portfolio">
                      <Button type="text" text="Portfolio" />
                    </Link>
                  </div>
                  <MdClose
                    size={25}
                    className="absolute cursor-pointer top-3 right-8"
                    onClick={() => setToggle((prev) => !prev)}
                  />
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="py-[50px]"></div>
    </>
  );
};

export default Navbar;

const navItems = [
  {
    href: "/",
    id: "",
    text: "Home",
  },
  {
    href: "",
    id: "services",
    text: "Services",
  },
  {
    href: "",
    id: "about",
    text: "About",
  },
  {
    href: "",
    id: "team",
    text: "Team",
  },
  {
    href: "",
    id: "contact",
    text: "Contact",
  },
];
