const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

/**
 * Schema definition for Hotel Category
 * @typedef {Object} HotelCategory
 * @property {string} name - The name of the hotel category (required)
 * @property {string} [description] - Optional description of the hotel category
 * @property {string} [icon] - Optional icon reference for the category
 * @property {Date} [deletedAt] - Timestamp for soft deletion (added by safeSoftDeletePlugin)
 */
const hotelCategorySchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    icon: {type: String}
});

/**
 * Add soft delete functionality to the schema
 * Allows for safe deletion of records by marking them as deleted instead of removing them
 */
hotelCategorySchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})

/**
 * Add pagination functionality to the schema
 * Enables querying with page and limit parameters
 */
hotelCategorySchema.plugin(paginatePlugin);

/**
 * Add private fields functionality to the schema
 * Manages the visibility of sensitive fields in the documents
 */
hotelCategorySchema.plugin(privateFieldsPlugin);

/**
 * Hotel Category Model
 * @typedef {import('mongoose').Model<HotelCategory>} HotelCategoryModel
 */
module.exports = mongoose.model('HotelCategory', hotelCategorySchema, "Hotel Categories");