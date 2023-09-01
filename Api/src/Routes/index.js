"use strict";
<<<<<<< HEAD
=======
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getVinyls_1 = __importDefault(require("../Controllers/Vinyls/getVinyls"));
const usersRouter_1 = require("../Routes/usersRouter");
const router = (0, express_1.Router)();
router.get("/", getVinyls_1.default);
router.post("/createUser", usersRouter_1.createUserHandler);
exports.default = router;
>>>>>>> a6c35d20565fda938591a7504dbe2eadcf30160b
