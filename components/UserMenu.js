import React from "react";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink.js";
import styles from "@/styles/Nav.module.css";
import Image from "next/image";

export default function UserMenu({ session, logoutClickHandler }) {
  return (
    <Menu
      as="div"
      // className="relative flex"
      className={ `${ styles.login } relative justify-self-end` }
    >
      {
        ({ open }) => (
          <>


            <Menu.Button className="text-green-600 text-[16px] flex flex-col items-center justify-center">
              <Image src="/images/circle-icon.svg" alt="Выйти" width={ 30 } height={ 30 } />
              <span className="absolute text-[11px]">
        { session.user.name.slice(0,1) }
          </span>
            </Menu.Button>
            { open && (
              <>
                <Menu.Items className="absolute right-0 top-12 w-40 origin-top-right bg-white  shadow-lg z-50">
                  <Menu.Item>
                    <DropdownLink className="dropdown-link text-[16px] " href="/profile">
                      Профиль
                    </DropdownLink>
                  </Menu.Item>
                  <Menu.Item>
                    <DropdownLink className="dropdown-link text-[16px]" href="/order-history">
                      История заказов
                    </DropdownLink>
                  </Menu.Item>
                  { session.user.isAdmin && (
                    <Menu.Item>
                      <DropdownLink className="dropdown-link text-[16px]" href="/admin/dashboard">
                        Панель администратора
                      </DropdownLink>
                    </Menu.Item>
                  ) }
                  <Menu.Item>
                    <a
                      className="dropdown-link text-[16px] hover:text-red-600"
                      href="#"
                      onClick={ logoutClickHandler }
                    >
                      Выйти
                    </a>
                  </Menu.Item>
                </Menu.Items>
              </>
            ) }

          </>
        )
      }
    </Menu>
  );
}
