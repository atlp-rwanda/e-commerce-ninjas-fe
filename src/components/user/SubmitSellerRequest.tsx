/* eslint-disable */
import React, { useEffect } from 'react';
import seller from "../../../public/assets/sellerI.png"
import { Link } from 'react-router-dom';

const SubmitSellerRequest= () => {

  return (
    <Link to={"/become-seller"}>
      <img src={seller} alt='seller request'/>
    </Link>
  );
};

export default SubmitSellerRequest;
