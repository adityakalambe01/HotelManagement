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

// Create Booking
exports.createBooking =async (data) => {
    const booking = await createBooking(data);
    if (!booking) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Booking creation failed");
    return booking;
}

// Get Booking by ID
async function getBookingById(id) {
    const booking = await getBookingById(id);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found");
    return booking;
}

// Get All Bookings
async function getAllBookings(filter = {}, options = {}) {
    return await getAllBookings(filter, options);
}

// Update Booking
async function updateBooking(id, data) {
    const booking = await updateBooking(id, data);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update failed");
    return booking;
}

// Delete Booking
async function deleteBooking(id) {
    const booking = await deleteBooking(id);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or delete failed");
    return booking;
}

// Restore Booking
async function restoreBooking(id) {
    const booking = await restoreBooking(id);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or restore failed");
    return booking;
}

// Cancel Booking
async function cancelBooking(id, cancellationDetails) {
    const booking = await cancelBooking(id, cancellationDetails);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or cancel failed");
    return booking;
}

// Complete Booking
async function completeBooking(id, completedDetails) {
    const booking = await completeBooking(id, completedDetails);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or complete failed");
    return booking;
}

// Mark No Show
async function markNoShow(id, userId) {
    const booking = await markNoShow(id, userId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or mark no-show failed");
    return booking;
}

// Update Booking Status
async function updateBookingStatus(id, status, userId) {
    const booking = await updateBookingStatus(id, status, userId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or status update failed");
    return booking;
}

// Get Booking History
async function getBookingHistory(id) {
    return await getBookingHistory(id);
}

// Add Guest to Booking
async function addGuestToBooking(bookingId, guestData) {
    const booking = await addGuestToBooking(bookingId, guestData);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or add guest failed");
    return booking;
}

// Remove Guest from Booking
async function removeGuestFromBooking(bookingId, guestId) {
    const booking = await removeGuestFromBooking(bookingId, guestId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or remove guest failed");
    return booking;
}

// Update Guest in Booking
async function updateGuestInBooking(bookingId, guestId, guestData) {
    const result = await updateGuestInBooking(bookingId, guestId, guestData);
    if (!result?.modifiedCount) throw new ApiError(httpCodes.NOT_FOUND, "Booking or guest not found or update failed");
    return result;
}

// Get Guests for Booking
async function getGuestsForBooking(bookingId) {
    return await getGuestsForBooking(bookingId);
}

// Get Bookings by Room
async function getBookingsByRoom(roomId, filter = {}) {
    return await getBookingsByRoom(roomId, filter);
}

// Get Bookings by Hotel
async function getBookingsByHotel(hotelId, filter = {}) {
    return await getBookingsByHotel(hotelId, filter);
}

// Get Bookings by User
async function getBookingsByUser(userId, filter = {}) {
    return await getBookingsByUser(userId, filter);
}

// Get Active Bookings by Room
async function getActiveBookingsByRoom(roomId) {
    return await getActiveBookingsByRoom(roomId);
}

// Get Bookings by Date Range
async function getBookingsByDateRange(hotelId, startDate, endDate) {
    return await getBookingsByDateRange(hotelId, startDate, endDate);
}

// Update Special Requests
async function updateSpecialRequests(id, requests) {
    const booking = await updateSpecialRequests(id, requests);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update special requests failed");
    return booking;
}

// Update Custom Attributes
async function updateCustomAttributes(id, attributes) {
    const booking = await updateCustomAttributes(id, attributes);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update custom attributes failed");
    return booking;
}

// Get Custom Attributes
async function getCustomAttributes(id) {
    return await getCustomAttributes(id);
}

// Count Bookings by Hotel
async function countBookingsByHotel(hotelId, filter = {}) {
    return await countBookingsByHotel(hotelId, filter);
}

// Count Active Bookings
async function countActiveBookings(hotelId) {
    return await countActiveBookings(hotelId);
}

// Count Bookings by Status
async function countBookingsByStatus(hotelId, status) {
    return await countBookingsByStatus(hotelId, status);
}

// Search Bookings
async function searchBookings(query, options = {}) {
    return await searchBookings(query, options);
}

// Paginate Bookings
async function paginateBookings(filter = {}, options = {}) {
    return await paginateBookings(filter, options);
}

// Is Room Booked
async function isRoomBooked(roomId, dateRange) {
    return await isRoomBooked(roomId, dateRange);
}

// Get Booking by Code
async function getBookingByCode(bookingCode) {
    const booking = await getBookingByCode(bookingCode);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found by code");
    return booking;
}

// Get Bookings with Refund Pending
async function getBookingsWithRefundPending(hotelId) {
    return await getBookingsWithRefundPending(hotelId);
}

// Get Cancelled Bookings
async function getCancelledBookings(hotelId) {
    return await getCancelledBookings(hotelId);
}

// Get Completed Bookings
async function getCompletedBookings(hotelId) {
    return await getCompletedBookings(hotelId);
}

// Get No Show Bookings
async function getNoShowBookings(hotelId) {
    return await getNoShowBookings(hotelId);
}

// Get Bookings with Special Requests
async function getBookingsWithSpecialRequests(hotelId) {
    return await getBookingsWithSpecialRequests(hotelId);
}

// Get Bookings with Notes
async function getBookingsWithNotes(hotelId) {
    return await getBookingsWithNotes(hotelId);
}

// Get Booking Payment
async function getBookingPayment(bookingId) {
    return await getBookingPayment(bookingId);
}

// Update Booking Payment
async function updateBookingPayment(bookingId, paymentId) {
    const booking = await updateBookingPayment(bookingId, paymentId);
    if (!booking) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or update payment failed");
    return booking;
}

// Soft Delete Booking
async function softDeleteBooking(id) {
    const result = await softDeleteBooking(id);
    if (!result) throw new ApiError(httpCodes.NOT_FOUND, "Booking not found or soft delete failed");
    return result;
}

// Bulk Soft Delete Bookings
async function bulkSoftDeleteBookings(ids) {
    const result = await bulkSoftDeleteBookings(ids);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk soft delete failed");
    return result;
}

// Bulk Restore Bookings
async function bulkRestoreBookings(ids) {
    const result = await bulkRestoreBookings(ids);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk restore failed");
    return result;
}

// Bulk Update Bookings
async function bulkUpdateBookings(ids, data) {
    const result = await bulkUpdateBookings(ids, data);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk update failed");
    return result;
}

// Bulk Delete Bookings
async function bulkDeleteBookings(ids) {
    const result = await bulkDeleteBookings(ids);
    if (!result) throw new ApiError(httpCodes.INTERNAL_SERVER_ERROR, "Bulk delete failed");
    return result;
}

module.exports = {
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
};
