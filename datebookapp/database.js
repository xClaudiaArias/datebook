const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/datebook.db')
const md5 = require('md5');

db.serialize(() =>  {
    db.run(
    `CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        email TEXT UNIQUE,
        username TEXT UNIQUE,
        password TEXT,
        location NULL,
        CONSTRAINT email_unique UNIQUE (email)
        )`,
    (err) => {
    if (err) {
        console.log("Table already created", err)
    } else {
      // insert sample values
        let insert = 'INSERT INTO user (firstName, lastName, email, username, password, location) VALUES (?,?,?,?,?,?)'
        db.run(insert, ["claudia", "arias", "admin@example.com", "admin", md5("admin12345"), "new york"])
        db.run(insert, ["iselsa", "rodriguez", "iselsa@example.com", "user1", md5("iselsa12345"), "los angeles"])
        }
    })
    db.run(
    `CREATE TABLE post (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        post TEXT,
        date_created TEXT,
        date_updated TEXT
        )`,
        (err) => {
            if (err) {
                console.log("Table already created", err)
            } else {
            // insert sample values
                let insert = 'INSERT INTO post (title, post, date_created, date_updated) VALUES (?,?,?,?)'
                db.run(insert, ["My first post", "I thought today we would make a happy little stream that's just running through the woods here. Let's put a touch more of the magic here. Didn't you know you had that much power? You can move mountains. You can do anything. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. You can create the world you want to see and be a part of. You have that power", "08/08/2023", "08/10/2023"])
                db.run(insert, ["My second post", "If there's two big trees invariably sooner or later there's gonna be a little tree. Let's make a nice big leafy tree. Paint anything you want on the canvas. Create your own world. Tree trunks grow however makes them happy.", "09/04/2023", "09/04/2023"])
            }
    })
})

// db.close()

module.exports = db