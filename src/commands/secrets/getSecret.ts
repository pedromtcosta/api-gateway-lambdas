import { Command } from '../../kernel';

export const getSecret: Command = async () => {
  return {
    response: {
      secret: 'TOP SECRET'
    },
    status: 'SUCCESS'
  }
};