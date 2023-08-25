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
        className={`fixed top-0 z-[1] w-full bg-white text-black dark:bg-dark dark:text-white ${
          scrolled
            ? "shadow-navbar transition-shadow duration-200 ease-in-out"
            : ""
        }`}
      >
        <nav className="relative mx-auto h-[100px] w-full max-w-screen-xl pt-4">
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
                "hidden flex-row items-center justify-center space-x-8 lg:flex"
              }
            >
              {navItems.map((item, index) => (
                <li className="py-2 tracking-wide" key={index}>
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
            <div className="hidden items-center justify-between space-x-2 lg:flex">
              <Link href="/portfolio">
                <Button type="text" className="px-8">
                  Portfolio
                </Button>
              </Link>
              <DarkModeBtn />
            </div>

            <div className="flex items-center justify-end lg:hidden">
              <FaBars
                size={25}
                className="cursor-pointer"
                onClick={() => setToggle((prev) => !prev)}
              />
              <DarkModeBtn />
              <div
                className={`${
                  toggle ? "flex" : "hidden"
                } absolute left-0 top-0 h-screen w-full rounded-lg bg-white text-center dark:bg-dark `}
              >
                <ul className="flex h-full w-full flex-col items-center justify-center space-y-8 text-black dark:text-white">
                  <li className="px-4 py-2 tracking-wide">
                    <Link onClick={() => setToggle((prev) => !prev)} href="/">
                      <p className="text-base font-normal tracking-wide">
                        Home
                      </p>
                    </Link>
                  </li>
                  {navItems.map((item, index) => (
                    <li className="px-4 py-2 tracking-wide" key={index}>
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
                  <li className="w-96 px-4 py-2 tracking-wide">
                    <Link href="/portfolio" className="block">
                      <Button type="text" className="w-32">
                        Portfolio
                      </Button>
                    </Link>
                  </li>
                  <MdClose
                    size={25}
                    className="absolute right-8 top-3 cursor-pointer"
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
