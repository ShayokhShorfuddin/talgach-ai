'use client';

import { Menu } from './menu/menu';
import { MenuContent } from './menu/menu-content';
import { MenuTrigger } from './menu/menu-trigger';

export default function Navbar() {
  return (
    <header>
      <nav className="w-full">
        <div className="flex justify-center items-center mt-2 gap-x-8 text-sm">
          <Menu>
            <MenuTrigger>
              <p className="py-1 px-2 cursor-pointer">Products</p>
            </MenuTrigger>

            <MenuContent>
              <div>
                <p>Menu Item 1</p>
                <Menu>
                  <MenuTrigger>
                    <p className="cursor-pointer">Menu Item 5</p>
                  </MenuTrigger>

                  <MenuContent>
                    <div>
                      <p>Submenu Item 1</p>
                      <p>Submenu Item 2</p>
                      <p>Submenu Item 3</p>
                      <p>Submenu Item 4</p>
                    </div>
                  </MenuContent>
                </Menu>
                <p>Menu Item 2</p>
                <p>Menu Item 3</p>
                <p>Menu Item 4</p>

                <p>Menu Item 6</p>
              </div>
            </MenuContent>
          </Menu>

          <p>Home</p>
          <p>About</p>
        </div>
      </nav>
    </header>
  );
}
