import React from 'react'
import { dummyShowsData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import dateFormat from '../../lib/dateFormat'

const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY

  const [shows, setShows] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const getAllShows = async () => {
    try {

      setShows([{
        movie: dummyShowsData[0],
        showsDateTime: "2025-12-25T18:30:00Z",
        showsPrice: 150,
        occupiedSeats: {
          A1: "users_1",
          B1: "users_2",
          C1: "users_3"
        }
      }]) // Replace with actual data fetching logic
      setLoading(false)
    } catch (error) {
      console.error("Error fetching shows:", error)
    }
  }
  React.useEffect(() => {
    getAllShows()
  }, [])


  return !loading ? (
    <>
      <Title text1="List" text2="Shows"/>
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full text-nowrap rounded-md overflow-hidden border-collapse'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium pr-5'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {shows.map((show, index) => (
              <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
                <td className='p-2 min-w-45 pl-5'>{show.movie.title}</td>
                <td className='p-2'>{dateFormat(show.showsDateTime)}</td>
                <td className='p-2'>{Object.keys(show.occupiedSeats).length}</td>
                <td className='p-2'>{currency + (Object.keys(show.occupiedSeats).length * show.showsPrice)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) :  <Loading/>
}

export default ListShows
