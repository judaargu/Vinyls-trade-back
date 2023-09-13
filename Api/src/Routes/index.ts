import { Router } from "express";
import {
  getAllVinyls,
  postVinylsController,
  getVinylById,
} from "../Controllers/Vinyls/getVinyls";
import { createUser, loginUser } from "../Controllers/Users/postUser";
import { authenticateJWT } from "../Middlewares/authMiddleware";
import { postVinyl } from "../Controllers/Vinyls/postVinyl";
import { Request, Response } from "express";
import {
  createOrder,
  recieveWebhook,
} from "../Controllers/MercadoPago/payment";
import { ParsedQs } from "qs";

const router = Router();
const routerAuth = Router();

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


//! Ruta para autenticación con google
routerAuth.get('/google', (req:Request, res:Response) => res.send(req.user));

router.get("/protectedResource", authenticateJWT, (req: Request, res: Response) => {
  res.json({message: 'Ruta protegida'})
})


router.post("/", async (req: Request, res: Response) => {
  try {
    const vinyl = await postVinyl(req.body);
    return res.status(vinyl.status).json(vinyl.json);
  } catch (error) {
    return res.status(404).json(error);
  }
});

router.post("/vinyls", postVinylsController);


//Mercado Pago
router.post("/create_order", async (req: Request, res: Response) => {
  try {
    const payment = await createOrder(req.body);
    return res.status(206).json(payment);
  } catch (error) {
    return res.status(406).json(error);
  }
});

router.get("/success", (req: Request, res: Response) =>
  res.status(200).send("success")
);
router.get("/failure", (req: Request, res: Response) =>
  res.status(200).send("failure")
);
router.get("/pending", (req: Request, res: Response) =>
  res.status(200).send("pending")
);

router.post("/webhook", async (req: Request, res: Response) => {
  const queryParams: ParsedQs = req.query;
  try {
    const webhook = await recieveWebhook(queryParams);
    console.log(req.query)
    res.status(207).json(webhook);
  } catch (error) {
    res.status(407).json(error);
  }
});


export {router, routerAuth};

