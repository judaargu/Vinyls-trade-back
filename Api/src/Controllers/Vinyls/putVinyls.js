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
exports.changeVinyls = void 0;
const Vinyls_1 = require("../../Models/Vinyls");
const changeVinyls = (body, params) => __awaiter(void 0, void 0, void 0, function* () {
    const { units } = body;
    const { id } = params;
    const vinilo = yield Vinyls_1.Vinyl.findByPk(id);
    if (vinilo) {
        vinilo.stock = vinilo.stock - units;
        yield vinilo.save();
        return 'actualizacion exitosa';
    }
    else {
        return 'no se ha encontrado el vinilo correspondiente';
    }
});
exports.changeVinyls = changeVinyls;
