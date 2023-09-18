"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewsByVinylId = exports.createReview = void 0;
const Reviews_1 = require("../../Models/Reviews");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, country, comment } = req.body;
        const newReview = yield Reviews_1.Review.create({ name, email, country, comment });
        res.status(201).json(newReview);
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.createReview = createReview;
const getReviewsByVinylId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vinylId = req.params.vinylId;
        const reviews = yield Reviews_1.Review.findAll({ where: { vinylId } });
        res.json(reviews);
    }
    catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
exports.getReviewsByVinylId = getReviewsByVinylId;
