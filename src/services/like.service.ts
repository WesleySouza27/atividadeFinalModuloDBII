import { PrismaClient, Prisma } from '@prisma/client';
const prisma = new PrismaClient();

// Função para criar um novo like
async function criarLike(dados: Prisma.LikeCreateInput): Promise<{ id: string; usuarioId: string; tweetId: string; }> {
  const novoLike = await prisma.like.create({
    data: dados,
  });
  return novoLike;
}

// Função para obter um like pelo ID
async function obterLikePorId(id: string): Promise<{ id: string; usuarioId: string; tweetId: string; } | null> {
  const like = await prisma.like.findUnique({
    where: { id },
  });
  return like;
}

// Função para deletar um like
async function deletarLike(id: string): Promise<void> {
  await prisma.like.delete({
    where: { id },
  });
}

// Função para verificar se um usuário já deu like em um tweet
async function verificarLikeUnico(usuarioId: string, tweetId: string): Promise<{ id: string; usuarioId: string; tweetId: string; } | null> {
  const like = await prisma.like.findUnique({
    where: {
      usuarioId_tweetId: {
        usuarioId: usuarioId, // Use a variável usuarioId
        tweetId: tweetId,     // Use a variável tweetId
      },
    },
  });
  return like;
}

export { criarLike, obterLikePorId, deletarLike, verificarLikeUnico };