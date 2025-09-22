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

// Create Booking
exports.createBooking = asyncHandler(async (req, res) => {
    const booking = await createBooking(req.body);
    res.status(201).json(booking);
});

// Get Booking by ID
exports.getBookingById = asyncHandler(async (req, res) => {
    const booking = await getBookingById(req.params.id);
    res.json(booking);
});

// Get All Bookings
exports.getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await getAllBookings(req.query);
    res.json(bookings);
});

// Update Booking
exports.updateBooking = asyncHandler(async (req, res) => {
    const booking = await updateBooking(req.params.id, req.body);
    res.json(booking);
});

// Delete Booking
exports.deleteBooking = asyncHandler(async (req, res) => {
    const booking = await deleteBooking(req.params.id);
    res.json(booking);
});

// Restore Booking
exports.restoreBooking = asyncHandler(async (req, res) => {
    const booking = await restoreBooking(req.params.id);
    res.json(booking);
});

// Cancel Booking
exports.cancelBooking = asyncHandler(async (req, res) => {
    const booking = await cancelBooking(req.params.id, req.body);
    res.json(booking);
});

// Complete Booking
exports.completeBooking = asyncHandler(async (req, res) => {
    const booking = await completeBooking(req.params.id, req.body);
    res.json(booking);
});

// Mark No Show
exports.markNoShow = asyncHandler(async (req, res) => {
    const booking = await markNoShow(req.params.id, req.body.userId);
    res.json(booking);
});

// Update Booking Status
exports.updateBookingStatus = asyncHandler(async (req, res) => {
    const booking = await updateBookingStatus(req.params.id, req.body.status, req.body.userId);
    res.json(booking);
});

// Get Booking History
exports.getBookingHistory = asyncHandler(async (req, res) => {
    const history = await getBookingHistory(req.params.id);
    res.json(history);
});

// Add Guest to Booking
exports.addGuestToBooking = asyncHandler(async (req, res) => {
    const booking = await addGuestToBooking(req.params.id, req.body);
    res.json(booking);
});

// Remove Guest from Booking
exports.removeGuestFromBooking = asyncHandler(async (req, res) => {
    const booking = await removeGuestFromBooking(req.params.id, req.body.guestId);
    res.json(booking);
});

// Update Guest in Booking
exports.updateGuestInBooking = asyncHandler(async (req, res) => {
    const result = await updateGuestInBooking(req.params.id, req.body.guestId, req.body.guestData);
    res.json(result);
});

// Get Guests for Booking
exports.getGuestsForBooking = asyncHandler(async (req, res) => {
    const guests = await getGuestsForBooking(req.params.id);
    res.json(guests);
});

// Get Bookings by Room
exports.getBookingsByRoom = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByRoom(req.params.roomId, req.query);
    res.json(bookings);
});

// Get Bookings by Hotel
exports.getBookingsByHotel = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByHotel(req.params.hotelId, req.query);
    res.json(bookings);
});

// Get Bookings by User
exports.getBookingsByUser = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByUser(req.params.userId, req.query);
    res.json(bookings);
});

// Get Active Bookings by Room
exports.getActiveBookingsByRoom = asyncHandler(async (req, res) => {
    const bookings = await getActiveBookingsByRoom(req.params.roomId);
    res.json(bookings);
});

// Get Bookings by Date Range
exports.getBookingsByDateRange = asyncHandler(async (req, res) => {
    const bookings = await getBookingsByDateRange(req.params.hotelId, req.query.startDate, req.query.endDate);
    res.json(bookings);
});

// Update Special Requests
exports.updateSpecialRequests = asyncHandler(async (req, res) => {
    const booking = await updateSpecialRequests(req.params.id, req.body.requests);
    res.json(booking);
});

// Update Custom Attributes
exports.updateCustomAttributes = asyncHandler(async (req, res) => {
    const booking = await updateCustomAttributes(req.params.id, req.body.attributes);
    res.json(booking);
});

// Get Custom Attributes
exports.getCustomAttributes = asyncHandler(async (req, res) => {
    const attributes = await getCustomAttributes(req.params.id);
    res.json(attributes);
});

// Count Bookings by Hotel
exports.countBookingsByHotel = asyncHandler(async (req, res) => {
    const count = await countBookingsByHotel(req.params.hotelId, req.query);
    res.json({count});
});

// Count Active Bookings
exports.countActiveBookings = asyncHandler(async (req, res) => {
    const count = await countActiveBookings(req.params.hotelId);
    res.json({count});
});

// Count Bookings by Status
exports.countBookingsByStatus = asyncHandler(async (req, res) => {
    const count = await countBookingsByStatus(req.params.hotelId, req.query.status);
    res.json({count});
});

// Search Bookings
exports.searchBookings = asyncHandler(async (req, res) => {
    const bookings = await searchBookings(req.query);
    res.json(bookings);
});

// Paginate Bookings
exports.paginateBookings = asyncHandler(async (req, res) => {
    const result = await paginateBookings(req.query);
    res.json(result);
});

// Is Room Booked
exports.isRoomBooked = asyncHandler(async (req, res) => {
    const isBooked = await isRoomBooked(req.params.roomId, {start: req.query.startDate, end: req.query.endDate});
    res.json({isBooked});
});

// Get Booking by Code
exports.getBookingByCode = asyncHandler(async (req, res) => {
    const booking = await getBookingByCode(req.params.bookingCode);
    res.json(booking);
});

// Get Bookings with Refund Pending
exports.getBookingsWithRefundPending = asyncHandler(async (req, res) => {
    const bookings = await getBookingsWithRefundPending(req.params.hotelId);
    res.json(bookings);
});

// Get Cancelled Bookings
exports.getCancelledBookings = asyncHandler(async (req, res) => {
    const bookings = await getCancelledBookings(req.params.hotelId);
    res.json(bookings);
});

// Get Completed Bookings
exports.getCompletedBookings = asyncHandler(async (req, res) => {
    const bookings = await getCompletedBookings(req.params.hotelId);
    res.json(bookings);
});

// Get No Show Bookings
exports.getNoShowBookings = asyncHandler(async (req, res) => {
    const bookings = await getNoShowBookings(req.params.hotelId);
    res.json(bookings);
});

// Get Bookings with Special Requests
exports.getBookingsWithSpecialRequests = asyncHandler(async (req, res) => {
    const bookings = await getBookingsWithSpecialRequests(req.params.hotelId);
    res.json(bookings);
});

// Get Bookings with Notes
exports.getBookingsWithNotes = asyncHandler(async (req, res) => {
    const bookings = await getBookingsWithNotes(req.params.hotelId);
    res.json(bookings);
});

// Get Booking Payment
exports.getBookingPayment = asyncHandler(async (req, res) => {
    const payment = await getBookingPayment(req.params.id);
    res.json({payment});
});

// Update Booking Payment
exports.updateBookingPayment = asyncHandler(async (req, res) => {
    const booking = await updateBookingPayment(req.params.id, req.body.paymentId);
    res.json(booking);
});

// Soft Delete Booking
exports.softDeleteBooking = asyncHandler(async (req, res) => {
    const result = await softDeleteBooking(req.params.id);
    res.json(result);
});

// Bulk Soft Delete Bookings
exports.bulkSoftDeleteBookings = asyncHandler(async (req, res) => {
    const result = await bulkSoftDeleteBookings(req.body.ids);
    res.json(result);
});

// Bulk Restore Bookings
exports.bulkRestoreBookings = asyncHandler(async (req, res) => {
    const result = await bulkRestoreBookings(req.body.ids);
    res.json(result);
});

// Bulk Update Bookings
exports.bulkUpdateBookings = asyncHandler(async (req, res) => {
    const result = await bulkUpdateBookings(req.body.ids, req.body.data);
    res.json(result);
});

// Bulk Delete Bookings
exports.bulkDeleteBookings = asyncHandler(async (req, res) => {
    const result = await bulkDeleteBookings(req.body.ids);
    res.json(result);
});
