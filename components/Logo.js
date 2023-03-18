import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Logo() {
  return (
    <Link href="/" title="На главную страницу">
      <Image src="/images/logo.svg" alt="Логотип" width={48} height={48} />
    </Link>
  );
}
