const bcrypt = require ('bcrypt');
const jwt  = require('jsonwebtoken');
const UserDetails = require('../Models/UserDetails');

exports.registerUser = (request, response) => {
    console.log("Register User begins");
    const userDetails = new UserDetails(request.body);
    userDetails.role = "Public";
    userDetails.hashPassword = bcrypt.hashSync(request.body.password, 10);

    UserDetails.findOne({
        email: userDetails.email 
    }, function (err, obj) {
        if (err) {
            response.status(500).json({
                status: "failed",
                message: "Failed in Validation",
                statusCode: 500
            });
        }
        else {
            console.log("Existing records : ", obj);
            if (obj != null && (obj.email === userDetails.email)) {
                console.log("User already registered: ");
                response.status(409).json({
                    status: "success",
                    message: "User is already registered",
                    statusCode: 409
                });
            } else {
                userDetails.save(function (err, result) {
                    if (err) {
                        console.log("Error in saving User: ", err);
                        response.status(500).json({
                            status: "failed",
                            message: "User registration failed",
                            statusCode: 500
                        });
                    }
                    else {
                        console.log("User Registered successfully: ", result);
                        response.status(201).json({
                            status: "success",
                            message: "User Registered successfully",
                            statusCode: 201
                        });
                    }
                })
            }
        }
    });
}

exports.loginUser = (request, response) => {
    console.log("Login User begins");

    UserDetails.findOne({
        email: request.body.email
    },(err, user) => {
        if (err){
            response.status(500).json({
                status: "failed",
                message: 'Authentication Failed',
                statusCode: 500
            });
            throw err;
        }
        if(!user){
            response.status(401).json({
                status: "failed",
                message: "User Not Found ",
                statusCode: 401
            })
        }else{
            if (!user.comparePassword(request.body.password, user.hashPassword)){
                response.status(401).json({
                    status: "failed",
                    message: 'Invalid Credentials, Please try again..',                    
                    statusCode: 401
                });
            }else {
                return response.json({token: jwt.sign({
                    email: user.email,
                    name: user.name,
                    _id: user.id
                },
                'SecureAPIs')});
            }
        }
    })
}
