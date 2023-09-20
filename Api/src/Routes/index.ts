import { Router } from "express";
import {
  getAllVinyls,
  postVinylsController,
  getVinylById,
} from "../Controllers/Vinyls/getVinyls";
import { createUser, loginUser } from "../Controllers/Users/postUser";
import loginGoogle from "../Controllers/Users/googleUsers";
import { authenticateJWT } from "../Middlewares/authMiddleware";
import { postVinyl } from "../Controllers/Vinyls/postVinyl";
import {
  createReview,
  getAllReviews,
} from "../Controllers/Users/Reviews";
import { Request, Response } from "express";
import { createOrder, verifyPayment } from "../Controllers/MercadoPago/payment";
import {
  changeVinyls,
  restoreVinyls,
  suspendVinyls,
} from "../Controllers/Vinyls/putVinyls";
import { getAdmins, getUsers } from "../Controllers/Users/getUsers";
import { ParsedQs } from "qs";
import { history } from "../Controllers/Order/postOrder";
import {
  deleteAllUsers,
  deleteUser,
  inhabilityDeleteUser,
  restoreUser,
} from "../Controllers/Users/deleteUser";
import { Order } from "../Models/Order";
import { createOrderDetail } from "../Controllers/OrderDetail/postOrderDetail";
import { enviarNotificacionDeCompra } from "../Controllers/Notifications/Notifications";
import { getOrder, getOrderDetail } from "../Controllers/OrderDetail/getOrderDetail";
import { OrderDetail } from "../Models/orderDetail";

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

router.delete("/deleteUser/:id", deleteUser);

router.delete("/inhabilityUser/:id", inhabilityDeleteUser);

router.patch("/restoreUser/:id", restoreUser);

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
routerAuth.get("/google", async (req: Request, res: Response) => {
  const infoUser: any = req.user;
  try {
    const user = await loginGoogle(infoUser);
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
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch("/restore_vinyls/:id", async (req: Request, res: Response) => {
  try {
    const response = await restoreVinyls(req.params);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/delete_vinyls/:id", async (req: Request, res: Response) => {
  try {
    const response = await suspendVinyls(req.params);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

//! Ruta para agregar una reseña
router.post("/reviews", createReview);
router.get('/get/allReviews', async (req: Request, res: Response) => {
  try {
    const reviews = await getAllReviews();
    return res.status(reviews.status).json(reviews.json);
  } catch (error) {
    return res.status(500).json(error)
  }
})

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

router.post("/createOrderDetail", async (req: Request, res: Response) => {
  try {
    const response = await createOrderDetail(req.body);
    res.status(response.status).json(response.json);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.get("/get/order", async (req: Request, res: Response) => {
  try {
    const response = await history();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
});

// ! Sólo usar cuando se quiera eliminar a todos los usuarios de la base de datos
router.delete("/deleteUsers", async (req: Request, res: Response) => {
  try {
    const deleteSucces = await deleteAllUsers();
    return res.status(deleteSucces.status).json(deleteSucces.data);
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/lala", async (req: Request, res: Response) => {
  const {destinatario, nombreVinilo, precio} = req.body;
  console.log(destinatario, nombreVinilo, precio)
  try {
    const response = await enviarNotificacionDeCompra(destinatario, nombreVinilo, precio);
    res.status(200).send("Se ha enviado correctamente")
  } catch (error) {
    res.status(400).json(error);
  }
})

router.delete("/delete/deleteOrderDetail", async (req: Request, res: Response) => {
  try {
    const response = await getOrderDetail();
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(error);
  }
})

router.delete("/deleteOrder", async (req: Request, res: Response) => {
  try {
    const response = await getOrder();
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(error);
  }
})

router.get('/get/orderDetail', async (req: Request, res: Response) => {
  try {
    const response = await OrderDetail.findAll();
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(error);
  }
})



export { router, routerAuth, routerUsers };
