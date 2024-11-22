module.exports = mongoose => {
    const Schema = mongoose.Schema;
    
    const AgenceSchema = new Schema({
        nom: 
        { 
            type: String,
            required: true 
        },
        adresse: 
        {
            type: String,
            required: true
        },
        telephone: 
        {
            type: String,
            required: true 
        },

        sejours:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"Sejour"
            }
        ]
    }, {
        timestamps: true
    });

    AgenceSchema.method('toJSON', function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Agence = mongoose.model('Agence', AgenceSchema);
    return Agence;
};
