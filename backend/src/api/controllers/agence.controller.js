const db = require('../../database/db.config');
const Agence = db.agences;

exports.create = async (req, res) => {
    const { nom, adresse } = req.body;
    if (!nom || !adresse) {
        return res.status(400).send({
            message: 'Le nom et adresse de l\'agence sont requis!'
        });
    }
    const slug = slugify(nom, '-');
    const newAgence = new Agence({
        nom,
        adresse,
    });

    await newAgence.save()
        .then((data) => {
            res.status(201).send({
                message: 'Successfully created agence',
                agence: data
            });
        })
        .catch(err => {
            console.error('Error creating agence', err);
            res.status(500).send({
                message: 'An error occurred while creating agence'
            });
        });
};

exports.findAll = (req, res) => {
    Agence.find({})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.error('Error finding agences:', err);
            res.status(500).send({
                message: 'Une erreur est survenue lors de la récupération des agences.'
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).send({ message: "L'ID agence est requis." });
    }

    Agence.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Aucune agence trouvée avec cet ID." });
                return;
            }
            res.send(data);
        })
        .catch(err => {
            console.error('Error finding agence', err);
            res.status(500).send({ message: 'Une erreur est survenue lors de la récupération de l\'agence.' });
        });
};
