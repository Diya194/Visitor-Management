const models = require("../models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Validator = require('fastest-validator');

async function signUp(req, res) {
    // For validating data using fastest-validator npm package
    const schema = {
        name: { type: "string", optional: false, max: "100" },
        email: { type: "string", optional: false },
        password: { type: "string", optional: false }
    }
    const v = new Validator();
    const validationResponse = v.validate({name: req.body.name, email: req.body.email, password: req.body.password}, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed!!!",
            errors: validationResponse
        })
    }

    try {
        const result = await models.Employee.findOne({ where: { email: req.body.email } });
        if (result) {
            return res.status(409).json({
                message: "Email already in use. Try again with a different email",
            }); // Conflict
        } else {
            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                    const employee = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        phone: req.body.phone,
                        designation: req.body.designation,
                    };
                    try {
                        const result = await models.Employee.create(employee);
                        res.status(200).json({
                            message: "User registered successfully",
                            result: result
                        });
                    } catch (error) {
                        res.status(500).json({
                            message: "Something went wrong!",
                            error: error.message
                        });
                    }
                });
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!"
        });
    }
}

async function login(req, res) {
    // For validating data using fastest-validator npm package
    const schema = {
        email: { type: "string", optional: false },
        password: { type: "string", optional: false }
    }
    const v = new Validator();
    const validationResponse = v.validate({email: req.body.email, password: req.body.password}, schema);
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed!!!",
            errors: validationResponse
        })
    }

    try {
        const employee = await models.Employee.findOne({ where: { email: req.body.email } });
        if (!employee) {
            return res.status(401).json({
                message: "No such user exists!"
            });
        }
        
        const passwordMatch = await bcryptjs.compare(req.body.password, employee.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid credentials!"
            });
        }

        const token = jwt.sign({
            email: employee.email,
            employeeId: employee.id
        }, 'secret');

        res.status(200).json({
            message: "Authentication successful!!",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error.message
        });
    }
}

async function fetchEmployee(req, res) {
    try {
        const employees = await models.Employee.findAndCountAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong!!!",
            error: error.message
        });
    }
}

module.exports = {
    signUp: signUp,
    login: login,
    fetchEmployee: fetchEmployee,
};
