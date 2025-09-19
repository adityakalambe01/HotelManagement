const router = require("../package").express.Router();
const {
    roomController:{
        createRoom,
        getRoomById,
        getRooms,
        updateRoom,
        deleteRoom,
        isRoomAvailable,
        getRoomsByHotel,
        findRoomByNumber,
        getAvailableRooms,
        getRoomsByType,
        getRoomsByFloor,
        getRoomsWithAmenity,
        countRoomsByHotel,
        countAvailableRooms,
        getRoomAmenities,
        getRoomImages,
        updateRoomAvailability,
        bulkUpdateRooms,
        getRoomPrice,
        getRoomCapacity,
        getRoomTypes,
        getDistinctFloors,
        markRoomAsUnderMaintenance,
        getRoomsUnderMaintenance,
        isRoomUnderMaintenance,
        getRoomReviews,
        getRoomAverageRating,
        getRoomBookingHistory,
        getRoomsSorted,
        getRoomsByPriceRange,
        getRoomsByCapacity,
        bulkDeleteRooms,
        bulkRestoreRooms,
        restoreRoom,
        updateRoomCustomAttributes,
        getRoomOccupancy,
        searchRooms,
        addRoomImage,
        removeRoomImage,
        setRoomDiscount,
        removeRoomDiscount,
        getRoomDiscount,
        setRoomCustomAttributes,
        getRoomCustomAttributes,
        assignRoom,
        unassignRoom,
        lockRoom,
        unlockRoom,
        isRoomLocked,
    } } = require("../controllers");


// CRUD
router.post("/", createRoom);
router.get("/:id", getRoomById);
router.get("/", getRooms);
router.put("/:id", updateRoom);
router.delete("/:id", deleteRoom);

// Availability
router.get("/availability/check", isRoomAvailable);
router.get("/availability/list", getAvailableRooms);

// Hotel/Room Queries
router.get("/hotel/:hotelId", getRoomsByHotel);
router.get("/find/by-number", findRoomByNumber);
router.get("/type", getRoomsByType);
router.get("/floor", getRoomsByFloor);
router.get("/amenity", getRoomsWithAmenity);
router.get("/count/hotel", countRoomsByHotel);
router.get("/count/available", countAvailableRooms);
router.get("/amenities", getRoomAmenities);
router.get("/images", getRoomImages);
router.put("/availability/update", updateRoomAvailability);
router.put("/bulk/update", bulkUpdateRooms);
router.get("/price", getRoomPrice);
router.get("/capacity", getRoomCapacity);
router.get("/types", getRoomTypes);
router.get("/floors", getDistinctFloors);

// Maintenance
router.put("/:roomId/maintenance", markRoomAsUnderMaintenance);
router.get("/maintenance/list", getRoomsUnderMaintenance);
router.get("/:roomId/maintenance/check", isRoomUnderMaintenance);

// Reviews & Ratings
router.get("/reviews", getRoomReviews);
router.get("/rating", getRoomAverageRating);

// Booking History
router.get("/booking/history", getRoomBookingHistory);

// Sorting & Filtering
router.get("/sorted", getRoomsSorted);
router.get("/price-range", getRoomsByPriceRange);
router.get("/capacity-range", getRoomsByCapacity);

// Bulk Delete/Restore
router.delete("/bulk/delete", bulkDeleteRooms);
router.put("/bulk/restore", bulkRestoreRooms);
router.put("/:roomId/restore", restoreRoom);

// Custom Attributes
router.put("/custom-attributes/update", updateRoomCustomAttributes);
router.put("/custom-attributes/set", setRoomCustomAttributes);
router.get("/custom-attributes", getRoomCustomAttributes);

// Occupancy
router.get("/occupancy", getRoomOccupancy);

// Search
router.get("/search", searchRooms);

// Images
router.post("/image/add", addRoomImage);
router.delete("/:roomId/image/:imageId", removeRoomImage);

// Discount
router.put("/:roomId/discount", setRoomDiscount);
router.delete("/:roomId/discount", removeRoomDiscount);
router.get("/discount", getRoomDiscount);

// Assignment
router.put("/assign", assignRoom);
router.put("/:roomId/unassign", unassignRoom);

// Locking
router.put("/:roomId/lock", lockRoom);
router.put("/:roomId/unlock", unlockRoom);
router.get("/:roomId/locked", isRoomLocked);

module.exports = router;