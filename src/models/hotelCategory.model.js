const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

const hotelCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
});

hotelCategorySchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
hotelCategorySchema.plugin(paginatePlugin);
hotelCategorySchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('HotelCategory', hotelCategorySchema, "Hotel Categories");