const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");


const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    createdAt: { type: Date, default: Date.now },
});

bookingSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
bookingSchema.plugin(paginatePlugin);
bookingSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Booking', bookingSchema, "Hotel Room Bookings");
