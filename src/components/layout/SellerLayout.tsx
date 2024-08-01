/* eslint-disable */
import React, { useState } from 'react';
import { AiFillDashboard } from "react-icons/ai";
import { FaPlusCircle, FaProductHunt } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import useSellerAuthCheck from '../../hooks/useSellerAuthCheck';
import { logout } from '../../store/features/auth/authSlice';
import { useAppDispatch } from '../../store/store';
import { PuffLoader } from 'react-spinners';

export const SellerLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const isAuthorized = useSellerAuthCheck();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/seller/login");
    };

    if (!isAuthorized) {
        return <div className="seller-loading">
            <PuffLoader color="#ff6d18" size={300} loading={true} />
        </div>;
    }
    return (
        <div className='seller__wrapper'>
            <section className="left__side">
                <div className="icons__side">
                    <div className="icons">
                        <div className='icons__upper'>
                            <div>
                                <Link to={"/seller/dashboard"} ><AiFillDashboard size={32} className='icon' /></Link>
                            </div>
                            <div>
                                <Link to={"/seller/products"}><FaProductHunt size={32} className='icon' /></Link>
                            </div>
                            <div>
                                <Link to={"/seller/product/add"}><FaPlusCircle size={32} className='icon' /></Link>
                            </div>
                        </div>
                        <div className='icons__bottom'>
                            <IoLogOutSharp size={32} className='icon' onClick={handleLogout} />
                        </div>
                    </div>
                </div>
                <div className='dashboard__items'>
                    <div className='dashboard__side'>
                        <div className='dashboard__links'>
                            <div>
                                <Link to={"/seller/dashboard"} className={`text_content ${pathname === "/seller/dashboard" ? "active" : ""}`} >Dashboard</Link>
                            </div>
                            <div>
                                <Link to={"/seller/products"} className={`text_content ${pathname.startsWith("/seller/product") && pathname !== "/seller/product/add" ? "active" : ""}`} >Products</Link>
                            </div>
                            <div>
                                <Link to={"/seller/product/add"} className={`text_content ${pathname === "/seller/product/add" ? "active" : ""}`} >Add Product</Link>
                            </div>
                        </div>
                        <div className='dashboard__lower__link'>
                            <h2 className={`text_content`} onClick={handleLogout} >Logout</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="main__seller__content__dashboard">
                <SellerHeader />
                <main className='main__seller__dashboard'>
                    <div className="outlet">
                        <Outlet />
                    </div>
                    <section className="right__side">
                        <div className="right-profile">PROFILE</div>
                        <div className="right-products">PRODUCTS</div>
                    </section>
                </main>
            </section>
        </div>
    );
};
