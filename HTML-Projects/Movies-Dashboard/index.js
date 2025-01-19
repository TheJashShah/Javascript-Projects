const Input = document.getElementById("input")
const main = document.getElementById("mainDiv")
const Enter = document.getElementById("enter")
const Fav = document.getElementById("favourite")

let movieList;
let saveList = [];

function getURL(str){

    let url;

    if (str.includes(" ")){
        wordList = str.split(" ")

        if(wordList.length <= 2){
            url = `https://imdb236.p.rapidapi.com/imdb/search?originalTitle=${wordList[0]}%20${wordList[1]}&type=movie&rows=25&sortField=id&sortOrder=ASC`
        }
        else{
            return null;
        }
    }
    else{
        url = `https://imdb236.p.rapidapi.com/imdb/search?originalTitle=${str}&type=movie&rows=25&sortField=id&sortOrder=ASC`
    }

    return url;
}

async function API(str){
    const URL = getURL(str);

    if(URL){
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '0befa5bc76msh84f8cda54f53525p13c21bjsn79eb673b07bf',
                'x-rapidapi-host': 'imdb236.p.rapidapi.com'
            }
        };
    
        try {
            const respone = await fetch(URL, options)
            const result = await respone.json()
    
            movieList = result.results

            console.log(movieList)
        }
        catch (e) {
            console.log(e)
        }
    }
    else{
        alert("Only Two words allowed.")
        movieList = []
    }   
}

function HandleRendering(){

    main.innerHTML = "";

    if(!movieList || movieList.length === 0){
        main.innerHTML = "<p>No Movies Found.</p>"
        return;
    }

    for(let movie of movieList){
        const title = movie.primaryTitle;
        const img = movie.primaryImage;
        const description = movie.description;
        const genres = movie.genres;
        const year = movie.startYear;
        const languages = movie.spokenLanguages;
        const rating = movie.averageRating;
        const runtime = movie.runtimeMinutes;

        const MovieDiv = document.createElement("div")
        MovieDiv.id = "movie";

        const Title = document.createElement("h3")
        Title.textContent = title;

        const Img = document.createElement("img")
        Img.src = img;

        const desc = document.createElement("p")
        desc.textContent = description;

        const Genres = document.createElement("p")
        Genres.textContent = `${genres}`;

        const Languages = document.createElement("p")
        Languages.textContent = `In ${languages}`;

        const Rating = document.createElement("h4")
        Rating.textContent = `Rating: ${rating}`
        
        const Minutes = document.createElement("h4")
        Minutes.textContent = `${runtime} minutes`

        const Year = document.createElement("h4")
        Year.textContent = `Released in ${year}`

        const fav_input = document.createElement("input")
        fav_input.type = "checkbox"

        fav_input.addEventListener("change", () => {

            if(fav_input.checked){
                saveList.push(movie)
                SaveFavouriteMovies()
                console.log(saveList)
            }
        })

        MovieDiv.appendChild(Title);
        MovieDiv.appendChild(Img)
        MovieDiv.appendChild(desc)
        MovieDiv.appendChild(Genres)
        MovieDiv.appendChild(Languages)
        MovieDiv.appendChild(Minutes)
        MovieDiv.appendChild(Year)
        MovieDiv.appendChild(Rating)
        MovieDiv.appendChild(fav_input)
        MovieDiv.appendChild(document.createElement("hr"))

        main.appendChild(MovieDiv)
    }
}

Enter.addEventListener("click", async () => {
    await API(Input.value)

    HandleRendering()
})

function SaveFavouriteMovies(){

    const Database = {
        list: saveList
    }

    localStorage.setItem("favouriteMovies", JSON.stringify(Database))
    
}

function getFavouriteList(){

    const data = localStorage.getItem("favouriteMovies");
    
    try{
        movieList = JSON.parse(data).list;
    }
    catch(e){
        movieList = []
    }
}

Fav.addEventListener("click" , () => {
    getFavouriteList()
    HandleRendering()
    console.log(movieList)
})