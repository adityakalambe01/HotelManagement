const {express:{Router}} = require("../package");
const router = Router();
const { bookingController } = require("../controllers");


// CRUD
router.post('/bookings', bookingController.createBooking);
router.get('/bookings', bookingController.getAllBookings);
router.get('/bookings/:id', bookingController.getBookingById);
router.put('/bookings/:id', bookingController.updateBooking);
router.delete('/bookings/:id', bookingController.deleteBooking);
router.patch('/bookings/:id/restore', bookingController.restoreBooking);

// Status/Timeline
router.patch('/bookings/:id/cancel', bookingController.cancelBooking);
router.patch('/bookings/:id/complete', bookingController.completeBooking);
router.patch('/bookings/:id/no-show', bookingController.markNoShow);
router.patch('/bookings/:id/status', bookingController.updateBookingStatus);
router.get('/bookings/:id/history', bookingController.getBookingHistory);

// Guest Management
router.post('/bookings/:id/guests', bookingController.addGuestToBooking);
router.delete('/bookings/:id/guests/:guestId', bookingController.removeGuestFromBooking);
router.patch('/bookings/:id/guests/:guestId', bookingController.updateGuestInBooking);
router.get('/bookings/:id/guests', bookingController.getGuestsForBooking);

// Room/Hotel/User Queries
router.get('/rooms/:roomId/bookings', bookingController.getBookingsByRoom);
router.get('/hotels/:hotelId/bookings', bookingController.getBookingsByHotel);
router.get('/users/:userId/bookings', bookingController.getBookingsByUser);
router.get('/rooms/:roomId/bookings/active', bookingController.getActiveBookingsByRoom);
router.get('/hotels/:hotelId/bookings/date-range', bookingController.getBookingsByDateRange);

// Special Requests/Custom Attributes
router.patch('/bookings/:id/special-requests', bookingController.updateSpecialRequests);
router.patch('/bookings/:id/custom-attributes', bookingController.updateCustomAttributes);
router.get('/bookings/:id/custom-attributes', bookingController.getCustomAttributes);

// Analytics/Counts
router.get('/hotels/:hotelId/bookings/count', bookingController.countBookingsByHotel);
router.get('/hotels/:hotelId/bookings/active/count', bookingController.countActiveBookings);
router.get('/hotels/:hotelId/bookings/status/count', bookingController.countBookingsByStatus);

// Search/Pagination
router.get('/bookings/search', bookingController.searchBookings);
router.get('/bookings/paginate', bookingController.paginateBookings);

// Utilities
router.get('/rooms/:roomId/is-booked', bookingController.isRoomBooked);
router.get('/bookings/code/:bookingCode', bookingController.getBookingByCode);
router.get('/hotels/:hotelId/bookings/refund-pending', bookingController.getBookingsWithRefundPending);
router.get('/hotels/:hotelId/bookings/cancelled', bookingController.getCancelledBookings);
router.get('/hotels/:hotelId/bookings/completed', bookingController.getCompletedBookings);
router.get('/hotels/:hotelId/bookings/no-show', bookingController.getNoShowBookings);
router.get('/hotels/:hotelId/bookings/special-requests', bookingController.getBookingsWithSpecialRequests);
router.get('/hotels/:hotelId/bookings/notes', bookingController.getBookingsWithNotes);

// Payment
router.get('/bookings/:id/payment', bookingController.getBookingPayment);
router.patch('/bookings/:id/payment', bookingController.updateBookingPayment);

// Bulk Operations
router.patch('/bookings/soft-delete', bookingController.bulkSoftDeleteBookings);
router.patch('/bookings/restore', bookingController.bulkRestoreBookings);
router.patch('/bookings/bulk-update', bookingController.bulkUpdateBookings);
router.delete('/bookings/bulk-delete', bookingController.bulkDeleteBookings);

module.exports = router;