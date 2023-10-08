import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedListing.css';
import config from '../../config/config';

export default function FeaturedListing() {
    const [ listingData, setListiningData ] = useState([]);

    async function fectchListning(){
        try {
            const res = await axios.get(`${config.backendPoint}/real-estate-data`);
            const data = res.data.listings;

            setListiningData(data.slice(0,8));
            console.log(data);
            
        } catch (error) {
            setListiningData([]);
            console.log(error);
        }
    }

    useEffect(() =>{
        fectchListning();
    }, [])

    return (
        <div>FeaturedListing</div>
    )
}
