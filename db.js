const mongoose = require("mongoose");

//connect to the database
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

// connect to mongodb
async function connect() {
    await mongoose.connect(dbUrl);
    console.log("mongodb connected");
}

// export the connect function:
module.exports = { connect };