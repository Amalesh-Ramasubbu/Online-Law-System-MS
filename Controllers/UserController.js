const express = require('express');
const bcrypt = require ('bcrypt');
const UserDetails = require('../Models/UserDetails');

exports.registerUser = (request, response) => {
    console.log("Register User begins");
    const userDetails = new UserDetails(request.body);
    userDetails.hashPassword = bcrypt.hashSync(request.body.password, 10);

    const existingUser = UserDetails.findOne({ email: userDetails.email }, function (err, obj) {
        if (err) {
            var varResult = {
                message: "Failed in Validation",
                statusCode: 500
            };
            response.json(varResult);
        }
        else {
            console.log("Existing records : ", obj);
            if (obj != null && (obj.email === userDetails.email)) {
                console.log("User already registered: ");
                var varResult = {
                    message: "User is already registered",
                    statusCode: 409
                };
                response.json(varResult);
            } else {
                userDetails.save(function (err, result) {
                    if (err) {
                        console.log("Error in saving User: ", err);
                        var varResult = {
                            message: "User registration failed",
                            statusCode: 500
                        };
                        response.json(varResult);
                    }
                    else {
                        console.log("User Registered successfully: ", result);
                        var varResult = {
                            message: "User Registered successfully: ", varResult,
                            statusCode: 201
                        };
                        response.json(varResult);
                    }
                })
            }
        }
    });
}

