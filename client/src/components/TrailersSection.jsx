import React,{ useState } from 'react'
import { dummyTrailers } from '../assets/assets'
import ReactPlayer from 'react-player'
import BlurCircle from './BlurCircle'
import { PlayCircleIcon } from 'lucide-react'

const TrailersSection = () => {

    const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0])
    console.log(currentTrailer.videoUrl); // check URL in console
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 py-20'>
        <p className='text-gray-300 font-medium text-lg max-w-[960px] mx-auto'>Trailers</p>

        <div className='relative mt-6 flex justify-center'> 
          <BlurCircle top='-100px' right='-100px'/> 
            <iframe src={currentTrailer.videoUrl} title='Trailer' allowFullScreen allow='picture-in-picture' className="mx-auto max-w-full overflow-hidden" width="960px" height="540px" />
        </div>

        <div className='group grid grid-cols-4 gap-4 md:gap-8 mt-8 max-w-3xl mx-auto'>
          {dummyTrailers.map((trailer,idx)=>(
            <div key={idx} onClick={()=>setCurrentTrailer(trailer)} 
            className='relative group-hover:not-hover:opacity-50 hover:translate-y-2 duration-300 transition-all max-md:h-60 md:max-h-60 cursor-pointer'>
              <img src={trailer.image} alt="trailer image" className='rounded-lg w-full h-full object-cover brightness-75' />
              <PlayCircleIcon strokeWidth={1.5} className='absolute top-1/2 left-1/2 w-5 md:w-8 h-5 md:h-12 transform -translate-x-1/2 -translate-y-1/2' />
            </div>
          ))}
        </div>
      
    </div>
  )
}

export default TrailersSection
