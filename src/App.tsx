import React from 'react'
import { Header, Links, SearchForm, Results, Modal } from './components/index.jsx'
import { read } from "./api/Database"
import { authentificateUser } from './api/Auth'
import './App.css'

const constants = {
  BASE_URL: "http://www.omdbapi.com/?",
  API_KEY: "6de9d48c"
}

function App() {

  const [state, setState] = React.useState({
    isSearching: false,
    active: "search",
    movies: [],
    favorites: [],
    query: "",
    modal: false,
    currentUser: null
  })

  const onTextChange = (input) => {
    setState({ ...state, isSearching: input.length > 0, query: input })
  }

  const handleModal = () => {
    setState({ ...state, modal: !state.modal })
  }

  const handleClick = (link) => {
    setState({ ...state, active: link })

  }

  const toggleFavorite = () => {
    fetchDB()
  }

  async function fetchAPI() {
    if (!state.query) { return }
    const url = `${constants.BASE_URL}s=${state.query}&apikey=${constants.API_KEY}`
    const reponse = await fetch(url);
    const data = await reponse.json();
    console.log(data)
    if (data.Response !== "False") {
      setState({ ...state, movies: create(data.Search) })
    }
  }

  const fetchDB = () => {
    read()
      .then(snapshot => {
        const favorites = snapshot.docs.map(doc => doc.data())
        console.log(favorites)
        const imdbs = state.favorites.map(fav => fav.imdb)
        const updated = state.movies.map(movie => {
          movie.isFavorite === imdbs.includes(movie.imdb)
          return movie
        })
        setState({ ...state, favorites: favorites, movies: updated })
      })
  }

  const create = (data) => {
    const imdbs = state.favorites.map(fav => fav.imdb)
    return data.map(item => {
      return { title: item.Title, imdb: item.imdbID, year: item.Year, poster: item.Poster, isFavorite: imdbs.includes(item.imdbID) }
    })
  }

  React.useEffect(() => {
    fetchAPI()
  }, [state.query])

  React.useEffect(() => {
    fetchDB()
  }, [])
  React.useEffect(() => {
    authentificateUser().then(user => {
      setState({ ...state, currentUser: user})
    }).catch(() => {
      setState({ ...state, currentUser: null })
    })
  }, [state.currentUser])

  return (
    <div >
      <Header {...state} handleModal={handleModal} />
      <Links {...state} handleClick={handleClick} />

      <main>
        <SearchForm onTextChange={onTextChange} />
        <Results {...state} toggleFavorite={toggleFavorite} />
      </main>
      {state.modal && 
      <section className='container'>
        <Modal {...state} handleModal={handleModal} />
      </section>
      }


    </div>
  )
}

export default App
