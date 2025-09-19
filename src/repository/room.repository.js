const { roomModel: Room, bookingModel: Booking } = require("../models");

/**
 * Creates a new room in the database
 * @param {Object} data - The room data
 * @param {mongoose.Types.ObjectId} data.hotel - ID of the hotel this room belongs to
 * @param {number} data.roomNumber - Room number
 * @param {number} data.floor - Floor number
 * @param {string} data.type - Room type ('single', 'double', 'suite', 'deluxe')
 * @param {number} data.pricePerNight - Price per night
 * @param {number} data.capacity - Room capacity
 * @param {mongoose.Types.ObjectId[]} [data.amenities] - Array of amenity IDs
 * @param {boolean} [data.isAvailable=true] - Availability status
 * @param {string[]} [data.images] - Array of image URLs
 * @returns {Promise<Room>} Created room document
 */
async function createRoom(data) {
    return await Room.create(data);
}

/**
 * Retrieves a room by its ID
 * @param {string|mongoose.Types.ObjectId} id - Room ID
 * @returns {Promise<Room|null>} Room document if found, null otherwise
 */
async function getRoomById(id) {
    return await Room.findById(id);
}

/**
 * Lists rooms based on filters and pagination options
 * @param {Object} [filter={}] - MongoDB filter object
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Room[]>} Array of room documents
 */
async function getRooms(filter = {}, options = {}) {
    return await Room.find(filter, null, options);
}

/**
 * Updates a room's details
 * @param {string|mongoose.Types.ObjectId} id - Room ID
 * @param {Object} data - Updated room data
 * @returns {Promise<Room|null>} Updated room document if found, null otherwise
 */
async function updateRoom(id, data) {
    return await Room.findByIdAndUpdate(id, data, {new: true});
}

/**
 * Deletes a room from the database
 * @param {string|mongoose.Types.ObjectId} id - Room ID
 * @returns {Promise<Room|null>} Deleted room document if found, null otherwise
 */
async function deleteRoom(id) {
    return await Room.findByIdAndDelete(id);
}

/**
 * Checks if a room is available for a given date range
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @returns {Promise<boolean>} True if room is available, false otherwise
 */
async function isRoomAvailable(roomId, checkIn, checkOut) {
    // Overlap: existing checkIn < requested checkOut && existing checkOut > requested checkIn
    const overlap = await Booking.findOne({
        room: roomId,
        status: {$nin: ["cancelled"]},
        checkIn: {$lt: checkOut},
        checkOut: {$gt: checkIn},
    });
    return !overlap;
}

/**
 * Gets all rooms for a specific hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Room[]>} Array of room documents
 */
async function getRoomsByHotel(hotelId, filter = {}, options = {}) {
    return await Room.find({hotel: hotelId, ...filter}, null, options);
}

/**
 * Finds a room by its number within a specific hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {number} roomNumber - Room number to find
 * @returns {Promise<Room|null>} Room document if found, null otherwise
 */
async function findRoomByNumber(hotelId, roomNumber) {
    return await Room.findOne({hotel: hotelId, roomNumber});
}

/**
 * Lists all available rooms for a hotel in a given date range
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Room[]>} Array of available room documents
 */
async function getAvailableRooms(hotelId, checkIn, checkOut, filter = {}, options = {}) {
    // Get all rooms for hotel
    const rooms = await Room.find({hotel: hotelId, ...filter}, null, options);
    // Get booked room IDs for the date range
    const bookedRooms = await Booking.find({
        hotel: hotelId,
        status: {$nin: ["cancelled"]},
        checkIn: {$lt: checkOut},
        checkOut: {$gt: checkIn},
    }).distinct("room");
    // Filter out booked rooms
    return rooms.filter(room => !bookedRooms.includes(room._id.toString()));
}

/**
 * Lists rooms of a specific type in a hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {string} type - Room type ('single', 'double', 'suite', 'deluxe')
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Room[]>} Array of room documents
 */
async function getRoomsByType(hotelId, type, filter = {}, options = {}) {
    return await Room.find({hotel: hotelId, type, ...filter}, null, options);
}

/**
 * Lists rooms on a specific floor in a hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {number} floor - Floor number
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Room[]>} Array of room documents
 */
async function getRoomsByFloor(hotelId, floor, filter = {}, options = {}) {
    return await Room.find({hotel: hotelId, floor, ...filter}, null, options);
}

/**
 * Lists rooms with a specific amenity in a hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {string|mongoose.Types.ObjectId} amenityId - Amenity ID
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Room[]>} Array of room documents with the specified amenity
 */
async function getRoomsWithAmenity(hotelId, amenityId, filter = {}, options = {}) {
    return await Room.find({hotel: hotelId, amenities: amenityId, ...filter}, null, options);
}

/**
 * Counts total rooms in a hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @returns {Promise<number>} Total number of rooms
 */
async function countRoomsByHotel(hotelId) {
    return await Room.countDocuments({hotel: hotelId});
}

/**
 * Counts available rooms in a hotel for a date range
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {Date} checkIn - Check-in date
 * @param {Date} checkOut - Check-out date
 * @returns {Promise<number>} Number of available rooms
 */
async function countAvailableRooms(hotelId, checkIn, checkOut) {
    const rooms = await getAvailableRooms(hotelId, checkIn, checkOut);
    return rooms.length;
}

/**
 * Gets amenities for a specific room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Amenity[]>} Array of amenity documents
 */
async function getRoomAmenities(roomId) {
    const room = await Room.findById(roomId).populate('amenities');
    return room ? room.amenities : [];
}

/**
 * Gets images associated with a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<string[]>} Array of image URLs
 */
async function getRoomImages(roomId) {
    const room = await Room.findById(roomId);
    return room ? room.images : [];
}

/**
 * Updates the static availability flag for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {boolean} isAvailable - New availability status
 * @returns {Promise<Room|null>} Updated room document
 */
async function updateRoomAvailability(roomId, isAvailable) {
    return await Room.findByIdAndUpdate(roomId, {isAvailable}, {new: true});
}

/**
 * Performs bulk update on rooms matching a filter
 * @param {Object} filter - MongoDB filter object
 * @param {Object} update - Update operations to perform
 * @returns {Promise<Object>} MongoDB update result
 */
async function bulkUpdateRooms(filter, update) {
    return await Room.updateMany(filter, update);
}

/**
 * Gets price per night for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<number|null>} Room price or null if not found
 */
async function getRoomPrice(roomId) {
    const room = await Room.findById(roomId);
    return room ? room.pricePerNight : null;
}

/**
 * Gets capacity for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<number|null>} Room capacity or null if not found
 */
async function getRoomCapacity(roomId) {
    const room = await Room.findById(roomId);
    return room ? room.capacity : null;
}

/**
 * Gets all room types available in a hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @returns {Promise<string[]>} Array of distinct room types
 */
async function getRoomTypes(hotelId) {
    return await Room.distinct('type', {hotel: hotelId});
}

/**
 * Gets all distinct floors in a hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @returns {Promise<number[]>} Array of distinct floor numbers
 */
async function getDistinctFloors(hotelId) {
    return await Room.distinct('floor', {hotel: hotelId});
}

/**
 * Marks a room as under maintenance
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {string} reason - Maintenance reason
 * @param {Date} untilDate - Expected maintenance end date
 * @returns {Promise<Room|null>} Updated room document
 */
async function markRoomAsUnderMaintenance(roomId, reason, untilDate) {
    return await Room.findByIdAndUpdate(roomId, {
        isAvailable: false,
        maintenance: {reason, untilDate, active: true}
    }, {new: true});
}

/**
 * Gets all rooms under maintenance in a hotel
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @returns {Promise<Room[]>} Array of rooms under maintenance
 */
async function getRoomsUnderMaintenance(hotelId) {
    return await Room.find({hotel: hotelId, 'maintenance.active': true});
}

/**
 * Checks if a room is under maintenance
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<boolean>} True if room is under maintenance, false otherwise
 */
async function isRoomUnderMaintenance(roomId) {
    const room = await Room.findById(roomId);
    return room && room.maintenance && room.maintenance.active;
}

/**
 * Gets all reviews for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Array>} Array of reviews (empty array as placeholder)
 */
async function getRoomReviews(roomId) {
    // Implement if reviews are linked to rooms
    return [];
}

/**
 * Gets average rating for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<number|null>} Average rating or null if not implemented
 */
async function getRoomAverageRating(roomId) {
    // Implement if ratings are linked to rooms
    return null;
}

/**
 * Gets booking history for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Booking[]>} Array of booking documents
 */
async function getRoomBookingHistory(roomId) {
    return await Booking.find({room: roomId});
}

/**
 * Gets rooms sorted by a specified field
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {string} [sortBy='pricePerNight'] - Field to sort by
 * @param {string} [order='asc'] - Sort order ('asc' or 'desc')
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options
 * @returns {Promise<Room[]>} Array of sorted room documents
 */
async function getRoomsSorted(hotelId, sortBy = 'pricePerNight', order = 'asc', filter = {}, options = {}) {
    const sort = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;
    return await Room.find({hotel: hotelId, ...filter}, null, {...options, sort});
}

/**
 * Gets rooms within a specified price range
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {number} minPrice - Minimum price per night
 * @param {number} maxPrice - Maximum price per night
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options
 * @returns {Promise<Room[]>} Array of room documents within price range
 */
async function getRoomsByPriceRange(hotelId, minPrice, maxPrice, filter = {}, options = {}) {
    return await Room.find({hotel: hotelId, pricePerNight: {$gte: minPrice, $lte: maxPrice}, ...filter}, null, options);
}

/**
 * Gets rooms within a specified capacity range
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {number} minCapacity - Minimum capacity
 * @param {number} maxCapacity - Maximum capacity
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options
 * @returns {Promise<Room[]>} Array of room documents within capacity range
 */
async function getRoomsByCapacity(hotelId, minCapacity, maxCapacity, filter = {}, options = {}) {
    return await Room.find({
        hotel: hotelId,
        capacity: {$gte: minCapacity, $lte: maxCapacity}, ...filter
    }, null, options);
}

/**
 * Bulk deletes rooms matching a filter
 * @param {Object} filter - MongoDB filter object
 * @returns {Promise<Object>} DeleteResult object
 */
async function bulkDeleteRooms(filter) {
    return await Room.deleteMany(filter);
}

/**
 * Bulk restores soft-deleted rooms
 * @param {Object} filter - MongoDB filter object
 * @returns {Promise<Object>} UpdateResult object
 */
async function bulkRestoreRooms(filter) {
    // Assuming safeSoftDeletePlugin sets a 'deletedAt' field
    return await Room.updateMany(filter, {$unset: {deletedAt: ""}});
}

/**
 * Restores a soft-deleted room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Room|null>} Restored room document if found
 */
async function restoreRoom(roomId) {
    // Assuming safeSoftDeletePlugin sets a 'deletedAt' field
    return await Room.findByIdAndUpdate(roomId, {$unset: {deletedAt: ""}}, {new: true});
}

/**
 * Updates custom attributes for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {Object} attributes - Custom attributes object
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function updateRoomCustomAttributes(roomId, attributes) {
    return await Room.findByIdAndUpdate(roomId, {customAttributes: attributes}, {new: true});
}

/**
 * Gets room occupancy status for a specific date
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {Date} date - Date to check occupancy for
 * @returns {Promise<boolean>} True if room is occupied on date, false otherwise
 */
async function getRoomOccupancy(roomId, date) {
    // Occupancy is determined by bookings overlapping the date
    const booking = await Booking.findOne({
        room: roomId,
        status: {$nin: ["cancelled"]},
        checkIn: {$lte: date},
        checkOut: {$gt: date}
    });
    return !!booking;
}

/**
 * Searches rooms based on a text query across multiple fields
 * @param {string|mongoose.Types.ObjectId} hotelId - Hotel ID
 * @param {string} query - Search query string
 * @param {Object} [filter={}] - Additional filter criteria
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Room[]>} Array of matching room documents
 */
async function searchRooms(hotelId, query, filter = {}, options = {}) {
    const searchRegex = new RegExp(query, 'i');
    return await Room.find({
        hotel: hotelId,
        $or: [
            {roomNumber: {$regex: searchRegex}},
            {type: {$regex: searchRegex}},
            {status: {$regex: searchRegex}},
            {'customAttributes': {$regex: searchRegex}}
        ],
        ...filter
    }, null, options);
}

/**
 * Adds an image URL to a room's image collection
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {string} imageUrl - URL of the image to add
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function addRoomImage(roomId, imageUrl) {
    return await Room.findByIdAndUpdate(roomId, {$push: {images: imageUrl}}, {new: true});
}

/**
 * Removes an image URL from a room's image collection
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {string} imageUrl - URL of the image to remove
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function removeRoomImage(roomId, imageUrl) {
    return await Room.findByIdAndUpdate(roomId, {$pull: {images: imageUrl}}, {new: true});
}

/**
 * Sets a discount for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {Object} discount - Discount information
 * @param {number} discount.amount - Discount amount
 * @param {string} discount.type - Discount type ('percentage' or 'fixed')
 * @param {Date} [discount.expiresAt] - Discount expiration date
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function setRoomDiscount(roomId, discount) {
    return await Room.findByIdAndUpdate(roomId, {discount}, {new: true});
}

/**
 * Removes discount information from a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function removeRoomDiscount(roomId) {
    return await Room.findByIdAndUpdate(roomId, {$unset: {discount: ""}}, {new: true});
}

/**
 * Retrieves discount information for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Object|null>} Discount object if exists, null otherwise
 */
async function getRoomDiscount(roomId) {
    const room = await Room.findById(roomId);
    return room ? room.discount : null;
}

/**
 * Sets custom attributes for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {Object} attributes - Custom attributes object
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function setRoomCustomAttributes(roomId, attributes) {
    return await Room.findByIdAndUpdate(roomId, {customAttributes: attributes}, {new: true});
}

/**
 * Retrieves custom attributes for a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Object|null>} Custom attributes object if exists, null otherwise
 */
async function getRoomCustomAttributes(roomId) {
    const room = await Room.findById(roomId);
    return room ? room.customAttributes : null;
}

/**
 * Assigns a room to a user or staff member
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {string|mongoose.Types.ObjectId} userId - User ID to assign the room to
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function assignRoom(roomId, userId) {
    return await Room.findByIdAndUpdate(roomId, {assignedTo: userId}, {new: true});
}

/**
 * Removes user assignment from a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function unassignRoom(roomId) {
    return await Room.findByIdAndUpdate(roomId, {$unset: {assignedTo: ""}}, {new: true});
}

/**
 * Locks a room for booking by a specific user
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @param {string|mongoose.Types.ObjectId} userId - User ID locking the room
 * @param {Date} expiresAt - Lock expiration date
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function lockRoom(roomId, userId, expiresAt) {
    return await Room.findByIdAndUpdate(roomId, {locked: {active: true, user: userId, expiresAt}}, {new: true});
}

/**
 * Removes the booking lock from a room
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<Room|null>} Updated room document if found
 */
async function unlockRoom(roomId) {
    return await Room.findByIdAndUpdate(roomId, {locked: {active: false, user: null, expiresAt: null}}, {new: true});
}

/**
 * Checks if a room is currently locked for booking
 * @param {string|mongoose.Types.ObjectId} roomId - Room ID
 * @returns {Promise<boolean>} True if room is locked, false otherwise
 */
async function isRoomLocked(roomId) {
    const room = await Room.findById(roomId);
    return room && room.locked && room.locked.active;
}

module.exports = {
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
};
