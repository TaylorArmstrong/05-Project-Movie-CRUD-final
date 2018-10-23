document.addEventListener('DOMContentLoaded', () => {

formSubmit()
getMovies()

})

let url = '.'

function getMovies() {
  axios.get(`${url}/movies`)
  .then((movies) => {
    let moviesList = document.querySelector('tbody.movieList')
    while(moviesList.firstChild) {
      moviesList.removeChild(moviesList.firstChild)
    }
    // movieList.innerHTML = ``

    movies.data.forEach((movie) => {
      let listing = document.createElement('tr')
      let title = document.createElement('td')
      let director = document.createElement('td')
      let year = document.createElement('td')
      let myRating = document.createElement('td')
      let edit_button = document.createElement('button')
      let del_button = document.createElement('button')

      title.innerText = movie.Title
      director.innerText = movie.Director
      year.innerText = movie.Year
      myRating.innerText = movie.My_Rating
      edit_button.innerText = 'Update Post'
      edit_button.setAttribute('data-id', movie.id)
      edit_button.addEventListener('click', (ev) => {
        let movieId = ev.target.getAttribute('data-id')
        axios.get(`${url}/movies/${movieId}`)
          .then((movie) => {
            console.log('move.data.poster_URL>>>', movie.data[0].poster_URL)
            let editMovieForm = document.getElementById('viewField')
            editMovieForm.innerHTML = ``
            editMovieForm.innerHTML = `<form class='col s12' id='editForm'>
            <div class='input-field col s6'><input value ='${movie.data[0].Title}' id='Title' type='text' class='validate'>
          </div>
          <div class='input-field col s6'>
            <input value ='${movie.data[0].Director}' id='Director' type='text' class='validate'>
          </div>
        </div>
        <div class='row'>
          <div class='col s8'>
            <div class='row'>
              <div class='input-field col s8'>
                <input value ='${movie.data[0].Year}' id='Year' type='number' class='validate'>
              </div>
            </div>
            <div class='row'>
              <div class='input-field col s8'>
                <input value ='${movie.data[0].My_Rating}' id='My_Rating' type='number' class='validate'>
              </div>
            </div>
            <div class='row'>
              <div class='input-field col s8'>
                <input value ='${movie.data[0].poster_URL}' id='poster_URL' type='url' class='validate'>
              </div>
            </div>
          </div>
          <div class'col s4'>
            <img src=${movie.data[0].poster_URL}>
          </div>
        </div>
        <div class='aside col s4'>
        <button type='submit' class='btn btn-primary'>Edit Movie Info</button>
        </form>`

        let editForm = document.getElementById('editForm')
        editForm.addEventListener('submit', (ev) => {
          ev.preventDefault()

            let movieData = {}
            let formElements = ev.target.elements
            console.log('formElements>>>', formElements)
            for( let i = 0; i < formElements.length; i++) {
              let inputTitle = formElements[i].id
              if( inputTitle ) {
                movieData[inputTitle] = formElements[i].value
              }
            }
            console.log('movieData>', movieData)

            // post data to database
            axios.put(`${url}/movies/${movieId}`, movieData)
              .then((response) => {
                getMovies()
              })
              .catch((err) => {
                console.log(err)
              })
          })

      })
    })
      del_button.innerText = 'X'
      del_button.setAttribute('data-id', movie.id)
      del_button.addEventListener('click', (ev) => {
        let movieId = ev.target.getAttribute('data-id')

        axios.delete(`${url}/movies/${movieId}`)
          .then((result) => {
            ev.target.parentElement.remove()
          })
          .catch((err) => {
            console.log(err)
          })
      })

      listing.appendChild(title)
      listing.appendChild(director)
      listing.appendChild(year)
      listing.appendChild(myRating)
      listing.appendChild(edit_button)
      listing.appendChild(del_button)
      moviesList.appendChild(listing)
    })

  })
}

function formSubmit() {
  let newMovieForm = document.getElementById('myForm')
  newMovieForm.addEventListener('submit', (ev) => {
    ev.preventDefault()

    let movieData = {}
    let formElements = ev.target.elements
    for( let i = 0; i < formElements.length; i++) {
      let inputTitle = formElements[i].id
      if( inputTitle ) {
        movieData[inputTitle] = formElements[i].value
      }
    }
    console.log('movieData>', movieData)

    // post data to database
    axios.post(`${url}/movies`, movieData)
      .then((response) => {
        getMovies()
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
