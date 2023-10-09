import React, { useState, useEffect } from 'react'
import Header from '../Header/Header'
import axios from 'axios';
import config from '../../config/config';
import CheckBoxFilter from '../CheckBoxFilter/CheckBoxFilter';
import SortingFilter from '../SortingFilter/SortingFilter';
import ListingsTableView from '../ListingsTableView/ListingsTableView';

export default function Explrore() {

  const [listingData, setListingData] = useState();
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

  const handleLocationFilterChange = () =>{
    console.log("Vishal")
  }

  const handlePriceRangeFilter =() =>{

  }

  const handleSortByChange=()=>{

  }

  useEffect(() =>{
    fetchListing();
  }, [])


  return (
    <>
        {/* Header */}
        < Header/>

        <div className='property-listing-view'>

        </div>
        {/* checkBoxFilter */}

        <CheckBoxFilter  
          locationFilter = {locationFilter}
          priceRange = {priceRange}
          handleLocationFilterChange={handleLocationFilterChange}
          handlePriceRangeFilter = {handlePriceRangeFilter}
        />

        {/* SortingFilters */}

        <SortingFilter />

        {/* ListingTableView */}

        <ListingsTableView />
    </>
  );
}
