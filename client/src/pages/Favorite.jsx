import React from 'react'
//import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { useAppContext } from '../context/AppContext'

const Favorites = () => {
  const { favoriteMovies } = useAppContext();
  return favoriteMovies.length > 0 ? (
    <div className='relative my-40 mb-50 px-5 md:px-15 lg:px-40 xl:px-44 overflow-hidden min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='70px' right='50px' />
        <h1 className='text-xl font-medium my-4 bg-red-300 bg-clip-text'>Your Favorite Movies</h1>
        <div className='flex flex-wrap max-sm:justify-center gap-8'>
          {favoriteMovies.map((movie,idx)=>(
            <MovieCard movie={movie} key={idx} />
          ))}
        </div>
    </div>
  ) : ( 
  <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold text-center text-primary-dull hover:text-primary'>No movies are available to show :(</h1>
  </div>
  )
}

export default Favorites