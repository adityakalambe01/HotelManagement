const {ApiError} = require("../utils");
const {httpCodes} = require("../config");
const {
    paymentRepository:{
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
    }} = require("../repository");

/**
 * Creates a new payment
 * @param {Object} data - The payment data
 * @param {string} data.user - The user ID associated with the payment
 * @param {number} data.amount - The payment amount
 * @param {string} data.method - The payment method
 * @returns {Promise<Object>} The created payment object
 * @throws {ApiError} If required fields are missing
 */
exports.createPayment = async (data) => {
    if (!data || !data.user || !data.amount || !data.method) {
        throw new ApiError(httpCodes.BAD_REQUEST, "Missing required payment fields");
    }
    return await createPayment(data);
}

/**
 * Retrieves a payment by its ID
 * @param {string} id - The payment ID
 * @returns {Promise<Object>} The payment object
 * @throws {ApiError} If payment is not found
 */
exports.getPaymentById = async (id) => {
    const payment = await getPaymentById(id);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

/**
 * Updates a payment by its ID
 * @param {string} id - The payment ID
 * @param {Object} data - The updated payment data
 * @returns {Promise<Object>} The updated payment object
 * @throws {ApiError} If payment is not found
 */
exports.updatePayment = async (id, data) => {
    const payment = await updatePayment(id, data);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

/**
 * Deletes a payment by its ID
 * @param {string} id - The payment ID
 * @returns {Promise<Object>} The deleted payment object
 * @throws {ApiError} If payment is not found
 */
exports.deletePayment = async (id) => {
    const payment = await deletePayment(id);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

/**
 * Retrieves all payments for a specific user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of payment objects
 */
exports.getPaymentsByUser = async (userId) => {
    return await getPaymentsByUser(userId);
}

/**
 * Retrieves all payments for a specific booking
 * @param {string} bookingId - The booking ID
 * @returns {Promise<Array>} Array of payment objects
 */
exports.getPaymentsByBooking = async (bookingId) => {
    return await getPaymentsByBooking(bookingId);
}

/**
 * Retrieves all payments for a specific subscription
 * @param {string} subscriptionId - The subscription ID
 * @returns {Promise<Array>} Array of payment objects
 */
exports.getPaymentsBySubscription = async (subscriptionId) => {
    return await getPaymentsBySubscription(subscriptionId);
}

/**
 * Retrieves all payments with a specific status
 * @param {string} status - The payment status
 * @returns {Promise<Array>} Array of payment objects
 */
exports.getPaymentsByStatus = async (status) => {
    return await getPaymentsByStatus(status);
}

/**
 * Retrieves all payments within a date range
 * @param {Date} startDate - The start date
 * @param {Date} endDate - The end date
 * @returns {Promise<Array>} Array of payment objects
 */
exports.getPaymentsByDateRange = async (startDate, endDate) => {
    return await getPaymentsByDateRange(startDate, endDate);
}

/**
 * Retrieves all payments with a specific invoice number
 * @param {string} invoiceNumber - The invoice number
 * @returns {Promise<Array>} Array of payment objects
 */
exports.getPaymentsByInvoiceNumber = async (invoiceNumber) => {
    return await getPaymentsByInvoiceNumber(invoiceNumber);
}

/**
 * Retrieves all payments with a specific transaction ID
 * @param {string} transactionId - The transaction ID
 * @returns {Promise<Array>} Array of payment objects
 */
exports.getPaymentsByTransactionId = async (transactionId) => {
    return await getPaymentsByTransactionId(transactionId);
}

/**
 * Refunds a payment
 * @param {string} id - The payment ID to refund
 * @param {Object} refundData - The refund details
 * @returns {Promise<Object>} The refunded payment object
 * @throws {ApiError} If payment is not found
 */
exports.refundPayment = async (id, refundData) => {
    const payment = await refundPayment(id, refundData);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

/**
 * Retrieves all failed payments
 * @returns {Promise<Array>} Array of failed payment objects
 */
exports.getFailedPayments = async () => {
    return await getFailedPayments();
}

/**
 * Retrieves all refunded payments
 * @returns {Promise<Array>} Array of refunded payment objects
 */
exports.getRefundedPayments = async () => {
    return await getRefundedPayments();
}

/**
 * Retrieves all payments that have a discount applied
 * @returns {Promise<Array>} Array of payment objects with discounts
 */
exports.getPaymentsWithDiscount = async () => {
    return await getPaymentsWithDiscount();
}

/**
 * Retrieves all payments that include tax
 * @returns {Promise<Array>} Array of payment objects with tax
 */
exports.getPaymentsWithTax = async () => {
    return await getPaymentsWithTax();
}

/**
 * Retrieves all payments that include a service charge
 * @returns {Promise<Array>} Array of payment objects with service charge
 */
exports.getPaymentsWithServiceCharge = async () => {
    return await getPaymentsWithServiceCharge();
}

/**
 * Paginates payments based on filter and options
 * @param {Object} filter - The filter criteria
 * @param {Object} options - The pagination options
 * @returns {Promise<Object>} Paginated payment objects
 */
exports.paginatePayments = async (filter, options) => {
    return await paginatePayments(filter, options);
}

/**
 * Retrieves all payments that have errors
 * @returns {Promise<Array>} Array of payment objects with errors
 */
exports.getPaymentsWithErrors = async () => {
    return await getPaymentsWithErrors();
}

/**
 * Retrieves all payments for a specific currency
 * @param {string} currency - The payment currency code
 * @returns {Promise<Array>} Array of payment objects for the currency
 */
exports.getPaymentsByCurrency = async (currency) => {
    return await getPaymentsByCurrency(currency);
}

/**
 * Retrieves all payments that have notes attached
 * @returns {Promise<Array>} Array of payment objects with notes
 */
exports.getPaymentsWithNotes = async () => {
    return await getPaymentsWithNotes();
}

/**
 * Counts the number of payments with a specific status
 * @param {string} status - The payment status
 * @returns {Promise<number>} Count of payments with the status
 */
exports.countPaymentsByStatus = async (status) => {
    return await countPaymentsByStatus(status);
}

/**
 * Calculates the sum of payments within a date range
 * @param {Date} startDate - The start date
 * @param {Date} endDate - The end date
 * @returns {Promise<number>} Total sum of payments in the date range
 */
exports.sumPaymentsByDateRange = async (startDate, endDate) => {
    return await sumPaymentsByDateRange(startDate, endDate);
}

/**
 * Retrieves the most recent payments
 * @returns {Promise<Array>} Array of recent payment objects
 */
exports.getRecentPayments = async () => {
    return await getRecentPayments();
}

