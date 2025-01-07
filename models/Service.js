import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    photos: {
        type: [String]
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    tripNumbers: [
            {
            type: String
        }
    ],
    unavailableDates: [
        {
            type: Date
        }
    ]
});

export default mongoose.model('service', ServiceSchema);