const Stones = require('../models/Stones');


exports.getAll = () => Stones.find().populate('owner')