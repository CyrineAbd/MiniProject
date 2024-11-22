module.exports = mongoose => {
    const Schema = mongoose.Schema;

    const SejourSchema = new Schema({
        destination: 
        { 
            type: String,
            required: true 
        },
        nbreNuitees:
        { 
            type: Number,
             required: true 
        },
        prix: 
        { 
            type: Number,
            required: true 
        },
        programme: {
            type: String,
            required: true 
        },
        hotel:
         
        { 
            type: String,
            required: true 
        },
        nbreplacesDispo:
        { 
            type: Number,
            required: true 
        },
        agence:
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Agence' ,
            required: true
        }

    }, {
        timestamps: true
    });

    SejourSchema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Sejour = mongoose.model('Sejour', SejourSchema);
    return Sejour;
};
