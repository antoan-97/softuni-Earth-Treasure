const Stones = require('../models/Stones');


exports.getAll = () => Stones.find().populate('owner')

exports.getOne = (stoneId) => Stones.findById(stoneId).populate('owner');

exports.edit = (stoneId,stoneData) => Stones.findByIdAndUpdate(stoneId,stoneData);

exports.delete = (stoneId) => Stones.findByIdAndDelete(stoneId);

exports.create = (stoneData) => Stones.create(stoneData);

exports.like = async (stoneId, userId) => {
    const stone = await Stones.findById(stoneId);

    if (!stone) {
        throw new Error('Stone not found');
    }

    // Check if the user has already voted
    if (stone.likedList.includes(userId)) {
        return;
    }

    stone.likedList.push(userId);
    return stone.save();
};