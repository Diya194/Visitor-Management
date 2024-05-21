const express = require('express');
const visitorController = require('../controllers/visitor.controller');

const router = express.Router();

router.post("/", visitorController.save);
router.get("/", visitorController.fetchVisitor);
router.patch("/:id", visitorController.update);
router.delete("/:id", visitorController.destroy);

module.exports = router;