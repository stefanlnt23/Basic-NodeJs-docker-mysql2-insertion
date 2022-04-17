if (process.env.NODE_ENV !== 'production') {require('dotenv').config()}
const express = require('express')
const app = express();
app.use("/public", express.static(__dirname + "/public"));
const flash = require('express-flash')
const session = require('express-session')
const  mysql = require('mysql2');
request = require('request');
const con = mysql.createConnection({
host     : 'localhost',
user     : 'root',
password : 'example',
database : 'contact'
});


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.get('/contact', (req, res) => {
    res.render('contact.ejs')}) 

app.post('/contact',async (req, res) => {
  try {
    let store = {
      name: req.body.name,
      email: req.body.email,
      number:req.body.number,
      website:req.body.website,
      subject:req.body.subject,
      description:req.body.description

    };
    try {
      con.connect(function(err) {
        if (err) throw err;
        console.log("Database for contacting is connected!");
        var sql = "INSERT INTO contact_me (name,email,number,website,subject,description) VALUES (?,?,?,?,?,?)";
        var values = [store.name,store.email, store.number,store.website,store.subject,store.description];
        
        con.query(sql, values, function (err, result) {
          if (err) throw err;
        });
        
      });
    }
    catch(err) {
      console.log(err.message);
    }
    res.redirect('/thanks')
  } catch (e) {
    res.redirect('/contact')
  }
})

app.listen(3000, () => { console.log('Server started on port 3000');})



















