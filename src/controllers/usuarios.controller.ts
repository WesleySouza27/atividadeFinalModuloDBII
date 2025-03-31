import { Request, Response } from "express";
import { UsuarioService } from "../services/usuarios.service";

const usuarioService = new UsuarioService();

export class UsuarioController {
  public async cadastrar(req: Request, res: Response): Promise<void> {
    const usuario = await usuarioService.cadastrar(req.body);
    res.status(201).json(usuario);
  }

  public async listar(req: Request, res: Response): Promise<void> {
    const usuarios = await usuarioService.listar(req.query);
    res.status(200).json(usuarios);
  }

  public async buscarPorId(req: Request, res: Response): Promise<void> {
    const usuario = await usuarioService.buscarPorId(req.params.id);
    res.status(200).json(usuario);
  }

  public async atualizar(req: Request, res: Response): Promise<void> {
    const usuario = await usuarioService.atualizar(req.params.id, req.body);
    res.status(200).json(usuario);
  }

  public async excluir(req: Request, res: Response): Promise<void> {
    const usuario = await usuarioService.excluir(req.params.id);
    res.status(200).json(usuario);
  }
}