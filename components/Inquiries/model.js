const mongoose = require("mongoose");
const db = require("../../db");

// defining schema and model for inquiries
const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  
});

const Inquiry = mongoose.model("Inquiry", InquirySchema);

async function getInquiries() {
    await db.connect();
    return Inquiry.find({});
}

async function initializeInquiries() {
    const inquiriesList = [
        {
            name: "Emanuelle Contreras",
            email: "e.contreras@contreras.com",
            phone: "647-456-7890",
            message: "I would like to know how much it would be to get a 1.5m x 2 m metal done. It's not a rush but I would like it done in the next 2 weeks please. The material needs to not easily rust. And does it come painted or is it extra? Thank you, looking forward to hearing back from you.",
            
        },
        {
            name: "Tati",
            email: "tati.f@gmail.com",
            phone: "416-123-4567",
            message: "Hello, we just moved to a new apartment and we would like to get the walls painted. We have a 2 bedroom apartment and we would like to get the living room, kitchen, and hallway painted. We would like to get a quote for the job. Thank you.",
            
        }
    ];
    await Inquiry.insertMany(inquiriesList);
}


async function addInquiry(name, email, phone, message) {
    await db.connect();
    let newInquiry = new Inquiry({
        name: name,
        email: email,
        phone: phone,
        message: message,
    });

    let result = await newInquiry.save();
    console.log(result);
} 

async function deleteInquiry(id) {
    await db.connect();
    let result = await Inquiry.deleteOne({ _id: id });
    console.log(result);
}

module.exports = {
    getInquiries,
    initializeInquiries,
    addInquiry,
    deleteInquiry
}


