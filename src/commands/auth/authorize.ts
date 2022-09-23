import { Command } from '../../kernel';

export const authorize: Command = async (authToken: string) => {
  if (authToken === '123') {
    return {
      response: {},
      status: 'SUCCESS'
    }
  }

  return {
    response: {},
    status: 'UNAUTHORIZED'
  }
};