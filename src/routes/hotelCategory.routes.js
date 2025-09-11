const router = require("../package").express.Router();
const authenticate = require("../middlewares/authenticate.middleware");
const {hotelCategoryController:{newHotelCategory, updateHotelCategory, deleteHotelCategory, getHotelCategory, getAllHotelCategories}} = require("../controllers")

router.use(authenticate);

router.route("/")
    .get(getAllHotelCategories)
    .post(newHotelCategory);

router.route("/:id")
    .get(getHotelCategory)
    .delete(deleteHotelCategory)
    .patch(updateHotelCategory)
    .put(updateHotelCategory);


module.exports = router;