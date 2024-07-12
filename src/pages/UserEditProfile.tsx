/* eslint-disable */
import React, { useEffect } from 'react'
import { IoMdEyeOff } from 'react-icons/io';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchUserProfile, updateUserProfile } from '../store/features/user/userSlice';
import { IProfile, ILocation } from '../utils/types/store';
import profile from "../../public/assets/ProfileImage.jpg"
import camera from "../../public/assets/Camera.png"
import { TailSpin } from 'react-loader-spinner'
import data from '../components/locations/location';

interface RwandaLocationSelectorProps {
    setLocation?: React.Dispatch<React.SetStateAction<ILocation | null>>;
}

type RwandaData = {
    [key: string]: {
        [key: string]: {
            [key: string]: {
                [key: string]: {
                    [key: string]: string[];
                };
            };
        };
    };
};

type NestedObject = {
    [key: string]: NestedObject | string[];
};

const rwandaData: RwandaData = data;


const UserProfile: React.FC<RwandaLocationSelectorProps> = ({ setLocation }) => {
    const dispatch = useAppDispatch();
    const { user, isSuccess, isError, message, isLoading } = useAppSelector((state) => state.user);

    const [data, setData] = useState<IProfile | null>(null)
    const [country, setCountry] = useState('Rwanda');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [sector, setSector] = useState('');

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch]);

    useEffect(() => {

        if (user) {
            setData(user);
        }
    }, [user]);
    const handleInputs: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
        setData(prev => prev ? ({ ...prev, [e.target.name]: e.target.value }) : null)
    }

    const handleSubmit = () => {
        if (data) {
            dispatch(updateUserProfile(data));
        }
    };

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountry(e.target.value);
        setProvince('');
        setDistrict('');
        setSector('');
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProvince(e.target.value);
        setDistrict('');
        setSector('');
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDistrict(e.target.value);
        setSector('');
    };

    const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSector(e.target.value);
    };

    const getOptions = (selectedData: NestedObject) => {
        return Object.keys(selectedData).map(key => <option key={key} value={key}>{key}</option>);
    };

    const getArrayOptions = (array: string[]) => {
        return array.map(item => <option key={item} value={item}>{item}</option>);
    };

    useEffect(() => {
        setLocation && setLocation({ country, province, district, sector });
    }, [country, province, district, sector, setLocation]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {message}</div>;
    }


    return (
        <>
            <section className='profile-container'>
                <div className='profile-details'>
                    <div className='title'>
                        <h1>MY PROFILE DETAILS</h1>
                        <button onClick={() => handleSubmit()}>
                            {isLoading ? (
                                <TailSpin color="orange" height={30} width={30} /> // Display spinner
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                    <div className='details'>
                        <div className='input-container'>
                            <div className='input-layout'>
                                <label htmlFor='firstName'>First Name</label>
                                <input type='text' name='firstName' value={data?.firstName} onChange={handleInputs} />
                            </div>
                            <div className='input-layout'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input type='text' name='lastName' value={data?.lastName || ''} onChange={handleInputs} />
                            </div>
                            <div className='input-layout'>
                                <label htmlFor='email'>Email Address</label>
                                <input type='text' name='email' placeholder='support@e-commerce-ninjas.com' value={data?.email} onChange={handleInputs} />
                            </div>
                            <div className='select-layout'>
                                <select onChange={handleInputs}>
                                    <option value="" disabled></option>
                                    <option value="value1">Rwanda</option>
                                    <option value="">Uganda</option>
                                    <option value="">Burundi</option>
                                    <option value="">Kenya</option>
                                </select>
                                <input type="tel" name='phone' value={data?.phone || ''} onChange={handleInputs} placeholder='250788888888' />
                            </div>
                        </div>
                        <div className='profile-pic'>
                            <img src={profile} alt="profile" />
                            <form encType='multipart/form-data'>
                                <button type='submit'>
                                    <img
                                        src={camera}
                                        alt='edit profile'
                                    />
                                </button>
                                {/* <input type="file" /> */}
                            </form>
                        </div>
                        <div className='right-side'>
                            <div className='options'>
                                <label htmlFor="gender">Gender</label>
                                <select value={data?.gender || ''} onChange={handleInputs}>
                                    <option value="" disabled></option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className='options'>
                                <label htmlFor="currency">Currency</label>
                                <select value={data?.currency || ''} onChange={handleInputs}>
                                    <option value="" disabled></option>
                                    <option value="USD">$</option>
                                    <option value="RWF">RWF</option>
                                </select>
                            </div>
                            <div className='options'>
                                <label htmlFor="language">Language</label>
                                <select value={data?.language || ''} onChange={handleInputs}>
                                    <option value="" disabled></option>
                                    <option value="English">English</option>
                                    <option value="Kinyarwanda">Kinyarwanda</option>
                                    <option value="Greek">Greek</option>
                                </select>
                            </div>
                            <div className='input-d'>
                                <label htmlFor="email">Birth date</label>
                                <input type="date" name="date" value={data?.birthDate} onChange={handleInputs} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="password-container">
                    <div className='title'>
                        <h1>MY PASSWORD</h1>
                        <button onSubmit={handleSubmit}>Save Change</button>
                    </div>
                    <div className='password'>
                        <div className='password-inp'>
                            <label htmlFor="password">Password</label>
                            <div className='input-n'>
                                <input type="password" name="password" value={data?.password} onChange={handleInputs} />
                                <span>
                                    <IoMdEyeOff />
                                </span>
                            </div>
                        </div>
                        <div className='password-inp'>
                            <label htmlFor="confirmPassword">confirm Password</label>
                            <div className="input-n">
                                <input type="confirm-assword" name="confirmPassword" value={data?.password} onChange={handleInputs} />
                                <span>
                                    <IoMdEyeOff />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shipping-address">
                    <div className='title'>
                        <h1>MY SHIPPING ADDRESS</h1>
                        <button onSubmit={handleSubmit}>Save Change</button>
                    </div>
                    <div className="shipping">
                        <div >
                            <div className='select-inp'>
                                <label htmlFor="Province">Province</label>
                                <select value={province} onChange={handleProvinceChange} disabled={!country}>
                                    <option value="">Select Province</option>
                                    {country && getOptions(rwandaData[country])}
                                </select>
                            </div>
                            <div className='select-inp'>
                                <label htmlFor="District">District</label>
                                <select value={district} onChange={handleDistrictChange} disabled={!province}>
                                    <option value="">Select District</option>
                                    {province && getOptions(rwandaData[country][province])}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div className='select-inp'>
                                <label htmlFor="Sector">Sector</label>
                                <select value={sector} onChange={handleSectorChange} disabled={!district}>
                                    <option value="">Select Sector</option>
                                    {district && getOptions(rwandaData[country][province][district])}
                                </select>
                            </div>
                            <div className='select-inp'>
                                <label htmlFor="Street-address">Street Address:</label>
                                <select onChange={handleInputs}>
                                    <option value="" disabled></option>
                                    <option >KN 123</option>
                                    <option >KN 301</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}


export default UserProfile
