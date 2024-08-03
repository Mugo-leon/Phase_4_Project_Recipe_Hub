import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Rose from './Rose.jpg';


function Dashboard({ username }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div 
            className='dashboard' 
            style={{
                backgroundImage: `url(${Rose})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh', // Adjust height as needed
                width: '100%',   // Ensure the background covers the full width
            }}
        >
            <h2 style={{
                paddingLeft: 20,
                fontFamily: "Monospace",
                textAlign: "center",
                fontSize: 35,
                paddingTop: 200,
                opacity: isVisible ? 1 : 0, 
                transition: 'opacity 1s ease-in-out'
            }} className='font-semibold mb-8 leading-normal text-rose-950'>
                Welcome to Your Kitchen, Chef {username}
            </h2>
            <p style={{
                textAlign: "center",
                fontSize: 20,
                marginTop: 20,
                fontFamily: "Poppins",
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease-in-out'
            }} className='font-semibold mb-6 leading-normal italic text-rose-950'>
                Start exploring delicious recipes from around the world and unleash your inner chef
            </p>
            <Outlet />
        </div>
    );
}

export default Dashboard;
