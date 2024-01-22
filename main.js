let movieNameSearched = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch data from API
let getMovie = () =>{
    let movieName = movieNameSearched.value;
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieName}`;

    //Check if no movie is typed in
    if(movieName.length <= 0){
        result.innerHTML = "<h3 class='msg'>Please enter a movie name...</h3>"
    } else{
        //Fetch url and use arrow functions to return formatted data
        fetch(url).then((response) => response.json()).then((data) => {
            //Check if movie is in database
            if(data.Response == "True"){
                result.innerHTML = 
                `<div class="info">
                    <img src="${data.Poster}" class="poster" loading="lazy">
                    <div class="additional-info">
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="./star-favicon-32x32.png" loading="lazy">
                            <h4>${data.imdbRating}</h4>
                            <span>(${data.imdbVotes} votes)</span>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genre">
                            <div>
                                ${(data.Genre).split(",").join("</div><div>")}
                            </div>
                        </div>
                    </div>
                </div>  
                <h3>Plot:</h3>
                <p class="plot">${data.Plot}</p>
                <h3>Director:</h3>
                <p class="director">${data.Director}</p>
                <h3>Actors:</h3>
                <p class="actors">${data.Actors}</p>
                `
            } else{ //If not in database
                result.innerHTML = `<h3 class = "msg">${data.Error}</h3>`
            }
        })

        //If error occurs
        .catch(() => {
            result.innerHTML = `<h3 class = "msg">Error Occured</h3>`;
        });
    };
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

