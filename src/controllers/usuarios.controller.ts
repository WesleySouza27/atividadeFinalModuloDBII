import { Request, Response, NextFunction } from 'express';
import { Usuario } from '@prisma/client';
import dotenv from 'dotenv';
import {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  comparePassword
} from '../services/usuarios.service';
import jwt, { Secret } from 'jsonwebtoken';
import { ApiResponse } from '../utils/api-response';
import { hash } from 'bcrypt';

dotenv.config()

const secret: Secret = process.env.JWT_SECRET || 'chave_secreta';  // Use 'JWT_SECRET' e defina um valor padrão

if (!secret) {
  throw new Error('JWT_SECRET não está definido nas variáveis de ambiente');
}
// Função para gerar o token JWT
function generateToken(usuario: Usuario): string {
  return jwt.sign({ email: usuario.email }, secret, { expiresIn: '1h' });
}

// Controller para criar um novo usuário
export async function createUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const userData: Omit<Usuario, 'id'> = req.body;
    const newUser = await createUser(userData);
    ApiResponse.success(res, 'Utilizador criado com sucesso', newUser, 201);
  } catch (error: any) {
    next(error);
  }
}

// Controller para obter um usuário pelo ID
export async function getUserByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const usuarioId = req.params.id;
    const usuario = await getUserById(usuarioId);
    if (!usuario) {
      ApiResponse.error(res, 'Utilizador não encontrado', null, 404);
      return;
    }
    ApiResponse.success(res, 'Utilizador encontrado', usuario);
  } catch (error: any) {
    next(error);
  }
}

// Controller para atualizar um usuário
export async function updateUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const usuarioId = req.params.id;
    const usuarioData: Partial<Omit<Usuario, 'id'>> = req.body;
    const usuarioAtualizado = await updateUser(usuarioId, usuarioData);
    ApiResponse.success(res, 'Utilizador atualizado com sucesso', usuarioAtualizado);
  } catch (error: any) {
    next(error);
  }
}

// Controller para deletar um usuário
export async function deleteUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const usuarioId = req.params.id;
    await deleteUser(usuarioId);
    ApiResponse.success(res, 'Utilizador eliminado com sucesso');
  } catch (error: any) {
    next(error);
  }
}

// Controller para login
export async function loginUserController(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    // Encontra o usuário por email
    const usuario = await findUserByEmail(email);
    if (!usuario) {
      ApiResponse.error(res, 'usuario não encontrado', null, 401);
      return;
    }

    // Verifica a senha
    const passwordMatch = await comparePassword(password, usuario.senha);
    if (!passwordMatch) {
      ApiResponse.error(res, 'Senha ou e-mail incorreta', null, 401);
      return;
    }
    
    // Gera o token JWT
    const token = generateToken(usuario);
    
    // Retorna o token para o cliente
    ApiResponse.success(res, 'Login realizado com sucesso', { 
      token, // Inclui o token na resposta
      usuario: { 
        id: usuario.id, 
        nome: usuario.nome, 
        email: usuario.email 
      } 
    });
  } catch (erro) {
    next(erro);
  }
}