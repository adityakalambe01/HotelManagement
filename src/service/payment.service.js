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

exports.createPayment = async(data) => {
    if (!data || !data.user || !data.amount || !data.method) {
        throw new ApiError(httpCodes.BAD_REQUEST, "Missing required payment fields");
    }
    return await createPayment(data);
}

exports.getPaymentById = async(id) => {
    const payment = await getPaymentById(id);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

exports.updatePayment = async(id, data) => {
    const payment = await updatePayment(id, data);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

exports.deletePayment = async(id) => {
    const payment = await deletePayment(id);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

exports.getPaymentsByUser = async(userId) => {
    return await getPaymentsByUser(userId);
}

exports.getPaymentsByBooking = async (bookingId) => {
    return await getPaymentsByBooking(bookingId);
}

exports.getPaymentsBySubscription = async (subscriptionId) => {
    return await getPaymentsBySubscription(subscriptionId);
}

exports.getPaymentsByStatus = async(status) => {
    return await getPaymentsByStatus(status);
}

exports.getPaymentsByDateRange = async (startDate, endDate) => {
    return await getPaymentsByDateRange(startDate, endDate);
}

exports.getPaymentsByInvoiceNumber = async (invoiceNumber) => {
    return await getPaymentsByInvoiceNumber(invoiceNumber);
}

exports.getPaymentsByTransactionId = async (transactionId) => {
    return await getPaymentsByTransactionId(transactionId);
}

exports.refundPayment = async (id, refundData) => {
    const payment = await refundPayment(id, refundData);
    if (!payment) throw new ApiError(httpCodes.NOT_FOUND, "Payment not found");
    return payment;
}

exports.getFailedPayments = async () => {
    return await getFailedPayments();
}

exports.getRefundedPayments = async () => {
    return await getRefundedPayments();
}

exports.getPaymentsWithDiscount = async() => {
    return await getPaymentsWithDiscount();
}

exports.getPaymentsWithTax = async () => {
    return await getPaymentsWithTax();
}

exports.getPaymentsWithServiceCharge = async () => {
    return await getPaymentsWithServiceCharge();
}

exports.paginatePayments = async (filter, options) => {
    return await paginatePayments(filter, options);
}

exports.getPaymentsWithErrors = async () => {
    return await getPaymentsWithErrors();
}

exports.getPaymentsByCurrency = async (currency) => {
    return await getPaymentsByCurrency(currency);
}

exports.getPaymentsWithNotes = async () => {
    return await getPaymentsWithNotes();
}

exports.countPaymentsByStatus = async (status) => {
    return await countPaymentsByStatus(status);
}

exports.sumPaymentsByDateRange = async (startDate, endDate) => {
    return await sumPaymentsByDateRange(startDate, endDate);
}

exports.getRecentPayments = async() => {
    return await getRecentPayments();
}

