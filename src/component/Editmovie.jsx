import { useEffect, useRef } from "react";
import {useNavigate, useParams} from 'react-router-dom'

const Editmovie = () => {

    let {id} = useParams();

    let navigate = useNavigate()
    let moviename = useRef();
    let hero = useRef();
    let heroine = useRef();
    let director = useRef();
    let genre = useRef();
    let poster = useRef();
    let trailer = useRef();
    let release = useRef();
    let rating = useRef();
    let synopsis = useRef();


    useEffect(()=>{
        fetch("http://localhost:4000/movies/"+id )
        .then((res)=>{return res.json()})
        .then((data)=>{
            moviename.current.value = data.moviename;
            hero.current.value = data.hero;
            heroine.current.value = data.heroine;
            director.current.value = data.director;
            genre.current.value = data.genre;
            poster.current.value = data.poster;
            trailer.current.value = data.trailer;
            rating.current.value = data.rating;
            release.current.value = data.release;
            synopsis.current.value = data.synopsis;            
        })
    },[])

    let handleEditMovie = (e)=>{
        e.preventDefault()
        // create new movie object
        let updatedMovie = {
            moviename : moviename.current.value,
            hero : hero.current.value,
            heroine : heroine.current.value,
            director : director.current.value,
            languages:[],
            genre:  genre.current.value,
            poster: poster.current.value,
            trailer: trailer.current.value,
            release: release.current.value,
            rating: rating.current.value,
            synopsis: synopsis.current.value
        }
        let options = document.getElementsByName("lang");
        for(let i = 0; i < options.length; i++) 
        {
            if(options[i].checked===true)
            {
                updatedMovie.languages.push( options[i].value )
            }  
        }

        // send the movie obj to the database
        fetch("http://localhost:4000/movies/"+id , 
                                                {
                                                    method : "PUT",
                                                    headers : {"Content-Type": "application/json"},
                                                    body : JSON.stringify(updatedMovie)
                                                })
        .then(()=>{
            alert("movie updated in database");
            navigate("/moviedetails/"+id);
        })
    }

    return ( 
        <div className="add-movie">
            <h1>Edit Movie</h1>

            <form onSubmit={ handleEditMovie }>
                <input type="text" ref={moviename} placeholder="Movie name" />
                <input type="text" ref={hero} placeholder="hero"/>
                <input type="text" ref={heroine} placeholder="heroine"/>
                <input type="text" ref={director} placeholder="Director"/>
                <fieldset>
                    <legend>Select languages</legend>
                    <input type="checkbox" name="lang" value="kannada"/><label>Kannada</label>
                    <input type="checkbox" name="lang" value="tamil"/><label>tamil</label>
                    <input type="checkbox" name="lang" value="telugu"/><label>telugu</label>
                    <input type="checkbox" name="lang" value="hindi"/><label>hindi</label>
                    <input type="checkbox" name="lang" value="malayalam"/><label>malayalam</label>
                </fieldset>
                <input type="text" ref={genre} placeholder="Genre" />
                <input type="url" ref={poster} placeholder="Poster"/>
                <input type="url" ref={trailer} placeholder="Trailer link"/>
                <input type="number" min="1950" max="2024" ref={release} placeholder="Realease year"/>
                <input type="number" min="1" max="10" step="0.1" ref={rating} placeholder="Ratings : 1 - 10" />
                <textarea cols="70" rows="6" ref={synopsis}></textarea>

                <input type="submit" value="Edit movie"/>
            </form>
        </div>
     );
}
 
export default Editmovie;