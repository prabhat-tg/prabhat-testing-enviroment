'use client';

import { useEffect } from 'react';

const LocationHandler = () => {
    useEffect(() => {
        const stateName = getStateNameByCookie('state_name');
        console.log("state_name from cookie:", stateName);

        if (!stateName) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;

                        try {
                            const response = await fetch("https://tractorgyan.com/getlocation", {
                                body: JSON.stringify({ latitude, longitude }),
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                method: "POST"
                            });
                            console.log("location Response:", response);
                            const state_name = await response.text();
                            if (state_name) {
                                setCookie('state_name', state_name);
                            }
                        } catch (error) {
                            console.error('Error fetching location:', error);
                        }
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        }
    }, []);



    const setCookie = (name, value) => {
        document.cookie = `${name}=${value}; path=/`;
    };

    return null;
};

export const getStateNameByCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};
export default LocationHandler;