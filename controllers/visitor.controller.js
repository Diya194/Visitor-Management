const Validator = require('fastest-validator');
const models = require('../models')

//Inserting visitor's data into the db
function save(req, res) {
    const visitor = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        purpose: req.body.purpose
    }

    //For validating data 
    const schema = {
        name: { type: "string", optional: false, max: "100" },
        email: { type: "string", optional: false, max: "100" },
        phone: { type: "string", optional: true, max:"12", min:"10" }
    }
    const v = new Validator();
    const validationResponse = v.validate(visitor, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed!!!",
            errors: validationResponse
        })
    }

    models.Visitor.create(visitor).then(result => {
        res.status(201).json({
            message: "Visitor data saved successfully",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}

//Get all the visitors
function fetchVisitor(req, res) {
    models.Visitor.findAndCountAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!"
        })
    })
}

//Updating a visitor data
function update(req, res) {
    const id = req.params.id;  //Fetching visitor id from the url
    const updatedVisitor = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        purpose: req.body.purpose
    }

    //For validating data 
    const schema = {
        name: { type: "string", optional: false, max: "100" },
        email: { type: "string", optional: false, max: "100" },
        phone: { type: "string", optional: true, max:"12", min:"10" },
        purpose: { type: "string", optional: false, max: "500" },
    }
    const v = new Validator();
    const validationResponse = v.validate(updatedVisitor, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed!!!",
            errors: validationResponse
        })
    }

    models.Visitor.update(updatedVisitor, { where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Visitor data updated successfully",
            visitor: updatedVisitor
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    })
}
//Delete visitor
function destroy(req, res) {
    const id = req.params.id;

    models.Visitor.destroy({ where: { id: id } }).then(result => {
        res.status(200).json({
            message: "Visitor deleted successfully",
            visitor: result
        })
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!!!",
            error: error
        })
    })
}

module.exports = {
    save: save,
    fetchVisitor: fetchVisitor,
    update: update,
    destroy: destroy
}    
