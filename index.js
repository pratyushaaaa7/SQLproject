const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set ("view engine", "ejs");
app.set ("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password:'pratyusha'
});

let getRandomUser = () => {
  return [
   faker.datatype.uuid(),
    faker.internet.userName(),
    faker.internet.email(),
     faker.internet.password(),
  ];
}

//home route (home page)
app.get ("/", (req, res) => {
    let q = `SELECT count(*) FROM user`;

    try {
    connection.query(q, (err, result) => {
    if (err) throw err;
    let count = result[0] ["count(*)"];
    res.render("home.ejs", {count});
});
} catch (err) {
    console.log(err);
    res.send("some errpr in DB");
}; 
})

//show route (show users)
app.get("/user", (req, res) => {
    let q = `SELECT * FROM user`;

    try {
        connection.query(q, (err, users) => {
        if (err) throw err;
        // console.log(result);
        res.render("showusers.ejs", {users});
    });
    } catch (err) {
        console.log(err);
        res.send("some errpr in DB");
    }; 
});

//edit route (edit username)
app.get("/user/:id/edit", (req,res) => {
    let {id} = req.params;
    let q = `SELECT * FROM user WHERE id ='${id}'`;

    try {
        connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        res.render("edit.ejs", {user});
        });
    } catch (err) {
        console.log(err);
        res.send("some error in DB");
    }; 
})

//update (DB) route
app.patch("/user/:id", (req, res) => {
    let {id} = req.params;
    let {password: formPass, username: newUsername} = req.body;
    let q = `SELECT * FROM user WHERE id ='${id}'`;

    try {
        connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        if(formPass != user.password) {
            res.send("WRONG password");
        } else{
            let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
            connection.query(q2, (err, result) => {
                if (err) throw err;
                res.redirect("/user");
            })
        }
        });
    } catch (err) {
        console.log(err);
        res.send("some error in DB");
    };
})

app.listen("8080", () => {
    console.log("server is listening to post 8080");
})


//inserting new data
// let q ="INSERT INTO user (id, username, email, password) VALUES ?" ;


// let data = [];
// for (let i= 1; i<=100; i++)  {
//  data.push(getRandomUser());// 100 fake users
// }




