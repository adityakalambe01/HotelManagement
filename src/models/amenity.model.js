const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

/**
 * Mongoose schema for hotel amenities
 * @typedef {Object} AmenitySchema
 * @property {string} name - The name of the amenity (required)
 * @property {string} [description] - Optional description of the amenity
 * @property {mongoose.Schema.Types.ObjectId} category - Reference to the amenity category
 * @property {string} [icon] - Optional icon identifier or URL for the amenity
 * @property {Date} createdAt - Timestamp of when the document was created
 * @property {Date} updatedAt - Timestamp of when the document was last updated
 * @property {Date} [deletedAt] - Timestamp of when the document was soft deleted
 */
const amenitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "AmenityCategory" },
    icon: { type: String },
}, { timestamps: true });

/**
 * Adds soft delete functionality to the schema
 * When an amenity is "deleted", it's marked with a deletedAt timestamp instead of being removed
 */
amenitySchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})

/**
 * Adds pagination functionality to the schema
 * Enables finding documents with skip/limit pattern
 */
amenitySchema.plugin(paginatePlugin);

/**
 * Adds private fields functionality to the schema
 * Allows certain fields to be hidden from API responses
 */
amenitySchema.plugin(privateFieldsPlugin);

/**
 * Mongoose model for hotel amenities
 * @typedef {mongoose.Model<AmenitySchema>} AmenityModel
 */
module.exports = mongoose.model('Amenity', amenitySchema, "Hotel Amenities");