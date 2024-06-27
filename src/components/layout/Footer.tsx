/* eslint-disable linebreak-style */
import React from 'react';

const getYear = (): number => new Date().getFullYear();

const Footer: React.FC = () => (
  <footer>
    <p>
      &copy;
      {getYear()}
      {' '}
      Your E-commerce Site
    </p>
  </footer>
);

export default Footer;
