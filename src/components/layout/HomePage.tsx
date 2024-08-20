/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';

interface HomePageProps {
  isAuthenticated: boolean;
  userRole?: 'buyer' | 'seller';
}

const HomePage: React.FC<HomePageProps> = ({ isAuthenticated, userRole }) => {
  return (
    <div>
      {!isAuthenticated && (
        <div className="banner">
          <h2>Interested in selling?</h2>
          <p>Create an account to become a seller and start selling your products online!</p>
          <Link to="/register/seller" className="btn-link">Register as a Seller</Link>
        </div>
      )}
      {isAuthenticated && userRole === 'buyer' && (
        <div className="banner">
          <h2>Want to sell your products?</h2>
          <p>Upgrade your profile to become a seller and start listing your products!</p>
          <Link to="/become-seller" className="btn-link">Upgrade to Seller</Link>
        </div>
      )}
      {/* Other homepage content */}
    </div>
  );
};

export default HomePage;
