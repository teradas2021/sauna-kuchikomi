import React, { Component } from 'react';
import Header from "./Header";
import Dashboard from './Dashboard';
import Footer from './Footer';
import PrivateDashboard from './PrivateDashboard';
// import ToDoList from './ToDoList';

const Home = () => {
    return(
        <div>
            <Header/>
            <Dashboard/>
            {/* <ToDoList/> */}
            <Footer/>
        </div>
        
    )
};

export default Home;
