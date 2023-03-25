import React from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  VKShareButton,
  VKIcon,

} from "next-share";
import { useTranslation } from "next-i18next";

export default function SocialNetwork() {
  const { t } = useTranslation( "common" );
  return (
    <div className=" mb-3 p-2  ">
      <h2 className="mb-2 text-center font-[500] text-[18px]">
        { t( "socialNetwork" ) }
        {/*Поделиться страницей в социальных сетях*/ }
      </h2>
      <div className="flex justify-center items-center gap-2">
        <WhatsappShareButton
          url={ "http://localhost:3000" }
        >
          <WhatsappIcon size={ 32 } round />
        </WhatsappShareButton>
        <TelegramShareButton
          url={ "http://localhost:3000" }
        >
          <TelegramIcon size={ 32 } round />
        </TelegramShareButton>
        <VKShareButton
          url={ "http://localhost:3000" }
        >
          <VKIcon size={ 32 } round />
        </VKShareButton>
      </div>
    </div>
  );
}