import React from 'react'
import Header from '../Header/Header'
import HeroSection from '../HeroSection/HeroSection'
import FeaturedListing from '../FeaturedListing/FeaturedListing'

export default function LandingPage() {
  return (
    <div className='landing-page-container'>
        <Header onPage="home" />

        <HeroSection />

        <FeaturedListing />
    </div>
  )
}
