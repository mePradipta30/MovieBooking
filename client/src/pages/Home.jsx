import React from 'react'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import TrailersSection from '../components/TrailersSection'
import Carousel from '../components/Carousel'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <HeroSection/>
      <FeaturedSection/>
      <TrailersSection/>
    </div>
  )
}

export default Home
