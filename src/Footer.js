import { isToday } from "date-fns";
import React from "react";

const Footer = () => {
  const today = new Date();
  return (
    <footer className="footer">
      <h1>Copyright &copy; {today.getFullYear()}</h1>
    </footer>
  );
};

export default Footer;
