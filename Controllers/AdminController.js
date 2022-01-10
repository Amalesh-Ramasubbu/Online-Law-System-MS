const IPCSectionDetails = require('../Models/IPCSectionDetails');

exports.updateIPCSection = (request, response) => {
    console.log("Update IPC Section begins");
    const ipcSectionDetails = new IPCSectionDetails(request.body);

    IPCSectionDetails.findOne({
        section_no: ipcSectionDetails.section_no
    }, function (err, obj) {
        console.log("Existing obj ", obj);
        if (err) {
            response.status(500).json({
                status: "failed",
                message: "Failed in Validation",
                statusCode: 500
            });
        }else {
            if (obj != null && (obj.section_no == ipcSectionDetails.section_no)) {
                console.log("Section no. matches");
                if(obj.description == ipcSectionDetails.description){
                    console.log("IPC Section already persisted");
                    response.status(200).json({
                        status: "success",
                        message: "IPC Section already persisted",
                        statusCode: 200
                    });
                    return;
                }
                console.log("Updating IPC section starts");
                IPCSectionDetails.updateOne({"_id": obj.id}, {description: ipcSectionDetails.description}, function (err, result) {
                    if (err) {
                        console.log("Error in updating IPC Section ", err);
                        response.status(500).json({
                            status: "failed",
                            message: "Failed to updating IPC Section",
                            statusCode: 500
                        });
                    }
                    else {
                        console.log("IPC Section updated successfully", result);
                        if(result.modifiedCount <= 0){
                            response.status(500).json({
                                status: "failed",
                                message: "Failed to updating IPC Section",
                                statusCode: 500
                            });
                        }else{
                            response.status(201).json({
                                status: "success",
                                message: "IPC Section updated successfully",
                                statusCode: 201
                            });
                        }                        
                    }
                });
            }else{
                ipcSectionDetails.save(function (err, result) {
                    if (err) {
                        console.log("Error in persisting IPC Section ", err);
                        response.status(500).json({
                            status: "failed",
                            message: "Failed to persist IPC Section",
                            statusCode: 500
                        });
                    }
                    else {
                        console.log("IPC Section persisted successfully", result);
                        response.status(201).json({
                            status: "success",
                            message: "IPC Section persisted successfully",
                            statusCode: 201
                        });
                    }
                });
            }            
        }
        console.log("Update IPC Section completed");
    });
}

exports.getIPCSections = (request, response) => {
    console.log("Fetch IPC Section begins");
    
}