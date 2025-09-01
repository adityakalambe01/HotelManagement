const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomNumber: { type: String, required: true },
    type: { type: String, enum: ["single", "double", "suite", "deluxe"], required: true },
    pricePerNight: { type: Number, required: true },
    capacity: Number,
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
    isAvailable: { type: Boolean, default: true },
    images: [String],
});

roomSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
roomSchema.plugin(paginatePlugin);
roomSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Room', roomSchema, "Hotel Rooms");