module.exports = {
    // User & Auth
    authController: require("./Auth.controller"),
    userController: require("./user.controller"),
    // Email Verification
    emailVerificationController: require("./emailVerification.controller"),
    // Amenity
    amenityCategoryController: require("./amenityCategory.controller"),
    amenityController: require("./amenity.controller"),
    // Hotel
    hotelCategoryController: require("./hotelCategory.controller"),
    hotelController: require("./hotel.controller"),
    // Subscription
    subscriptionPlanController: require("./subscriptionPlan.controller"),
    // Room
    roomController: require("./room.controller"),
}