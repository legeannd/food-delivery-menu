"use client";

import { ChevronRight, MapPin, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <header className="flex md:justify-center bg-purple-500 p-4">
      <div className="flex flex-col gap-4 w-full md:w-3xl ">
        <div className="flex items-center justify-between text-white">
          <div className="flex gap-6 items-center">
            <Link href="/">
              <Image
                src="/icons/logo.svg"
                alt={"aiqfome logo"}
                width={32}
                height={32}
              />
            </Link>
            <div className="flex gap-2.5 items-center text-white">
              <MapPin size={24} />
              <div className="flex flex-col gap-[2px] font-bold cursor-pointer">
                <span className="text-purple-200">entregando em</span>
                <div className="flex items-center gap-1 text-white">
                  <span>Rua Mandaguari, 198</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
          <UserRound size={24} />
        </div>
        {pathname === "/" && (
          <div className="flex gap-3 focus-within:border-blue-500  bg-white p-3 border border-dividers-gray rounded-lg">
            <Image
              src="/icons/search.svg"
              alt={"user icon"}
              width={24}
              height={24}
            />
            <input
              className="w-full text-sm font-semibold focus:outline-0 placeholder:font-semibold placeholder:text-sm placeholder:text-light"
              placeholder="busque pela loja ou culinária"
              type="text"
              defaultValue={searchParams.get("search")?.toString()}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>
        )}
      </div>
    </header>
  );
};
