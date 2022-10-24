const express = require('express');
const router = express.Router();

const filmesController = require('../controllers/filmesController')
router.get('/list',filmesController.list);
router.post('/create',filmesController.create);
router.post('/update/:id', filmesController.update);
router.post('/delete', filmesController.delete);
router.get('/p', filmesController.AdicionaGenero);
router.get('/getgen',filmesController.GetGen);

router.get('/save', (req, res) => {
res.json({status: 'filmes Saved'});
});
router.get('/get/:id',filmesController.get);
module.exports = router;
