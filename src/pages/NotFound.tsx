/* eslint-disable */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import notFound from '../../public/assets/images/not-found.png';

const NotFound: React.FC<any> = ({redirectPath='/'}) => {

  useEffect(() =>{
    const activeTab = localStorage.getItem('activeTab');
    if(activeTab){
      localStorage.removeItem('activeTab');
    }
  },[])
  return(
    <main className='wrapper'>
    <div className="container">
      <div className="not-found">
        <div className="not-found-img">
          <img src={notFound} alt="not-found" />
        </div>
        <div className='not-found-text'>
        <h2>Not found</h2>
        <p>Please make sure you've entered the correct URL.</p>
        <p>If you think this is a mistake, please contact support.</p>
        </div>
        <div>
          <Link to={redirectPath} className="btn-link">Back to Home</Link>
        </div>
      </div>
    </div>
  </main>
  )
}

export default NotFound;
