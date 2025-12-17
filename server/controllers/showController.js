import axios from 'axios';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';

export const getNowPlayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing', { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } })

        const movies = data.results;
        res.json({ success: true, movies: movies });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
};

// API to add a new show to the database
export const addShow = async (req, res) => {
    try {
        const { movieId, showsInput, showPrice } = req.body;

        let movie = await Movie.findById(movieId);

        if (!movie) {
            // Fetch movie details from TMDB API
            const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, { headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` } })
            ]);

            const movieDetails = movieDetailsResponse.data;
            const movieCredits = movieCreditsResponse.data;

            const movieDetailsToSave = {
                _id: movieId,
                title: movieDetails.title,
                overview: movieDetails.overview,
                poster_path: movieDetails.poster_path,
                backdrop_path: movieDetails.backdrop_path,
                genres: movieDetails.genres,
                release_date: movieDetails.release_date,
                casts: movieCredits.cast,
                release_date: movieDetails.release_date,
                original_language: movieDetails.original_language,
                tagline: movieDetails.tagline || "",
                vote_average: movieDetails.vote_average,
                runtime: movieDetails.runtime,
            };

            //add movie to database
            movie = await Movie.create(movieDetailsToSave);
        }

        // const showsTocreate = [];
        // showsInput.forEach(show => {
        //     const showDate = show.date;
        //     show.time.forEach(time => {
        //         const dateTImeString = `${showDate}T${time}`;
        //         showsTocreate.push({
        //             movie: movieId,
        //             showDateTime: new Date(dateTImeString),
        //             showPrice,
        //             occupiedSeats: {}
        //         });
        //     });
        // });
        const showsTocreate = showsInput.map(show => ({
            movie: movieId,
            showDateTime: new Date(show.showDateTime),
            showPrice,
            occupiedSeats: {}
        }))

        if (showsTocreate.length > 0) {
            await Show.insertMany(showsTocreate);
        }

        res.json({ success: true, message: 'Shows added successfully' });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

// API tp get shows from the datebase
export const getShows = async (req, res) => {
    try {
        const shows = await Show.find({ showDateTime: { $gte: new Date() } }).populate('movie').sort({ showDateTime: 1 });

        const uniqueShows = new Set(shows.map(show => show.movie));

        res.json({ success: true, shows: Array.from(uniqueShows) });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get single show details
export const getShow = async (req, res) => {
    try {
        const { movieId } = req.params;
        // get all upcoming shows for the movie
        const shows = await Show.find({ movie: movieId, showDateTime: { $gte: new Date() } })

        const movie = await Movie.findById(movieId);
       const dateTime = {};

shows.forEach(show => {
  const dateObj = new Date(show.showDateTime);
  const date = dateObj.toLocaleDateString('en-CA');
  const time = dateObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });

  if (!dateTime[date]) {
    dateTime[date] = [];
  }

  dateTime[date].push({
    time,
    showId: show._id
  });
});

        res.json({ success: true, movie, dateTime });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

};
