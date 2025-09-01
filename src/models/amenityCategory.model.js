const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");


const amenityCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
});

amenityCategorySchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
amenityCategorySchema.plugin(paginatePlugin);
amenityCategorySchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('AmenityCategory', amenityCategorySchema, "Hotel Amenity Categories");