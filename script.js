//home page script
let searchInput = document.getElementById('searchMovie');
let searchBtn = document.getElementById('searchBtn');
let searchDiv = document.getElementsByClassName('search');
let searchResultDiv = document.getElementsByClassName('searchResults');
searchBtn.addEventListener('click',()=>{
    if(searchInput.value==""){
        alert('Please Provide Movie Name to search');
    }
    else{
       
         searchMovies(searchInput.value);
    }
   
})
async function searchMovies(movieName){
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=75dafd91&t=${movieName}&plot=full`);
         referrerPolicy: "unsafe-url" 
        if(!response.ok){
            throw new Error(`Network response was not OK: ${response.status}`);
        }
        const movies = await response.json();
        displaySearchResults(movies);
    } catch (error) {
        console.log("Error fetching movies:", error);
    }
}
//display search results and add to favorites
function displaySearchResults(movie){
      searchBtn.disabled = true;
    searchDiv[0].style.display="none";
    searchResultDiv[0].style.display="block";
    let movieDiv = document.createElement('div');
    let movieDetails = document.createElement('div');
    movieDetails.id="MovieDetails";
    let movieTitle = document.createElement('h1');
    let movieGenre = document.createElement('p');
    let movieLang = document.createElement('p');
    let viewMore = document.createElement('a');
    viewMore.textContent="View Details";
    viewMore.href="./MovieDetails.html";
    viewMore.target="_blank";
    //to create rating display
    let progressDiv = document.createElement('div');
    progressDiv.id ="myProgress";
    let progressBar = document.createElement('div');
    progressBar.id ="myBar";
    let ratings = document.createElement('p');
    ratings.textContent=movie.imdbRating+'/10';
    progressBar.append(ratings);
    progressBar.style.width=(movie.imdbRating*20)/10+"rem";
    progressDiv.append(progressBar);
    //rating end
    movieDiv.className="MovieDiv";
    movieTitle.textContent=movie.Title;
    movieGenre.textContent=`Genre: ${movie.Genre}`;
    movieLang.textContent=`Language: ${movie.Language}`;
    let btnDiv = document.createElement('div');
    btnDiv.className="btnDiv";
    let favBtn = document.createElement('button');
    btnDiv.append(favBtn);
    favBtn.textContent="Add to Favorites";
    movieDetails.append(movieTitle);
    movieDetails.append(movieGenre);
    movieDetails.append(movieLang);
    movieDetails.append(progressDiv);
    movieDetails.append(viewMore);
    movieDiv.append(movieDetails);
    searchResultDiv[0].append(movieDiv);
    searchResultDiv[0].append(btnDiv);
    viewMore.addEventListener('click',()=>{
        localStorage.setItem('MovieDetails',JSON.stringify(movie));
    });
    //Add to Favorites
    favBtn.addEventListener('click',()=>{
       favBtn.disabled=true;
       favBtn.textContent="Added";
       const favMovie = JSON.parse(JSON.stringify(movie));
       var favMovies = JSON.parse(localStorage.getItem("favMovies")||"[]");
       favMovies.push(favMovie);
       localStorage.setItem("favMovies",JSON.stringify(favMovies));
    })
}
