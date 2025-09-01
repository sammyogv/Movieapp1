
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

//API call to fetch movies based on search query


function Hero() {

    const [searchMovie, setSearchMovie] = useState("");
    const [errors, setErrors] = useState('');
    const [movieslist, setMoviesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE_URL = "https://api.themoviedb.org/3/discover/movie";
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const API_OPTIONS = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`
        }
    };

    const fetchMovies = async (query) => {
        
        setIsLoading(true);
        setErrors('');
        try {
           
            const endpoint= `${API_BASE_URL}?sort_by=popularity.desc`
            const response = await fetch(endpoint, API_OPTIONS);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } 
            const data = await response.json();
           if (data.response === 'false') {
               setErrors(data.Error || 'Movie not found');
               setMoviesList([]);
               return;
           }

           setMoviesList(data.results || []);

        } catch (error) {
            console.error(`Error fetching movies: ${error}`);
            setErrors(`Failed to fetch movies due to ${error.message}. Please try again later.`);
        } finally {
            setIsLoading(false);
        }
    };


 useEffect(() => {
        fetchMovies();
    }, []);

    return(
        <div>
            <header className="flex flex-col max-w-[600px] items-center justify-center gap-4">
                <img className="rounded-2xl border border-none" src="/src/assets/images/heroBg.jpg" alt="Hero Image" />
                <h1 className="text-4xl font-bold text-white">Where <span className="bg-gradient-to-r from-purple-700 to-pink-400 bg-clip-text text-transparent">Movies</span> Come Alive </h1>
                <div className="relative inline-block w-full">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        className="p-2 pr-8 rounded-md w-full text-white"
                        value={searchMovie}
                        onChange={(e) => setSearchMovie(e.target.value)}
                    />
                    <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
            </header>

            <div className="flex flex-col items-center justify-center">
               { isLoading ? (<p className="loader"></p>) : errors ? (<p className="text-red-500">{errors}</p>) 
               : (
                <ul>
                    {movieslist.map((movie) => (
                        <p key={movie.id} className="text-white">{movie.title}</p>
                    ))}
                </ul>
               )}
            </div>
        </div>
    )
}

export default Hero;
