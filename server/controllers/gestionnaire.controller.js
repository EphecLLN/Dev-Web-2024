//Variable lié à la table de models des membres
const Membres = require("../models/membres.models");

//Renvoie la liste des membres
const getMembres = async (req, res) => {

    try {
        const membreget = await Membres.find({});
        res.status(200).json(membreget)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const setMembres = async (req, res, next) => {

    try {
        const membrepost = await Membres.create({
            nom: req.body.nom,
            prenom: req.body.prenom,
            naissance: req.body.naissance,
            email: req.body.email,
            telephone: req.body.telephone,
            adresse: req.body.adresse,
            postal: req.body.postal,
            postejeu: req.body.postejeu,
            vma: req.body.vma,
            fitness: req.body.fitness,
            saut: req.body.saut,
            poste: req.body.poste,
            status: req.body.status
        });
        res.status(201).json({
            _nom: membrepost.nom,
            _prenom: membrepost.prenom
        });
    } catch (error) {
        console.log("Une erreur est survenue.");
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getMembres,
    setMembres
};