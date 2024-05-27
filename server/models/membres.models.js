const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membreSchema = new Schema({
        nom: {
            type: String,
            required: true
        },

        prenom: {
            type: String,
            required: true
        },

        naissance: {
            type: Date,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        telephone: {
            type: String,
            required: true,
            unique: true
        },

        adresse: {
            type: String,
            required: true
        },

        postal: {
            type: String,
            required: true
        },

        postejeu: {
            type: String,
            enum: ["Ailier","Attaquant de pointe","Milieu offensif","Milieu défensif","Défenseur centrale","Latérale","Gardien but"],
            default: "None"
        },

        vma: {
            type: String,
            required: true
        },

        fitness: {
            type: String,
            required: true
        },

        saut: {
            type: Number,
            required: true
        },

        poste: {
            type: String,
            enum: ["Staff médical","Entraineurs","Staff administratif","Joueur","Non-attribué"],
            default: "Non-attribué"
        },

        status: {
            type: String,
            enum: ["Disponible","Indisponible","Blessé","Révision","En prêt","En attente"],
            default: "En attente"
        },
    },
    {
        timestamps: true,
    }
);

const Membres = mongoose.model('joueurs', membreSchema);

module.exports = Membres;