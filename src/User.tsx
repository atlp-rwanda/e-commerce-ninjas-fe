/* eslint-disable */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const User = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>


    )
}

export default User