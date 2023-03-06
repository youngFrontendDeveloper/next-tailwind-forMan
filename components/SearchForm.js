import React, { useState } from 'react';
import Image from 'next/image.js';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function SearchForm() {
  const [query, setQuery] = useState();
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!query) return toast.error('Введите товар');
    // router.push(`/search?query=${query}`);
    router.push(`/search`);
  };

  return (
    <form
      onSubmit={submitHandler}
      className="mx-auto  hidden justify-center sm:flex w-full max-w-[600px]"
    >
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-tr-none rounded-br-none p-1 text-sm focus:ring-0 w-full"
        placeholder="Что ищем?.."
      />
      <button
        className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
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
