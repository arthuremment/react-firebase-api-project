import cam from "../assets/camera-reverse.svg"
import search from "../assets/search-circle.svg"
import person from "../assets/person.svg"
import fav from "../assets/star.svg"
import notfav from "../assets/star-outline.svg"
import log_in from "../assets/log-in.svg"
import { write, remove } from "../api/Database"
import  Forms from "./auth/index"

export const Header = ({ handleModal, currentUser }) => {
  return (
    <header>
      <div className="logo">
        <span>OMDb Movies Search</span>
        <img src={cam} alt="logo" />
      </div>
      <div className="login">
        <button onClick={() => { handleModal() }}>{!currentUser && "login"}  <img src={currentUser ? person : log_in} alt={currentUser ? "person" : "login"} /></button>
      </div>
    </header>
  )
}

export const Modal = ({ handleModal, modal, currentUser }) => {
  return (
    <section className="wrapper">
      <span className="icon-close" onClick={() => { handleModal() }}>X</span>
      <Forms handleModal={handleModal} currentUser={currentUser}/>
    </section >
  )
}

export const Links = ({ active, handleClick, currentUser }) => {
  return (
    <nav>
      {["search", "favorites"].map(link => {
        const isDisabled = !currentUser && link === "favorites" 
        return <a className={`${isDisabled ? "disabled" : "hover"} ${active === link && "active"}`} onClick={() => !isDisabled && handleClick(link)}>{link.toUpperCase()}</a>
      })}
    </nav>
  )
}

export const SearchForm = ({ onTextChange }) => {
  return (
    <form>
      <div>
        <input
          type="text"
          placeholder="Search movies title..."
          defaultValue=""
          onChange={e => onTextChange(e.target.value)}
        />
        <button type="submit"><img src={search} alt="search" /></button>
      </div>
      <p></p>
    </form>
  )
}

export const FavoriteBtn = ({ toggleFavorite, result }) => {
  //const [isFavorite, setFavorite] = React.useState(false)
  return (
    <button className="favbtn">
      <img
        className="favimg"
        src={result.isFavorite ? fav : notfav}
        alt={result.isFavorite ? "favorite" : "notfavorite"}
        onClick={() => {
          //setFavorite(!isFavorite) ; 
          result.isFavorite ? remove(result) : write(result)
          toggleFavorite();
        }}
      />
    </button>
  )
}

export const Result = ({ toggleFavorite, result }) => {
  return (
    <article>
      <div className="card">
        {result.poster ?
          <div
            className="ImgMovie"
            style={{
              backgroundImage: `url(${result.poster})`,
              backgroundSize: "cover"
            }}
          >
          </div> :
          <div
            className="ImgMovie"
            style={{
              backgroundImage: `url(${search})`,
              backgroundSize: "cover"
            }}
          >
          </div>}
        <div className="InfoMovie">
          <h2>
            <a target="_blank" href="#">{result.title}</a>
            <span>({result.year})</span>
          </h2>
          <p>{result.imdb}</p>
        </div>
      </div>
      <FavoriteBtn toggleFavorite={toggleFavorite} result={result} />
    </article>
  )
}

export const Results = ({ movies, favorites, isSearching, active, toggleFavorite }) => {
  const results = active === "search" ? movies : favorites
  if (active === "favorites" && favorites.length === 0) {
    return <p className="text">No favorites in the list :(</p>;
  }
  if (active === "search" && !isSearching) {
    return <p className="text">No results :(</p>;
  }
  return results.map(result => {
    return <Result toggleFavorite={toggleFavorite} result={result} />
  })
}
