const { amenityModel:AmenityModel, amenityCategoryModel:AmenityCategoryModel } = require("../../../src/models");
const amenitiesData = require("./amenitiesSeedData");

async function seedAmenities() {
    console.log("🚀 Starting amenities seeding...");

    for (const amenity of amenitiesData) {
        const { name, description, icon, category } = amenity;

        // ✅ Find the categories document
        const categoryDoc = await AmenityCategoryModel.findOne({ name: category });

        if (!categoryDoc) {
            console.warn(`⚠️ Skipped '${name}' → Category '${category}' not found`);
            continue; // skip inserting if categories is missing
        }

        // ✅ Check if amenity already exists
        const existingAmenity = await AmenityModel.findOne({ name, category: categoryDoc._id });

        if (!existingAmenity) {
            await AmenityModel.create({
                name,
                description,
                icon,
                category: categoryDoc._id,
            });
            console.log(`✅ Amenity '${name}' created under '${category}'`);
        } else {
            console.log(`ℹ️ Amenity '${name}' already exists under '${category}'`);
        }
    }

    console.log("🌱 amenities seeding completed");
}

module.exports = seedAmenities;
