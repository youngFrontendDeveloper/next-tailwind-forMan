import React from 'react';
import { Menu } from '@headlessui/react';
import DropdownLink from './DropdownLink.js';

export default function UserMenu({ session, logoutClickHandler }) {
  return (
    <Menu as="div" className="relative flex">
      <Menu.Button className="text-green-600 text-[16px] ">
        {session.user.name}
      </Menu.Button>
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
        {session.user.isAdmin && (
          <Menu.Item>
            <DropdownLink className="dropdown-link text-[16px]" href="/admin/dashboard">
              Панель администратора
            </DropdownLink>
          </Menu.Item>
        )}
        <Menu.Item>
          <a
            className="dropdown-link text-[16px] hover:text-red-600"
            href="#"
            onClick={logoutClickHandler}
          >
            Выйти
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
