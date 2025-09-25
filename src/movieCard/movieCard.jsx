



function MovieCard({ movie: { id, title, poster_path } }) {

    const image_base_url = 'https://image.tmdb.org/t/p/w500/';

    return (
        <div className="movie-card m-4 p-4 bg-gray-800 rounded-lg shadow-lg w-60">
            <img src={`${image_base_url}${poster_path}`} alt={title} className="w-full h-auto rounded-lg" />
            <p  className="text-white">{title}</p>
        </div>
    );
}

export default MovieCard; 