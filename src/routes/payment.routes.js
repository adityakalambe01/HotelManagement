const router = require("../package").express.Router();
const {paymentController} = require("../controllers");


// Create a payment
router.post("/", paymentController.createPayment);

// Get payment by ID
router.get("/:id", paymentController.getPaymentById);

// Update payment by ID
router.put("/:id", paymentController.updatePayment);

// Delete (soft) payment by ID
router.delete("/:id", paymentController.deletePayment);

// Get payments by user
router.get("/user/:userId", paymentController.getPaymentsByUser);

// Get payments by booking
router.get("/booking/:bookingId", paymentController.getPaymentsByBooking);

// Get payments by subscription
router.get("/subscription/:subscriptionId", paymentController.getPaymentsBySubscription);

// Get payments by status
router.get("/status/:status", paymentController.getPaymentsByStatus);

// Get payments by date range
router.get("/date-range", paymentController.getPaymentsByDateRange);

// Get payments by invoice number
router.get("/invoice/:invoiceNumber", paymentController.getPaymentsByInvoiceNumber);

// Get payments by transaction ID
router.get("/transaction/:transactionId", paymentController.getPaymentsByTransactionId);

// Refund payment
router.post("/:id/refund", paymentController.refundPayment);

// Get failed payments
router.get("/failed", paymentController.getFailedPayments);

// Get refunded payments
router.get("/refunded", paymentController.getRefundedPayments);

// Get payments with discount
router.get("/discounted", paymentController.getPaymentsWithDiscount);

// Get payments with tax
router.get("/taxed", paymentController.getPaymentsWithTax);

// Get payments with service charge
router.get("/service-charged", paymentController.getPaymentsWithServiceCharge);

// Paginate payments
router.get("/paginate", paymentController.paginatePayments);

// Get payments with errors
router.get("/errors", paymentController.getPaymentsWithErrors);

// Get payments by currency
router.get("/currency/:currency", paymentController.getPaymentsByCurrency);

// Get payments with notes
router.get("/notes", paymentController.getPaymentsWithNotes);

// Count payments by status
router.get("/count/:status", paymentController.countPaymentsByStatus);

// Sum payments by date range
router.get("/sum", paymentController.sumPaymentsByDateRange);

// Get recent payments
router.get("/recent", paymentController.getRecentPayments);

module.exports = router;
