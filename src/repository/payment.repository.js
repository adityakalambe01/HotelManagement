const {paymentModel: Payment} = require('../models');

/**
 * Creates a new payment record
 * @param {Object} data - Payment data object
 * @param {string} data.user - User ID associated with payment
 * @param {string} data.booking - Booking ID associated with payment
 * @param {number} data.amount - Payment amount
 * @param {string} data.status - Payment status (pending/completed/failed/refunded)
 * @param {string} data.currency - Currency code
 * @param {string} [data.transactionId] - External payment transaction ID
 * @returns {Promise<Object>} Created payment document
 */
exports.createPayment = async (data) => await Payment.create(data);

/**
 * Retrieves a payment by its ID
 * @param {string} id - Payment document ID
 * @returns {Promise<Object|null>} Payment document if found, null otherwise
 */
exports.getPaymentById = async (id) => await Payment.findById(id);

/**
 * Updates a payment document
 * @param {string} id - Payment document ID
 * @param {Object} data - Updated payment data
 * @returns {Promise<Object|null>} Updated payment document
 */
exports.updatePayment = async (id, data) => await Payment.findByIdAndUpdate(id, data, {new: true});

/**
 * Soft deletes a payment by setting deletedAt timestamp
 * @param {string} id - Payment document ID
 * @returns {Promise<Object|null>} Updated payment document with deletion timestamp
 */
exports.deletePayment = async (id) => await Payment.findByIdAndUpdate(id, {deletedAt: new Date()}, {new: true});

/**
 * Retrieves all payments for a specific user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of payment documents
 */
exports.getPaymentsByUser = async (userId) => await Payment.find({user: userId});

/**
 * Retrieves all payments associated with a booking
 * @param {string} bookingId - Booking ID
 * @returns {Promise<Array>} Array of payment documents
 */
exports.getPaymentsByBooking = async (bookingId) => await Payment.find({booking: bookingId});

/**
 * Retrieves all payments for a specific subscription
 * @param {string} subscriptionId - Subscription ID
 * @returns {Promise<Array>} Array of payment documents associated with the subscription
 */
exports.getPaymentsBySubscription = async (subscriptionId) => await Payment.find({subscription: subscriptionId});

/**
 * Retrieves all payments with a specific status
 * @param {string} status - Payment status (e.g., 'pending', 'completed', 'failed', 'refunded')
 * @returns {Promise<Array>} Array of payment documents with the specified status
 */
exports.getPaymentsByStatus = async (status) => await Payment.find({status});

/**
 * Retrieves all payments within a specified date range
 * @param {Date} startDate - Start date of the range
 * @param {Date} endDate - End date of the range
 * @returns {Promise<Array>} Array of payment documents within the date range
 */
exports.getPaymentsByDateRange = async (startDate, endDate) => await Payment.find({
    createdAt: {
        $gte: startDate,
        $lte: endDate
    }
});

/**
 * Retrieves all payments with a specific invoice number
 * @param {string} invoiceNumber - Invoice number to search for
 * @returns {Promise<Array>} Array of payment documents matching the invoice number
 */
exports.getPaymentsByInvoiceNumber = async (invoiceNumber) => await Payment.find({invoiceNumber});

/**
 * Retrieves all payments with a specific transaction ID
 * @param {string} transactionId - External transaction ID to search for
 * @returns {Promise<Array>} Array of payment documents matching the transaction ID
 */
exports.getPaymentsByTransactionId = async (transactionId) => await Payment.find({transactionId});

/**
 * Marks a payment as refunded and updates refund-related information
 * @param {string} id - Payment document ID
 * @param {Object} refundData - Additional refund data to be stored
 * @param {string} [refundData.reason] - Reason for refund
 * @param {string} [refundData.refundTransactionId] - External refund transaction ID
 * @returns {Promise<Object|null>} Updated payment document with refund information
 */
exports.refundPayment = async (id, refundData = {}) => await Payment.findByIdAndUpdate(id, {
    status: 'refunded',
    refundDate: new Date(), ...refundData
}, {new: true});

/**
 * Retrieves all payments with failed status
 * @returns {Promise<Array>} Array of payment documents with failed status
 */
exports.getFailedPayments = async () => await Payment.find({status: 'failed'});

/**
 * Retrieves all payments with refunded status
 * @returns {Promise<Array>} Array of payment documents with refunded status
 */
exports.getRefundedPayments = async () => await Payment.find({status: 'refunded'});

/**
 * Retrieves all payments that have a discount applied
 * @returns {Promise<Array>} Array of payment documents with discount greater than 0
 */
exports.getPaymentsWithDiscount = async () => await Payment.find({discount: {$gt: 0}});

/**
 * Retrieves all payments that include tax
 * @returns {Promise<Array>} Array of payment documents with tax greater than 0
 */
exports.getPaymentsWithTax = async () => await Payment.find({tax: {$gt: 0}});

/**
 * Retrieves all payments that include a service charge
 * @returns {Promise<Array>} Array of payment documents with service charge greater than 0
 */
exports.getPaymentsWithServiceCharge = async () => await Payment.find({serviceCharge: {$gt: 0}});

/**
 * Paginates payment documents based on filter and options
 * @param {Object} filter - MongoDB filter criteria
 * @param {Object} options - Pagination options (limit, page, sort, etc.)
 * @returns {Promise<Object>} Paginated result with documents and pagination info
 */
exports.paginatePayments = async (filter, options) => await Payment.paginate(filter, options);

/**
 * Retrieves all payments that have error codes or error messages
 * @returns {Promise<Array>} Array of payment documents with errors
 */
exports.getPaymentsWithErrors = async () => await Payment.find({
    $or: [{
        errorCode: {
            $exists: true,
            $ne: null
        }
    }, {errorMessage: {$exists: true, $ne: null}}]
});

/**
 * Retrieves all payments for a specific currency
 * @param {string} currency - Currency code to filter payments
 * @returns {Promise<Array>} Array of payment documents with specified currency
 */
exports.getPaymentsByCurrency = async (currency) => await Payment.find({currency});

/**
 * Retrieves all payments that have notes attached
 * @returns {Promise<Array>} Array of payment documents with notes
 */
exports.getPaymentsWithNotes = async () => await Payment.find({notes: {$exists: true, $ne: null}});

/**
 * Counts the number of payments with a specific status
 * @param {string} status - Payment status to count
 * @returns {Promise<number>} Number of payments with the specified status
 */
exports.countPaymentsByStatus = async (status) => await Payment.countDocuments({status});

/**
 * Calculates the sum of payment amounts within a date range
 * @param {Date} startDate - Start date of the range
 * @param {Date} endDate - End date of the range
 * @returns {Promise<number>} Total sum of payments within the date range
 */
exports.sumPaymentsByDateRange = async (startDate, endDate) => {
    const result = await Payment.aggregate([
        {$match: {createdAt: {$gte: startDate, $lte: endDate}}},
        {$group: {_id: null, total: {$sum: "$amount"}}}
    ]);
    return result[0]?.total || 0;
};

/**
 * Retrieves all payments from the last 7 days
 * @returns {Promise<Array>} Array of payment documents from the last week
 */
exports.getRecentPayments = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return await Payment.find({createdAt: {$gte: sevenDaysAgo}});
};
