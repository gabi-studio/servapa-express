const { default: next } = require("next");
const adminModel = require("./model");

// admin dashboard
// if logged in, render the dashboard
// if not logged in, redirect to login page
const getAdmin = async (request, response) => {
    console.log(request.session);   0
    if (request.session.loggedIn) {
        response.render("admin/dashboard");
    } else {
        response.redirect("admin/login");
    }
    
};

// admin login page
const loginForm = async (request, response) => {
    response.render("admin/login");
};


// admin login
// if the username and password are correct, set the session to loggedIn
// and redirect to the admin dashboard
// if the username and password are incorrect, redirect to the login page
const login = async (request, response) => {
    let auth = await adminModel.authenticateAdmin(
        request.body.username,
        request.body.password
    );
    console.log(auth);
    if (auth) {
        request.session.loggedIn = true;
        response.redirect("/admin");
    } else {
        response.redirect("/admin/login", {err: "Invalid username or password"});
    }
}

// admin logout
// destroy the session and redirect to the login page
const logout = async (request, response) => {
    request.session.destroy();
    response.redirect("/");
}

// registration form
const registerForm = async (request, response) => {
    response.render("admin/register");
}

//resgistration page
const register = async (request, response) => {
    let result = await adminModel.addAdmin(
        request.body.username,
        request.body.password
    );
    console.log(result);

    if (result) {
        response.redirect("/admin/login");
    } else {
        response.redirect("/admin/register", {err: "Username already exists"});
    }
}



module.exports = {
    getAdmin,
    loginForm,
    login,
    logout,
    registerForm,
    register
};