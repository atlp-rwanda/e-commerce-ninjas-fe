/* eslint-disable */
import React, { useState } from 'react'

export const Form = () => {
    const [idType, setIdType] = useState<string>('NID');

  return (
    <div className="form-container">
    <h2>Merchant Registration</h2>
    <div className="form-tabs">
      <button className="tab active">Business Details</button>
      <button className="tab">Owner Details</button>
      <button className="tab">Payment Details</button>
    </div>
    <form className="form">
      <div className="form-group">
        <label>Business Owner Name<span className="required">*</span></label>
        <input type="text" placeholder="Enter business owner name" required />
      </div>
      <div className="form-group">
        <label>Business Owner Email<span className="required">*</span></label>
        <input type="email" placeholder="Enter business owner email" required />
      </div>
      <div className="form-group">
        <label>Business Owner Mobile Number</label>
        <input type="tel" placeholder="Enter mobile number" />
      </div>
      <div className="form-group">
        <label>ID Type<span className="required">*</span></label>
        <div className="id-type">
          <label>
            <input
              type="radio"
              value="NID"
              checked={idType === 'NID'}
              onChange={() => setIdType('NID')}
            />
            NID
          </label>
          <label>
            <input
              type="radio"
              value="Passport"
              checked={idType === 'Passport'}
              onChange={() => setIdType('Passport')}
            />
            Passport
          </label>
          <label>
            <input
              type="radio"
              value="Birth Certificate"
              checked={idType === 'Birth Certificate'}
              onChange={() => setIdType('Birth Certificate')}
            />
            Birth Certificate
          </label>
          <label>
            <input
              type="radio"
              value="Driving License"
              checked={idType === 'Driving License'}
              onChange={() => setIdType('Driving License')}
            />
            Driving License
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>NID Number<span className="required">*</span></label>
        <input type="text" placeholder="Enter NID number" required />
      </div>
      <div className="form-group">
        <label>ID's Image</label>
        <input type="file" />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-continue">Continue</button>
        <button type="button" className="btn-cancel">Cancel</button>
      </div>
    </form>
  </div>
  )
}
