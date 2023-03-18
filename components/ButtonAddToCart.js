import React from 'react';

export default function ButtonAddToCart({ product, action, text }) {

  return (
    <button
      className=" w-full primary-button text-[16px] text-green-600 font-[500]"
      type="button"
      onClick={action ? () => action(product) : null}
    >
      {text}
    </button>
  );
}
