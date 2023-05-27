import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    let[searchword , setSearchword] = useState("");
    let[movienames , setMovies] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:4000/movies")
       .then((res)=>{return res.json()})
       .then((data)=>{
        let names = data.map((m)=>{return {moviename : m.moviename , id : m.id} })
        let filterdNames  =  names.filter((movie)=>{return movie.moviename.toLowerCase().includes(searchword.toLowerCase())})
        setMovies(filterdNames);
    }) 
    },[searchword])


    return ( 
        <nav>
            <div id="logo">
                <Link to="/"><h1>Movies 🕷</h1></Link>
            </div>
            <div id="search-bar">
                <input type="search" placeholder="Search for movies" value={searchword}
                onChange={(e)=>{setSearchword( e.target.value ); }}
                />
                <Link to={`/search/${searchword}`}>
                    <button>search</button>
                </Link>
            </div>
            <div id="fav-movie">
                <Link to="/fav">Favorite movies</Link>
            </div>
            <div id="add-movie">
                <Link to="/add">Add movie</Link>
            </div>

            {searchword!="" && <div className="suggestion-box">
                                    <ul>
                                       {movienames.map((m)=>{ 
                                        return( <Link to={`/moviedetails/${m.id}`}>
                                                    <li onClick={()=>{setSearchword("")}}>{m.moviename}</li>
                                                </Link> ) 
                                        })}
                                    </ul>
                                </div>}
        </nav>
     );
}
 
export default Navbar;