import Booking from '../models/Booking.js';
import Show from '../models/Show.js';
// Function to availability of selected seats for movie
const checkSeatAvailability = async (showId, selectedSeats) => {
    try {
        const showData = await Show.findById(showId);
        if (!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;
        const { origin } = req.headers;

        // check seat availability
        const isAvalilable = checkSeatAvailability(showId, selectedSeats);
        if (!isAvalilable) {
            return res.json({ success: false, message: 'Selected seats are already booked. Please choose different seats.' });
        }

        // get show details
        const showData = await Show.findById(showId).popuplate('movie');

        //Create a new booking
        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: showData.showPrice * selectedSeats.length,
            bookedSeats: selectedSeats,
        });

        selectedSeats.map(seat => {
            showData.occupiedSeats[seat] = userId;
        });
        showData.markModified('occupiedSeats');

        await showData.save();

        // Generate payment link 


        res.json({ success: true, message: 'Booking created successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const getOccupiedSeats = async (req, res) => {
    try {
        const { showId } = req.params;
        const showData = await Show.findById(showId);

        const occupiedSeats = Object.keys(showData.occupiedSeats);

        res.json({ success: true, occupiedSeats });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};
