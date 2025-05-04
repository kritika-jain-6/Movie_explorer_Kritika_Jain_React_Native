import axios from 'axios';
import React from 'react';

const movieURL = 'https://movie-explorer-ror-aalekh-2ewg.onrender.com';
export const getMovieDetails = async () => {
  try {
    const response = await axios.get(`${movieURL}/api/v1/movies`);
    console.log('Movie details', response.data);
    return response.data;
  } catch (error) {
    console.log(
      'Error in getting movie details',
      error.response?.data || error.message,
    );
    throw error;
  }
};
  
  // Search movies by title and/or genre
  export const searchMovies = async (title = '', genre = '') => {
    try {
      const params: any = {};
      if (title) params.title = title;
      if (genre) params.genre = genre;
  
      const response = await axios.get(`${movieURL}/api/v1/movies`, {params});
      return response.data;
    } catch (error) {
      console.log('Error searching movies:', error.response?.data || error.message);
      return [];
    }
  };
  