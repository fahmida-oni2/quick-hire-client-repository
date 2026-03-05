import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Navbar from '../Components/Common/Navbar/Navbar';
import Loading from '../Components/Common/Loading/Loading';
import Footer from '../Components/Common/Footer/Footer';


const Root = () => {
    const {state}=useNavigation();
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <section>
                {
                state=="loading" ? <Loading></Loading> :<Outlet></Outlet>
            }
             
            </section>
            <Footer></Footer>
            
        </div>
    );
};

export default Root;