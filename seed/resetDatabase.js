const { connectToDatabase, disconnectToDatabase } = require("../src/config/db.config");
const { mongoose } = require("../src/config");

// Models
const {
    amenityModel: AmenityModel,
    amenityCategoryModel: AmenityCategoryModel,
    hotelCategoryModel: HotelTypeModel,
} = require("../src/models");

// Seeders
const { amenityCategories, amenitiesList } = require("./amenities");
const { hotelCategories } = require("./hotel");
const { header, footer, wipeHeader, wipeFooter } = require("./utils");

// ==================== Wipe Function ====================
async function wipeCollections() {
    const models = [
        { name: "Amenity Categories", model: AmenityCategoryModel },
        { name: "Amenities", model: AmenityModel },
        { name: "Hotel Categories", model: HotelTypeModel },
    ];

    for (const { name, model } of models) {
        const step = wipeHeader(`Wiping ${name}`);
        const result = await model.deleteMany({});
        wipeFooter(`${name} wiped (${result.deletedCount} documents removed)`, step);
    }
}

// ==================== Reset Function ====================
async function resetDatabase() {
    console.log("🧹 Starting database RESET...");

    try {
        // Connect to DB
        let step = header("MongoDB Connection");
        await connectToDatabase(mongoose);
        footer("MongoDB Connected", step);

        // Wipe collections
        await wipeCollections();

        // Run seeders
        step = header("Seeding Amenity Categories");
        await amenityCategories();
        footer("Amenity Categories Seeding", step);

        step = header("Seeding Amenities List");
        await amenitiesList();
        footer("Amenities List Seeding", step);

        step = header("Seeding Hotel Categories");
        await hotelCategories();
        footer("Hotel Categories Seeding", step);


    } catch (err) {
        console.error("❌ Error during database reset:", err.message);
    } finally {
        let step = header("Closing MongoDB Connection");
        await disconnectToDatabase();
        footer("MongoDB Connection Closed", step);

        console.log("🎉 Database RESET completed successfully!");
    }
}

// Run script
resetDatabase();
