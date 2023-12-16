import { Account } from '@prisma/client';
import utils from '../../src/utils';

const accounts: Account[] = [
  {
    id: '1',
    account: 'admin',
    password: utils.bcryptHash('123456'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default accounts;
