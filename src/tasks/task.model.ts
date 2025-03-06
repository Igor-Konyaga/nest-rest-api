export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
};

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export type TaskBody = Pick<Task, 'title' | 'description'>;
