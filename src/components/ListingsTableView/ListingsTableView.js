import React, { useEffect, useState } from 'react'

export default function ListingsTableView({
  listingData,
  priceRange,
  locationFilter,
  sortBy
}) {

  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilterData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Varriables
  let itemPerPage = 10;
  let displayData = applyFilters(filteredData, locationFilter, priceRange, sortBy);
  const totalPage = Math.ceil(displayData.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  


  // Functions

  const handleFirstPage = () => {
    setCurrentPage(1);
  }

  const handleLastPage = () => {
    setCurrentPage(totalPage);
  }

  const handleNextPage = () =>{
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage=()=>{
    setCurrentPage(currentPage - 1);
  }

  const handlePageClick =(page)=> {
    setCurrentPage(page);
  }

  // Checkbox Function 

  const handleRowCheckboxChange = ()=> {

  }

  const handleSelectAll = () =>{

  }


  function applyFilters(filteredData, locationFilter, priceRange, sortBy){
    let updateData = [...filteredData];

    if(locationFilter.length){
      updateData = updateData.filter((listing) => 
        locationFilter.includes(listing.city)
      );
    }

    if(priceRange.length){
      updateData = updateData.filter((listing) => {
        let found = false;
        priceRange.forEach((rangeEntry) => {
          let low = rangeEntry.split("-")[0];
          let high = rangeEntry.split("-")[1];
          if(Number(listing.price) >= Number(low) && Number(listing.price) <= Number(high)){
            found = true;
          }
        });
        return found;
      });
    }

    if(sortBy === "price"){
      updateData.sort((firstListing, secondListing) => firstListing.price - secondListing.price);
    }
    else if(sortBy === "date"){
      updateData.sort((firstListing, secondListing) =>
        new Date(firstListing.listing_Date) - new Date(secondListing.listing_Date)
      )
    }

    return updateData;
  }

  const getPageNumber = (totalPages) => {
    const pageNumber = [];
    for(let currPage = 1; currPage <= totalPages; currPage++){
      pageNumber.push(currPage);
    }
    return pageNumber;
  }

  const pageNumbers = getPageNumber(totalPage);


  // UseEffect
  useEffect(() => {
    setFilterData(listingData)
  }, [listingData]);
  

  return (
    // Table 
    <div className='listings-tableview-container'>

      <table>
        <thead>
          <tr>
            <th>
              <input type='checkbox' checked = {""} onChange={(event) => handleSelectAll(event, displayData)} />
            </th>
            <th>Property Name</th>
            <th>Price</th>
            <th>Address</th>
            <th>Listing Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayData.slice(startIndex, endIndex).map((items, index) => (
            <tr className={`table-row`}>
              <td>
                <input type='checkbox' checked = {selectedRows.includes(items.property_id)} onChange={(event) => handleRowCheckboxChange(event, items.property_id)}/>
              </td>
              <td className='property_name'>{items.property_name}</td>
              <td>Rs {items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className='action-items'>Delete, Edit</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table footer */}

      <div className='table-footer'>
        <button>Delete Selected</button>        
        <div className='pagination-container'>
          <span>Page {totalPage < 1 ? 0 : currentPage} of {totalPage}</span>
          <div className='pagination'>
            <button onClick={handleFirstPage} disabled= {currentPage === 1}>First</button> 
            <button onClick={handlePrevPage} disabled= {currentPage === 1}>Previous</button>
            {pageNumbers.map((page) => (
              <button key = {page} onClick={() => handlePageClick(page)}>{page}</button>
            ))}

            <button onClick={handleNextPage} disabled= {currentPage === totalPage}>Next</button>
            <button onClick={handleLastPage} disabled= {currentPage === totalPage}>Last</button>
          </div>
        </div>
      </div>

    </div>
  )
}
