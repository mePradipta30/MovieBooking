import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [shows, setShows] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const { user } = useUser()
    const { getToken } = useAuth()
    const location = useLocation();
    const navigate = useNavigate();


    const fetchAdmin = async () => {
        try {  
            const { data } = await axios.get('/api/admin/is-admin', { headers: { Authorization: `Bearer ${await getToken()}`, } });
            setIsAdmin(data.isAdmin);
            if (!data.isAdmin && location.pathname.startsWith('/admin')) {
                navigate('/')
                toast.error('Access Denied');
            }
        } catch (error) {
            console.error('Error fetching admin status:', error);
        }
    };

    const fetchShows = async () => {
        try {
            const { data } = await axios.get('/api/show/all');
            if (data.success)
                setShows(data.shows);
            else
                toast.error(data.message)

        } catch (error) {
            console.error('Error fetching shows:', error);
        }
    }
    const fetchFavoriteMovies = async () => {
        try {
            const { data } = await axios.get('/api/user/favorites', { headers: { Authorization: `Bearer ${await getToken()}` }, });

            if (data.success) {
                setFavoriteMovies(data.movies);

            } else {
                toast.error(data.message);

            }
        } catch (error) {
            console.error('Error fetching favorite movies:', error);
        }
    };


    useEffect(() => {
        fetchShows();
    }, []);

    useEffect(() => {
        if (user) {
            fetchAdmin();
            fetchFavoriteMovies();
        }
    }, [user]);

    const value = { axios, fetchAdmin, user, getToken, navigate, isAdmin, shows, favoriteMovies, fetchFavoriteMovies };
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext);