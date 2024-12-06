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
        id: "1a",
        username: "pogo",
        content: "I love cake",
    },
    {
        id: "2b",
        username: "dingo",
        content: "I love ice cream",
    },
    {
        id: "3c",
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

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    if (post) {
        res.render("show.ejs", { post });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});