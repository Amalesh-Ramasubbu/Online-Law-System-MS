const express = require('express');
const UserDetails = require('../Models/UserDetails');

exports.registerUser = (request, response) => {
    console.log("Register User begins");
    const userDetails = new UserDetails({
        name: request.body.name,
        email: request.body.email,
        mobileNo: request.body.mobileNo,
        password: request.body.password
    });
    const userSave = userDetails.save();
    response.json(userSave);
    console.log("Register User completed with response :", userSave);
}

