const mongoose = require("mongoose");
const { scryptSync } = require("crypto");

const db = require("../../db");

// defining schema and model for Admin
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const Admin = mongoose.model("Admin", AdminSchema);

// functions for Admin 

// admin authentication
async function authenticateAdmin(username, password) {
    await db.connect();
    let key = scryptSync(password, process.env.SALT, 64);
    // check for existing admin with the given username and password
    let result = await Admin.findOne({
        username: username,
        password: key.toString("base64")
    });
    if (result) {
        return true;
    } else {
        return false;
    }   
} 

// check if the username already exists in the database
async function getAdminByUsername(username) {
    await db.connect();
    let result = await Admin.findOne({
        username: username
    });

    return (result) ? result : false;
    
}

// adding a new admin
// if there is no admin with the given username, add a new admin
// otherwise, return false
async function addAdmin(username, password) {
    await db.connect();
    let admin = await getAdminByUsername(username);

    if (!admin) {
        let key = scryptSync(password, process.env.SALT, 64);
        let newAdmin = new Admin({
            username: username,
            password: key.toString("base64")
        });
        let result = await newAdmin.save();
        console.log(result);
        if (result === newAdmin) {
            console.log("Admin added successfully");
            return true;
        } else {
            return false;
        } 
    
    } else {
        console.log("Admin already exists");
        return false;
    }   
}

// deleting an admin
async function deleteAdmin(username) {
    await db.connect();
    let result = await Admin.deleteOne({
        username: username
    });
    console.log(result);
}

module.exports ={
    authenticateAdmin,
    getAdminByUsername,
    addAdmin
}