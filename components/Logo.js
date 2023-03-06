import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/images/logo.svg" alt="Логотип" width={40} height={60} />
    </Link>
  );
}
