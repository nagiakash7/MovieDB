import React, { useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

const Header = (props) => {
  const [movieName, setMovieName] = useState('')
  const [searchResult, setSearchResult] = useState('')

  // Use useEffect to log the updated firstname
  useEffect(() => {
    console.log('After dispatch:', props.firstname)
  }, [props.firstname])

  const handleSearch = () => {
    console.log('Searching for movies...')
    // console.log(movieName)

    const apiKey = 'c45a857c193f6302f2b5061c3b85e743'
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=1`
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data)
        setSearchResult(response.data)
        // Dispatch the action to change firstname
        props.changefirstname(response.data)

        // Log the firstname after dispatching the action
        console.log('After dispatch:', props.firstname)
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error)
      })
  }

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#">Movie Db</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">
                <Link to="/home" className="nav-link">
                  Popular
                </Link>
              </Nav.Link>
              <Nav.Link href="#action2">
                <Link to="/top-rated" className="nav-link">
                  Top Rated
                </Link>
              </Nav.Link>
              <Nav.Link href="#action3">
                <Link to="/upcoming" className="nav-link">
                  Upcoming
                </Link>
              </Nav.Link>
            </Nav>

            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Movie Name"
                className="me-2"
                aria-label="Search"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
              />
              <Button variant="secondary" onClick={handleSearch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header)
