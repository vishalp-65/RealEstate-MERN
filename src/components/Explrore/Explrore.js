import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import axios from 'axios';
import config from '../../config/config';
import CheckBoxFilter from '../CheckBoxFilter/CheckBoxFilter';
import SortingFilter from '../SortingFilter/SortingFilter';
import ListingsTableView from '../ListingsTableView/ListingsTableView';

export default function Explrore() {

  const [listingData, setListingData] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [sortBy, setSortBy] = useState("");

  async function fetchListing(){
    try {
      const response = await axios.get(`${config.backendPoint}/real-estate-data`);
      setListingData(response.data.listings);
    } catch (error) {
      console.log(error);
    }
  }

  //Filter Handle

  const handleLocationFilterChange = (event) =>{
    
    const isChecked = event.target.checked;
    if(isChecked){
      // If checked then add to locationFilter
      setLocationFilter((prevState) => [...prevState, event.target.value]);
    }
    else{
      // If not checked then remove
      setLocationFilter((prevState) => 
        prevState.filter((item) => item !== event.target.value)
      );
    };
  }

  const handlePriceRangeFilter =(event) =>{
    const isChecked = event.target.checked;

    if(isChecked){
      setPriceRange((prevState) => [...prevState, event.target.value]);
    }
    else{
      setPriceRange((prevState) => 
        prevState.filter((item) => item !== event.target.value)
      );
    };
  }

  const handleSortByChange=(event)=>{
    // If dropdown is selected, the added to sort by state
    setSortBy(event.target.value)
  }

  useEffect(() =>{
    fetchListing();
  }, [])


  return (
    <>
      < Header/>

      <div className='property-listing-view'>
        <CheckBoxFilter  
          locationFilter = {locationFilter}
          priceRange = {priceRange}
          handleLocationFilterChange={handleLocationFilterChange}
          handlePriceRangeFilter = {handlePriceRangeFilter}
        />
        <SortingFilter 
          sortBy = {sortBy}
          handleSortByChange = {handleSortByChange}
        />
        <ListingsTableView 
          listingData = {listingData}
          priceRange = {priceRange}
          locationFilter = {locationFilter}
          sortBy = {sortBy}
        />
      </div>
    </>
  );
}
