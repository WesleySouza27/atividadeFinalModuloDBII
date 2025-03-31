import { Router } from "express";


export class Like {
    public static bind(): Router {
        const router = Router();

        router.get("likes", controller.listar);
        router.get(
      "/likes/:id",
      [authMiddleware, validateUidFormatMiddleware],
      controller.buscarPorID
    );
    router.post("/likes", [authMiddleware], controller.cadastrar);
    router.put(
      "/likes/:id",
      [authMiddleware, validateUidFormatMiddleware],
      controller.atualizar
    );
    router.delete(
      "/likes/:id",
      [authMiddleware, validateUidFormatMiddleware],
      controller.excluir
    );

    return router;

    }
}