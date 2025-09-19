const {
    roomRepository:{
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
    }} = require("../repository");

const {httpCodes} = require("../config");
const {ApiError} = require("../utils");

// CRUD
/**
 * Creates a new room
 * @param {Object} data - Room data object
 * @param {string} data.hotel - ID of the hotel this room belongs to
 * @param {number} data.roomNumber - Room number
 * @param {number} data.floor - Floor number
 * @param {string} data.type - Room type
 * @param {number} data.pricePerNight - Price per night
 * @param {number} data.capacity - Room capacity
 * @param {string[]} [data.amenities] - Array of amenity IDs
 * @param {boolean} [data.isAvailable] - Availability status
 * @param {string[]} [data.images] - Array of image URLs
 * @throws {ApiError} When room creation fails
 * @returns {Promise<Object>} Created room object
 */
exports.createRoom = async (data) => {
    const room = await createRoom(data);
    if (!room) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Room creation failed");
    return room;
};

/**
 * Retrieves a room by its ID
 * @param {string} id - Room ID
 * @throws {ApiError} When room is not found
 * @returns {Promise<Object>} Room object
 */
exports.getRoomById = async (id) => {
    const room = await getRoomById(id);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found");
    return room;
};

/**
 * Retrieves rooms based on filter and options
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options (pagination, sorting, etc.)
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of room objects
 */
exports.getRooms = async (filter = {}, options = {}) => {
    const rooms = await getRooms(filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms");
    return rooms;
};

/**
 * Updates a room by ID
 * @param {string} id - Room ID
 * @param {Object} data - Updated room data
 * @throws {ApiError} When room is not found or update fails
 * @returns {Promise<Object>} Updated room object
 */
exports.updateRoom = async (id, data) => {
    const room = await updateRoom(id, data);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or update failed");
    return room;
};

/**
 * Deletes a room by ID
 * @param {string} id - Room ID
 * @throws {ApiError} When room is not found or delete fails
 * @returns {Promise<Object>} Deleted room object
 */
exports.deleteRoom = async (id) => {
    const room = await deleteRoom(id);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or delete failed");
    return room;
};

// Query & Utility
/**
 * Gets all rooms for a specific hotel
 * @param {string} hotelId - Hotel ID
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options (pagination, sorting, etc.)
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of room objects
 */
exports.getRoomsByHotel = async (hotelId, filter = {}, options = {}) => {
    const rooms = await getRoomsByHotel(hotelId, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms for hotel");
    return rooms;
};

/**
 * Finds a room by its number within a specific hotel
 * @param {string} hotelId - Hotel ID
 * @param {number} roomNumber - Room number
 * @throws {ApiError} When room is not found
 * @returns {Promise<Object>} Room object
 */
exports.findRoomByNumber = async (hotelId, roomNumber) => {
    const room = await findRoomByNumber(hotelId, roomNumber);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found");
    return room;
};

/**
 * Gets available rooms for a specific date range
 * @param {string} hotelId - Hotel ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of available room objects
 */
exports.getAvailableRooms = async (hotelId, checkIn, checkOut, filter = {}, options = {}) => {
    const rooms = await getAvailableRooms(hotelId, checkIn, checkOut, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch available rooms");
    return rooms;
};

/**
 * Gets rooms of a specific type
 * @param {string} hotelId - Hotel ID
 * @param {string} type - Room type
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of room objects
 */
exports.getRoomsByType = async (hotelId, type, filter = {}, options = {}) => {
    const rooms = await getRoomsByType(hotelId, type, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms by type");
    return rooms;
};

/**
 * Gets rooms on a specific floor
 * @param {string} hotelId - Hotel ID
 * @param {number} floor - Floor number
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of room objects
 */
exports.getRoomsByFloor = async (hotelId, floor, filter = {}, options = {}) => {
    const rooms = await getRoomsByFloor(hotelId, floor, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms by floor");
    return rooms;
};

/**
 * Gets rooms with a specific amenity
 * @param {string} hotelId - Hotel ID
 * @param {string} amenityId - Amenity ID
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of room objects
 */
exports.getRoomsWithAmenity = async (hotelId, amenityId, filter = {}, options = {}) => {
    const rooms = await getRoomsWithAmenity(hotelId, amenityId, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms with amenity");
    return rooms;
};

/**
 * Counts total rooms in a hotel
 * @param {string} hotelId - Hotel ID
 * @throws {ApiError} When count fails
 * @returns {Promise<number>} Total number of rooms
 */
exports.countRoomsByHotel = async (hotelId) => {
    const count = await countRoomsByHotel(hotelId);
    if (count === undefined || count === null) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to count rooms");
    return count;
};

/**
 * Counts available rooms for a date range
 * @param {string} hotelId - Hotel ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @throws {ApiError} When count fails
 * @returns {Promise<number>} Number of available rooms
 */
exports.countAvailableRooms = async (hotelId, checkIn, checkOut) => {
    const count = await countAvailableRooms(hotelId, checkIn, checkOut);
    if (count === undefined || count === null) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to count available rooms");
    return count;
};

/**
 * Gets amenities for a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When amenities are not found
 * @returns {Promise<Object[]>} Array of amenity objects
 */
exports.getRoomAmenities = async (roomId) => {
    const amenities = await getRoomAmenities(roomId);
    if (!amenities) throw new ApiError(httpCodes.NOT_FOUND, "Room amenities not found");
    return amenities;
};

/**
 * Gets images for a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When images are not found
 * @returns {Promise<string[]>} Array of image URLs
 */
exports.getRoomImages = async (roomId) => {
    const images = await getRoomImages(roomId);
    if (!images) throw new ApiError(httpCodes.NOT_FOUND, "Room images not found");
    return images;
};

/**
 * Updates the availability status of a room
 * @param {string} roomId - Room ID
 * @param {boolean} isAvailable - New availability status
 * @throws {ApiError} When room is not found or update fails
 * @returns {Promise<Object>} Updated room object
 */
exports.updateRoomAvailability = async (roomId, isAvailable) => {
    const room = await updateRoomAvailability(roomId, isAvailable);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or update failed");
    return room;
};

/**
 * Performs bulk update operation on multiple rooms
 * @param {Object} filter - MongoDB filter criteria
 * @param {Object} update - Update operations to perform
 * @throws {ApiError} When bulk update fails
 * @returns {Promise<Object>} Update operation result
 */
exports.bulkUpdateRooms = async (filter, update) => {
    const result = await bulkUpdateRooms(filter, update);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk update failed");
    return result;
};

/**
 * Gets the price of a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When room price is not found
 * @returns {Promise<number>} Room price
 */
exports.getRoomPrice = async (roomId) => {
    const price = await getRoomPrice(roomId);
    if (price === undefined || price === null) throw new ApiError(httpCodes.NOT_FOUND, "Room price not found");
    return price;
};

/**
 * Gets the capacity of a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When room capacity is not found
 * @returns {Promise<number>} Room capacity
 */
exports.getRoomCapacity = async (roomId) => {
    const capacity = await getRoomCapacity(roomId);
    if (capacity === undefined || capacity === null) throw new ApiError(httpCodes.NOT_FOUND, "Room capacity not found");
    return capacity;
};

/**
 * Gets all available room types in a hotel
 * @param {string} hotelId - Hotel ID
 * @throws {ApiError} When room types fetch fails
 * @returns {Promise<string[]>} Array of room types
 */
exports.getRoomTypes = async (hotelId) => {
    const types = await getRoomTypes(hotelId);
    if (!types) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch room types");
    return types;
};

/**
 * Gets all distinct floor numbers in a hotel
 * @param {string} hotelId - Hotel ID
 * @throws {ApiError} When distinct floors fetch fails
 * @returns {Promise<number[]>} Array of floor numbers
 */
exports.getDistinctFloors = async (hotelId) => {
    const floors = await getDistinctFloors(hotelId);
    if (!floors) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch distinct floors");
    return floors;
};

// Advanced Features
/**
 * Marks a room as under maintenance
 * @param {string} roomId - Room ID
 * @param {string} reason - Reason for maintenance
 * @param {Date} untilDate - Expected end date of maintenance
 * @throws {ApiError} When room is not found or maintenance update fails
 * @returns {Promise<Object>} Updated room object
 */
exports.markRoomAsUnderMaintenance = async (roomId, reason, untilDate) => {
    const room = await markRoomAsUnderMaintenance(roomId, reason, untilDate);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or maintenance update failed");
    return room;
};

/**
 * Gets all rooms under maintenance in a hotel
 * @param {string} hotelId - Hotel ID
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of rooms under maintenance
 */
exports.getRoomsUnderMaintenance = async (hotelId) => {
    const rooms = await getRoomsUnderMaintenance(hotelId);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms under maintenance");
    return rooms;
};

/**
 * Checks if a room is under maintenance
 * @param {string} roomId - Room ID
 * @throws {ApiError} When maintenance status check fails
 * @returns {Promise<boolean>} True if room is under maintenance, false otherwise
 */
exports.isRoomUnderMaintenance = async (roomId) => {
    const isUnder = await isRoomUnderMaintenance(roomId);
    if (isUnder === undefined || isUnder === null) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to check maintenance status");
    return isUnder;
};

/**
 * Gets reviews for a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When reviews are not found
 * @returns {Promise<Object[]>} Array of review objects
 */
exports.getRoomReviews = async (roomId) => {
    const reviews = await getRoomReviews(roomId);
    if (!reviews) throw new ApiError(httpCodes.NOT_FOUND, "Room reviews not found");
    return reviews;
};

/**
 * Gets the average rating for a room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When average rating is not found
 * @returns {Promise<number>} Average rating value
 */
exports.getRoomAverageRating = async (roomId) => {
    const rating = await getRoomAverageRating(roomId);
    if (rating === undefined || rating === null) throw new ApiError(httpCodes.NOT_FOUND, "Room average rating not found");
    return rating;
};

/**
 * Gets the booking history for a room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When booking history is not found
 * @returns {Promise<Object[]>} Array of booking objects
 */
exports.getRoomBookingHistory = async (roomId) => {
    const history = await getRoomBookingHistory(roomId);
    if (!history) throw new ApiError(httpCodes.NOT_FOUND, "Room booking history not found");
    return history;
};

/**
 * Gets rooms sorted by specified criteria
 * @param {string} hotelId - Hotel ID
 * @param {string} sortBy - Field to sort by
 * @param {string} order - Sort order ('asc' or 'desc')
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When sorted rooms fetch fails
 * @returns {Promise<Object[]>} Array of sorted room objects
 */
exports.getRoomsSorted = async (hotelId, sortBy, order, filter = {}, options = {}) => {
    const rooms = await getRoomsSorted(hotelId, sortBy, order, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch sorted rooms");
    return rooms;
};

/**
 * Gets rooms within a specified price range
 * @param {string} hotelId - Hotel ID
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of room objects
 */
exports.getRoomsByPriceRange = async (hotelId, minPrice, maxPrice, filter = {}, options = {}) => {
    const rooms = await getRoomsByPriceRange(hotelId, minPrice, maxPrice, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms by price range");
    return rooms;
};

/**
 * Gets rooms within a specified capacity range
 * @param {string} hotelId - Hotel ID
 * @param {number} minCapacity - Minimum capacity
 * @param {number} maxCapacity - Maximum capacity
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When rooms fetch fails
 * @returns {Promise<Object[]>} Array of room objects
 */
exports.getRoomsByCapacity = async (hotelId, minCapacity, maxCapacity, filter = {}, options = {}) => {
    const rooms = await getRoomsByCapacity(hotelId, minCapacity, maxCapacity, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to fetch rooms by capacity range");
    return rooms;
};

/**
 * Performs bulk deletion of rooms
 * @param {Object} filter - Filter criteria for rooms to delete
 * @throws {ApiError} When bulk delete operation fails
 * @returns {Promise<Object>} Deletion result object
 */
exports.bulkDeleteRooms = async (filter) => {
    const result = await bulkDeleteRooms(filter);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk delete failed");
    return result;
};

/**
 * Bulk restores soft-deleted rooms matching the filter criteria
 * @param {Object} filter - MongoDB filter criteria for rooms to restore
 * @throws {ApiError} When bulk restore operation fails
 * @returns {Promise<Object>} Restore operation result
 */
exports.bulkRestoreRooms = async (filter) => {
    const result = await bulkRestoreRooms(filter);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk restore failed");
    return result;
};

/**
 * Restores a soft-deleted room
 * @param {string} roomId - ID of the room to restore
 * @throws {ApiError} When room is not found or restore fails
 * @returns {Promise<Object>} Restored room object
 */
exports.restoreRoom = async (roomId) => {
    const room = await restoreRoom(roomId);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or restore failed");
    return room;
};

/**
 * Updates custom attributes for a specific room
 * @param {string} roomId - Room ID
 * @param {Object} attributes - Custom attributes object
 * @throws {ApiError} When room is not found or update fails
 * @returns {Promise<Object>} Updated room object
 */
exports.updateRoomCustomAttributes = async (roomId, attributes) => {
    const room = await updateRoomCustomAttributes(roomId, attributes);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or custom attributes update failed");
    return room;
};

/**
 * Checks if a room is occupied on a specific date
 * @param {string} roomId - Room ID
 * @param {Date} date - Date to check occupancy for
 * @throws {ApiError} When occupancy check fails
 * @returns {Promise<boolean>} Room occupancy status
 */
exports.getRoomOccupancy = async (roomId, date) => {
    const occupied = await getRoomOccupancy(roomId, date);
    if (occupied === undefined || occupied === null) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to check room occupancy");
    return occupied;
};

/**
 * Searches rooms based on query string and filters
 * @param {string} hotelId - Hotel ID
 * @param {string} query - Search query string
 * @param {Object} [filter={}] - Filter criteria
 * @param {Object} [options={}] - Query options
 * @throws {ApiError} When search operation fails
 * @returns {Promise<Object[]>} Array of matching room objects
 */
exports.searchRooms = async (hotelId, query, filter = {}, options = {}) => {
    const rooms = await searchRooms(hotelId, query, filter, options);
    if (!rooms) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to search rooms");
    return rooms;
};

/**
 * Adds an image URL to a room's collection of images
 * @param {string} roomId - Room ID
 * @param {string} imageUrl - URL of the image to add
 * @throws {ApiError} When room is not found or image addition fails
 * @returns {Promise<Object>} Updated room object
 */
exports.addRoomImage = async (roomId, imageUrl) => {
    const room = await addRoomImage(roomId, imageUrl);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or image add failed");
    return room;
};

/**
 * Removes an image URL from a room's collection of images
 * @param {string} roomId - Room ID
 * @param {string} imageUrl - URL of the image to remove
 * @throws {ApiError} When room is not found or image removal fails
 * @returns {Promise<Object>} Updated room object
 */
exports.removeRoomImage = async (roomId, imageUrl) => {
    const room = await removeRoomImage(roomId, imageUrl);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or image remove failed");
    return room;
};

/**
 * Sets a discount for a specific room
 * @param {string} roomId - Room ID
 * @param {Object} discount - Discount information
 * @throws {ApiError} When room is not found or discount set fails
 * @returns {Promise<Object>} Updated room object
 */
exports.setRoomDiscount = async (roomId, discount) => {
    const room = await setRoomDiscount(roomId, discount);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or discount set failed");
    return room;
};

/**
 * Removes a discount from a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When room is not found or discount removal fails
 * @returns {Promise<Object>} Updated room object
 */
exports.removeRoomDiscount = async (roomId) => {
    const room = await removeRoomDiscount(roomId);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or discount remove failed");
    return room;
};

/**
 * Gets the current discount for a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When room discount is not found
 * @returns {Promise<Object>} Discount information
 */
exports.getRoomDiscount = async (roomId) => {
    const discount = await getRoomDiscount(roomId);
    if (discount === undefined || discount === null) throw new ApiError(httpCodes.NOT_FOUND, "Room discount not found");
    return discount;
};

/**
 * Sets custom attributes for a specific room
 * @param {string} roomId - Room ID
 * @param {Object} attributes - Custom attributes object to set
 * @throws {ApiError} When room is not found or setting custom attributes fails
 * @returns {Promise<Object>} Updated room object
 */
exports.setRoomCustomAttributes = async (roomId, attributes) => {
    const room = await setRoomCustomAttributes(roomId, attributes);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or custom attributes set failed");
    return room;
};

/**
 * Gets custom attributes for a specific room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When room custom attributes are not found
 * @returns {Promise<Object>} Room custom attributes object
 */
exports.getRoomCustomAttributes = async (roomId) => {
    const attributes = await getRoomCustomAttributes(roomId);
    if (attributes === undefined || attributes === null) throw new ApiError(httpCodes.NOT_FOUND, "Room custom attributes not found");
    return attributes;
};

/**
 * Assigns a room to a specific user
 * @param {string} roomId - Room ID
 * @param {string} userId - User ID to assign the room to
 * @throws {ApiError} When room is not found or assignment fails
 * @returns {Promise<Object>} Updated room object
 */
exports.assignRoom = async (roomId, userId) => {
    const room = await assignRoom(roomId, userId);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or assignment failed");
    return room;
};

/**
 * Removes user assignment from a room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When room is not found or unassignment fails
 * @returns {Promise<Object>} Updated room object
 */
exports.unassignRoom = async (roomId) => {
    const room = await unassignRoom(roomId);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or unassignment failed");
    return room;
};

/**
 * Locks a room for booking by a specific user
 * @param {string} roomId - Room ID
 * @param {string} userId - User ID locking the room
 * @param {Date} expiresAt - Lock expiration date
 * @throws {ApiError} When room is not found or lock fails
 * @returns {Promise<Object>} Updated room object
 */
exports.lockRoom = async (roomId, userId, expiresAt) => {
    const room = await lockRoom(roomId, userId, expiresAt);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or lock failed");
    return room;
};

/**
 * Removes the booking lock from a room
 * @param {string} roomId - Room ID
 * @throws {ApiError} When room is not found or unlock fails
 * @returns {Promise<Object>} Updated room object
 */
exports.unlockRoom = async (roomId) => {
    const room = await unlockRoom(roomId);
    if (!room) throw new ApiError(httpCodes.NOT_FOUND, "Room not found or unlock failed");
    return room;
};

/**
 * Checks if a room is currently locked for booking
 * @param {string} roomId - Room ID
 * @throws {ApiError} When checking room lock status fails
 * @returns {Promise<boolean>} True if room is locked, false otherwise
 */
exports.isRoomLocked = async (roomId) => {
    const locked = await isRoomLocked(roomId);
    if (locked === undefined || locked === null) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to check room lock status");
    return locked;
};

/**
 * Checks if a room is available for a given date range
 * @param {string} roomId - Room ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @throws {ApiError} When availability check fails
 * @returns {Promise<boolean>} True if available, false otherwise
 */
exports.isRoomAvailable = async (roomId, checkIn, checkOut) => {
    const available = await isRoomAvailable(roomId, checkIn, checkOut);
    if (available === undefined || available === null) {
        throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Failed to check room availability");
    }
    return available;
};
