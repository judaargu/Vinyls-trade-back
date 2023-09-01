"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getVinyls_1 = require("../Controllers/Vinyls/getVinyls");
const router = (0, express_1.Router)();
router.get('/', getVinyls_1.getAllVinyls);
router.post("/vinyls", getVinyls_1.postVinylsController);
exports.default = router;
