import { useEffect, useState } from 'react'
import './App.css'
import Result from './components/Result'
import axios from 'axios'
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
function App() {
  const [movies, setMovies] = useState([1])
  const [search, setSearch] = useState("")

  const changeTheSearch=(event)=>{
    setSearch(event.target.value)
  }

  const getSearchedMovies=()=>{
    axios.get(SEARCHAPI + search)
    .then(
      (response)=>{
        setMovies(response.data.results)
        // console.log(response.data.results)
      }
    )
    .catch(
      (error)=>{
        console.log(error)
      }
    )
  }

  const getAllMovies=()=>{
    axios.get(APIURL)
    .then(
      (response)=>{
        setMovies(response.data.results)
        // console.log(response.data.results)
      }
    )
    .catch(
      (error)=>{
      console.log(error)
    })
  }

  useEffect(
    ()=>{
      setMovies([]);
      if (search === "") {
        getAllMovies();
        
      } else {
        getSearchedMovies();
      }
    },
    [search]
  )

  return (
    <>
     <div className=' max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3'>
     <input
          type="text" 
          value={search}
          onChange={changeTheSearch}
          id="inputField"
          className="w-full px-4 py-2 rounded-lg border-4 focus:outline-none focus:border-blue-500"
          placeholder="Type something amazing..."
        />
        {
          movies.length === 0
          ?
          <div className=' text-3xl text-center mt-3'>Loading...</div>
          :
          <Result movies={movies}/>
        }
     </div>
    </>
  )
}

export default App
