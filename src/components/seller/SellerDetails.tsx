/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllTerms } from "../../store/features/admin/adminSlice";

interface Props {
  nextStep: () => void;
  prevStep: () => void;
  formData: any;
  updateFormData: (data: any) => void;
}

export const SellerDetails: React.FC<Props> = ({
  nextStep,
  prevStep,
  formData,
  updateFormData,
}) => {
  const [localData, setLocalData] = useState(formData);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFormData(localData);
    nextStep();
  };


  return (
    <div className="seller-details">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            First Name <span>*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={localData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name <span>*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={localData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">
            Phone Number <span>*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={localData.phone}
            onChange={handleChange}
            placeholder="Enter Phone number"
            required
          />
        </div>
        <div>
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            value={localData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">
            Password <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            value={localData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="groupe-form">
          <button type="button" onClick={prevStep}>
            Back
          </button>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
};
