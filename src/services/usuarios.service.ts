import { Usuario } from "@prisma/client";
import { prismaClient } from "../database/prisma.client";
import { AtualizarUsuarioDto, CadastrarUsuarioDto, ListarUsuarioDto } from "../dtos/usuarios.dto";
import { HTTPError } from "../utils/http.error";

// Tipos Utilitários TS
type UsuarioParcial = Omit<Usuario, "senha">;

export class UsuarioService {
  public async cadastrar({ email, nome, senha }: CadastrarUsuarioDto): Promise<UsuarioParcial> {
    const emailJaCadastrado = await prismaClient.usuario.findUnique({
      where: { email },
    });

    if (emailJaCadastrado) {
      throw new HTTPError(409, "E-mail já cadastrado por outro usuário");
    }

    const novoUsuario = await prismaClient.usuario.create({
      data: {
        nome,
        email,
        senha,
      },
    });

    const { senha: _, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  }

  public async listar({ nome }: ListarUsuarioDto): Promise<UsuarioParcial[]> {
    const usuariosDB = await prismaClient.usuario.findMany({
      where: {
        nome: {
          contains: nome,
          mode: "insensitive",
        },
      },
      orderBy: {
        nome: "asc",
      },
    });

    return usuariosDB.map(({ senha, ...usuario }) => usuario);
  }

  public async buscarPorId(idUsuario: string): Promise<UsuarioParcial> {
    const usuario = await prismaClient.usuario.findUnique({
      where: { id: idUsuario },
    });

    if (!usuario) {
      throw new HTTPError(404, "Usuário não encontrado");
    }

    const { senha, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }

  public async atualizar(id: string, { email, nome, senha }: AtualizarUsuarioDto): Promise<UsuarioParcial> {
    await this.buscarPorId(id);

    const usuarioAtualizado = await prismaClient.usuario.update({
      where: { id },
      data: {
        email,
        nome,
        senha,
      },
    });

    const { senha: _, ...usuarioSemSenha } = usuarioAtualizado;
    return usuarioSemSenha;
  }

  public async excluir(idUsuario: string): Promise<UsuarioParcial> {
    await this.buscarPorId(idUsuario);

    const usuarioExcluido = await prismaClient.usuario.delete({
      where: { id: idUsuario },
    });

    const { senha, ...usuarioSemSenha } = usuarioExcluido;
    return usuarioSemSenha;
  }
}