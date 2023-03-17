import { useTranslation } from "next-i18next";

export default function Title() {
  const { t } = useTranslation( "footer" );

  return(
    <h2 className="h2 my-4 font-bold text-green-700 text-[30px]">
      { t( "maintitle" ) }
    </h2>
  )
}