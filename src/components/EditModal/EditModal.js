import React, { useState } from 'react'
import './EditModal.css';

export default function EditModal({item, onSave, onClose}) {

    const [editedItem, setEditedItem] = useState({...item});

    const handleInputChange = (event) =>{
        const {name, value} = event.target;
        setEditedItem((prevItem) => ({...prevItem, [name]:[value]}));
    }

    const handleSaveClick =()=>{
        onSave(editedItem);
        onClose();
    }

  return (
    <div className='modal'>
        <div className='modal-content'>
            <h2>Edit Property</h2>
            <label>Property Name</label>
            <input 
                type='name'
                name='property_name'
                value={editedItem.property_name}
                onChange={handleInputChange}
            />

            <label>Price</label>
            <input 
                type='name'
                name='price'
                value={editedItem.price}
                onChange={handleInputChange}
            />

            <label>Address</label>
            <input 
                type='name'
                name='address'
                value={editedItem.address}
                onChange={handleInputChange}
            />

            <div className='modal-button'>
                <button onClick={handleSaveClick}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    </div>
  )
}
