const { connectToDatabase, disconnectToDatabase } = require("../src/config/db.config");
const { mongoose } = require("../src/config");
const { amenityCategories, amenitiesList } = require("./amenities");
const {hotelCategories} = require("./hotel");
const { header, footer } = require("./utils");

// ==================== Seeder Runner ====================
async function index() {
    console.log("🚀 Starting database seeding...");

    try {
        // DB Connection
        let step = header("MongoDB Connection");
        await connectToDatabase(mongoose);
        footer("MongoDB Connected", step);

        // Amenity Categories
        step = header("Seeding Amenity Categories");
        await amenityCategories();
        footer("Amenity Categories Seeding", step);

        // amenities List
        step = header("Seeding Amenity List");
        await amenitiesList();
        footer("Amenity List Seeding", step);

        // Hotel Categories
        step = header("Seeding Hotel Categories");
        await hotelCategories();
        footer("Hotel Categories Seeding", step);

    } catch (err) {
        console.error("❌ Error during seeding:", err.message);
    } finally {
        let step = header("Closing MongoDB Connection");
        await disconnectToDatabase();
        footer("MongoDB Connection Closed", step);

        console.log("🎉 Database seeding finished");
    }
}

index();
