import React, { Component } from 'react';
import Header from "./Header";
import Dashboard from './Dashboard';
import Footer from './Footer';
import PrivateDashboard from './PrivateDashboard';
// import ToDoList from './ToDoList';

const Private = () => {
    return(
        <div>
            <Header/>
            <PrivateDashboard/>
            {/* <ToDoList/> */}
            <Footer/>
        </div>
        
    )
};

export default Private;