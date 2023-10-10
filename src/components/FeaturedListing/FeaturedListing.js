import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FeaturedListing.css';
import config from '../../config/config';
import Box from '@mui/material/Box';
import { CardActions, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function FeaturedListing() {
    const [ listingData, setListiningData ] = useState([]);
    const navigate = useNavigate();

    async function fetchListing(){
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
        fetchListing();
    }, [])

    return (
        <Box sx ={{width:100% ""}}> 
            <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {listingData.length === 0 ? (
                    <Grid item>
                        <div className='error-message'>
                            <p>No featured Listing found!</p>
                        </div>
                    </Grid>
                ): (
                    listingData.map((element, index) => (
                        <Grid item xs = {12} sm = {6} md = {3}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea onClick={() => navigate(`/detail/${element.property_id}`)}>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`/assets/real-estate-${index}.jpg`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {element.property_name.slice(0,6)}
                                    </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <div className='listing-details'>
                                            <span className='property-price'>Rs {element.price}</span>
                                            <span className='property-city'>{element.city.slice(0,7)}</span>
                                        </div>
                                    </CardActions>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))
                )}
            </Grid>  
        </Box>
    )
}
