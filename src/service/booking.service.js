const {
    bookingRepository:{
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
} = require("../repository");
const { ApiError } = require("../utils");
const { httpCodes } = require("../config");

/**
 * Creates a new booking
 * @param {Object} data - The booking data
 * @returns {Promise<Object>} The created booking
 * @throws {ApiError} If booking creation fails
 */
exports.createBooking = async (data) => {
    const booking = await createBooking(data);
    if (!booking) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Booking creation failed");
    return booking;
}

/**
 * Gets a booking by ID
 * @param {string} id - The booking ID
 * @returns {Promise<Object>} The booking
 * @throws {ApiError} If booking is not found
 */
exports.getBookingById = async (id) => {
    const booking = await getBookingById(id);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found");
    return booking;
}

/**
 * Gets all bookings
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Query options like sort, limit etc
 * @returns {Promise<Array>} Array of bookings
 */
exports.getAllBookings = async (filter = {}, options = {}) => {
    return await getAllBookings(filter, options);
}

/**
 * Updates a booking
 * @param {string} id - The booking ID
 * @param {Object} data - The update data
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or update fails
 */
exports.updateBooking = async (id, data) => {
    const booking = await updateBooking(id, data);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update failed");
    return booking;
}

/**
 * Deletes a booking by ID
 * @param {string} id - The booking ID
 * @returns {Promise<Object>} The deleted booking
 * @throws {ApiError} If booking is not found or delete fails
 */
exports.deleteBooking = async (id) => {
    const booking = await deleteBooking(id);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or delete failed");
    return booking;
}

/**
 * Restores a previously deleted booking
 * @param {string} id - The booking ID
 * @returns {Promise<Object>} The restored booking
 * @throws {ApiError} If booking is not found or restore fails
 */
exports.restoreBooking = async (id) => {
    const booking = await restoreBooking(id);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or restore failed");
    return booking;
}

/**
 * Cancels a booking
 * @param {string} id - The booking ID
 * @param {Object} cancellationDetails - Details about the cancellation
 * @returns {Promise<Object>} The cancelled booking
 * @throws {ApiError} If booking is not found or cancel fails
 */
exports.cancelBooking = async (id, cancellationDetails) => {
    const booking = await cancelBooking(id, cancellationDetails);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or cancel failed");
    return booking;
}

/**
 * Marks a booking as complete
 * @param {string} id - The booking ID
 * @param {Object} completedDetails - Details about completion
 * @returns {Promise<Object>} The completed booking
 * @throws {ApiError} If booking is not found or complete fails
 */
exports.completeBooking = async (id, completedDetails) => {
    const booking = await completeBooking(id, completedDetails);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or complete failed");
    return booking;
}

/**
 * Marks a booking as no-show
 * @param {string} id - The booking ID
 * @param {string} userId - ID of user marking the no-show
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or marking no-show fails
 */
exports.markNoShow = async (id, userId) => {
    const booking = await markNoShow(id, userId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or mark no-show failed");
    return booking;
}

/**
 * Updates the status of a booking
 * @param {string} id - The booking ID
 * @param {string} status - New status to set
 * @param {string} userId - ID of user updating the status
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or status update fails
 */
exports.updateBookingStatus = async (id, status, userId) => {
    const booking = await updateBookingStatus(id, status, userId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or status update failed");
    return booking;
}

/**
 * Gets the history of changes for a booking
 * @param {string} id - The booking ID
 * @returns {Promise<Array>} Array of booking history records
 */
exports.getBookingHistory = async (id) => {
    return await getBookingHistory(id);
}

/**
 * Adds a guest to an existing booking
 * @param {string} bookingId - The booking ID
 * @param {Object} guestData - Guest information to add
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or adding guest fails
 */
exports.addGuestToBooking = async (bookingId, guestData) => {
    const booking = await addGuestToBooking(bookingId, guestData);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or add guest failed");
    return booking;
}

/**
 * Removes a guest from an existing booking
 * @param {string} bookingId - The booking ID
 * @param {string} guestId - ID of the guest to remove
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or removing guest fails
 */
exports.removeGuestFromBooking = async (bookingId, guestId) => {
    const booking = await removeGuestFromBooking(bookingId, guestId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or remove guest failed");
    return booking;
}

/**
 * Updates guest information in an existing booking
 * @param {string} bookingId - The booking ID
 * @param {string} guestId - ID of the guest to update
 * @param {Object} guestData - Updated guest information
 * @returns {Promise<Object>} The update result
 * @throws {ApiError} If booking or guest is not found or update fails
 */
exports.updateGuestInBooking = async (bookingId, guestId, guestData) => {
    const result = await updateGuestInBooking(bookingId, guestId, guestData);
    if (!result?.modifiedCount) throw new ApiError(httpCodes.NOT_FOUND, "Booking or guest not found or update failed");
    return result;
}

/**
 * Gets all guests associated with a booking
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Array>} Array of guests associated with the booking
 */
exports.getGuestsForBooking = async (bookingId) => {
    return await getGuestsForBooking(bookingId);
}

/**
 * Gets all bookings for a specific room
 * @param {string} roomId - The room ID
 * @param {Object} filter - Filter criteria
 * @returns {Promise<Array>} Array of bookings for the room
 */
exports.getBookingsByRoom = async (roomId, filter = {}) => {
    return await getBookingsByRoom(roomId, filter);
}

/**
 * Gets bookings for a specific hotel
 * @param {string} hotelId - The hotel ID
 * @param {Object} filter - Filter criteria
 * @returns {Promise<Array>} Array of bookings for the hotel
 */
exports.getBookingsByHotel = async (hotelId, filter = {}) => {
    return await getBookingsByHotel(hotelId, filter);
}

/**
 * Gets bookings for a specific user
 * @param {string} userId - The user ID
 * @param {Object} filter - Filter criteria
 * @returns {Promise<Array>} Array of bookings for the user
 */
exports.getBookingsByUser = async (userId, filter = {}) => {
    return await getBookingsByUser(userId, filter);
}

/**
 * Gets active bookings for a specific room
 * @param {string} roomId - The room ID
 * @returns {Promise<Array>} Array of active bookings for the room
 */
exports.getActiveBookingsByRoom = async (roomId) => {
    return await getActiveBookingsByRoom(roomId);
}

/**
 * Gets bookings within a date range for a hotel
 * @param {string} hotelId - The hotel ID
 * @param {Date} startDate - Start date of range
 * @param {Date} endDate - End date of range
 * @returns {Promise<Array>} Array of bookings within date range
 */
exports.getBookingsByDateRange = async (hotelId, startDate, endDate) => {
    return await getBookingsByDateRange(hotelId, startDate, endDate);
}

/**
 * Updates special requests for a booking
 * @param {string} id - The booking ID
 * @param {Object} requests - Special requests to update
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or update fails
 */
exports.updateSpecialRequests = async (id, requests) => {
    const booking = await updateSpecialRequests(id, requests);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update special requests failed");
    return booking;
}

/**
 * Updates custom attributes for a booking
 * @param {string} id - The booking ID
 * @param {Object} attributes - Custom attributes to update
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or update fails
 */
exports.updateCustomAttributes = async (id, attributes) => {
    const booking = await updateCustomAttributes(id, attributes);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update custom attributes failed");
    return booking;
}

/**
 * Gets custom attributes for a booking
 * @param {string} id - The booking ID
 * @returns {Promise<Object>} Custom attributes for the booking
 */
exports.getCustomAttributes = async (id) => {
    return await getCustomAttributes(id);
}

/**
 * Counts bookings for a specific hotel
 * @param {string} hotelId - The hotel ID
 * @param {Object} filter - Filter criteria
 * @returns {Promise<number>} Number of bookings matching criteria
 */
exports.countBookingsByHotel = async (hotelId, filter = {}) => {
    return await countBookingsByHotel(hotelId, filter);
}

/**
 * Counts active bookings for a hotel
 * @param {string} hotelId - The hotel ID
 * @returns {Promise<number>} Number of active bookings
 */
exports.countActiveBookings = async (hotelId) => {
    return await countActiveBookings(hotelId);
}

/**
 * Counts bookings by status for a hotel
 * @param {string} hotelId - The hotel ID
 * @param {string} status - Status to count bookings for
 * @returns {Promise<number>} Number of bookings with given status
 */
exports.countBookingsByStatus = async (hotelId, status) => {
    return await countBookingsByStatus(hotelId, status);
}

/**
 * Searches bookings based on query criteria
 * @param {Object} query - Search query parameters
 * @param {Object} options - Search options like sort, limit etc
 * @returns {Promise<Array>} Array of matching bookings
 */
exports.searchBookings = async (query, options = {}) => {
    return await searchBookings(query, options);
}

/**
 * Gets paginated list of bookings
 * @param {Object} filter - Filter criteria
 * @param {Object} options - Pagination options like page, limit etc
 * @returns {Promise<Object>} Paginated results with bookings data
 */
exports.paginateBookings = async (filter = {}, options = {}) => {
    return await paginateBookings(filter, options);
}

/**
 * Checks if a room is booked for a given date range
 * @param {string} roomId - The room ID
 * @param {Object} dateRange - Date range to check availability
 * @returns {Promise<boolean>} True if room is booked, false otherwise
 */
exports.isRoomBooked = async (roomId, dateRange) => {
    return await isRoomBooked(roomId, dateRange);
}

/**
 * Gets a booking by its booking code
 * @param {string} bookingCode - The booking code
 * @returns {Promise<Object>} The booking
 * @throws {ApiError} If booking is not found by code
 */
exports.getBookingByCode = async (bookingCode) => {
    const booking = await getBookingByCode(bookingCode);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found by code");
    return booking;
}

/**
 * Gets all bookings with pending refunds for a hotel
 * @param {string} hotelId - The hotel ID
 * @returns {Promise<Array>} Array of bookings with refund pending
 */
exports.getBookingsWithRefundPending = async (hotelId) => {
    return await getBookingsWithRefundPending(hotelId);
}

/**
 * Gets all cancelled bookings for a hotel
 * @param {string} hotelId - The hotel ID
 * @returns {Promise<Array>} Array of cancelled bookings
 */
exports.getCancelledBookings = async (hotelId) => {
    return await getCancelledBookings(hotelId);
}

/**
 * Gets all completed bookings for a hotel
 * @param {string} hotelId - The hotel ID
 * @returns {Promise<Array>} Array of completed bookings
 */
exports.getCompletedBookings = async (hotelId) => {
    return await getCompletedBookings(hotelId);
}

/**
 * Gets all no-show bookings for a hotel
 * @param {string} hotelId - The hotel ID
 * @returns {Promise<Array>} Array of no-show bookings
 */
exports.getNoShowBookings = async (hotelId) => {
    return await getNoShowBookings(hotelId);
}

/**
 * Gets all bookings with special requests for a hotel
 * @param {string} hotelId - The hotel ID
 * @returns {Promise<Array>} Array of bookings with special requests
 */
exports.getBookingsWithSpecialRequests = async (hotelId) => {
    return await getBookingsWithSpecialRequests(hotelId);
}

/**
 * Gets all bookings with notes for a hotel
 * @param {string} hotelId - The hotel ID
 * @returns {Promise<Array>} Array of bookings with notes
 */
exports.getBookingsWithNotes = async (hotelId) => {
    return await getBookingsWithNotes(hotelId);
}

/**
 * Gets payment details for a booking
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Object>} Payment details for the booking
 */
exports.getBookingPayment = async (bookingId) => {
    return await getBookingPayment(bookingId);
}

/**
 * Updates payment information for a booking
 * @param {string} bookingId - The booking ID
 * @param {string} paymentId - ID of the payment to associate
 * @returns {Promise<Object>} The updated booking
 * @throws {ApiError} If booking is not found or update fails
 */
exports.updateBookingPayment = async (bookingId, paymentId) => {
    const booking = await updateBookingPayment(bookingId, paymentId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update payment failed");
    return booking;
}

/**
 * Soft deletes a booking by ID
 * @param {string} id - The booking ID
 * @returns {Promise<Object>} The soft deleted booking
 * @throws {ApiError} If booking is not found or soft delete fails
 */
exports.softDeleteBooking = async (id) => {
    const result = await softDeleteBooking(id);
    if (!result) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or soft delete failed");
    return result;
}

/**
 * Soft deletes multiple bookings by IDs
 * @param {Array<string>} ids - Array of booking IDs to soft delete
 * @returns {Promise<Object>} Result of bulk soft delete operation
 * @throws {ApiError} If bulk soft delete fails
 */
exports.bulkSoftDeleteBookings = async (ids) => {
    const result = await bulkSoftDeleteBookings(ids);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk soft delete failed");
    return result;
}

/**
 * Restores multiple deleted bookings by IDs
 * @param {Array<string>} ids - Array of booking IDs to restore
 * @returns {Promise<Object>} Result of bulk restore operation
 * @throws {ApiError} If bulk restore fails
 */
exports.bulkRestoreBookings = async (ids) => {
    const result = await bulkRestoreBookings(ids);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk restore failed");
    return result;
}

/**
 * Updates multiple bookings by IDs with provided data
 * @param {Array<string>} ids - Array of booking IDs to update
 * @param {Object} data - Data to update the bookings with
 * @returns {Promise<Object>} Result of bulk update operation
 * @throws {ApiError} If bulk update fails
 */
exports.bulkUpdateBookings = async (ids, data) => {
    const result = await bulkUpdateBookings(ids, data);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk update failed");
    return result;
}

/**
 * Permanently deletes multiple bookings by IDs
 * @param {Array<string>} ids - Array of booking IDs to delete
 * @returns {Promise<Object>} Result of bulk delete operation
 * @throws {ApiError} If bulk delete fails
 */
exports.bulkDeleteBookings = async (ids) => {
    const result = await bulkDeleteBookings(ids);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk delete failed");
    return result;
}

