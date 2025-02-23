const mongoose = require("mongoose");

const db = require("../../db");

// defining schema and model for services
const ServiceSchema = new mongoose.Schema({
  name: String,
  description: String,
  imagePath: String,
});
const Service = mongoose.model("Service", ServiceSchema);

// functions for services

// get all services in the collection
async function getServices() {
    await db.connect();
    return Service.find({});
}


// initialize the database with some services
async function initializeServices() {
    const servicesList = [
        {
            name: "Painting",
            description: "Interior and exterior painting for residential and commercial properties. Professional surface preparation and high-quality finishes",
            imagePath: "/images/painting.jpg",
        },
        {
            name: "Custom Metal Fabrication",
            description: "Custom metal fabrication for residential, commercial, and industrial projects. High quality and precision workmanship and maintenance.",
            imagePath: "/images/metalfabrication.jpg",
        }
    ];
    await Service.insertMany(servicesList);
}

// // show one service by name
// async function showService(serviceName) {
//     await db.connect();
//     return Service.findOne({
//         name: serviceName
//     });
// }


async function addService(serviceName, serviceDescription, serviceImagePath) {
    await db.connect();
    let newService = new Service({ 
        name: serviceName, 
        description: serviceDescription ,
        imagePath: serviceImagePath 
    });

    // save the new service
    let result = await newService.save();
    console.log(result);
}


// deleting a service
async function deleteServiceByName(serviceName) {
    await db.connect();
    let result = await Service.deleteOne(
        { name: serviceName }
    );
    console.log(result.deletedCount);
}

module.exports = {
    getServices,
    initializeServices,
    addService,
    deleteServiceByName
};

