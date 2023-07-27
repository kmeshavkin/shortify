"use strict";
exports.__esModule = true;
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    links: [{ type: mongoose_1.Types.ObjectId, ref: 'Link' }]
});
exports.UserModel = (0, mongoose_1.model)('User', schema);
