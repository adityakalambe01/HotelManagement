const {hotelCategoryModel: HotelCategory} = require("../../../src/models"); // 👈 adjust path if needed
const seedData = require("./categorySeedData"); // 👈 this is the file you just created

async function hotelTypesSeeder() {
    console.log("🌱 Seeding Hotel Types...");

    for (const type of seedData) {
        const { name, description, icon } = type;

        // Check if already exists
        const existing = await HotelCategory.findOne({ name });
        if (existing) {
            console.log(`ℹ️ Hotel Type '${name}' already exists`);
            continue;
        }

        // Insert new
        await HotelCategory.create({name, description, icon});
        console.log(`✅ Hotel Type '${name}' created`);
    }

    console.log("🎉 Hotel Types seeding completed!");
}

module.exports = hotelTypesSeeder;
