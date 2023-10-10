import React, { useEffect, useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {RiEditBoxLine} from 'react-icons/ri';
import EditModal from '../EditModal/EditModal';
import "./ListingsTableView.css";
import { useNavigate } from "react-router-dom";

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
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  
  // Varriables
  let itemPerPage = 10;
  let displayData = applyFilters(filteredData, locationFilter, priceRange, sortBy);
  const totalPage = Math.ceil(displayData.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const isAllSelected = selectedRows.length === itemPerPage;
  


  // Functions

  // Edit listings

  const handleEdit =(item)=>{
    setEditingItem(item);
    setIsEditModalOpen(true);
  }

  const handleEditSave=(editedItem)=>{
    const updateData = [...filteredData];

    const indexToBeEdited = updateData.findIndex((item) => item.property_id === editedItem.property_id);
    if(indexToBeEdited !== -1){
      updateData[indexToBeEdited] = editedItem;
      setFilterData(updateData);
    }
    setEditingItem(null);
  }

  const handleCloseEdit = ()=>{
    setIsEditModalOpen(false);
    setEditingItem(null);
  }

  // Delete function 

  const handleDelete= (id)=>{
    const updateData = filteredData.filter((ele) => ele.property_id !== id);

    const updatedTotalPage = Math.ceil(updateData.length / itemPerPage);
    if(currentPage > updatedTotalPage){
      setCurrentPage(updatedTotalPage);
    }
    setFilterData(updateData);
    setSelectedRows([]);
  }

  const handleDeletAll= ()=>{
    if(selectedRows.length === 0) return;
    const updateData = filteredData.filter((property) => ! selectedRows.includes(property.property_id));

    const updatedTotalPage = Math.ceil(updateData.length / itemPerPage);
    if(currentPage > updatedTotalPage){
      setCurrentPage(updatedTotalPage);
    }
    setFilterData(updateData);
    setSelectedRows([]);
  }

  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedRows([]);
  }

  const handleLastPage = () => {
    setCurrentPage(totalPage);
    setSelectedRows([]);
  }

  const handleNextPage = () =>{
    setCurrentPage(currentPage + 1);
    setSelectedRows([]);
  }

  const handlePrevPage=()=>{
    setCurrentPage(currentPage - 1);
    setSelectedRows([]);
  }

  const handlePageClick =(page)=> {
    setCurrentPage(page);
    setSelectedRows([]);
  }

  // Checkbox Function 

  const handleRowCheckboxChange = (event, id)=> {
    const isChecked = event.target.checked;
    if(isChecked){
      setSelectedRows([...selectedRows, id]);
    }
    else{
      selectedRows(selectedRows.filter((item) => item !== id));
    }
  }

  const handleSelectAll = (event, displayData) =>{
    const isAllChecked = event.target.checked;
    if(isAllChecked){
      const startIndex = (currentPage - 1) * itemPerPage;
      let rowSelected = [];

      for(let index = startIndex; index < startIndex + itemPerPage; index++){
        if(index < displayData.length){
          rowSelected.push(displayData[index].property_id);
        }
        else{
          rowSelected.push(Math.random());
        }
      }
      setSelectedRows(rowSelected);
    }
    else{
      setSelectedRows([]);
    }
  };


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
  
  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRange]);

  return (
    // Table 
    <div className='listings-tableview-container'>

      <table>
        <thead>
          <tr>
            <th>
              <input 
                type='checkbox' 
                checked = {isAllSelected} 
                onChange={(event) => handleSelectAll(event, displayData)} 
              />
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
                <input 
                  type='checkbox' 
                  checked = {selectedRows.includes(items.property_id)} 
                  onChange={(event) => handleRowCheckboxChange(event, items.property_id)}
                />
              </td>
              <td 
                className='property_name' 
                onClick={() => navigate(`/detail/${items.property_id}`)}
              >
                {items.property_name}
              </td>
              <td>Rs {items.price}</td>
              <td>{items.address}</td>
              <td>{items.listing_date}</td>
              <td className='action-items'>
                <AiOutlineDelete onClick={() => handleDelete(items.property_id)}/>
                <RiEditBoxLine onClick={()=> handleEdit(items)}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table footer */}

      <div className='table-footer'>
        <button onClick={handleDeletAll}>Delete Selected</button>        
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

      {isEditModalOpen && (
        <EditModal item = {editingItem} onSave = {handleEditSave} onClose = {handleCloseEdit} />
      )}

    </div>
  )
}
