const inquiriesModel = require('./model');

// get all inquiries
const getAllInquiries = async (request, response) => {
    let inquiriesList = await inquiriesModel.getInquiries();
    if (!inquiriesList.length) {
        await inquiriesModel.initializeInquiries();
        inquiriesList = await inquiriesModel.getInquiries();
    }
    response.render("inquiries", { inquiriesList });
};

// add an inquiry
const addInquiry = async (request, response) => {
    await inquiriesModel.addInquiry(
        request.body.name, 
        request.body.email, 
        request.body.phone,
        request.body.message
       
    );
    response.redirect("/inquiries");
};

// delete an inquiry
const deleteInquiry = async (request, response) => {
    await inquiriesModel.deleteInquiry(request.params.id);
    response.redirect("/inquiries");
};

module.exports = {
    getAllInquiries,
    addInquiry,
    deleteInquiry
};