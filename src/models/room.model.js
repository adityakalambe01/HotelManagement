const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

const roomSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
    roomNumber: { type: Number, required: true, min: 1 },
    floor: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["single", "double", "suite", "deluxe"], required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],
    isAvailable: { type: Boolean, default: true },
    images: [{ type: String }],
    // Maintenance status
    maintenance: {
        reason: { type: String },
        untilDate: { type: Date },
        active: { type: Boolean, default: false }
    },
    // Room status (ready, occupied, cleaning, maintenance, etc.)
    status: { type: String, enum: ["ready", "occupied", "cleaning", "maintenance"], default: "ready" },
    // Discount info
    discount: {
        amount: { type: Number, default: 0 },
        type: { type: String, enum: ["percentage", "fixed"], default: "fixed" },
        expiresAt: { type: Date }
    },
    // Custom attributes for extensibility
    customAttributes: { type: mongoose.Schema.Types.Mixed },
    // Assignment to user/staff
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Locking for booking
    locked: {
        active: { type: Boolean, default: false },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        expiresAt: { type: Date }
    }
});

roomSchema.index({ hotel: 1, roomNumber: 1 }, { unique: true });
roomSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
roomSchema.plugin(paginatePlugin);
roomSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model('Room', roomSchema, "Hotel Rooms");