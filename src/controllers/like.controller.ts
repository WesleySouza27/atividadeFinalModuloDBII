import { Request, Response, NextFunction } from 'express';
import {
  criarLike,
  obterLikePorId,
  deletarLike,
  verificarLikeUnico
} from '../services/like.service';
import { ApiResponse } from '../utils/api-response';
import { Prisma } from '@prisma/client';

// Controller para criar um novo like
async function criarLikeController(req: Request, res: Response, next: NextFunction) {
  try {
    const dados: Prisma.LikeCreateInput = {
      usuario: { // Alterado para um objeto
        connect: {
          id: req.body.usuarioId, // Passa o ID dentro de "connect"
        },
      },
      tweet: { // Alterado para um objeto
        connect: {
          id: req.body.tweetId,
        },
      },
    };

    // Verifica se o usuário já deu like neste tweet
    const likeExistente = await verificarLikeUnico(req.body.usuarioId, req.body.tweetId);
    if (likeExistente) {
      ApiResponse.error(res, 'Você já curtiu este tweet', null, 400);
      return;
    }

    const novoLike = await criarLike(dados);
    ApiResponse.success(res, 'Like criado com sucesso', novoLike, 201);
  } catch (erro: any) {
    next(erro);
  }
}

// Controller para obter um like pelo ID
async function obterLikePorIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const like = await obterLikePorId(id);
    if (!like) {
      ApiResponse.error(res, 'Like não encontrado', null, 404);
      return;
    }
    ApiResponse.success(res, 'Like encontrado', like);
  } catch (erro: any) {
    next(erro);
  }
}

// Controller para deletar um like
async function deletarLikeController(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    await deletarLike(id);
    ApiResponse.success(res, 'Like deletado com sucesso');
  } catch (erro: any) {
    next(erro);
  }
}

export { criarLikeController, obterLikePorIdController, deletarLikeController };