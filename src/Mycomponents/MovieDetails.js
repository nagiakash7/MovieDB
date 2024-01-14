import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MovieDetails = ({ match }) => {
  const [movieDetails, setMovieDetails] = useState(null)
  const [castDetails, setCastDetails] = useState(null)

  useEffect(() => {
    const apiKey = 'c45a857c193f6302f2b5061c3b85e743'
    const movieId = match.params.id
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`

    const castapiUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data)
        setMovieDetails(response.data)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error)
      })

    axios
      .get(castapiUrl)
      .then((response) => {
        console.log(response.data.cast)
        setCastDetails(response.data.cast)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error)
      })
  }, [match.params.id])

  if (!movieDetails) {
    return <p>Loading...</p>
  }

  return (
    <div style={{ background: '#282b33', minHeight:"90vh" }}>
      <div
        style={{
          background: '#282b33',
          color: 'white',
          padding: '20px',
          border: '3px solid white',
          borderRadius: '5px',
        }}
      >
        <div
          style={{
            display: 'flex',
            color: 'white',
            padding: '10px',
          }}
        >
          {/* Image on the left */}
          <img
            src={
              movieDetails.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`
                : `https://www.prokerala.com/movies/assets/img/no-poster-available.jpg`
            }
            alt={movieDetails.title}
            style={{
              width: '100%',
              maxWidth: '150px',
              height: '250px',
              marginRight: '10px',
            }}
          />

          {/* Movie details on the right */}
          <div>
            <h3>{movieDetails.title}</h3>
            <h6 style={{ color: '#94c1f1', marginBottom: '10px' }}>
              Rating: {movieDetails.vote_average}
            </h6>
            <p>
              <span style={{ border: '1px solid #324e69', padding: '5px' }}>
                {movieDetails.runtime} mins
              </span>{' '}
              Genres:{' '}
              {movieDetails.genres.map((genre) => genre.name).join(', ')}
            </p>
            <p>Release Date: {movieDetails.release_date}</p>
          </div>

          {/* Overview just below the image */}
        </div>
        <div>
          <h4> Overview: </h4>
          <p>{movieDetails.overview}</p>
        </div>
      </div>

      {/* Cast details */}
      <div style={{ color: 'white' }}>
        Cast:
        <div style={{ display: 'flex', marginTop: '10px', overflowX: 'auto' }}>
          {castDetails && castDetails.length > 0 ? (
            castDetails.map((cast, index) => (
              <div
                key={index}
                style={{ marginRight: '10px', textAlign: 'center' }}
              >
                {cast.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    alt={cast.name}
                    style={{
                      width: '100px',
                      height: '150px',
                    }}
                  />
                ) : (
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAMFBMVEXk5ueutLff4uOnrrHn6eqrsbTZ3N25vsHHy82zuLvr7e7c3+DV2NnQ09W8wcPMz9FRQ01gAAADeUlEQVR4nO2b23LjIAxAuYibMfj//3ZxkqZJmtggWyKzw3no9PGMEAJLRIjBYDAYDAaDwWAwGAwGg4EQACBUjFFd/vsGANScXbiS/Sy6awFYH7SRd4zWLqmuXmCdfDC6eRmZ+2kVJf1q9BOvTlog/N8o/WrJ1MEKbPistKIzv1PaNLoGKzI7LR+y6RnLuYTgt5fuHixGK0hVcbrEis1prlUqseJyEnVrd5Xi2oOuQUoaz5FWsLQ4lXrFUturk/yGo1eqrQa/mEQuZRuVVqjXrz1Qa6iorVozaoU4q1q33i1UxCezQzhR16qIcSpMlFIJs3qlgFKuH2SclFkI12/COZVjmVAKMAVhhbIoWGSkZFBkTi23uxfoMh1XOlcIyyfm4LtJ0d3V/zep+RulCCP1lYmOPPokZUkQ8xcWT9y9c4XymJmwUpQH8hRwTqRXT+z2I6wIAn1N0LTfWLgPh0x6RwePChTdIXORipj9F0idcPuPvkWFKOqaWEkgUp2hlwe2NatIz70bU1PLsywe5YfoHdWU6yaQ1qgfGlr7K0wDmqmho6BntkFItRVPF/3GzqzvHidOJ6GqtiBrnFYqVpDdaf8bsMsUGebNxDIu9pi3b43bjVw6GF2YbNbvtIz0PR9xgPLhOVzGyLD0fu8Cwi7ZaK2NWf+GvNjveBlULOycUppjcfwKo6I0PdI3TtenXDYtPjt3uc6E4HL2yxzV+ryrg9Gk5iJTsnzlMc9Lahnpsk8RJkYxEDF5qZ9k/paF4paXqFgiBlP0Tm76PBaskBO1VomRN2/r5YaYzpawlAKkN6/dKrRM8ESVAkqQ0C3PEi6Ce/H2Y7caLZlPfrdUjrjGTHqHdmdqQaq8k+9QonVWboEN2P7rXy1zToXA9ck+a7nj9QHiOSv3YHX4lQmkY3vuvZY/5uRPy6YnK3ekO4R8hrBvJfGJ1diJagJbss5O8ScM7rOQMk4riFgBtZM0zdmOHxfX09rzx0+LGzCuaQFx0452q7ZeEXLY2GzVkOwTQ0JdCfVSzUMFNPULCJnLqVBZF2BmC1T90BQ7UkdaVYUK0M80cFJ1WUV1X/lA1eRNsSqVD6+a2zH+5Q8St5/qE+rlwREqUh24naTc7zJgfi5wjP39x3JneZHa/b0Px+Xulf2iwHnu/bAnpYLmZ3f2rTqw5zQYDAaDwaAD/wANKir9WY4qAQAAAABJRU5ErkJggg=="
                    alt={cast.name}
                    style={{
                      width: '120px',
                      height: '150px',
                    }}
                  />
                )}
                <div style={{ marginTop: '5px' }}>{cast.name}</div>
              </div>
            ))
          ) : (
            <p>No cast details available.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetails
