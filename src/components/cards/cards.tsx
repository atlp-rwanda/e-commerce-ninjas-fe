/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import greenLines from "../../../public/assets/images/greenLines.png"
import redLines from "../../../public/assets/images/redLines.png"
const Card = ({ title, value, percentage, isPositive, onClick }) => {
    return (
      <div className="card" onClick={onClick ? onClick : undefined}>
        <div className="card-content">
          <h3>{title}</h3>
          <h1>{value}</h1>
          <p className={isPositive ? 'positive' : 'negative'}>
            {isPositive ? '+' : '-'}{percentage}%
          </p>
        </div>
        <div className="card-graph">
          <img src={isPositive ? greenLines : redLines} alt="graph" />
        </div>
      </div>
    );
  };
  
  Card.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    percentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isPositive: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  };
  
  Card.defaultProps = {
    onClick: undefined
  };
  
  export default Card;
