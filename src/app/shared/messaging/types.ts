export enum Status {
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export type Message = {
  id: number;
  sentOn: Date;
  toPhoneNumber: string;
  content: string;
  status: Status;
};
