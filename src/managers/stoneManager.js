const Stones = require('../models/Stones');


exports.getAll = () => Stones.find().populate('owner')

exports.getOne = (stoneId) => Stones.findById(stoneId).populate('owner');

exports.edit = (stoneId,stoneData) => Stones.findByIdAndUpdate(stoneId,stoneData);

exports.create = (stoneData) => Stones.create(stoneData);