"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getVinyls_1 = require("../Controllers/Vinyls/getVinyls");
const usersRouter_1 = require("../Routes/usersRouter");
const router = (0, express_1.Router)();
router.get('/', getVinyls_1.getAllVinyls);
router.post("/createUser", usersRouter_1.createUserHandler);
router.post("/vinyls", getVinyls_1.postVinylsController);
exports.default = router;

