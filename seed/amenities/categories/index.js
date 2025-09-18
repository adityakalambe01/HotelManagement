const {amenityCategoryModel: AmenityCategory} = require("../../../src/models");
const seedData = require("./categorySeedData");


async function seedAmenityCategories() {
    for (const category of seedData) {
        const { name, description } = category;

        // Check if categories already exists
        let existingCategory = await AmenityCategory.findOne({ name });

        if (!existingCategory) {
            await AmenityCategory.create({ name, description });
            console.log(`✅ Amenity Category '${name}' created`);
        } else {
            console.log(`ℹ️ Amenity Category '${name}' already exists`);
        }
    }

    console.log('🌱 Amenity Categories seeding completed');
}

module.exports = seedAmenityCategories;