import { Router } from "express";
import { UsuarioController } from "../controllers/usuarios.controller";

const router = Router();
const usuarioController = new UsuarioController();

router.post("/", usuarioController.cadastrar);
router.get("/", usuarioController.listar);
router.get("/:id", usuarioController.buscarPorId);
router.put("/:id", usuarioController.atualizar);
router.delete("/:id", usuarioController.excluir);

export default router;