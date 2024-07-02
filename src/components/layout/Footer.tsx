/* eslint-disable */
import React from 'react';

const getYear = (): number => new Date().getFullYear();

const Footer: React.FC = () => (
  <footer>
    <p>
      &copy;
      {getYear()}
      {' '}
      Ninja E-Commerce Store
    </p>
  </footer>
);

export default Footer;