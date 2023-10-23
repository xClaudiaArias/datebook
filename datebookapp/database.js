const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/datebook.db')
const md5 = require('md5');

db.serialize(() =>  {
    db.get("PRAGMA foreign_keys = ON");
    db.run(
    `CREATE TABLE IF NOT EXISTS user (
        user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
        let insert = 'INSERT or IGNORE INTO user (firstName, lastName, email, username, password, location) VALUES (?,?,?,?,?,?)'
        db.run(insert, ["claudia", "arias", "admin@example.com", "admin", "admin12345", "new york"])
        db.run(insert, ["iselsa", "rodriguez", "iselsa@example.com", "user1", "iselsa12345", "los angeles"])
        }
    })
    db.run(
    `CREATE TABLE IF NOT EXISTS post (
        post_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        post_data TEXT,
        date_created TEXT,
        date_updated TEXT,
        user_id INTEGER NOT NULL, FOREIGN KEY (user_id) REFERENCES user (user_id)
        )`,
        (err) => {
            if (err) {
                console.log("Table already created", err)
            } else {
            // insert sample values
                let insert = 'INSERT INTO post (title, post_data, date_created, date_updated, user_id) VALUES (?,?,?,?, ?)'
                db.run(insert, ["My first post", "I thought today we would make a happy little stream that's just running through the woods here. Let's put a touch more of the magic here. Didn't you know you had that much power? You can move mountains. You can do anything. I was blessed with a very steady hand; and it comes in very handy when you're doing these little delicate things. You can create the world you want to see and be a part of. You have that power", "08/08/2023", "08/10/2023", "1"])
                db.run(insert, ["My second post", "If there's two big trees invariably sooner or later there's gonna be a little tree. Let's make a nice big leafy tree. Paint anything you want on the canvas. Create your own world. Tree trunks grow however makes them happy.", "09/04/2023", "09/04/2023", "2"])
            }
    })


})



module.exports = db