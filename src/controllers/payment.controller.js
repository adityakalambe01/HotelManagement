const {
    paymentService:{
        createPayment,
        getPaymentById,
        updatePayment,
        deletePayment,
        getPaymentsByUser,
        getPaymentsByBooking,
        getPaymentsBySubscription,
        getPaymentsByStatus,
        getPaymentsByDateRange,
        getPaymentsByInvoiceNumber,
        getPaymentsByTransactionId,
        refundPayment,
        getFailedPayments,
        getRefundedPayments,
        getPaymentsWithDiscount,
        getPaymentsWithTax,
        getPaymentsWithServiceCharge,
        paginatePayments,
        getPaymentsWithErrors,
        getPaymentsByCurrency,
        getPaymentsWithNotes,
        countPaymentsByStatus,
        sumPaymentsByDateRange,
        getRecentPayments
    }
} = require("../service");
const {asyncHandler} = require("../middlewares/asyncHandler.middleware");
const {pick:universalPicker, reqQueryFilterOptionsPicker, paramsPicker} = require("../utils");

/**
 * Picks specific payment-related fields from the request body
 * @param {Object} body - The request body
 * @returns {Object} Object containing only the allowed payment fields
 */
const bodyPicker = (body) => {
    return universalPicker(body, ["booking", "subscription", "user", "amount", "currency", "method", "status", "transactionId", "invoiceNumber", "discount", "tax", "serviceCharge", "refundDate", "errorCode", "errorMessage", "notes"]);
}

/**
 * Creates a new payment record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Created payment object with success message
 */
exports.createPayment = asyncHandler(async (req, res) => {
    const payment = await createPayment(bodyPicker(req.body));
    return res.created(payment, "Payment created successfully");
});

/**
 * Retrieves a payment by its ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Payment object with success message
 */
exports.getPaymentById = asyncHandler(async (req, res) => {
    const payment = await getPaymentById(req.params.id);
    return res.ok(payment, "Payment retrieved successfully");
});

/**
 * Updates an existing payment record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Updated payment object with success message
 */
exports.updatePayment = asyncHandler(async (req, res) => {
    const payment = await updatePayment(req.params.id, req.body);
    return res.ok(payment, "Payment updated successfully");
});

/**
 * Deletes a payment record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Deleted payment object with success message
 */
exports.deletePayment = asyncHandler(async (req, res) => {
    const payment = await deletePayment(req.params.id);
    return res.ok(payment, "Payment deleted successfully");
});

/**
 * Retrieves all payments for a specific user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with success message
 */
exports.getPaymentsByUser = asyncHandler(async (req, res) => {
    const payments = await getPaymentsByUser(req.params.userId);
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Retrieves all payments for a specific booking
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with success message
 */
exports.getPaymentsByBooking = asyncHandler(async (req, res) => {
    const payments = await getPaymentsByBooking(req.params.bookingId);
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Retrieves all payments for a specific subscription
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with success message
 */
exports.getPaymentsBySubscription = asyncHandler(async (req, res) => {
    const payments = await getPaymentsBySubscription(req.params.subscriptionId);
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Retrieves all payments with a specific status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with success message
 */
exports.getPaymentsByStatus = asyncHandler(async (req, res) => {
    const payments = await getPaymentsByStatus(req.params.status);
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Retrieves all payments within a specific date range
 * @param {Object} req - Express request object with startDate and endDate in query
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with success message
 */
exports.getPaymentsByDateRange = asyncHandler(async (req, res) => {
    const {startDate, endDate} = req.query;
    const payments = await getPaymentsByDateRange(new Date(startDate), new Date(endDate));
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Retrieves all payments matching a specific invoice number
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with success message
 */
exports.getPaymentsByInvoiceNumber = asyncHandler(async (req, res) => {
    const payments = await getPaymentsByInvoiceNumber(req.params.invoiceNumber);
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Retrieves all payments matching a specific transaction ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with success message
 */
exports.getPaymentsByTransactionId = asyncHandler(async (req, res) => {
    const payments = await getPaymentsByTransactionId(req.params.transactionId);
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Process a refund for a specific payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Refunded payment object with success message
 */
exports.refundPayment = asyncHandler(async (req, res) => {
    const payment = await refundPayment(req.params.id, req.body);
    return res.ok(payment, "Payment refunded successfully");
});

/**
 * Retrieves all payments with failed status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of failed payment objects with success message
 */
exports.getFailedPayments = asyncHandler(async (req, res) => {
    const payments = await getFailedPayments();
    return res.ok(payments, "Failed payments retrieved successfully");
});

/**
 * Retrieves all payments that have been refunded
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of refunded payment objects with success message
 */
exports.getRefundedPayments = asyncHandler(async (req, res) => {
    const payments = await getRefundedPayments();
    return res.ok(payments, "Refunded payments retrieved successfully");
});

/**
 * Retrieves all payments that have discounts applied
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with discounts and success message
 */
exports.getPaymentsWithDiscount = asyncHandler(async (req, res) => {
    const payments = await getPaymentsWithDiscount();
    return res.ok(payments, "Payments with discounts retrieved successfully");
});

/**
 * Retrieves all payments that have taxes applied
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with taxes and success message
 */
exports.getPaymentsWithTax = asyncHandler(async (req, res) => {
    const payments = await getPaymentsWithTax();
    return res.ok(payments, "Payments with taxes retrieved successfully");
});

/**
 * Retrieves all payments that have service charges applied
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with service charges and success message
 */
exports.getPaymentsWithServiceCharge = asyncHandler(async (req, res) => {
    const payments = await getPaymentsWithServiceCharge();
    return res.ok(payments, "Payments with service charges retrieved successfully");
});

/**
 * Retrieves paginated payments based on filter and options
 * @param {Object} req - Express request object containing query parameters for filtering and pagination
 * @param {Object} res - Express response object
 * @returns {Promise<Object>} Paginated result containing payments and metadata with success message
 */
exports.paginatePayments = asyncHandler(async (req, res) => {
    const {filter, options} = reqQueryFilterOptionsPicker(req)
    const result = await paginatePayments(filter, options);
    return res.ok(result, "Payments retrieved successfully");
});

/**
 * Retrieves all payments that have error codes or messages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with errors and success message
 */
exports.getPaymentsWithErrors = asyncHandler(async (req, res) => {
    const payments = await getPaymentsWithErrors();
    return res.ok(payments, "Payments with errors retrieved successfully");
});

/**
 * Retrieves all payments for a specific currency
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.currency - Currency code (e.g., "USD")
 * @returns {Promise<Array>} Array of payment objects for the specified currency with success message
 */
exports.getPaymentsByCurrency = asyncHandler(async (req, res) => {
    const payments = await getPaymentsByCurrency(req.params.currency);
    return res.ok(payments, "Payments retrieved successfully");
});

/**
 * Retrieves all payments that have additional notes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of payment objects with notes and success message
 */
exports.getPaymentsWithNotes = asyncHandler(async (req, res) => {
    const payments = await getPaymentsWithNotes();
    return res.ok(payments, "Payments with notes retrieved successfully");
});

/**
 * Counts the number of payments with a specific status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.params.status - Payment status to count
 * @returns {Promise<Object>} Object containing the status and count with success message
 */
exports.countPaymentsByStatus = asyncHandler(async (req, res) => {
    const count = await countPaymentsByStatus(req.params.status);
    return res.ok({status: req.params.status, count}, "Payment count retrieved successfully");
});

/**
 * Calculates the sum of all payments within a specified date range
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {string} req.query.startDate - Start date for the range (ISO format)
 * @param {string} req.query.endDate - End date for the range (ISO format)
 * @returns {Promise<Object>} Object containing the date range and total sum with success message
 */
exports.sumPaymentsByDateRange = asyncHandler(async (req, res) => {
    const {startDate, endDate} = req.query;
    const total = await sumPaymentsByDateRange(new Date(startDate), new Date(endDate));
    return res.ok({startDate, endDate, total}, "Total payments retrieved successfully");
});

/**
 * Retrieves a list of recent payments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<Array>} Array of recent payment objects with success message
 */
exports.getRecentPayments = asyncHandler(async (req, res) => {
    const payments = await getRecentPayments();
    return res.ok(payments, "Recent payments retrieved successfully");
});