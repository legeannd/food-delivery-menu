"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("/checkout")) {
      setShowFooter(false);
    }
  }, [pathname]);

  return showFooter ? (
    <footer className="flex flex-col px-4 py-6 items-center bg-neutral-100 text-purple-700 font-bold">
      <span className="text-sm pb-2">feito com 💜 em maringá-PR</span>
      <span>aiqfome.com © 2007-2023 aiqfome LTDA .</span>
      <span>CNPJ: 09.186.786/0001-58</span>
    </footer>
  ) : (
    <></>
  );
};
