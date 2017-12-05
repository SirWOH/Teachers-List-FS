const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://Demo:demo@ds129966.mlab.com:29966/attendance-sheet', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))



app.get('/', (req, res) => {
  db.collection('alists').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {alists: result})
  })
})

app.post('/alists', (req, res) => {
  db.collection('alists').save({date: req.body.date, name: req.body.name, late: ""}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.put('/alists', (req, res) => {
  db.collection('alists')
  .findOneAndUpdate({name: req.body.name,}, {
    $set: {
      late: "LATE!"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/alists', (req, res) => {
  db.collection('alists').findOneAndDelete({name: req.body.name,}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
