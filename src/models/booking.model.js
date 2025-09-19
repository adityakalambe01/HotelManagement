const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

/**
 * Mongoose schema for guest information
 * @typedef {Object} GuestSchema
 * @property {mongoose.Schema.Types.ObjectId} user - Reference to registered user
 * @property {string} name - Guest's full name
 * @property {string} email - Guest's email address
 * @property {string} password - Random password for guest account
 * @property {string} phone - Guest's phone number
 * @property {string} aadhaarNumber - Guest's Aadhaar card number
 * @property {string} panCardNumber - Guest's PAN card number
 * @property {boolean} isEmailVerified - Email verification status
 */
const guestSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}, // Registered user
    name: {type: String},
    email: {type: String},
    password: {type: String}, // Random password for guest
    phone: {type: String},
    aadhaarNumber: {type: String},
    panCardNumber: {type: String},
    isEmailVerified: {type: Boolean, default: false}
}, {_id: false});

/**
 * Mongoose schema for hotel room bookings
 * @typedef {Object} BookingSchema
 * @property {Object} context - Booking context information
 * @property {mongoose.Schema.Types.ObjectId} context.bookedBy - User who made the booking
 * @property {mongoose.Schema.Types.ObjectId} context.hotel - Referenced hotel
 * @property {mongoose.Schema.Types.ObjectId} context.room - Referenced room
 * @property {string} context.source - Booking source (e.g., oyo, booking.com)
 * @property {string} context.bookingCode - Unique booking identifier
 *
 * @property {Object} timeline - Booking timeline information
 * @property {Object} timeline.check - Check-in/out details
 * @property {Date} timeline.check.in - Check-in date
 * @property {Date} timeline.check.out - Check-out date
 * @property {Object} timeline.cancellation - Cancellation details
 * @property {Date} timeline.cancellation.at - Cancellation timestamp
 * @property {mongoose.Schema.Types.ObjectId} timeline.cancellation.by - User who cancelled
 * @property {string} timeline.cancellation.reason - Cancellation reason
 * @property {number} timeline.cancellation.penaltyFee - Cancellation penalty amount
 * @property {string} timeline.cancellation.refundStatus - Refund status
 * @property {Object} timeline.completed - Completion details
 * @property {Date} timeline.completed.at - Completion timestamp
 * @property {mongoose.Schema.Types.ObjectId} timeline.completed.by - User who marked as completed
 *
 * @property {Object} guests - Guest information
 * @property {Array<GuestSchema>} guests.list - List of guests
 * @property {number} guests.numberOfGuests - Total number of guests
 * @property {mongoose.Schema.Types.ObjectId} guests.primaryGuest - Primary guest reference
 *
 * @property {mongoose.Schema.Types.ObjectId} payment - Reference to payment
 *
 * @property {Object} meta - Additional booking metadata
 * @property {string} meta.status - Booking status
 * @property {string} meta.specialRequests - Special requests
 * @property {string} meta.notes - Additional notes
 * @property {Object} meta.customAttributes - Custom booking attributes
 * @property {mongoose.Schema.Types.ObjectId} meta.createdBy - User who created the booking
 * @property {mongoose.Schema.Types.ObjectId} meta.updatedBy - User who last updated the booking
 * @property {boolean} meta.isNoShow - Whether guest didn't show up
 * @property {boolean} meta.isActive - Booking active status
 * @property {Array<Object>} meta.history - Booking status history
 *
 * @property {Date} createdAt - Timestamp of booking creation
 * @property {Date} updatedAt - Timestamp of last update
 * @property {Date} deletedAt - Timestamp of soft deletion
 */
const bookingSchema = new mongoose.Schema({
    // Who / What was booked
    context: {
        bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
        room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
        source: { type: String }, // e.g., oyo, booking.com
        bookingCode: { type: String, unique: true, sparse: true }
    },
    // Timeline
    timeline: {
        check: {
            in: { type: Date, required: true },
            out: { type: Date, required: true }
        },

        cancellation: {
            at: { type: Date },
            by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            reason: { type: String },
            penaltyFee: { type: Number },
            refundStatus: { type: String, enum: ["pending", "processed", "rejected"] }
        },
        completed:{
            at: { type: Date },
            by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
    },
    // Guests
    guests: {
        list: [guestSchema],
        numberOfGuests: { type: Number },
        primaryGuest: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    // Payment
    payment: { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },

    // Status & Extra Info
    meta: {
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending"
        },
        specialRequests: { type: String },
        notes: { type: String },
        customAttributes: { type: mongoose.Schema.Types.Mixed },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isNoShow: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        history: [{
            status: { type: String },
            changedAt: { type: Date },
            changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
        }]
    }
}, { timestamps: true });

// ---------------- Plugins ----------------
bookingSchema.plugin(safeSoftDeletePlugin, {deletedAtField: 'deletedAt'});
bookingSchema.plugin(paginatePlugin);
bookingSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Booking', bookingSchema, "Hotel Room Bookings");