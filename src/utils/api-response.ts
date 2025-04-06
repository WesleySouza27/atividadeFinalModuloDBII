import { Response } from 'express';

class ApiResponse {
  /**
   * Resposta de sucesso padrão da API.
   * @param res Objeto de resposta do Express.
   * @param mensagem Mensagem de sucesso.
   * @param dados Dados a serem retornados (opcional).
   * @param codigo Código de status HTTP (padrão: 200).
   */
  static success(res: Response, mensagem: string, dados?: any, codigo: number = 200) {
    return res.status(codigo).json({
      sucesso: true,
      mensagem,
      dados,
    });
  }

  /**
   * Resposta de erro padrão da API.
   * @param res Objeto de resposta do Express.
   * @param mensagem Mensagem de erro.
   * @param dados Dados de erro adicionais (opcional).
   * @param codigo Código de status HTTP (padrão: 400).
   */
  static error(res: Response, mensagem: string, dados?: any, codigo: number = 400) {
    return res.status(codigo).json({
      sucesso: false,
      mensagem,
      dados,
    });
  }
}

export { ApiResponse };