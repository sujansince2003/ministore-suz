import React from "react";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <div className=" mx-auto max-w-6xl flex justify-between py-4 ">
      <h1>MiniStore</h1>
      <ModeToggle />
    </div>
  );
};

export default Header;
