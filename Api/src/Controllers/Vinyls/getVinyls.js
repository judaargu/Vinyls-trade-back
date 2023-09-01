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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postVinylsController = exports.getAllVinyls = void 0;
const axios_1 = __importDefault(require("axios"));
const Vinyls_1 = require("../../Models/Vinyls");
// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// const fetchReleaseData = async (resourceUrl: string) => {
//     try {
//         const response = await axios.get(resourceUrl);
//         return response.data;
//     } catch (error) {
//         console.error(`Error fetching data from ${resourceUrl}:`, error);
//         return null;
//     }
// };
// const fetchAllReleasesData = async (resourceUrls: string[]) => {
//     const allReleaseData = [];
//     for (const url of resourceUrls) {
//         const releaseData = await fetchReleaseData(url);
//         if (releaseData !== null) {
//             allReleaseData.push(releaseData);
//             await delay(2500);
//         }
//     }
//     return allReleaseData;
// };
// const getVinylDetailsController = async (req: Request, res: Response) => {
//     try {
//         const vinylsData = await getVinylsController();
//         const resourceUrls = vinylsData.map((vinyl: any) => vinyl.resource_url);
//         const releaseData = await fetchAllReleasesData(resourceUrls);
//         return res.status(200).json(releaseData);
//     } catch (error) {
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// };
// const getVinylDetailsController = async (req: Request, res: Response) => {
//     try {
//         // Obtener los datos del JSON
//         const { data } = await axios("http://localhost:3001/response.json");
//         const jsonData = cleanJson(data.data);
//         // Iterar sobre los objetos del JSON
//         for (const jsonItem of jsonData) {
//             // Verificar si alguna propiedad no es null
//             if (jsonItem.artists === null || jsonItem.videos === null || jsonItem.tracklist === null) {
//                 // Crear un objeto con las propiedades que no son null
//                 const updateData = {
//                     artists: jsonItem.artists,
//                     videos: jsonItem.videos,
//                     tracklist: jsonItem.tracklist,
//                 };
//                 // Actualizar el registro en la base de datos usando el id como identificador
//                 await Vinyl.update(updateData, {
//                     where: { idApi: jsonItem.id },
//                 });
//             }
//         }
//         res.status(200).json({ message: 'Actualización exitosa' });
//     } catch (error) {
//         res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
//     }
// }
// const getVinylsController = async () => {
//     const { data } = await axios.get(`${URL}database/search?format=Vinyl&token=${TOKEN}&page=100&per_page=100`)
//     const cleanedData = cleanData(data.results)
//     return cleanedData;
// }
// const getAllVinyls = async (req: Request, res: Response) => {
//     try {
//         const response = await getVinylsController();
//         const vinyls = await Promise.all(response.map(async (vinyl) => {
//             try {
//                 const mappedVinyl = {
//                     idApi: vinyl.id, // Mapea la propiedad id al campo idApi
//                     title: vinyl.title,
//                     year: vinyl.year,
//                     genre: vinyl.genre,
//                     cover_image: vinyl.cover_image,
//                     style: vinyl.style,
//                     stock: vinyl.stock,
//                     price: vinyl.price,
//                     resource_url: vinyl.resource_url
//                 };
//                 const createdVinyl = await Vinyl.create(mappedVinyl);
//                 return createdVinyl;
//             } catch (error) {
//                 console.error('Error al insertar vinilo en la base de datos:', error);
//                 return null;
//             }
//         }));
//         return res.status(200).json(response)
//     } catch (error) {
//         res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' })
//     }
// }
const postVinylsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield (0, axios_1.default)("http://localhost:3001/data.json");
        const postVinyls = yield Promise.all(data.data.map((vinyl) => __awaiter(void 0, void 0, void 0, function* () {
            const createdVinyl = yield Vinyls_1.Vinyl.create(vinyl);
        })));
        return res.status(200).json({ message: "Post successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
});
exports.postVinylsController = postVinylsController;
const getVinylsController = () => __awaiter(void 0, void 0, void 0, function* () {
    const findVinyl = yield Vinyls_1.Vinyl.findAll();
    return findVinyl;
});
const getAllVinyls = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield getVinylsController();
        // fs.writeFileSync('data.json', JSON.stringify(response, null, 2));
        return res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Something went wrong' });
    }
});
exports.getAllVinyls = getAllVinyls;
