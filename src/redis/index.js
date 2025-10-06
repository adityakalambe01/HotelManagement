const redisKeys = {
    groupedAmenities: 'grouped-amenities',
    hotelCatWithoutPagination: 'all-hotel-categories-without-pagination'
}
module.exports = {
    redisUtil: require("./redisUtils"),
    redisKeys
}