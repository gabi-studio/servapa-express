const servicesModel = require('./model');

// get all services
const getAllServices = async (request, response) => {
    let servicesList = await servicesModel.getServices();
    if (!servicesList.length) {
        await servicesModel.initializeServices();
        servicesList = await servicesModel.getServices();
    }
    response.render("services", { servicesList });
};


// add a service
const addService = async (request, response) => {
    await servicesModel.addService(
        request.body.name, 
        request.body.description, 
        request.body.imagePath);
    response.redirect("/");
};

// delete a service
const deleteServiceByName = async (request, response) => {
    await servicesModel.deleteServiceByName(request.params.id);
    response.redirect("/services");
};

// export the functions
module.exports = {
    getAllServices,
    addService,
    deleteServiceByName
};