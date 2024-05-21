const models = require('../models');
const Validator = require('fastest-validator');

function add(req, res) {
    const asset = {
        name: req.body.name,
        department: req.body.department,
        status: req.body.status,
        remark: req.body.remark,
        aId: req.body.aId
    };

    // Validation schema
    const schema = {
        name: { type: "string", optional: false },
        department: { type: "string", optional: false },
        status: { type: "string", optional: false },
        remark: { type: "string", optional: true },
    };

    const v = new Validator();
    const validationResponse = v.validate(asset, schema);

    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }
    
    models.Assests.create(asset).then(result => {
        res.status(201).json({
            message: "assest created sucessfully",
            post: result
        });
     }).catch(error => {
        res.status(500).json({
            message: "something went wrong",
            error: error
        });
     });
}

function update(req, res) {
    const id = req.params.id;
    const updateAsset = {
        name: req.body.name,
        department: req.body.department,
        status: req.body.status,
        remark: req.body.remark,
        aId: req.body.aid
    };

    models.Assests.update(updateAsset, { where: { id: id } })
        .then(result => {
            if (result[0] === 1) {
                res.status(200).json({
                    message: "Asset updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Asset not found"
                });
            }
        })
        .catch(error => {
            console.error('Error updating asset:', error);
            res.status(500).json({
                message: "Internal server error"
            });
        });
}

//Getting all assets
function find(req, res){
    models.Assests.findAndCountAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "something went wrong!"
        });
    });
}

//Getting a single asset
function show(req, res) {
    const id = req.params.id;

    models.Assests.findByPk(id).then(result => {
        if (!result) return res.status(404).json({
            message: "Not found"
        });
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong!"
        })
    })
}

function destroy(req, res) {
    const id = req.params.id;
    models.Assests.destroy({ where: { id: id } })
        .then(result => {
            if (result === 1) {
                res.status(200).json({
                    message: "Asset deleted successfully"
                });
            } else {
                res.status(404).json({
                    message: "Asset not found"
                });
            }
        })
        .catch(error => {
            console.error('Error deleting asset:', error);
            res.status(500).json({
                message: "Internal server error"
            });
        });
}

module.exports = {
    add: add,
    update: update,
    find: find,
    destroy: destroy, 
    show: show
};
