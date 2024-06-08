export const COLUMN_NAMES = ['Backlog', 'To Do', 'In Progress', 'Done'] as const;
export type ColumnName = typeof COLUMN_NAMES[number];

export interface Task {
  id: number;
  name: string;
  description: string;
  boardId: number;
  status: ColumnName;
}

export interface Column {
  id: string;
  title: ColumnName;
  cards: Task[];
}

export interface Board {
  id: number;
  name: string;
  status: boolean;
}
