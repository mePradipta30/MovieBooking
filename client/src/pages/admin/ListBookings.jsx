import React from 'react'
import { dummyBookingData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import dateFormat from '../../lib/dateFormat'
import { useAppContext } from '../../context/AppContext'

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const { axios, getToken, user } = useAppContext();

  const [bookings, setBookings] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const getAllBookings = async () => {
    try {
      const { data } = await axios.get('/api/admin/all-bookings', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });
      setBookings(data.bookings);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching bookings:", error)
    }
  }

  React.useEffect(() => {
    if(user)
      getAllBookings()
  }, [user])

  return !loading ? (
    <>
      <Title text1="List" text2="Bookings" />
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full text-nowrap rounded-md overflow-hidden border-collapse'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>User Name</th>
              <th className='p-2 font-medium'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium pr-5'>Seats</th>
              <th className='p-2 font-medium'>Amount</th>
            </tr>
          </thead>
          <tbody className='text-sm font-light'>
            {bookings.map((booking, index) => (
              <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
                <td className='p-2 min-w-45 pl-5'>{booking.user.firstName} {booking.user.name}</td>
                <td className='p-2'>{booking.show.movie.title}</td>
                <td className='p-2'>{dateFormat(booking.show.showsDateTime)}</td>
                <td className='p-2'>{Object.keys(booking.bookedSeats).map(seat => booking.bookedSeats[seat]).join(", ")}</td>
                <td className='p-2'>{currency + booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : <Loading />
}

export default ListBookings
