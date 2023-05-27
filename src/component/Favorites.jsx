import { useEffect, useState } from "react";
import Movieslist from "./Movielist";

const Favorites = () => {

    let[fav , setFav] = useState(null);

    useEffect( ()=>{
     setFav( JSON.parse(localStorage.getItem("fav")) );
    } , [])

    return(
        <div>
            {fav && <Movieslist movies={fav} title="Favorites"/>  }
        </div>
    )
}
 
export default Favorites;