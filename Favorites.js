function showFavMovieList(){
    let MovieList = JSON.parse(localStorage.getItem("favMovies")||"[]");
    let ulEl = document.getElementById('displaylist');
    if (MovieList.length==0) {
        let noMovies = document.createElement('p');
        noMovies.textContent="No Favorite Movies to Display!";
        
    }
    else{
         MovieList.forEach(element => {
            let divEl = document.createElement('div');
            let liEL = document.createElement('li');
            let nameEl = document.createElement('h3');
            let genreEl = document.createElement('p');
            let langEl = document.createElement('p');
            let imgEl = document.createElement('img');
            let removeBtn = document.createElement('button');
            let detailsBtn = document.createElement('button');
            detailsBtn.textContent="View Details";
            detailsBtn.type="button";
            removeBtn.type="button";
            removeBtn.textContent="Remove";
            nameEl.className="favName";
            genreEl.className="favName";
            langEl.className="favGenre";
            imgEl.className="favimg";
            nameEl.textContent=element.Title;
            genreEl.textContent=`Genre: ${element.Genre}`;
            langEl.textContent=`Language: ${element.Language}`;
            imgEl.src=element.Poster;
            imgEl.alt="image";
            liEL.append(imgEl);
            divEl.append(nameEl);
            divEl.append(genreEl);
            divEl.append(langEl);
            liEL.append(divEl);
            liEL.append(removeBtn);
            liEL.append(detailsBtn);
            ulEl.append(liEL);
            removeBtn.addEventListener('click',()=>{
                for (let i = 0; i < MovieList.length; i++) {
                    if (MovieList[i].Title==element.Title) {
                        MovieList.splice(i,1);
                        localStorage.setItem("favMovies",JSON.stringify(MovieList));
                        window.location.reload();
                    }
                }
            })
            detailsBtn.addEventListener('click',()=>{
                localStorage.setItem('MovieDetails',JSON.stringify(element));
                window.location="./MovieDetails.html";
                window.location.target="_blank";
            })
         });
    }
}
showFavMovieList();