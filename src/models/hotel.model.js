const {mongoose,} = require("../package");
const {
    safeSoftDeletePlugin,
    paginatePlugin,
    privateFieldsPlugin,
} = require("./plugins");

const hotelSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },

    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        zip: { type: String },
    },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "HotelCategory" },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },

    // rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }], //instant total rooms
    amenities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Amenity" }],

    staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // hotel_staff users

    rating: { type: Number, default: 0 },
    images: [{ type: String }],
},{ timestamps: true });

hotelSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
hotelSchema.plugin(paginatePlugin);
hotelSchema.plugin(privateFieldsPlugin);

module.exports = mongoose.model("Hotel", hotelSchema, "Hotels");
