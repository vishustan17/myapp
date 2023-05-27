import { useState , useEffect} from "react";
import { Link, useParams } from "react-router-dom";
// import Movieslist from "./Movieslist";
import Relevant from "./Relevant";
import { useNavigate } from "react-router-dom";
// import Addmovie from "./Addmovie";

const Moviedetails = () => {

    let {id} = useParams();
    let navigate = useNavigate();
    let [movie , setMovie] = useState(null);
    let [error , setError] = useState(null);
    let [pending , setPending] = useState(true);

    let [displayEditbox , setdisplayEditbox] = useState(false);

    
    useEffect(()=>{
            setMovie(null);
            setPending(true);
        setTimeout(()=>{
            fetch("http://localhost:4000/movies/"+ id)
            .then((res)=>{ return res.json() })
            .then((data)=>{ 
                console.log(data);
                setMovie(data);
                setPending(false);
                })
            .catch((err)=>{
                setError("404 Network issue !!! please try again later");
                setPending(false);
            })
        } , 3000)
    } , [id])

    let deleteMovie = ()=>{
        fetch("http://localhost:4000/movies/"+ id , {method : "DELETE"} )
        .then(()=>{ navigate("/") })
    }

    return (<div>
        {pending==true  && <div className="loading"></div> }
        {error && <h1> {error} </h1>}
        {movie &&   <div className="movie-details">
                        <h1>Watch Complete movie</h1>
                        <img src={movie.poster} alt="poster" />
                        <h1>Movie : {movie.moviename}</h1>
                        <h3>Actor : {movie.hero}</h3>
                        <p>Director : {movie.director}</p> 
                        <p>Languages : {movie.languages.join(" , ")}</p>
                        <p>Genre : {movie.genre}</p>
                        <h3>Story Line : </h3>
                        <p>{movie.synopsis}</p>
                        <iframe width="560" height="315" src={movie.trailer} 
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen></iframe>

                        <button onClick={deleteMovie}>delete</button>

                        <Link to={`/edit/${id}`}><button> Update</button></Link>
    
                    </div> }

        {movie && <Relevant genre={movie.genre}/>}

    </div> );
}
 
export default Moviedetails;