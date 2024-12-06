const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Sample posts data
let posts = [
    {
        username: "pogo",
        content: "I love cake",
    },
    {
        username: "dingo",
        content: "I love ice cream",
    },
    {
        username: "micky",
        content: "I love apple",
    },
];

// Default route
app.get("/", (req, res) => {
    res.send("Server is working well!");
});


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    posts.push({ username, content })
    res.redirect("/posts")
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});