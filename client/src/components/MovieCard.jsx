import { StarIcon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import timeFormat from '../lib/timeFormat';
import { useAppContext } from '../context/AppContext';

const MovieCard = ({movie}) => {
    const navigate = useNavigate();
    const { image_base_url } = useAppContext();
  return (
    <>
     <div className='flex flex-col justify-between g-2 p-3 bg-gray-800 rounded-2xl hover:-translate-y-1 transition-all duration-300 w-66'>
        <img 
        onClick={()=>{navigate(`/movies/${movie._id}`); scrollTo(0,0)}}
        src={image_base_url + movie.backdrop_path} alt=""
        className='rounded-lg h-52 w-full object-cover object-right-bottom cursor-pointer' />

        <div className='flex items-center justify-between'>
          <p className='font-bold mt-3 truncate'>{movie.title}</p>
           <p className='flex items-center gap-1 text-md text-gray-300 mt-1 pr-1'>
                <StarIcon className='w-4 h-4 text-primary fill-primary' />
                {movie.vote_average.toFixed(1)}
            </p>
        </div>
        <p className='text-md text-gray-400 mt-2'>
            {new Date(movie.release_date).getFullYear()} | {movie.genres.slice(0,2).map(genre=>genre.name).join(" | ")} | {timeFormat(movie.runtime)}
        </p>
        <div className='flex items-center justify-center w-[90%] mt-4 pb-3'>
            <button  onClick={()=>{navigate(`/movies/${movie._id}`); scrollTo(0,0)}}
             className='px-4 py-2 text-md w-[80%] tracking-wider bg-primary hover:bg-primary-dull transition-all rounded-full font-medium text-[1vw] hover:text-[1.05vw] text-gray-300 cursor-pointer duration-200'>Buy Tickets</button>      
        </div>
     </div>
    </>
  )
}

export default MovieCard