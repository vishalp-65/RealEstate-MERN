import React from 'react'
import "./Header.css";

export default function Header({onPage}) {
  return (
    <div className='header'>
      <div className='logo'>
        Real-estate
      </div>

      {
        onPage === "home" ? (
          <div className='nav-link'>
            <span>Explore</span>
          </div>
        ): ("")
      }
    </div>
  )
}
