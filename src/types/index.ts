// types.ts
export type ColumnName = "To Do" | "In Progress" | "Done" | "Archived";

export const COLUMN_NAMES: ColumnName[] = ["To Do", "In Progress", "Done", "Archived"];

export const COLUMN_COLORS: { [key in ColumnName]: string } = {
  "To Do": "#ff6f61", // Red
  "In Progress": "#ffcc00", // Yellow
  "Done": "#4caf50", // Green
  "Archived": "#9e9e9e" // Grey
};

export interface Card {
  id: number;
  name: string;
  description: string;
  status: ColumnName;
}

export interface Column {
  id: string;
  title: ColumnName;
  cards: Card[];
}
