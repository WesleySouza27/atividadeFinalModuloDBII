import { Router } from "express";


export class Tweet {
    public static bind(): Router {
        const router = Router();

        router.get("tweets", controller.listar);
        router.get(
      "/tweets/:id",
      [authMiddleware, validateUidFormatMiddleware],
      controller.buscarPorID
    );
    router.post("/tweets", [authMiddleware], controller.cadastrar);
    router.put(
      "/tweets/:id",
      [authMiddleware, validateUidFormatMiddleware],
      controller.atualizar
    );
    router.delete(
      "/tweets/:id",
      [authMiddleware, validateUidFormatMiddleware],
      controller.excluir
    );

    return router;

    }
}