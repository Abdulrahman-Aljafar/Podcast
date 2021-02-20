const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PodcastSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://cdn1.vectorstock.com/i/1000x1000/60/10/sound-icon-symbol-premium-quality-isolated-audio-vector-16436010.jpg"
    },
    audio: {
        type: String,
        required: true,
    },
    description: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: {
        type: [String]
    },

    rate: {
        type: [Number],
        default: [5]
    }

},{ timestamps: true });

var Podcast = mongoose.model("Podcast", PodcastSchema);

// export Ticket model
module.exports = Podcast;