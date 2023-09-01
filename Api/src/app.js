"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
require("./db"); // Import your database setup
const Routes_1 = __importDefault(require("./Routes"));
const server = (0, express_1.default)();
server.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(body_parser_1.default.json({ limit: '50mb' }));
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)('dev'));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Uncomment these lines when you have defined the routers in the routes/index.ts file
// server.use('/recipes', routerRecipes);
// server.use('/diets', routerDiets);
server.use(Routes_1.default);
server.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    console.error(err);
    res.status(status).send(message);
});
exports.default = server;
