import Link from "next/link";

import { ModeToggle } from "./ModeToggle";
import { Handbag } from "lucide-react";
import HeaderCart from "./HeaderCart";

const Header = () => {
  return (
    <div className=" mx-auto max-w-6xl flex justify-between py-4 px-4 sm:px-4 items-center">
      <Link href="/" className="flex items-center gap-2">
        <Handbag />
        <h1 className="font-bold text-2xl">Suzz</h1>
      </Link>
      <div className="flex items-center gap-1 sm:gap-4">
        <ModeToggle />
        <HeaderCart />
      </div>
    </div>
  );
};

export default Header;
