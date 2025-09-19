const {
    roomService:{
        createRoom,
        getRoomById,
        getRooms,
        updateRoom,
        deleteRoom,
        isRoomAvailable,
        getRoomsByHotel,
        findRoomByNumber,
        getAvailableRooms,
        getRoomsByType,
        getRoomsByFloor,
        getRoomsWithAmenity,
        countRoomsByHotel,
        countAvailableRooms,
        getRoomAmenities,
        getRoomImages,
        updateRoomAvailability,
        bulkUpdateRooms,
        getRoomPrice,
        getRoomCapacity,
        getRoomTypes,
        getDistinctFloors,
        markRoomAsUnderMaintenance,
        getRoomsUnderMaintenance,
        isRoomUnderMaintenance,
        getRoomReviews,
        getRoomAverageRating,
        getRoomBookingHistory,
        getRoomsSorted,
        getRoomsByPriceRange,
        getRoomsByCapacity,
        bulkDeleteRooms,
        bulkRestoreRooms,
        restoreRoom,
        updateRoomCustomAttributes,
        getRoomOccupancy,
        searchRooms,
        addRoomImage,
        removeRoomImage,
        setRoomDiscount,
        removeRoomDiscount,
        getRoomDiscount,
        setRoomCustomAttributes,
        getRoomCustomAttributes,
        assignRoom,
        unassignRoom,
        lockRoom,
        unlockRoom,
        isRoomLocked,
    }} = require("../service");

const {httpCodes} = require("../config");
const {ApiError, pick, reqQueryFilterOptionsPicker, paramsPicker} = require("../utils");
const {asyncHandler} = require("../middlewares/asyncHandler.middleware")

// CREATE
/**
 * Creates a new room with the provided details
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Room details to create
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Created room data with success status
 */
exports.createRoom = asyncHandler(async (req, res) => {
    const room = await createRoom(req.body);
    res.status(httpCodes.CREATED).json({success: true, data: room});
});

// READ
/**
 * Gets a room by its ID
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.params.id - ID of the room to retrieve
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room data with success status
 */
exports.getRoomById = asyncHandler(async (req, res) => {
    const room = await getRoomById(req.params.id);
    res.status(httpCodes.OK).json({success: true, data: room});
});

/**
 * Gets a list of rooms based on filter criteria and options
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering and options
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms with success status
 */
exports.getRooms = asyncHandler(async (req, res) => {
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRooms(filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

// UPDATE
/**
 * Updates a room with the provided details
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.params.id - ID of the room to update
 * @param {Object} req.body - Updated room details
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated room data with success status
 */
exports.updateRoom = asyncHandler(async (req, res) => {
    const room = await updateRoom(req.params.id, req.body);
    res.status(httpCodes.OK).json({success: true, data: room});
});

// DELETE
/**
 * Deletes a room by its ID
 * @async
 * @param {Object} req - Express request object
 * @param {string} req.params.id - ID of the room to delete
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Deleted room data with success status
 */
exports.deleteRoom = asyncHandler(async (req, res) => {
    const room = await deleteRoom(req.params.id);
    res.status(httpCodes.OK).json({success: true, data: room});
});

// AVAILABILITY
/**
 * Checks if a room is available for a given date range
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room to check
 * @param {string} req.query.checkIn - Check-in date
 * @param {string} req.query.checkOut - Check-out date
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room availability status with success status
 */
exports.isRoomAvailable = asyncHandler(async (req, res) => {
    const {roomId, checkIn, checkOut} = req.query;
    const available = await isRoomAvailable(roomId, new Date(checkIn), new Date(checkOut));
    res.status(httpCodes.OK).json({success: true, data: {available}});
});

/**
 * Gets available rooms in a hotel for a given date range
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {string} req.query.checkIn - Check-in date
 * @param {string} req.query.checkOut - Check-out date
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of available rooms with success status
 */
exports.getAvailableRooms = asyncHandler(async (req, res) => {
    const {hotelId, checkIn, checkOut} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getAvailableRooms(hotelId, new Date(checkIn), new Date(checkOut), filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

// HOTEL/ROOM QUERIES
/**
 * Gets all rooms for a specific hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.hotelId - ID of the hotel
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms with success status
 */
exports.getRoomsByHotel = asyncHandler(async (req, res) => {
    const {hotelId} = req.params;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsByHotel(hotelId, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Finds a room by its room number in a specific hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {string} req.query.roomNumber - Room number to search for
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room data with success status
 */
exports.findRoomByNumber = asyncHandler(async (req, res) => {
    const {hotelId, roomNumber} = req.query;
    const room = await findRoomByNumber(hotelId, roomNumber);
    res.status(httpCodes.OK).json({success: true, data: room});
});

/**
 * Gets rooms of a specific type in a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {string} req.query.type - Room type to filter by
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms with success status
 */
exports.getRoomsByType = asyncHandler(async (req, res) => {
    const {hotelId, type} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsByType(hotelId, type, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Gets rooms on a specific floor in a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {number} req.query.floor - Floor number to filter by
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms with success status
 */
exports.getRoomsByFloor = asyncHandler(async (req, res) => {
    const {hotelId, floor} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsByFloor(hotelId, floor, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Gets rooms with a specific amenity in a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {string} req.query.amenityId - ID of the amenity to filter by
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms with success status
 */
exports.getRoomsWithAmenity = asyncHandler(async (req, res) => {
    const {hotelId, amenityId} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsWithAmenity(hotelId, amenityId, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Counts total number of rooms in a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Count of rooms with success status
 */
exports.countRoomsByHotel = asyncHandler(async (req, res) => {
    const {hotelId} = req.query;
    const count = await countRoomsByHotel(hotelId);
    res.status(httpCodes.OK).json({success: true, data: {count}});
});

/**
 * Counts available rooms in a hotel for a given date range
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {string} req.query.checkIn - Check-in date
 * @param {string} req.query.checkOut - Check-out date
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Count of available rooms with success status
 */
exports.countAvailableRooms = asyncHandler(async (req, res) => {
    const {hotelId, checkIn, checkOut} = req.query;
    const count = await countAvailableRooms(hotelId, new Date(checkIn), new Date(checkOut));
    res.status(httpCodes.OK).json({success: true, data: {count}});
});

/**
 * Gets amenities for a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of amenities with success status
 */
exports.getRoomAmenities = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const amenities = await getRoomAmenities(roomId);
    res.status(httpCodes.OK).json({success: true, data: amenities});
});

/**
 * Gets images for a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of images with success status
 */
exports.getRoomImages = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const images = await getRoomImages(roomId);
    res.status(httpCodes.OK).json({success: true, data: images});
});

/**
 * Updates the availability status of a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.roomId - ID of the room
 * @param {boolean} req.body.isAvailable - New availability status
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated room data with success status
 */
exports.updateRoomAvailability = asyncHandler(async (req, res) => {
    const {roomId, isAvailable} = req.body;
    const room = await updateRoomAvailability(roomId, isAvailable);
    res.status(httpCodes.OK).json({success: true, data: room});
});

/**
 * Bulk updates multiple rooms based on filter criteria
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {Object} req.body.filter - Filter criteria for selecting rooms
 * @param {Object} req.body.update - Update data to apply to matched rooms
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of bulk update operation with success status
 */
exports.bulkUpdateRooms = asyncHandler(async (req, res) => {
    const {filter, update} = req.body;
    const result = await bulkUpdateRooms(filter, update);
    res.status(httpCodes.OK).json({success: true, data: result});
});

/**
 * Gets the price of a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room price with success status
 */
exports.getRoomPrice = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const price = await getRoomPrice(roomId);
    res.status(httpCodes.OK).json({success: true, data: {price}});
});

/**
 * Gets the capacity of a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room capacity with success status
 */
exports.getRoomCapacity = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const capacity = await getRoomCapacity(roomId);
    res.status(httpCodes.OK).json({success: true, data: {capacity}});
});

/**
 * Gets all room types available in a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of room types with success status
 */
exports.getRoomTypes = asyncHandler(async (req, res) => {
    const {hotelId} = req.query;
    const types = await getRoomTypes(hotelId);
    res.status(httpCodes.OK).json({success: true, data: types});
});

/**
 * Gets all distinct floor numbers in a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of distinct floor numbers with success status
 */
exports.getDistinctFloors = asyncHandler(async (req, res) => {
    const {hotelId} = req.query;
    const floors = await getDistinctFloors(hotelId);
    res.status(httpCodes.OK).json({success: true, data: floors});
});

/**
 * Marks a room as under maintenance
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Success status
 */
exports.markRoomAsUnderMaintenance = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    await markRoomAsUnderMaintenance(roomId);
    res.status(httpCodes.NO_CONTENT).json({success: true});
});

/**
 * Gets all rooms under maintenance in a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms under maintenance with success status
 */
exports.getRoomsUnderMaintenance = asyncHandler(async (req, res) => {
    const {hotelId} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsUnderMaintenance(hotelId, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Checks if a specific room is under maintenance
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Maintenance status with success status
 */
exports.isRoomUnderMaintenance = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    const underMaintenance = await isRoomUnderMaintenance(roomId);
    res.status(httpCodes.OK).json({success: true, data: {underMaintenance}});
});

/**
 * Gets all reviews for a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of room reviews with success status
 */
exports.getRoomReviews = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const reviews = await getRoomReviews(roomId);
    res.status(httpCodes.OK).json({success: true, data: reviews});
});

/**
 * Gets the average rating for a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Average rating with success status
 */
exports.getRoomAverageRating = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const averageRating = await getRoomAverageRating(roomId);
    res.status(httpCodes.OK).json({success: true, data: {averageRating}});
});

/**
 * Gets booking history for a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room booking history with success status
 */
exports.getRoomBookingHistory = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const history = await getRoomBookingHistory(roomId);
    res.status(httpCodes.OK).json({success: true, data: history});
});

/**
 * Gets sorted rooms for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {string} req.query.sortBy - Field to sort by
 * @param {string} req.query.order - Sort order (asc/desc)
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Sorted list of rooms with success status
 */
exports.getRoomsSorted = asyncHandler(async (req, res) => {
    const {hotelId, sortBy, order} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsSorted(hotelId, sortBy, order, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Gets rooms within a specified price range
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {number} req.query.minPrice - Minimum price
 * @param {number} req.query.maxPrice - Maximum price
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms within price range with success status
 */
exports.getRoomsByPriceRange = asyncHandler(async (req, res) => {
    const {hotelId, minPrice, maxPrice} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsByPriceRange(hotelId, minPrice, maxPrice, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Gets rooms within a specified capacity range
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.hotelId - ID of the hotel
 * @param {number} req.query.minCapacity - Minimum capacity
 * @param {number} req.query.maxCapacity - Maximum capacity
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} List of rooms within capacity range with success status
 */
exports.getRoomsByCapacity = asyncHandler(async (req, res) => {
    const {hotelId, minCapacity, maxCapacity} = req.query;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await getRoomsByCapacity(hotelId, minCapacity, maxCapacity, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Bulk deletes multiple rooms
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string[]} req.body.roomIds - Array of room IDs to delete
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of bulk delete operation with success status
 */
exports.bulkDeleteRooms = asyncHandler(async (req, res) => {
    const {roomIds} = req.body;
    const result = await bulkDeleteRooms(roomIds);
    res.status(httpCodes.OK).json({success: true, data: result});
});

/**
 * Bulk restores multiple deleted rooms
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string[]} req.body.roomIds - Array of room IDs to restore
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of bulk restore operation with success status
 */
exports.bulkRestoreRooms = asyncHandler(async (req, res) => {
    const {roomIds} = req.body;
    const result = await bulkRestoreRooms(roomIds);
    res.status(httpCodes.OK).json({success: true, data: result});
});

/**
 * Restores a single deleted room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room to restore
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Success status
 */
exports.restoreRoom = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    await restoreRoom(roomId);
    res.status(httpCodes.NO_CONTENT).json({success: true});
});

/**
 * Updates custom attributes for a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.roomId - ID of the room
 * @param {Object} req.body.attributes - Custom attributes to update
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated room data with success status
 */
exports.updateRoomCustomAttributes = asyncHandler(async (req, res) => {
    const {roomId, attributes} = req.body;
    const room = await updateRoomCustomAttributes(roomId, attributes);
    res.status(httpCodes.OK).json({success: true, data: room});
});

/**
 * Gets occupancy information for a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room occupancy data with success status
 */
exports.getRoomOccupancy = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const occupancy = await getRoomOccupancy(roomId);
    res.status(httpCodes.OK).json({success: true, data: {occupancy}});
});

/**
 * Searches for rooms based on query parameters
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Search query parameters
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Search results with success status
 */
exports.searchRooms = asyncHandler(async (req, res) => {
    const {query} = req;
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const rooms = await searchRooms(query, filter, options);
    res.status(httpCodes.OK).json({success: true, data: rooms});
});

/**
 * Adds an image to a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.roomId - ID of the room
 * @param {string} req.body.imageUrl - URL of the image to add
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Added image data with success status
 */
exports.addRoomImage = asyncHandler(async (req, res) => {
    const {roomId, imageUrl} = req.body;
    const image = await addRoomImage(roomId, imageUrl);
    res.status(httpCodes.CREATED).json({success: true, data: image});
});

/**
 * Removes an image from a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {string} req.params.imageId - ID of the image to remove
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Success status
 */
exports.removeRoomImage = asyncHandler(async (req, res) => {
    const {roomId, imageId} = req.params;
    await removeRoomImage(roomId, imageId);
    res.status(httpCodes.NO_CONTENT).json({success: true});
});

/**
 * Sets a discount for a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.roomId - ID of the room
 * @param {number} req.body.discount - Discount value to set
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated room data with success status
 */
exports.setRoomDiscount = asyncHandler(async (req, res) => {
    const {roomId, discount} = req.body;
    const room = await setRoomDiscount(roomId, discount);
    res.status(httpCodes.OK).json({success: true, data: room});
});

/**
 * Removes a discount from a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Success status
 */
exports.removeRoomDiscount = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    await removeRoomDiscount(roomId);
    res.status(httpCodes.NO_CONTENT).json({success: true});
});

/**
 * Gets the current discount for a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room discount data with success status
 */
exports.getRoomDiscount = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const discount = await getRoomDiscount(roomId);
    res.status(httpCodes.OK).json({success: true, data: {discount}});
});

/**
 * Sets custom attributes for a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.roomId - ID of the room
 * @param {Object} req.body.attributes - Custom attributes to set
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated room data with success status
 */
exports.setRoomCustomAttributes = asyncHandler(async (req, res) => {
    const {roomId, attributes} = req.body;
    const room = await setRoomCustomAttributes(roomId, attributes);
    res.status(httpCodes.OK).json({success: true, data: room});
});

/**
 * Gets custom attributes for a room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room custom attributes with success status
 */
exports.getRoomCustomAttributes = asyncHandler(async (req, res) => {
    const {roomId} = req.query;
    const attributes = await getRoomCustomAttributes(roomId);
    res.status(httpCodes.OK).json({success: true, data: attributes});
});

/**
 * Assigns a room to a user
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.roomId - ID of the room
 * @param {string} req.body.userId - ID of the user
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated room data with success status
 */
exports.assignRoom = asyncHandler(async (req, res) => {
    const {roomId, userId} = req.body;
    const room = await assignRoom(roomId, userId);
    res.status(httpCodes.OK).json({success: true, data: room});
});

/**
 * Unassigns a room from its current user
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Success status
 */
exports.unassignRoom = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    await unassignRoom(roomId);
    res.status(httpCodes.NO_CONTENT).json({success: true});
});

/**
 * Locks a room, preventing further bookings
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Success status
 */
exports.lockRoom = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    await lockRoom(roomId);
    res.status(httpCodes.NO_CONTENT).json({success: true});
});

/**
 * Unlocks a previously locked room to allow bookings
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Success status
 */
exports.unlockRoom = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    await unlockRoom(roomId);
    res.status(httpCodes.NO_CONTENT).json({success: true});
});

/**
 * Checks if a room is currently locked
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - Request parameters
 * @param {string} req.params.roomId - ID of the room
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Room locked status with success status
 */
exports.isRoomLocked = asyncHandler(async (req, res) => {
    const {roomId} = req.params;
    const locked = await isRoomLocked(roomId);
    res.status(httpCodes.OK).json({success: true, data: {locked}});
});