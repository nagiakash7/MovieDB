import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from 'react-bootstrap/Pagination'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Toprated = (props) => {
  const [movies, setMovies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    if (!props.firstname || Object.keys(props.firstname).length === 0) {
      const apiKey = 'c45a857c193f6302f2b5061c3b85e743'
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated`

      axios
        .get(apiUrl, {
          params: {
            api_key: apiKey,
            language: 'en-US',
            page: currentPage,
          },
        })
        .then((response) => {
          console.log(response.data)
          setMovies(response.data.results)
          setTotalPages(response.data.total_pages)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }
  }, [currentPage, props.firstname])

  useEffect(() => {
    if (props.firstname && Object.keys(props.firstname).length > 0) {
      setMovies(props.firstname.results)
      setTotalPages(props.firstname.total_pages)
    }
  }, [props.firstname])

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const renderPaginationItems = () => {
    const items = []
    const displayPages = 5

    let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2))
    let endPage = startPage + displayPages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - displayPages + 1)
    }

    if (startPage > 1) {
      items.push(
        <Pagination.First key="first" onClick={() => handlePageChange(1)} />,
        <Pagination.Ellipsis key="ellipsis-start" disabled />,
      )
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>,
      )
    }

    if (endPage < totalPages) {
      items.push(
        <Pagination.Ellipsis key="ellipsis-end" disabled />,
        <Pagination.Last
          key="last"
          onClick={() => handlePageChange(totalPages)}
        />,
      )
    }

    return items
  }

  return (
    <div style={{ background: '#282b33', minHeight: '100vh' }}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingLeft: '20px',
          justifyContent: 'center',
        }}
      >
        {movies.length === 0 ? (
          <p style={{ color: 'white' }}>No Results Found</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                width: '50%',
                maxWidth: '300px',
                margin: '10px',
              }}
            >
              <Link
                to={`/movie-detail/${movie.id}`}
                style={{ textDecoration: 'none' }}
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    style={{ width: '100%', height: 'auto' }}
                  />
                ) : (
                  <img
                    src={`https://www.prokerala.com/movies/assets/img/no-poster-available.jpg`}
                    alt={'Placeholder'}
                    style={{ width: '100%', height: 'auto' }}
                  />
                )}
                <p style={{ color: 'white' }}>{movie.title}</p>
                <p style={{ color: 'white' }}>Rating: {movie.vote_average}</p>
              </Link>
            </div>
          ))
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          paddingLeft: '20px',
          justifyContent: 'center',
        }}
      >
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
          {renderPaginationItems()}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        </Pagination>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    firstname: state.firstname,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changefirstname: (fname) => {
      dispatch({ type: 'CHANGE_FIRSTNAME', payload: fname })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toprated)
