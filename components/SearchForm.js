import React, { useState } from 'react';
import Image from 'next/image.js';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTranslation } from "next-i18next";
import styles from "@/styles/Nav.module.css"

export default function SearchForm() {
  const [query, setQuery] = useState();
  const router = useRouter();
  const { t } = useTranslation( "common" );

  const submitHandler = (e) => {
    e.preventDefault();
    if (!query) return toast.error('Введите товар');
    router.push(`/search?query=${query}`);
  };

  return (
    <form
      onSubmit={submitHandler}
      className={` ${styles.search} flex mx-auto justify-between w-full lg:max-w-[600px]`}
    >
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0 grow"
        placeholder={t("search")}
        // placeholder="Что ищем?.."
      />
      <button
        className="w-[30px] rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
        type="submit"
        id="button-addon"
      >
        <Image
          src="/images/search-icon.svg"
          alt="Искать"
          width={20}
          height={20}
        />
      </button>
    </form>
  );
}
