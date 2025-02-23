const express = require("express");
const path = require("path");
const sessions = require("express-session");

const dotenv = require("dotenv");

// load env variables from .env file
dotenv.config();

// load db.js
const db = require("./db");

// set up express app
const app = express();
const port = process.env.PORT || 8989;

// set up pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set up static files folder
app.use(express.static(path.join(__dirname, "public")));

// express session
app.use(
    sessions({
        secret: process.env.SESSIONSECRET,
        name: "uniqueSession",
        resave: false,
        saveUninitialized: true,
        cookie: { 
            maxAge: 1000 * 60 * 60 * 24,
         },
    })
);

// admin
const adminRouter = require("./components/Admin/routes");
const { maxHeaderSize } = require("http");
app.use("/admin", adminRouter);


// root redirects to admin login page
app.get("/", (require, response) => {
    response.redirect("/admin/login");
});

  


// //redirect to login page if user tries to access admin page without logging in
// // https://stackoverflow.com/questions/68100217/how-do-allow-only-admins-to-have-access-to-the-admin-page-in-nodejs-adminbro
// app.use((require, response, next) => {
//   if (require.path === "/admin" || require.path === "/services") {
//     return next();
//   }
//   response.redirect("/admin/login");
// });

// app.get("/admin/login", isAdmin, adminRouter);


// set up page routes
// services page is appears as the home page
app.use("/services", require("./components/Services/routes"));
app.use("/admin", require("./components/Admin/routes"));
app.use("/inquiries", require("./components/Inquiries/routes"));

// set up server listening
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


