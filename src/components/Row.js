import React, {useState, useEffect} from 'react'
import axios from '../axios'
import '../css/Row.css'
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'

const base_url = 'https://image.tmdb.org/t/p/original/';


function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    

    // ** when row renders I want ot make a request to TMDC
    useEffect(() => {
        // ** if [], run once when row loads, and don't run it again
        // ** if [movies], run once when row loads, and then run every time movies changes

        async function fetchData() {
            // ** when request is made wait for the promise(result) to come back
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
        // ** this useEffect is dependent of fetchUrl so include it in the array.
        // ** this way useEffect will get reloaded/executed when fetchUrl changes
        // ** always include outside properties used inside of useEffect in the [] like the fetchUrl
    },[fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || '')
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'))

            }).catch(error => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(movie => {
                    return <img key={movie.id} onClick={() => handleClick(movie)} className={`row__poster ${isLargeRow  && "row__posterLarge"}`}  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />;
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
