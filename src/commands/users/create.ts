import { Command } from '../../kernel';

export type CreateUserDto = {
  name: string
  email: string
};

export const createUser: Command = async (dto: CreateUserDto) => {
  return {
    response: {
      user: {
        id: 'ef68ae03-0454-452c-80cd-8de42b7f3e45',
        ...dto
      }
    },
    status: 'SUCCESS'
  }
};