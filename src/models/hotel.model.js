const {mongoose,} = require("../package");
const {
    safeSoftDeletePlugin,
    paginatePlugin,
    privateFieldsPlugin,
} = require("./plugins");

const hotelSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: String,

    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String,
    },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "HotelCategory" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },

    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],

    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // hotel_staff users

    rating: { type: Number, default: 0 },
    images: [String],
    createdAt: { type: Date, default: Date.now },
});

hotelSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
hotelSchema.plugin(paginatePlugin);
hotelSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model("Hotel", hotelSchema, "Hotels");

