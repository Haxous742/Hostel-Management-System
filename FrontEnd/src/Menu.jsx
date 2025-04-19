import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Components/NavBar';
import SideBar from './Components/SideBar';

const Menu = () => {
    return (
        <div>
        <Navbar />
        <SideBar />
        </div>
    );
};

export default Menu;