const express = require("express");

//Variable du router d'expresse
const router = express.Router();

//Controllers
const {getMembres, setMembres} = require('../controllers/gestionnaire.controller');

router.get('/gestionnaire', getMembres);

router.post('/gestionnaire/add', setMembres);

module.exports = router;