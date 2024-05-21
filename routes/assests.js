const assestController = require('../controllers/assest.controller.js')

const router = require('express').Router()

router.post('/add', assestController.add)

router.get("/",assestController.find)

router.put('/:id', assestController.update)

router.delete('/:id', assestController.destroy)

router.get("/:id", assestController.show)

module.exports = router

