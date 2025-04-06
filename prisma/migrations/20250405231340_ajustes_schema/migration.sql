/*
  Warnings:

  - Made the column `descricao` on table `tweets` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tweets" ALTER COLUMN "descricao" SET NOT NULL;
