const mongoose = require('mongoose');
const db = require('../../database/db.config');
const Sejour = db.sejours;
const Agence = db.agences;

exports.create = async (req, res) => {
    const { destination, nbreNuitees, prix, programme, hotel, nbreplacesDispo, agence } = req.body;
    
    if (!destination || !nbreNuitees || !prix || !programme || !hotel || !nbreplacesDispo || !agence) {
        return res.status(400).send({
            message: 'All fields are required.'
        });
    }

    try {
        // Vérifie si l'agence existe
        const existingAgence = await Agence.findById(agence);
        if (!existingAgence) {
            return res.status(404).send({ message: 'Agence not found' });
        }

        const newSejour = new Sejour({
            destination,
            nbreNuitees,
            prix,
            programme,
            hotel,
            nbreplacesDispo,
            agence
        });

        await newSejour.save();
        existingAgence.séjours.push(newSejour._id); // Ajoute le séjour à la liste des séjours de l'agence
        await existingAgence.save();

        res.status(201).send({ message: 'Sejour created successfully' });
    } catch (error) {
        console.error('Error creating sejour', error);
        res.status(500).send({ message: 'An error occurred while creating Sejour' });
    }
};


exports.findAll = (req, res) => {
    Sejour.find({})
        .populate('agence') // Populate the agence field to get agence details along with sejour
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            console.error('Error finding sejours', err);
            res.status(500).send({
                message: 'An error occurred while retrieving sejours'
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: "L'ID est requis." });
    }
    Sejour.findById(id)
        .populate('agence') // Populate the agence field to get agence details for the sejour
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "Séjour non trouvé" });
            } else {
                res.send(data);
            }
        }).catch((err) => {
            console.error('Error finding sejour', err);
            res.status(500).send({
                message: 'An error occurred while retrieving sejour'
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send({ message: "L'ID est requis." });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Format d'ID invalide" });
    }

    Sejour.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: "Séjour non trouvé" });
            }
            res.status(200).send({ message: "Le séjour a été supprimé avec succès" });
        })
        .catch((err) => {
            console.error(`Error occurred while deleting sejour with ID ${id}: `, err);
            res.status(500).send({
                message: 'An error occurred while deleting sejour'
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    const { destination, nbreNuitees, prix, programme, hotel, nbreplacesDispo } = req.body;

    if (!id || !destination || !nbreNuitees || !prix || !programme || !hotel || !nbreplacesDispo)  {
        return res.status(400).send({
            message: "ID, destination, nbreNuitees, prix, programme, hotel, nbreplacesDispo sont requis"
        });
    }

    Sejour.findOneAndUpdate({ _id: id }, {
        destination,
        nbreNuitees,
        prix,
        programme,
        hotel,
        nbreplacesDispo,
    }, { new: true, useFindAndModify: false })
        .then((data) => {
            if (!data) {
                return res.status(404).send({ message: `Cannot update Sejour with id=${id}` });
            }
            res.status(200).send({ message: `Sejour was successfully updated`, updatedSejour: data });
        })
        .catch((err) => {
            console.error('Error updating sejour', err);
            res.status(500).send({ message: "An error occurred while updating Sejour" });
        });
};
