import React from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const DarkModeBtn = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className=""
    >
      {
        <Image
          src={
            theme === "light"
              ? "/assets/dark-mode.svg"
              : "/assets/light-mode.svg"
          }
          alt=""
          width={16}
          height={16}
        />
      }
    </button>
  );
};

export default DarkModeBtn;
