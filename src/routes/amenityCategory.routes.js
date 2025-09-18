const router = require("../package").express.Router();
const {amenityCategoryController:{newAmenityCategory, getAllAmenityCategories, getAmenityCategory, deleteAmenityCategory, updateAmenityCategory}} = require("../controllers")

router
    .route("/")
    .get(getAllAmenityCategories)
    .post(newAmenityCategory);

router
    .route("/:id")
    .get(getAmenityCategory)
    .delete(deleteAmenityCategory)
    .patch(updateAmenityCategory)
    .put(updateAmenityCategory);

module.exports = router;