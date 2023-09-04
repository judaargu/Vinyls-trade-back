"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./src/app"));
const db_1 = require("./src/db");
app_1.default.listen(3001, () => {
    db_1.sequelize.sync({ force: false });
    console.log('%s listening at 3001'); // eslint-disable-line no-console
});
