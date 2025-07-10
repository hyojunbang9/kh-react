import "./Header.css";
import { memo } from "react";

const Header = () => {
  return (
    <header className="Header">
      <h3>오 늘 할 일 🗓️</h3>
      <h2>{new Date().toDateString()}</h2>
    </header>
  );
};

export default memo(Header);
