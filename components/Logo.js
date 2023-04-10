import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "@/styles/Nav.module.css";

export default function Logo() {
  return (
    <Link
      href="/" title="На главную страницу"
      className={`${ styles.logo } block w-[48px] h-[48px]`}
    >
      <Image src="/images/logo.svg" alt="Логотип" width={ 48 } height={ 48 } />
    </Link>
  );
}
