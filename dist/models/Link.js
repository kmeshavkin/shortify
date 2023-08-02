"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = void 0;
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
    clicksLeft: { type: Number, default: 0 },
    owner: { type: String, required: true },
});
exports.LinkModel = (0, mongoose_1.model)('Link', schema);
