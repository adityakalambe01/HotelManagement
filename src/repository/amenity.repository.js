const {amenityModel: Amenity} = require("../models");

/**
 * Creates a new amenity in the database
 * @param {Object} amenity - The amenity object to create
 * @param {string} amenity.name - The name of the amenity
 * @param {string} [amenity.description] - Optional description of the amenity
 * @param {string} amenity.category - The ID of the amenity category
 * @param {string} [amenity.icon] - Optional icon identifier or URL
 * @returns {Promise<Object>} The created amenity document
 */
exports.newAmenity = async (amenity) => await Amenity.create(amenity);

/**
 * Retrieves an amenity by its ID
 * @param {string} id - The ID of the amenity to find
 * @returns {Promise<Object|null>} The found amenity document or null if not found
 */
exports.getAmenityById = async (id) => await Amenity.findById(id);

/**
 * Retrieves amenities with pagination support
 * @param {Object} [filter={}] - MongoDB filter criteria
 * @param {Object} [options={}] - Pagination options (limit, page, etc.)
 * @returns {Promise<{docs: Array, totalDocs: number, limit: number, page: number, totalPages: number}>}
 */
exports.getAmenities = async (filter = {}, options = {}) => await Amenity.paginate(filter, options);

/**
 * Updates an amenity by its ID
 * @param {string} id - The ID of the amenity to update
 * @param {Object} update - The update object containing the fields to modify
 * @returns {Promise<Object|null>} The updated amenity document or null if not found
 */
exports.updateAmenity = async (id, update) => await Amenity.findByIdAndUpdate(id, update, {new: true});

/**
 * Soft deletes an amenity by its ID
 * @param {string} id - The ID of the amenity to delete
 * @param {boolean} [force=false] - If true, performs a permanent deletion
 * @returns {Promise<Object|null>} The deleted amenity document or null if not found
 */
exports.softDeleteAmenity = async (id, force = false) => await Amenity.safeDeleteById(id, {force});

/**
 * Groups amenities by their category
 * @returns {Promise<Array<{category: string, amenities: Array<Object>}>>} Array of category groups
 * Each group contains:
 * - category: The category name
 * - amenities: Array of amenity objects with the following fields:
 *   - _id: Amenity ID
 *   - name: Amenity name
 *   - description: Amenity description
 *   - icon: Amenity icon
 *   - createdAt: Creation timestamp
 *   - updatedAt: Last update timestamp
 *   - deletedAt: Deletion timestamp (if applicable)
 */
exports.getAmenitiesGroupedByCategory = async () => {
    return Amenity.aggregate([
        {
            $group: {
                _id: "$category",
                amenities: {
                    $push: {
                        _id: "$_id",
                        name: "$name",
                        description: "$description",
                        icon: "$icon",
                        createdAt: "$createdAt",
                        updatedAt: "$updatedAt",
                        deletedAt: "$deletedAt"
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                amenities: 1
            }
        }
    ]);
};