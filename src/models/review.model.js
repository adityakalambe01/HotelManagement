const {mongoose} = require('../package');
const {safeSoftDeletePlugin, paginatePlugin, privateFieldsPlugin} = require("./plugins");

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    room: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    createdAt: { type: Date, default: Date.now },
});
reviewSchema.plugin(safeSoftDeletePlugin, {
    deletedAtField: 'deletedAt',
})
reviewSchema.plugin(paginatePlugin);
reviewSchema.plugin(privateFieldsPlugin);


module.exports = mongoose.model('Review', reviewSchema, "Hotel and Room Reviews");
