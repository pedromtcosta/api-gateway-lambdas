export type CommandStatus = 
  'SUCCESS'
  | 'UNAUTHORIZED'
  | 'CLIENT_ERROR'
  | 'INTERNAL_ERROR';

export type CommandResponse = {
  status: CommandStatus
  response: any
};

export type Command = (...args: any[]) => Promise<CommandResponse>;
