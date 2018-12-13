const express = require("express");
const authRoutes = require("../routes/auth-routes");
const path = require("path");

const app = express();

// set view engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "public")));

// set up routes
// app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("index", { title: "this is test", message: "Hello World" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("*", (req, res) => {
  res.render("static" + req.url, function(err, html) {
    if (!err) {
      return res.send(html);
    }
    // Not super elegant the `indexOf` but useful
    if (err.message.indexOf("Failed to lookup view") !== -1) {
      return res.render("root/error");
    }
    throw err;
  });
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
