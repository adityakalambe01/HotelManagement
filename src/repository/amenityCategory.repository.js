const {amenityCategoryModel: AmenityCategory} = require("../models");

exports.create = async(newCategory)=> {
    const category = await new AmenityCategory(newCategory);
    return category.save();
}

exports.update = async(_id, updateData)=> await AmenityCategory.findByIdAndUpdate(_id, updateData, {new: true});

exports.deleteById = async(_id) => await AmenityCategory.findByIdAndDelete(_id);

exports.category = async (_id) => await AmenityCategory.findById(_id);

exports.categories = async(filter={}, options={}) => await AmenityCategory.paginate(filter, options);