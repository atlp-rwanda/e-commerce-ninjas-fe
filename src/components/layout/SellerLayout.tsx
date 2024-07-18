/* eslint-disable */
import React, { useState } from 'react'
import { AiFillDashboard } from "react-icons/ai";
import { FaProductHunt, FaUsers } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SellerHeader from './SellerHeader';
export const SellerLayout = () => {
    const [isActive, setIsActive] = useState(
        () => {
            return parseInt(localStorage.getItem('activeSellerTab')) || 1;
        }
    )
    const navigate = useNavigate()
    const handleClick = (index: number) => {
        setIsActive(index);
        localStorage.setItem('activeSellerTab', String(index));
    }
    return (
        <div className='seller__wrapper'>
            <section className="left__side">
                <div className="icons__side">
                    <div className="icons">
                        <div className='icons__upper'>
                            <div>
                                <AiFillDashboard size={32} className='icon' />
                            </div>
                            <div>
                                <FaProductHunt size={32} className='icon' />
                            </div>
                        </div>
                        <div className='icons__bottom'>
                            <IoLogOutSharp size={32} className='icon' />
                        </div>
                    </div>
                </div>
                <div className='dashboard__items'>
                    <div className='dashboard__side'>
                        <div className='dashboard__links'>
                            <div>
                                <Link to={"/seller/dashboard"} className={`text_content ${isActive === 1 ? "active" : ""}`} onClick={() => { handleClick(1); }}>Seller Dashboard</Link>
                            </div>
                            <div>
                                <Link to={"/seller/products"} className={`text_content ${isActive === 2 ? "active" : ""}`} onClick={() => { handleClick(2); }}>Products</Link>
                            </div>
                        </div>
                        <div className='dashboard__lower__link'>
                            <h2 className={`text_content ${isActive === 3 ? "active" : ""}`} onClick={() => { handleClick(3); }}>logout</h2>
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
                        <div className="right-products">PROFUCTS</div>
                    </section>
                </main>
            </section>

        </div>
    )
}