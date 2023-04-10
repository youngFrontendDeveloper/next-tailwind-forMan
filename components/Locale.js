import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import styles from "@/styles/Nav.module.css"

const language = [
  { loc: "ru", lan: "Русский" },
  { loc: "en", lan: "English" },
  { loc: "fr", lan: "Français" },
  { loc: "ja", lan: "日本語" },
];
export default function Locale() {
  const [ isShow, setShow ] = useState( false );
  const router = useRouter();
  const path = router.asPath;
  const {t}=useTranslation('common')

  const ChangeLanguageHandler = () => {
    setShow( !isShow );
  };

  const HideHandler=()=>{
    setShow(false)
  }

  return (
    <>
      <div
        className={`${styles.locale} w-[30px] relative justify-self-end hover:cursor-pointer`}
           onClick={ ChangeLanguageHandler } title="Сменить язык">
        <Image src="/images/locale-icon.svg" alt={t('chooseLanguage')} width={ 30 } height={ 30 } />
      </div>
      {
        isShow &&
        <ul className="absolute right-0 top-12 w-40 origin-top-right bg-white  shadow-lg z-50"
        >
          { language.map( (item) => (
              <li value={ item.loc } key={ item.loc }
                  className="dropdown-link"
                  onClick={HideHandler}
              >
                <Link href={ path } locale={ item.loc } className="text-[16px] align-middle">
                  { item.lan }
                </Link>
              </li>
            )
          ) }
        </ul>
      }
    </>
  );
}
