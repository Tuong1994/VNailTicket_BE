import { PrismaClient } from '@prisma/client';
import qnaItems from './qna.seed';
import accounts from './account.seed';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.account.createMany({ data: accounts });
  await prisma.qnAItem.createMany({ data: qnaItems });
};

main()
  .then(() => prisma.$disconnect())
  .catch((error) => {
    console.log(error);
    prisma.$disconnect();
  })
  .finally(() => prisma.$disconnect());
