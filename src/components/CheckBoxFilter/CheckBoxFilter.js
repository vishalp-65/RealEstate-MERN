import React from 'react'

const locations = ["Sintra", "Amper", "Świnna", "Hanji"];
const prices = ["0-300000", "300001-600000", "600001-1000000"];

export default function CheckBoxFilter({
    locationFilter,
    priceRange,
    handleLocationFilterChange,
    handlePriceRangeFilter
}) {
    return (
        <div className='checkbox-filter-container'>
            {/* Location Based filter */}

            <div className='filter'>
                <h2>Location</h2>

                {locations.map((location, index) => (
                    <div key={index}>
                        <label>                            
                            <input 
                                type='checkbox' 
                                value={location} 
                                checked = {locationFilter.includes(location)}
                                onChange={handleLocationFilterChange}
                            />
                            {location}
                        </label>
                    </div>
                ))}
            </div>

            {/* Price based filter */}

            <div className='price-range'>
                <h2>Price Range</h2>

                {prices.map((price, index) => (
                    <div key={index}>                        
                        <label>
                            <input 
                                type='checkbox' 
                                value={price} 
                                checked = {priceRange.includes(price)}
                                onChange={handlePriceRangeFilter}
                            />
                            {price}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}
