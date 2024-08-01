/* eslint-disable*/
import React from 'react';
import { AiFillDashboard } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import useAdminAuthCheck from '../../hooks/useAdminAuthCheck';
import { logout } from '../../store/features/auth/authSlice';
import { useAppDispatch } from '../../store/store';
import { PuffLoader } from 'react-spinners';

export const AdminLayout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAuthorized = useAdminAuthCheck();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (!isAuthorized) {
        return <div className="admin-loading">
            <PuffLoader color="#ff6d18" size={300} loading={true} />
        </div>;
    }

    return (
        <div className='admin__wrapper'>
            <section className="left__side">
                <div className="icons__side">
                    <div className="icons">
                        <div className='icons__upper'>
                        <div>
                                <Link to={"/admin"}><AiFillDashboard size={32} className='icon' /></Link>
                            </div>
                            <div>
                                <Link to={"/admin/dashboard"}><AiFillDashboard size={32} className='icon' /></Link>
                            </div>
                            <div>
                                <Link to={"/admin/settings"}><FaUserCog size={32} className='icon' /></Link>
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
                                <Link to={"/admin/dashboard"} className={`text_content ${pathname === "/admin/dashboard" ? "active" : ""}`}>Dashboard</Link>
                            </div>
                            <div>
                                <Link to={"/admin/settings"} className={`text_content ${pathname.startsWith("/admin/settings") ? "active" : ""}`}>Settings</Link>
                            </div>
                        </div>
                        <div className='dashboard__lower__link'>
                            <h2 className={`text_content`} onClick={handleLogout}>Logout</h2>
                        </div>
                    </div>
                </div>
            </section>
            <section className="main__admin__content__dashboard">
                <AdminHeader />
                <main className='main__admin__dashboard'>
                    <div className="outlet">
                        <Outlet />
                    </div>
                    <section className="right__side">
                        <div className="right-profile">PROFILE</div>
                        <div className="right-settings">SETTINGS</div>
                    </section>
                </main>
            </section>
        </div>
    );
};
