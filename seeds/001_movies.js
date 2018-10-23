exports.seed = function(knex, Promise) {
  // Inserts seed entries
  return knex('movies').insert([
    {id: 1, Title: 'Schizopolis', Director: 'Steven Soderbergh', Year: 1976, My_Rating: 4, poster_URL: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Schizopolis.jpg'},
    {id: 2, Title: 'Nashville', Director: 'Robert Altman', Year: 1976, My_Rating: 5, poster_URL: 'https://upload.wikimedia.org/wikipedia/en/7/75/Nashville_%28movie_poster%29.jpg'},
    {id: 3, Title: 'Idiocracy', Director: 'Mike Judge', Year: 2006, My_Rating: 5, poster_URL: 'https://en.wikipedia.org/wiki/Idiocracy#/media/File:Idiocracy_movie_poster.jpg'},
    {id: 4, Title: 'Love Actually', Director: 'Richard Curtis', Year: 2003, My_Rating: 1, poster_URL: 'https://en.wikipedia.org/wiki/Love_Actually#/media/File:Love_Actually_movie.jpg'},
    {id: 5, Title: 'Holy Mountain', Director: 'Alejandro Joborowsky', Year: 1973, My_Rating: 4, poster_URL: 'https://en.wikipedia.org/wiki/The_Holy_Mountain_(1973_film)#/media/File:Holy_Mountain.gif'},
  ]).then(() => {
    return knex.raw(
      `SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies));`
    )
  })
}
