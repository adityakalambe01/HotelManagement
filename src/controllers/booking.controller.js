const {
    bookingService:{
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
} = require("../service");
const {pick, paramsPicker, reqQueryFilterOptionsPicker} = require("../utils");
const {asyncHandler} = require("../middlewares/asyncHandler.middleware");

/**
 * Creates a new booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body containing booking details
 * @param {string} req.body.userId - ID of the user making the booking
 * @param {string} req.body.roomId - ID of the room being booked
 * @param {Date} req.body.checkIn - Check-in date
 * @param {Date} req.body.checkOut - Check-out date
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Created booking object with 201 status
 * @throws {Error} If booking creation fails
 */
exports.createBooking = asyncHandler(async (req, res) => {
    const booking = await createBooking(req.body);
    return res.created(booking, "Booking created successfully.");
});

/**
 * Retrieves a booking by its ID
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - Booking ID to retrieve
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Booking object if found
 * @throws {Error} If booking is not found or retrieval fails
 */
exports.getBookingById = asyncHandler(async (req, res) => {
    const booking = await getBookingById(req.params.id);
    return res.ok(booking, "Booking retrieved successfully.");
});

/**
 * Retrieves all bookings with optional filtering
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering bookings
 * @param {string} [req.query.status] - Filter by booking status
 * @param {Date} [req.query.startDate] - Filter by start date
 * @param {Date} [req.query.endDate] - Filter by end date
 * @param {string} [req.query.hotelId] - Filter by hotel ID
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of booking objects
 * @throws {Error} If retrieval fails
 */
exports.getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await getAllBookings(req.query);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Updates an existing booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to update
 * @param {Object} req.body - Updated booking data
 * @param {Date} [req.body.checkIn] - New check-in date
 * @param {Date} [req.body.checkOut] - New check-out date
 * @param {string} [req.body.status] - New booking status
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object
 * @throws {Error} If booking update fails
 */
exports.updateBooking = asyncHandler(async (req, res) => {
    const booking = await updateBooking(req.params.id, req.body);
    return res.ok(booking, "Booking updated successfully.");
});

/**
 * Permanently deletes a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to delete
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Deleted booking object
 * @throws {Error} If booking deletion fails
 */
exports.deleteBooking = asyncHandler(async (req, res) => {
    const booking = await deleteBooking(req.params.id);
    return res.ok(booking, "Booking deleted successfully.");
});

/**
 * Restores a previously soft-deleted booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to restore
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Restored booking object
 * @throws {Error} If booking restoration fails
 */
exports.restoreBooking = asyncHandler(async (req, res) => {
    const booking = await restoreBooking(req.params.id);
    return res.ok(booking, "Booking restored successfully.");
});

/**
 * Cancels an existing booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to cancel
 * @param {Object} req.body - Request body containing cancellation details
 * @param {string} [req.body.reason] - Reason for cancellation
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Cancelled booking object
 * @throws {Error} If booking cancellation fails
 */
exports.cancelBooking = asyncHandler(async (req, res) => {
    const booking = await cancelBooking(req.params.id, req.body);
    return res.ok(booking, "Booking cancelled successfully.");
});

/**
 * Marks a booking as completed
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to complete
 * @param {Object} req.body - Request body containing completion details
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Completed booking object
 * @throws {Error} If booking completion fails
 */
exports.completeBooking = asyncHandler(async (req, res) => {
    const booking = await completeBooking(req.params.id, req.body);
    return res.ok(booking, "Booking completed successfully.");
});

/**
 * Marks a booking as no-show
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to mark as no-show
 * @param {Object} req.body - Request body
 * @param {string} req.body.userId - ID of the user marking the no-show
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object
 * @throws {Error} If marking no-show fails
 */
exports.markNoShow = asyncHandler(async (req, res) => {
    const booking = await markNoShow(req.params.id, req.body.userId);
    return res.ok(booking, "Booking marked as no-show successfully.");
});

/**
 * Updates the status of a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to update
 * @param {Object} req.body - Request body
 * @param {string} req.body.status - New status for the booking
 * @param {string} req.body.userId - ID of the user updating the status
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object
 * @throws {Error} If status update fails
 */
exports.updateBookingStatus = asyncHandler(async (req, res) => {
    const booking = await updateBookingStatus(req.params.id, req.body.status, req.body.userId);
    return res.ok(booking, "Booking status updated successfully.");
});

/**
 * Retrieves the history of changes for a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to get history for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of booking history records
 * @throws {Error} If history retrieval fails
 */
exports.getBookingHistory = asyncHandler(async (req, res) => {
    const history = await getBookingHistory(req.params.id);
    return res.ok(history, "Booking history retrieved successfully.");
});

/**
 * Adds a guest to an existing booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking
 * @param {Object} req.body - Guest information
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object with new guest
 * @throws {Error} If adding guest fails
 */
exports.addGuestToBooking = asyncHandler(async (req, res) => {
    const booking = await addGuestToBooking(req.params.id, req.body);
    return res.ok(booking, "Guest added to booking successfully.");
});

/**
 * Removes a guest from a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking
 * @param {Object} req.body - Request body
 * @param {string} req.body.guestId - ID of the guest to remove
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object
 * @throws {Error} If removing guest fails
 */
exports.removeGuestFromBooking = asyncHandler(async (req, res) => {
    const booking = await removeGuestFromBooking(req.params.id, req.body.guestId);
    return res.ok(booking, "Guest removed from booking successfully.");
});

/**
 * Updates guest information in a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking
 * @param {Object} req.body - Request body
 * @param {string} req.body.guestId - ID of the guest to update
 * @param {Object} req.body.guestData - Updated guest information
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of the update operation
 * @throws {Error} If updating guest fails
 */
exports.updateGuestInBooking = asyncHandler(async (req, res) => {
    const result = await updateGuestInBooking(req.params.id, req.body.guestId, req.body.guestData);
    return res.ok(result, "Guest updated in booking successfully.");
});

/**
 * Retrieves all guests associated with a specific booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to get guests for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of guest objects associated with the booking
 * @throws {Error} If guest retrieval fails
 */
exports.getGuestsForBooking = asyncHandler(async (req, res) => {
    const guests = await getGuestsForBooking(req.params.id);
    return res.ok(guests, "Guests retrieved successfully.");
});

/**
 * Retrieves all bookings for a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.roomId - ID of the room to get bookings for
 * @param {Object} req.query - Query parameters for filtering bookings
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of booking objects for the specified room
 * @throws {Error} If booking retrieval fails
 */
exports.getBookingsByRoom = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByRoom(req.params.roomId, req.query);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves all bookings for a specific hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of the hotel to get bookings for
 * @param {Object} req.query - Query parameters for filtering bookings
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of booking objects for the specified hotel
 * @throws {Error} If booking retrieval fails
 */
exports.getBookingsByHotel = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByHotel(req.params.hotelId, req.query);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves all bookings for a specific user
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.userId - ID of the user to get bookings for
 * @param {Object} req.query - Query parameters for filtering bookings
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of booking objects for the specified user
 * @throws {Error} If booking retrieval fails
 */
exports.getBookingsByUser = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByUser(req.params.userId, req.query);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves all active bookings for a specific room
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.roomId - ID of the room to get active bookings for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of active booking objects for the specified room
 * @throws {Error} If booking retrieval fails
 */
exports.getActiveBookingsByRoom = asyncHandler(async (req, res) => {
    const bookings = await getActiveBookingsByRoom(req.params.roomId);
    return res.ok(bookings, "Active bookings retrieved successfully.");
});

/**
 * Retrieves bookings for a specific hotel within a date range
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of the hotel to get bookings for
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.startDate - Start date for the range
 * @param {string} req.query.endDate - End date for the range
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of bookings within the specified date range
 * @throws {Error} If booking retrieval fails
 */
exports.getBookingsByDateRange = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByDateRange(req.params.hotelId, req.query.startDate, req.query.endDate);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Updates special requests for a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking
 * @param {Object} req.body - Request body
 * @param {Array} req.body.requests - Array of special requests
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object
 * @throws {Error} If updating special requests fails
 */
exports.updateSpecialRequests = asyncHandler(async (req, res) => {
    const booking = await updateSpecialRequests(req.params.id, req.body.requests);
    return res.ok(booking, "Special requests updated successfully.");
});

/**
 * Updates custom attributes for a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking
 * @param {Object} req.body - Request body
 * @param {Object} req.body.attributes - Custom attributes to update
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object
 * @throws {Error} If updating custom attributes fails
 */
exports.updateCustomAttributes = asyncHandler(async (req, res) => {
    const booking = await updateCustomAttributes(req.params.id, req.body.attributes);
    return res.ok(booking, "Custom attributes updated successfully.");
});

/**
 * Retrieves custom attributes for a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to get attributes for
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Custom attributes for the booking
 * @throws {Error} If attribute retrieval fails
 */
exports.getCustomAttributes = asyncHandler(async (req, res) => {
    const attributes = await getCustomAttributes(req.params.id);
    return res.ok(attributes, "Custom attributes retrieved successfully.");
});

/**
 * Counts total bookings for a hotel with optional filters
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of the hotel to count bookings for
 * @param {Object} req.query - Query parameters for filtering
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Object containing the booking count
 * @throws {Error} If counting bookings fails
 */
exports.countBookingsByHotel = asyncHandler(async (req, res) => {
    const count = await countBookingsByHotel(req.params.hotelId, req.query);
    return res.ok({count}, "Count retrieved successfully.");
});

/**
 * Counts active bookings for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of the hotel to count active bookings for
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Object containing the active booking count
 * @throws {Error} If counting active bookings fails
 */
exports.countActiveBookings = asyncHandler(async (req, res) => {
    const count = await countActiveBookings(req.params.hotelId);
    return res.ok({count}, "Count retrieved successfully.");
});

/**
 * Counts bookings by status for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of the hotel to count bookings for
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.status - Booking status to count
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Object containing the booking count for the status
 * @throws {Error} If counting bookings fails
 */
exports.countBookingsByStatus = asyncHandler(async (req, res) => {
    const count = await countBookingsByStatus(req.params.hotelId, req.query.status);
    return res.ok({count}, "Count retrieved successfully.");
});

/**
 * Searches bookings based on query parameters
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for searching bookings
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of booking objects matching search criteria
 * @throws {Error} If searching bookings fails
 */
exports.searchBookings = asyncHandler(async (req, res) => {
    const bookings = await searchBookings(req.query);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Paginates bookings with filtering options
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters for filtering and pagination
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Paginated booking results
 * @throws {Error} If paginating bookings fails
 */
exports.paginateBookings = asyncHandler(async (req, res) => {
    const {filter, options} = reqQueryFilterOptionsPicker(req);
    const result = await paginateBookings(filter, options);
    return res.ok(result, "Bookings retrieved successfully.");
});

/**
 * Checks if a room is booked for given dates
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.roomId - ID of the room to check
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.startDate - Start date to check
 * @param {string} req.query.endDate - End date to check
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Object indicating if room is booked
 * @throws {Error} If checking room availability fails
 */
exports.isRoomBooked = asyncHandler(async (req, res) => {
    const isBooked = await isRoomBooked(req.params.roomId, {start: req.query.startDate, end: req.query.endDate});
    return res.ok({isBooked}, "Room booked status retrieved successfully.");
});

/**
 * Retrieves a booking by its booking code
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.bookingCode - Booking code to look up
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Retrieved booking object
 * @throws {Error} If booking retrieval fails
 */
exports.getBookingByCode = asyncHandler(async (req, res) => {
    const booking = await getBookingByCode(req.params.bookingCode);
    return res.ok(booking, "Booking retrieved successfully.");
});

/**
 * Retrieves all bookings with pending refunds for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of hotel to get refund pending bookings for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of bookings with pending refunds
 * @throws {Error} If booking retrieval fails
 */
exports.getBookingsWithRefundPending = asyncHandler(async (req, res) => {
    const bookings = await getBookingsWithRefundPending(req.params.hotelId);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves all cancelled bookings for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of hotel to get cancelled bookings for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of cancelled booking objects
 * @throws {Error} If booking retrieval fails
 */
exports.getCancelledBookings = asyncHandler(async (req, res) => {
    const bookings = await getCancelledBookings(req.params.hotelId);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves all completed bookings for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of hotel to get completed bookings for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of completed booking objects
 * @throws {Error} If booking retrieval fails
 */
exports.getCompletedBookings = asyncHandler(async (req, res) => {
    const bookings = await getCompletedBookings(req.params.hotelId);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves all no-show bookings for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of hotel to get no-show bookings for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of no-show booking objects
 * @throws {Error} If booking retrieval fails
 */
exports.getNoShowBookings = asyncHandler(async (req, res) => {
    const bookings = await getNoShowBookings(req.params.hotelId);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves bookings with special requests for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of the hotel to get bookings with special requests for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of bookings with special requests
 * @throws {Error} If retrieval fails
 */
exports.getBookingsWithSpecialRequests = asyncHandler(async (req, res) => {
    const bookings = await getBookingsWithSpecialRequests(req.params.hotelId);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves bookings with notes for a hotel
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.hotelId - ID of the hotel to get bookings with notes for
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of bookings with notes
 * @throws {Error} If retrieval fails
 */
exports.getBookingsWithNotes = asyncHandler(async (req, res) => {
    const bookings = await getBookingsWithNotes(req.params.hotelId);
    return res.ok(bookings, "Bookings retrieved successfully.");
});

/**
 * Retrieves payment information for a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to get payment for
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Booking payment information
 * @throws {Error} If payment retrieval fails
 */
exports.getBookingPayment = asyncHandler(async (req, res) => {
    const payment = await getBookingPayment(req.params.id);
    return res.ok(payment, "Booking payment retrieved successfully.");
});

/**
 * Updates payment information for a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to update payment for
 * @param {Object} req.body - Request body
 * @param {string} req.body.paymentId - ID of the new payment
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated booking object
 * @throws {Error} If payment update fails
 */
exports.updateBookingPayment = asyncHandler(async (req, res) => {
    const booking = await updateBookingPayment(req.params.id, req.body.paymentId);
    return res.ok(booking, "Booking payment updated successfully.");
});

/**
 * Soft deletes a booking
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - ID of the booking to soft delete
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of the soft delete operation
 * @throws {Error} If soft delete fails
 */
exports.softDeleteBooking = asyncHandler(async (req, res) => {
    const result = await softDeleteBooking(req.params.id);
    return res.ok(result, "Booking soft deleted successfully.");
});

/**
 * Bulk soft deletes multiple bookings
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {Array<string>} req.body.ids - Array of booking IDs to soft delete
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of the bulk soft delete operation
 * @throws {Error} If bulk soft delete fails
 */
exports.bulkSoftDeleteBookings = asyncHandler(async (req, res) => {
    const result = await bulkSoftDeleteBookings(req.body.ids);
    return res.ok(result, "Bookings soft deleted successfully.");
});

/**
 * Restores multiple soft-deleted bookings
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {Array<string>} req.body.ids - Array of booking IDs to restore
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of the bulk restore operation
 * @throws {Error} If bulk restore fails
 */
exports.bulkRestoreBookings = asyncHandler(async (req, res) => {
    const result = await bulkRestoreBookings(req.body.ids);
    return res.ok(result, "Bookings restored successfully.");
});

/**
 * Updates multiple bookings in bulk
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {Array<string>} req.body.ids - Array of booking IDs to update
 * @param {Object} req.body.data - Data to update for all specified bookings
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of the bulk update operation
 * @throws {Error} If bulk update fails
 */
exports.bulkUpdateBookings = asyncHandler(async (req, res) => {
    const result = await bulkUpdateBookings(req.body.ids, req.body.data);
    return res.ok(result, "Bookings updated successfully.");
});

/**
 * Permanently deletes multiple bookings
 * @async
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {Array<string>} req.body.ids - Array of booking IDs to delete
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Result of the bulk delete operation
 * @throws {Error} If bulk deletion fails
 */
exports.bulkDeleteBookings = asyncHandler(async (req, res) => {
    const result = await bulkDeleteBookings(req.body.ids);
    return res.ok(result, "Bookings deleted successfully.");
});
