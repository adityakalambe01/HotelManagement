const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");


const amenitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "AmenityCategory" },
    icon: String,
});

amenitySchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
amenitySchema.plugin(paginatePlugin);
amenitySchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Amenity', amenitySchema, "Hotel Amenities");