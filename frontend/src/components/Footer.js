import React from 'react';


function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {currentYear}. AlenaAlena &#38; Mesto</p>
    </footer>
  );
}

export default Footer;