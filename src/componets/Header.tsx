"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex flex-col  gap-4 bg-purple-500 p-4">
      <div className="flex justify-between">
        <div className="flex gap-6">
          <Image
            src="/icons/logo.svg"
            alt={"aiqfome logo"}
            width={32}
            height={32}
          />
          <div className="flex gap-2.5">
            <Image
              src="/icons/location.svg"
              alt={"location icon"}
              width={24}
              height={24}
            />
            <div className="flex flex-col gap-[2px] font-bold">
              <span className="text-purple-200">entregando em</span>
              <div className="flex items-center gap-1">
                <span className="text-white">Rua Mandaguari, 198</span>
                <Image
                  src="/icons/chevron-right.svg"
                  alt={"arrow right icon"}
                  width={16}
                  height={16}
                />
              </div>
            </div>
          </div>
        </div>
        <Image src="/icons/user.svg" alt={"user icon"} width={24} height={24} />
      </div>
      {pathname === "/" && (
        <div className="flex gap-3 bg-white p-3 border border-dividers-gray rounded-lg">
          <Image
            src="/icons/search.svg"
            alt={"user icon"}
            width={24}
            height={24}
          />
          <input
            className="w-full text-sm font-semibold placeholder:font-semibold placeholder:text-sm placeholder:text-light"
            placeholder="busque pela loja ou culinária"
            type="text"
          />
        </div>
      )}
    </header>
  );
};
