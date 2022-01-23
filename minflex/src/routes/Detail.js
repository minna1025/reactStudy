import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const getMovies = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.large_cover_image} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.description_intro}</p>
          <ul>
            <li>{movie.language}</li>
            {movie.genres.length > 1 ? (
              <li>{movie.genres.join(", ")}</li>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
