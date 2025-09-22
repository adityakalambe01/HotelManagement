const {bookingModel: Booking} = require("../models");

/**
 * Creates a new booking in the database
 * @param {Object} data - The booking data to create
 * @returns {Promise<Object>} The created booking document
 */
async function createBooking(data) {
    return await Booking.create(data);
}

/**
 * Retrieves a booking by its ID
 * @param {string} id - The booking ID
 * @returns {Promise<Object|null>} The booking document if found, null otherwise
 */
async function getBookingById(id) {
    return await Booking.findById(id);
}

/**
 * Retrieves all bookings matching the filter criteria
 * @param {Object} [filter={}] - Filter criteria for the query
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Array>} Array of booking documents
 */
async function getAllBookings(filter = {}, options = {}) {
    return await Booking.find(filter, null, options);
}

/**
 * Updates a booking by its ID
 * @param {string} id - The booking ID
 * @param {Object} data - The data to update
 * @returns {Promise<Object|null>} The updated booking document if found, null otherwise
 */
async function updateBooking(id, data) {
    return await Booking.findByIdAndUpdate(id, data, {new: true});
}

/**
 * Deletes a booking by its ID
 * @param {string} id - The booking ID
 * @returns {Promise<Object|null>} The deleted booking document if found, null otherwise
 */
async function deleteBooking(id) {
    return await Booking.findByIdAndDelete(id);
}

/**
 * Restores a soft-deleted booking by its ID
 * @param {string} id - The booking ID
 * @returns {Promise<Object|null>} The restored booking document if found, null otherwise
 */
async function restoreBooking(id) {
    return await Booking.restore({_id: id});
}

/**
 * Cancels a booking and updates its timeline and status
 * @param {string} id - The booking ID
 * @param {Object} cancellationDetails - Details about the cancellation
 * @param {string} cancellationDetails.by - User ID who cancelled the booking
 * @returns {Promise<Object|null>} The updated booking document
 */
async function cancelBooking(id, cancellationDetails) {
    return await Booking.findByIdAndUpdate(id, {
        $set: {
            'timeline.cancellation': cancellationDetails,
            'meta.status': 'cancelled',
            'meta.isActive': false
        },
        $push: {
            'meta.history': {
                status: 'cancelled',
                changedAt: new Date(),
                changedBy: cancellationDetails.by
            }
        }
    }, {new: true});
}

/**
 * Marks a booking as completed and updates its timeline and status
 * @param {string} id - The booking ID
 * @param {Object} completedDetails - Details about the completion
 * @param {string} completedDetails.by - User ID who marked the booking as completed
 * @returns {Promise<Object|null>} The updated booking document
 */
async function completeBooking(id, completedDetails) {
    return await Booking.findByIdAndUpdate(id, {
        $set: {
            'timeline.completed': completedDetails,
            'meta.status': 'completed',
            'meta.isActive': false
        },
        $push: {
            'meta.history': {
                status: 'completed',
                changedAt: new Date(),
                changedBy: completedDetails.by
            }
        }
    }, {new: true});
}

/**
 * Marks a booking as no-show and updates its status
 * @param {string} id - The booking ID
 * @param {string} userId - User ID who marked the booking as no-show
 * @returns {Promise<Object|null>} The updated booking document
 */
async function markNoShow(id, userId) {
    return await Booking.findByIdAndUpdate(id, {
        $set: {
            'meta.isNoShow': true,
            'meta.status': 'cancelled',
            'meta.isActive': false
        },
        $push: {
            'meta.history': {
                status: 'no-show',
                changedAt: new Date(),
                changedBy: userId
            }
        }
    }, {new: true});
}

/**
 * Updates the status of a booking
 * @param {string} id - The booking ID
 * @param {string} status - The new status to set
 * @param {string} userId - User ID who is updating the status
 * @returns {Promise<Object|null>} The updated booking document
 */
async function updateBookingStatus(id, status, userId) {
    return await Booking.findByIdAndUpdate(id, {
        $set: {
            'meta.status': status
        },
        $push: {
            'meta.history': {
                status,
                changedAt: new Date(),
                changedBy: userId
            }
        }
    }, {new: true});
}

/**
 * Retrieves the status history of a booking
 * @param {string} id - The booking ID
 * @returns {Promise<Array>} Array of status history entries
 */
async function getBookingHistory(id) {
    const booking = await Booking.findById(id, 'meta.history');
    return booking?.meta?.history || [];
}

/**
 * Adds a new guest to a booking
 * @param {string} bookingId - The ID of the booking
 * @param {Object} guestData - The guest data to add
 * @param {string} [guestData.name] - Guest's name
 * @param {string} [guestData.email] - Guest's email
 * @param {string} [guestData.phone] - Guest's phone number
 * @returns {Promise<Object>} The updated booking document
 */
async function addGuestToBooking(bookingId, guestData) {
    return await Booking.findByIdAndUpdate(bookingId, {
        $push: {'guests.list': guestData},
        $inc: {'guests.numberOfGuests': 1}
    }, {new: true});
}

/**
 * Removes a guest from a booking
 * @param {string} bookingId - The ID of the booking
 * @param {string} guestId - The ID of the guest to remove
 * @returns {Promise<Object>} The updated booking document
 */
async function removeGuestFromBooking(bookingId, guestId) {
    return await Booking.findByIdAndUpdate(bookingId, {
        $pull: {'guests.list': {_id: guestId}},
        $inc: {'guests.numberOfGuests': -1}
    }, {new: true});
}

/**
 * Updates guest information in a booking
 * @param {string} bookingId - The ID of the booking
 * @param {string} guestId - The ID of the guest to update
 * @param {Object} guestData - The updated guest data
 * @param {string} [guestData.name] - Guest's name
 * @param {string} [guestData.email] - Guest's email
 * @param {string} [guestData.phone] - Guest's phone number
 * @returns {Promise<Object>} The result of the update operation
 */
async function updateGuestInBooking(bookingId, guestId, guestData) {
    return await Booking.updateOne({_id: bookingId, 'guests.list._id': guestId}, {
        $set: {'guests.list.$': guestData}
    });
}

/**
 * Retrieves all guests associated with a booking
 * @param {string} bookingId - The ID of the booking
 * @returns {Promise<Object>} Object containing guest list and number of guests
 * @property {Array} list - Array of guest objects
 * @property {number} numberOfGuests - Total number of guests
 */
async function getGuestsForBooking(bookingId) {
    const booking = await Booking.findById(bookingId, 'guests');
    return booking?.guests || {};
}

/**
 * Retrieves all bookings for a specific room
 * @param {string} roomId - The ID of the room
 * @param {Object} [filter={}] - Additional filter criteria
 * @returns {Promise<Array>} Array of booking documents for the room
 */
async function getBookingsByRoom(roomId, filter = {}) {
    return await Booking.find({'context.room': roomId, ...filter});
}

/**
 * Retrieves all bookings for a specific hotel
 * @param {string} hotelId - The ID of the hotel
 * @param {Object} [filter={}] - Additional filter criteria
 * @returns {Promise<Array>} Array of booking documents for the hotel
 */
async function getBookingsByHotel(hotelId, filter = {}) {
    return await Booking.find({'context.hotel': hotelId, ...filter});
}

/**
 * Retrieves all bookings made by a specific user
 * @param {string} userId - The ID of the user
 * @param {Object} [filter={}] - Additional filter criteria
 * @returns {Promise<Array>} Array of booking documents for the user
 */
async function getBookingsByUser(userId, filter = {}) {
    return await Booking.find({'context.bookedBy': userId, ...filter});
}

/**
 * Retrieves all active bookings for a specific room
 * @param {string} roomId - The ID of the room
 * @returns {Promise<Array>} Array of active booking documents for the room
 */
async function getActiveBookingsByRoom(roomId) {
    return await Booking.find({'context.room': roomId, 'meta.isActive': true});
}

/**
 * Retrieves all bookings for a hotel within a specified date range
 * @param {string} hotelId - The ID of the hotel
 * @param {Date} startDate - The start date of the range
 * @param {Date} endDate - The end date of the range
 * @returns {Promise<Array>} Array of booking documents within the date range
 */
async function getBookingsByDateRange(hotelId, startDate, endDate) {
    return await Booking.find({
        'context.hotel': hotelId,
        'timeline.check.in': {$lte: endDate},
        'timeline.check.out': {$gte: startDate}
    });
}

/**
 * Updates special requests for a booking
 * @param {string} id - The booking ID
 * @param {Object|Array} requests - Special requests to update
 * @returns {Promise<Object|null>} The updated booking document if found, null otherwise
 */
async function updateSpecialRequests(id, requests) {
    return await Booking.findByIdAndUpdate(id, {'meta.specialRequests': requests}, {new: true});
}

/**
 * Updates custom attributes for a booking
 * @param {string} id - The booking ID
 * @param {Object} attributes - Custom attributes to update (schema.Mixed type allows any valid JSON)
 * @returns {Promise<Object|null>} The updated booking document if found, null otherwise
 */
async function updateCustomAttributes(id, attributes) {
    return await Booking.findByIdAndUpdate(id, {'meta.customAttributes': attributes}, {new: true});
}

/**
 * Retrieves custom attributes for a booking
 * @param {string} id - The booking ID
 * @returns {Promise<Object>} Object containing custom attributes, empty object if none found
 */
async function getCustomAttributes(id) {
    const booking = await Booking.findById(id, 'meta.customAttributes');
    return booking?.meta?.customAttributes || {};
}

/**
 * Counts the total number of bookings for a specific hotel with optional filters
 * @param {string} hotelId - The ID of the hotel
 * @param {Object} [filter={}] - Additional filter criteria
 * @returns {Promise<number>} Total number of bookings matching the criteria
 */
async function countBookingsByHotel(hotelId, filter = {}) {
    return await Booking.countDocuments({'context.hotel': hotelId, ...filter});
}

/**
 * Counts the number of active bookings for a specific hotel
 * @param {string} hotelId - The ID of the hotel
 * @returns {Promise<number>} Number of active bookings
 */
async function countActiveBookings(hotelId) {
    return await Booking.countDocuments({'context.hotel': hotelId, 'meta.isActive': true});
}

/**
 * Counts the number of bookings with a specific status for a hotel
 * @param {string} hotelId - The ID of the hotel
 * @param {string} status - The booking status to count (e.g., 'confirmed', 'cancelled', 'completed')
 * @returns {Promise<number>} Number of bookings with the specified status
 */
async function countBookingsByStatus(hotelId, status) {
    return await Booking.countDocuments({'context.hotel': hotelId, 'meta.status': status});
}

/**
 * Searches for bookings based on a query with optional parameters
 * @param {Object} query - The search query criteria
 * @param {Object} [options={}] - Query options (sort, limit, skip, etc.)
 * @returns {Promise<Array>} Array of booking documents matching the search criteria
 */
async function searchBookings(query, options = {}) {
    return await Booking.find(query, null, options);
}

/**
 * Paginates booking results with filtering options
 * @param {Object} [filter={}] - Filter criteria for the query
 * @param {Object} [options={}] - Pagination options
 * @param {number} [options.page] - Page number
 * @param {number} [options.limit] - Number of items per page
 * @param {Object} [options.sort] - Sorting criteria
 * @returns {Promise<Object>} Paginated result object containing docs, total, page, and other pagination info
 */
async function paginateBookings(filter = {}, options = {}) {
    return await Booking.paginate(filter, options);
}

/**
 * Checks if a room is already booked for a given date range
 * @param {string} roomId - The ID of the room to check
 * @param {Object} dateRange - The date range to check for availability
 * @param {Date} dateRange.start - Start date of the range
 * @param {Date} dateRange.end - End date of the range
 * @returns {Promise<boolean>} True if the room is booked, false otherwise
 */
async function isRoomBooked(roomId, dateRange) {
    return await Booking.exists({
        'context.room': roomId,
        'meta.isActive': true,
        $or: [
            {
                'timeline.check.in': {$lt: dateRange.end},
                'timeline.check.out': {$gt: dateRange.start}
            }
        ]
    });
}

/**
 * Retrieves a booking by its booking code
 * @param {string} bookingCode - The unique booking code
 * @returns {Promise<Object|null>} The booking document if found, null otherwise
 */
async function getBookingByCode(bookingCode) {
    return await Booking.findOne({'context.bookingCode': bookingCode});
}

/**
 * Retrieves all bookings for a hotel that have pending refunds
 * @param {string} hotelId - The ID of the hotel
 * @returns {Promise<Array>} Array of booking documents with pending refunds
 */
async function getBookingsWithRefundPending(hotelId) {
    return await Booking.find({'context.hotel': hotelId, 'timeline.cancellation.refundStatus': 'pending'});
}

/**
 * Retrieves all cancelled bookings for a hotel
 * @param {string} hotelId - The ID of the hotel
 * @returns {Promise<Array>} Array of cancelled booking documents
 */
async function getCancelledBookings(hotelId) {
    return await Booking.find({'context.hotel': hotelId, 'meta.status': 'cancelled'});
}

/**
 * Retrieves all completed bookings for a hotel
 * @param {string} hotelId - The ID of the hotel
 * @returns {Promise<Array>} Array of completed booking documents
 */
async function getCompletedBookings(hotelId) {
    return await Booking.find({'context.hotel': hotelId, 'meta.status': 'completed'});
}

/**
 * Retrieves all no-show bookings for a hotel
 * @param {string} hotelId - The ID of the hotel
 * @returns {Promise<Array>} Array of no-show booking documents
 */
async function getNoShowBookings(hotelId) {
    return await Booking.find({'context.hotel': hotelId, 'meta.isNoShow': true});
}

/**
 * Retrieves all bookings with special requests for a hotel
 * @param {string} hotelId - The ID of the hotel
 * @returns {Promise<Array>} Array of booking documents with special requests
 */
async function getBookingsWithSpecialRequests(hotelId) {
    return await Booking.find({'context.hotel': hotelId, 'meta.specialRequests': {$exists: true, $ne: null}});
}

/**
 * Retrieves all bookings with notes for a hotel
 * @param {string} hotelId - The ID of the hotel
 * @returns {Promise<Array>} Array of booking documents with notes
 */
async function getBookingsWithNotes(hotelId) {
    return await Booking.find({'context.hotel': hotelId, 'meta.notes': {$exists: true, $ne: null}});
}

/**
 * Retrieves the payment reference for a booking
 * @param {string} bookingId - The ID of the booking
 * @returns {Promise<string|null>} The payment ID if found, null otherwise
 */
async function getBookingPayment(bookingId) {
    const booking = await Booking.findById(bookingId, 'payment');
    return booking?.payment || null;
}

/**
 * Updates the payment reference for a booking
 * @param {string} bookingId - The ID of the booking
 * @param {string} paymentId - The payment ID to associate with the booking
 * @returns {Promise<Object|null>} The updated booking document if found, null otherwise
 */
async function updateBookingPayment(bookingId, paymentId) {
    return await Booking.findByIdAndUpdate(bookingId, {payment: paymentId}, {new: true});
}

/**
 * Soft deletes a booking by its ID (marks as deleted without removing from database)
 * @param {string} id - The booking ID to soft delete
 * @returns {Promise<Object>} The result of the soft delete operation
 */
async function softDeleteBooking(id) {
    return await Booking.softDelete({_id: id});
}

/**
 * Soft deletes multiple bookings by their IDs
 * @param {Array<string>} ids - Array of booking IDs to soft delete
 * @returns {Promise<Object>} The result of the bulk soft delete operation
 */
async function bulkSoftDeleteBookings(ids) {
    return await Booking.softDelete({_id: {$in: ids}});
}

/**
 * Restores multiple soft-deleted bookings by their IDs
 * @param {Array<string>} ids - Array of booking IDs to restore
 * @returns {Promise<Object>} The result of the bulk restore operation
 */
async function bulkRestoreBookings(ids) {
    return await Booking.restore({_id: {$in: ids}});
}

/**
 * Updates multiple bookings by their IDs
 * @param {Array<string>} ids - Array of booking IDs to update
 * @param {Object} data - The data to update for all selected bookings
 * @returns {Promise<Object>} The result of the bulk update operation
 */
async function bulkUpdateBookings(ids, data) {
    return await Booking.updateMany({_id: {$in: ids}}, {$set: data});
}

/**
 * Permanently deletes multiple bookings by their IDs
 * @param {Array<string>} ids - Array of booking IDs to delete
 * @returns {Promise<Object>} The result of the bulk delete operation
 */
async function bulkDeleteBookings(ids) {
    return await Booking.deleteMany({_id: {$in: ids}});
}

module.exports = {
    createBooking,
    getBookingById,
    getAllBookings,
    updateBooking,
    deleteBooking,
    restoreBooking,
    cancelBooking,
    completeBooking,
    markNoShow,
    updateBookingStatus,
    getBookingHistory,
    addGuestToBooking,
    removeGuestFromBooking,
    updateGuestInBooking,
    getGuestsForBooking,
    getBookingsByRoom,
    getBookingsByHotel,
    getBookingsByUser,
    getActiveBookingsByRoom,
    getBookingsByDateRange,
    updateSpecialRequests,
    updateCustomAttributes,
    getCustomAttributes,
    countBookingsByHotel,
    countActiveBookings,
    countBookingsByStatus,
    searchBookings,
    paginateBookings,
    isRoomBooked,
    getBookingByCode,
    getBookingsWithRefundPending,
    getCancelledBookings,
    getCompletedBookings,
    getNoShowBookings,
    getBookingsWithSpecialRequests,
    getBookingsWithNotes,
    getBookingPayment,
    updateBookingPayment,
    softDeleteBooking,
    bulkSoftDeleteBookings,
    bulkRestoreBookings,
    bulkUpdateBookings,
    bulkDeleteBookings
}