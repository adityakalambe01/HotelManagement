const { connectToDatabase, disconnectToDatabase } = require("../src/config/db.config");
const { mongoose } = require("../src/config");
const { amenityCategories, amenitiesList } = require("./amenities");
const {hotelCategories} = require("./hotel")

// ==================== Logger Helpers ====================
function header(title = "") {
    const startTime = new Date();
    console.log(`\n[${startTime.toLocaleTimeString()}] 🔹 START: ${title}`);
    console.log("=".repeat(60));
    return startTime; // return start time so footer can use it
}

function footer(title = "", startTime) {
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000).toFixed(2); // in seconds
    console.log("=".repeat(60));
    console.log(`[${endTime.toLocaleTimeString()}] ✅ END: ${title} (took ${duration}s)\n`);
}

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
