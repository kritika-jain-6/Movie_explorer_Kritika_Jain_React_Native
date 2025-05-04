import axios from "axios";
import React from "react";

const movieURL='https://movie-explorer-ror-aalekh-2ewg.onrender.com';
export const getMovieDetails=async()=>{
    try{
        const response= await axios.get(`${movieURL}/api/v1/movies`);
        console.log('Movie details', response.data);    
        return response.data;
    }catch (error){
        console.log('Error in getting movie details',error.response?.data||error.message);
        throw error;
    }
}

