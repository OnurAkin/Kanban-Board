export const COLUMN_NAMES = ['Backlog', 'To Do', 'In Progress', 'Designed'] as const;
export type ColumnName = typeof COLUMN_NAMES[number];

export interface Task {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  title: ColumnName;
  cards: Task[];
}
