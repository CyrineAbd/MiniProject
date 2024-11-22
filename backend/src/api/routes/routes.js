const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'C:/Users/Dell/Desktop/MP/frontend/src/uploads'); // Set your destination folder
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); // Keep original filename
    }
});

const upload = multer({ storage: storage });

module.exports = app => {
    const router = require('express').Router();

    const sejourController = require('../controllers/sejour.controller');
    const agenceController = require('../controllers/agence.controller');

    // Route for handling file upload
    router.post('/sejours',  sejourController.create); 
    router.get('/sejours', sejourController.findAll);
    router.get('/sejours/:id', sejourController.findOne);
    router.delete('/sejours/:id', sejourController.delete);
    router.put('/sejours/:id', sejourController.update);

    // Routes for agences
    router.post('/agences', agenceController.create);
    router.get('/agences', agenceController.findAll);
    router.get('/agences/:id', agenceController.findOne);

    app.use('/api/', router);
};
