import React from "react";
import Logo from "./Logo";
import { useTranslation } from "next-i18next";

export default function Footer() {

  const { t } = useTranslation( "footer" );
  return (
    <footer className="container flex h-10 justify-between items-center mx-auto shadow-inner px-4">
      <p className="text-[12px] md:text-[16px]">
        { t( "copyrite" ) }  &copy;2023
      </p>
      <Logo />
    </footer>
  );
}
