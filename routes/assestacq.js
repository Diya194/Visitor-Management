const assestacqController = require('../controllers/assestacq.controller.js')
const router = require('express').Router()

router.post('/add2', assestacqController.add2)
router.get('/', assestacqController.find2)
router.put('/:id', assestacqController.update2)
router.delete('/:id', assestacqController.destroy2)


module.exports = router