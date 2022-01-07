const express = require('express')
const app = express()
const mongoose = require('mongoose')
const fetchRouter = require('./fetch-Route')
require('dotenv').config()
const booksRoute = require('./routes/booksRoute')
const bcrypt = require('bcrypt');
const Book = require('./modele');

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true});
const conn = mongoose.connection;
conn.on('connected', function() {
    console.log('database is connected successfully');
});
conn.on('disconnected',function(){
    console.log('database is disconnected successfully');
})
conn.on('error', console.error.bind(console, 'connection error:'));

app.use(express.static('./statics'))
app.use(express. urlencoded({extended:true}))
app.use('/', fetchRouter)
app.use(express.json())
app.use('/books', booksRoute)

app.set('view engine', 'ejs');

app.get('/data', (req,res) => {
    mongoose.Collection('books').find({}).toArray((err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.post('/', (req,res)=>{
    res.sendFile(__dirname + '/statics/index.html');
    const hashedmodel = bcrypt.hashSync((req.body.title + req.body.author), 10)
    let book = new Book.bookModel({title: req.body.title, author: req.body.author, hash: hashedmodel})
    book.save().then('Zapisano do bazy danych')
    console.log(book);
})

app.listen(3000, () => console.log('serwer pracuje'))