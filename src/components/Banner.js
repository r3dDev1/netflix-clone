import React, {useState, useEffect} from 'react'
import axios from '../axios'
import requests from '../requests'
import '../css/Banner.css'

function Banner() {

    const [movie, setMovie] = useState([])

    // ** load once wehen the banner bomcponets get loaded since ther is nothing in []
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]) 
        }
        fetchData();
    },[]);

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
}

    return (
        <header className='banner'
        style={{
            backgroundSize: 'cover',
            // ? after movie is for if movies is null, handle it elegantly rather than crashing 
            backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
            backgroundPosition: 'center center',
        }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                
                <div className='banner_buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <h1 className='banner__description'>{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className='banner__fadebottom' />
        </header>
    )
}

export default Banner
