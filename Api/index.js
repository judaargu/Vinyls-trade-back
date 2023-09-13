"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const db_1 = require("./src/db");
const config_1 = require("./config");
app_1.default.listen(config_1.PORT, () => {
    db_1.sequelize.sync({ force: false });
    console.log(`Server listening on port: ${config_1.PORT}`); // eslint-disable-line no-console
});
