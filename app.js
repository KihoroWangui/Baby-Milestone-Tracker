//module importation
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");

// app initialization
const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// home route
app.get("/", (req, res) => {
  res.redirect("/signup");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  const { username, password, dob, weight, gender, size } = req.body;

  console.log("User signed up:", {
    username,
    password,
    dob,
    weight,
    gender,
    size,
  });

  req.session.baby = {
    dob,
    weight,
    gender,
    size,
  };

  res.redirect("/milestones");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  console.log("User logged in:", { username, password });

  res.redirect("/milestones");
});

app.get("/milestones", (req, res) => {
  const baby = req.session.baby;

  if (!baby) {
    return res.redirect("/signup");
  }

  res.render("milestones", {
    baby,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
