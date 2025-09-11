const {
    amenityService: {
        createAmenity,
        findAmenityById,
        paginatedAmenities,
        updateAmenityById,
        removeAmenityById,
        amenitiesGroupedByCategory
    }
} = require("../service");
const {asyncHandler} = require("../middlewares/asyncHandler.middleware");
const {httpCodes} = require("../config");
const {ApiError} = require("../utils");
const {pick, reqQueryFilterOptionsPicker, paramsPicker} = require("../utils");

/**
 * Creates a new amenity
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Created amenity with success message
 */
exports.createAmenity = asyncHandler(async (req, res) => {
    const body = pick(req.body, ['name', 'description', 'icon', 'category']);
    const amenity = await createAmenity(body);
    return res.created(amenity, "New amenity has been created");
})

/**
 * Retrieves a single amenity by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Found amenity with success message
 */
exports.getAmenityById = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ['id']);
    const amenity = await findAmenityById(id);
    return res.ok(amenity, "Successfully retrieved amenity details");
});

/**
 * Gets paginated list of amenities
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Paginated amenities with success message
 */
exports.getPaginatedAmenities = asyncHandler(async (req, res) => {
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const result = await paginatedAmenities(filter, options);
    return res.ok(result, "Successfully retrieved paginated amenities list")
});

/**
 * Updates an existing amenity by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated amenity with success message
 */
exports.updateAmenityById = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ['id']);
    const body = pick(req.body, ['name', 'description', 'icon', 'category']);
    const amenity = await updateAmenityById(id, body);
    return res.ok(amenity, "Successfully updated amenity details");
});

/**
 * Removes an amenity by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Deletion result with success message
 */
exports.removeAmenityById = asyncHandler(async (req, res) => {
    const {id} = paramsPicker(req, ['id']);
    const result = await removeAmenityById(id);
    return res.ok(result, "Successfully removed amenity");
});

/**
 * Gets amenities grouped by their categories
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Categorized amenities with success message
 */
exports.getAmenitiesGroupedByCategory = asyncHandler(async (req, res) => {
    const result = await amenitiesGroupedByCategory();
    return res.ok(result, "Successfully retrieved categorized amenities list");
});

/**
 * Updates a specific field of an amenity by ID and type
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.id - ID of the amenity to update
 * @param {string} req.params.type - Type of field to update (name, description, icon, category)
 * @returns {Promise<Object>} Updated amenity with success message
 */
exports.updateByType = asyncHandler(async (req, res) => {
    const {id, type} = paramsPicker(req, ['id', 'type']);
    let updatedAmenity;
    let message;
    switch (type) {
        case 'name':
            updatedAmenity = await updateAmenityById(id, pick(req.body, ['name']));
            message = "Successfully updated amenity name";
            break;
        case 'description':
            updatedAmenity = await updateAmenityById(id, pick(req.body, ['description']));
            message = "Successfully updated amenity description";
            break;
        case 'icon':
            updatedAmenity = await updateAmenityById(id, pick(req.body, ['icon']));
            message = "Successfully updated amenity icon";
            break;
        case 'category':
            updatedAmenity = await updateAmenityById(id, pick(req.body, ['category']));
            message = "Successfully updated amenity category";
            break;
        default:
            throw new ApiError(httpCodes.BAD_REQUEST, "Invalid amenity field type");
    }
    return res.ok(updatedAmenity, message);
})