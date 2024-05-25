const Stones = require('../models/Stones');


exports.getAll = () => Stones.find().populate('owner')

exports.getOne = (stoneId) => Stones.findById(stoneId).populate('owner');

exports.create = (stoneData) => Stones.create(stoneData);