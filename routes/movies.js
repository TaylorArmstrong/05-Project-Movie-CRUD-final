const express = require(`express`)
const router = express.Router()
const knex = require(`../knex`)
//READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('movies')
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })
})
// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex('movies')
  .where('id', req.params.id)
  .then( (records) => {
    res.send(records)
  })
  .catch((err) => {
    next(err)
  })
})
// CREATE ONE record for this table
router.post(`/`, (req, res, next) => {

  let newRecord =  {
          Title: req.body.Title,
          Director: req.body.Director,
          Year: req.body.Year,
          My_Rating: req.body.My_Rating,
          poster_URL: req.body.poster_URL,
    }

    knex('movies')
      .insert(newRecord)
      .returning('*') // or you can also do .insert(newRecord, '*')
      .then((insertedRecord) => {
        res.send(insertedRecord)
    })
    .catch((error) => {
      next(error) // passes along the error object to the next function (middleware) that can deal with the error object
    })
  })

// UPDATE ONE record for this table
router.put(`/:id`, (req, res, next) => {
  knex('movies')
    .where('id', req.params.id)
    .then((results) => {
      console.log('results>>', results)
      if(results.length>0) {
        // all good, it was found
        let updatedRecord = results[0]

        if(req.body.Title) { updatedRecord.Title = req.body.Title }
        if(req.body.Director) { updatedRecord.Director = req.body.Director }
        if(req.body.Year) { updatedRecord.Year = req.body.Year }
        if(req.body.My_Rating) { updatedRecord.My_Rating = req.body.My_Rating }
        if(req.body.poster_URL) { updatedRecord.poster_URL = req.body.poster_URL }

        // UPDATE the record in the DB
        knex('movies')
          .update(updatedRecord)
          .where('id', req.params.id)
          .returning('*') // or you can also do .insert(newRecord, '*')
          .then((resUpdate) => {

          // Send back the newly updated record object
            res.send(resUpdate)
        })
      } else {
        throw new Error('YA DINGUS. NOT FOUND.')
      }
    })
    .catch((err) => {
      next(err)
    })
})
// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  // verify a record exists for the given id
  knex('movies')
    .where('id', req.params.id)
    .then((theRecord) => {
      console.log('theRecord>>>', theRecord)
      // if record exists - delete it
      if(theRecord.length > 0) {
        // delete it
        knex('movies')
          .del()
          .where('id', req.params.id)
          .returning('*')
          .then((result) => {
            res.send(result[0])
          })

      } else {
        throw new Error(`Can't delete what does not exist`)
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
