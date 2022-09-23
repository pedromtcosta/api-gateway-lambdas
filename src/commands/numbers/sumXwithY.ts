import { Command } from '../../kernel';
import { BigNumber } from 'bignumber.js';

export const sumXwithY: Command = async (x: string, y: string) => {
  console.log('x', x);
  console.log('y', y);
  return {
    response: {
      sum: new BigNumber(x).plus(y).toString()
    },
    status: 'SUCCESS'
  }
};