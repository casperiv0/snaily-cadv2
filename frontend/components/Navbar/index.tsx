import React from "react";
import Link from 'next/link'
import Image from 'next/image'
import ActiveLink from "../ActiveLink";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-40 px-16 py-4 bg-gray-900">
      <Image src="/RPPD.png" alt="Picture of the author" width="100" height="100" />
      <ul className="flex space-x-8">
        <li>
          <ActiveLink activeClassName="text-primary" href="/leo/dashboard">
            <a className="font-semibold text-white transition-colors duration-150 hover:text-primary">Dep. de Polícia</a>
          </ActiveLink>
        </li>
        <li>
          <ActiveLink activeClassName="text-primary" href="/citizen">
            <a className="font-semibold text-white transition-colors duration-150 hover:text-primary">Cidadão</a>
          </ActiveLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;