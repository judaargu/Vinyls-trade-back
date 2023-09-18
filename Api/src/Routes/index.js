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
exports.routerUsers = exports.routerAuth = exports.router = void 0;
const express_1 = require("express");
const getVinyls_1 = require("../Controllers/Vinyls/getVinyls");
const postUser_1 = require("../Controllers/Users/postUser");
const authMiddleware_1 = require("../Middlewares/authMiddleware");
const postVinyl_1 = require("../Controllers/Vinyls/postVinyl");
const Reviews_1 = require("../Controllers/Users/Reviews");
const payment_1 = require("../Controllers/MercadoPago/payment");
const putVinyls_1 = require("../Controllers/Vinyls/putVinyls");
const getUsers_1 = require("../Controllers/Users/getUsers");
const postOrder_1 = require("../Controllers/Order/postOrder");
const router = (0, express_1.Router)();
exports.router = router;
const routerAuth = (0, express_1.Router)();
exports.routerAuth = routerAuth;
const routerUsers = (0, express_1.Router)();
exports.routerUsers = routerUsers;
router.get("/", getVinyls_1.getAllVinyls);
//! Ruta para registrar un nuevo usuario
router.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, postUser_1.createUser)(req.body);
        return res.status(user.status).json(user.data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
routerUsers.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getUsers_1.getUsers)();
        return res.status(users.status).json(users.json);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
routerUsers.get("/admins", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, getUsers_1.getAdmins)();
        return res.status(users.status).json(users.json);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vinyl = yield (0, getVinyls_1.getVinylById)(req.params);
        return res.status(vinyl.status).json(vinyl.json);
    }
    catch (error) {
        return res.status(404).json(error);
    }
}));
//! Ruta para iniciar sesión
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, postUser_1.loginUser)(req.body);
        return res.status(user.status).json(user.data);
    }
    catch (error) {
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}));
//! Ruta para autenticación con google
routerAuth.get("/google", (req, res) => res.send(req.user));
router.get("/protectedResource", authMiddleware_1.authenticateJWT, (req, res) => {
    res.json({ message: "Ruta protegida" });
});
//Vinilos
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vinyl = yield (0, postVinyl_1.postVinyl)(req.body);
        return res.status(vinyl.status).json(vinyl.json);
    }
    catch (error) {
        return res.status(404).json(error);
    }
}));
router.post("/vinyls", getVinyls_1.postVinylsController);
router.put("/upgrade_vinyls/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, putVinyls_1.changeVinyls)(req.body, req.params);
        res
            .status(200)
            .send(`se han realizado los cambios en el vinilo ${req.params.id}`);
    }
    catch (error) {
        res.status(400).json(error);
    }
}));
//! Ruta para agregar una reseña
router.post("/reviews", Reviews_1.createReview);
//Mercado Pago
router.post("/create_order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield (0, payment_1.createOrder)(req.body);
        return res.status(206).json(payment);
    }
    catch (error) {
        return res.status(406).json(error);
    }
}));
router.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    try {
        const webhook = yield (0, payment_1.verifyPayment)(queryParams);
        res.status(207).json(webhook);
    }
    catch (error) {
        res.status(407).json(error);
    }
}));
router.get("/order", postOrder_1.historial);
