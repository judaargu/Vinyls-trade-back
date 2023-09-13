import { Router } from "express";
import {
  getAllVinyls,
  postVinylsController,
  getVinylById,
} from "../Controllers/Vinyls/getVinyls";
import { createUser, loginUser } from "../Controllers/Users/postUser";
import { authenticateJWT } from "../Middlewares/authMiddleware";
import { postVinyl } from "../Controllers/Vinyls/postVinyl";
import { createReview, getReviewsByVinylId } from "../Controllers/Users/Reviews";
import { Request, Response } from "express";

const router = Router();

router.get("/", getAllVinyls);

//! Ruta para registrar un nuevo usuario
router.post("/createUser", async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.status(user.status).json(user.data);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const vinyl = await getVinylById(req.params);
    return res.status(vinyl.status).json(vinyl.json);
  } catch (error) {
    return res.status(404).json(error);
  }
});

//! Ruta para iniciar sesión
router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await loginUser(req.body);
    return res.status(user.status).json(user.data);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.get(
  "/protectedResource",
  authenticateJWT,
  (req: Request, res: Response) => {
    res.json({ message: "Ruta protegida" });
  }
);

router.post("/", async (req: Request, res: Response) => {
  try {
    const vinyl = await postVinyl(req.body);
    return res.status(vinyl.status).json(vinyl.json);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.post("/vinyls", postVinylsController);

//! Ruta para agregar una reseña
router.post('/reviews', createReview);

export default router;
