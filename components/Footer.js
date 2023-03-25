import React from "react";
import Logo from "./Logo";
import { useTranslation } from "next-i18next";

export default function Footer() {

  const { t } = useTranslation( "footer" );
  return (
    <footer
      className="shadow-inner"
    >
      <div className="container flex justify-between items-center mx-auto p-4">
        <p className="text-[12px] md:text-[16px] ">
          { t( "copyrite" ) }  &copy;2023
        </p>
        <Logo />
      </div>
    </footer>
  );
}
