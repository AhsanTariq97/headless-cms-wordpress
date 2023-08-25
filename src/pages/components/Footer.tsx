import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import ContactDetails from "./constants/ContactDetails";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer: React.FC = () => {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const router = useRouter();

  const smoothScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth", // smooth scroll
      });
    } else {
      router.push(`/#${id}`);
    }
  };

  return (
    <footer className="w-full">
      <div className="relative w-full bg-[#243140] pb-8 pt-16 text-[#BDC0C2]">
        <div className="slanted-cut absolute left-auto right-8 top-0 animate-bounce bg-[#7187A2] p-2 text-[#E5E7EB] md:-top-4 md:left-1/2 md:right-auto md:-translate-x-1/2 md:animate-none md:bg-[#243140] md:px-6 md:py-3">
          <button onClick={scrollToTop}>
            <FaArrowUp size={25} className="md:animate-bounce" />
          </button>
        </div>
        <div className="mx-auto flex flex-col items-center justify-between space-y-12 border-[#E4E6E7] px-8 pb-16 sm:pb-32 md:max-w-4xl md:flex-row md:space-y-0 md:border-t-2 md:pt-12 lg:max-w-6xl">
          <div
            data-aos="fade-up"
            className="flex w-max flex-col items-center justify-between space-y-4 text-center lg:items-start"
          >
            <h3 className="w-full text-base font-semibold tracking-wide text-white">
              Navigate Links
            </h3>
            <Link href="/">
              <p className="w-full text-base tracking-wide">Home</p>
            </Link>
            <Link href="/">
              <p className="w-full text-base tracking-wide">Blog</p>
            </Link>
            <Link
              href=""
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo("services");
              }}
            >
              <p className="w-full text-base tracking-wide">Services</p>
            </Link>
            <Link
              href=""
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo("team");
              }}
            >
              <p className="w-full text-base tracking-wide">Team</p>
            </Link>
          </div>
          <div
            data-aos="fade-up"
            className="flex flex-col items-center justify-between space-y-4"
          >
            <h2 className="text-lg font-medium tracking-wide text-[#E5E7EB]">
              FOLLOW US
            </h2>
            <div className="flex items-center justify-between space-x-4 md:space-x-2">
              <Link href="https://www.facebook.com/atrialogics" target="_blank">
                <div className="rounded-full bg-[#E4E6E7] p-2 text-[#252728]">
                  <FaFacebookF size={25} />
                </div>
              </Link>
              <Link
                href="https://www.instagram.com/atrialogics"
                target="_blank"
              >
                <div className="rounded-full bg-[#E4E6E7] p-2 text-[#252728]">
                  <AiFillInstagram size={25} />
                </div>
              </Link>
              <Link href="https://atrialogics.io/#" target="_blank">
                <div className="rounded-full bg-[#E4E6E7] p-2 text-[#252728]">
                  <FaTwitter size={25} />
                </div>
              </Link>
              <Link href="https://atrialogics.io/#" target="_blank">
                <div className="rounded-full bg-[#E4E6E7] p-2 text-[#252728]">
                  <FaLinkedinIn size={25} />
                </div>
              </Link>
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="flex flex-col items-center justify-between space-y-4 lg:items-start"
          >
            <h3 className="tex-2xl font-bold tracking-wide text-white">
              Contact Us
            </h3>
            <ContactDetails textColor="text-[#BDC0C2]" iconColor="#BDC0C2" />
          </div>
        </div>
        <div className="mx-auto flex w-full items-center justify-between border-t-2 border-[#E4E6E7] p-4 md:max-w-4xl lg:max-w-6xl">
          <h3 className="text-base font-medium tracking-wide">
            ©2023 Atrialogics
          </h3>
          <h3 className="text-base font-medium tracking-wide">Atrialogics</h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
