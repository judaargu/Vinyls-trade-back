import { Router } from "express";
import {
  getAllVinyls,
  postVinylsController,
  getVinylById,
} from "../Controllers/Vinyls/getVinyls";
import { createUser, loginUser } from "../Controllers/Users/postUser";
import { authenticateJWT } from "../Middlewares/authMiddleware";
import { postVinyl } from "../Controllers/Vinyls/postVinyl";
import { createReview } from "../Controllers/Users/Reviews";
import { Request, Response } from "express";
import { createOrder, verifyPayment } from "../Controllers/MercadoPago/payment";
import { changeVinyls } from "../Controllers/Vinyls/putVinyls";
import { getAdmins, getUsers } from "../Controllers/Users/getUsers";
import {ParsedQs} from 'qs'
import { historial } from "../Controllers/Order/postOrder";


const router = Router();
const routerAuth = Router();
const routerUsers = Router();

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

routerUsers.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.status(users.status).json(users.json);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

routerUsers.get("/admins", async (req: Request, res: Response) => {
  try {
    const users = await getAdmins();
    return res.status(users.status).json(users.json);
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

//! Ruta para autenticación con google
routerAuth.get("/google", (req: Request, res: Response) => res.send(req.user));

router.get(
  "/protectedResource",
  authenticateJWT,
  (req: Request, res: Response) => {
    res.json({ message: "Ruta protegida" });
  }
);

//Vinilos

router.post("/", async (req: Request, res: Response) => {
  try {
    const vinyl = await postVinyl(req.body);
    return res.status(vinyl.status).json(vinyl.json);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.post("/vinyls", postVinylsController);

router.put("/upgrade_vinyls/:id", async (req: Request, res: Response) => {
  try {
    const response = await changeVinyls(req.body, req.params);
    res
      .status(200)
      .send(`se han realizado los cambios en el vinilo ${req.params.id}`);
  } catch (error) {
    res.status(400).json(error);
  }
});
//! Ruta para agregar una reseña
router.post("/reviews", createReview);

//Mercado Pago

router.post("/create_order", async (req: Request, res: Response) => {
  try {
    const payment = await createOrder(req.body);
    return res.status(206).json(payment);
  } catch (error) {
    return res.status(406).json(error);
  }
});


router.post("/webhook", async (req: Request, res: Response) => {
  const queryParams: ParsedQs = req.query;
  try {
    const webhook = await verifyPayment(queryParams);
    res.status(207).json(webhook);
  } catch (error) {
    res.status(407).json(error);
  }
});

router.get("/order", historial)


export { router, routerAuth, routerUsers };
