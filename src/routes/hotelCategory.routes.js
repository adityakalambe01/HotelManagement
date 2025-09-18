const router = require("../package").express.Router();
const {hotelCategoryController:{newHotelCategory, updateHotelCategory, deleteHotelCategory, getHotelCategory, getAllHotelCategories}} = require("../controllers")

router.route("/")
    .get(getAllHotelCategories)
    .post(newHotelCategory);

router.route("/:id")
    .get(getHotelCategory)
    .delete(deleteHotelCategory)
    .patch(updateHotelCategory)
    .put(updateHotelCategory);


module.exports = router;