import { COLUMN_NAMES, ColumnName } from '../types';

const API_BASE_URL = 'https://apitodo.azurewebsites.net';

export const addBoard = async (name: string) => {
  const response = await fetch(`${API_BASE_URL}/Board/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

export const getAllBoards = async () => {
  const response = await fetch(`${API_BASE_URL}/Board/GetAll`);
  return response.json();
};

export const getTasksByBoardId = async (boardId: number) => {
  const response = await fetch(`${API_BASE_URL}/Assignment/GetAll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ boardId }),
  });
  return response.json();
};

export const addTask = async (task: { name: string; description: string; boardId: number; status: ColumnName }) => {
  const statusIndex = COLUMN_NAMES.indexOf(task.status) + 1; // Status indeksini 1'den başlatmak için 1 ekleyin
  const response = await fetch(`${API_BASE_URL}/Assignment/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...task, status: statusIndex }),
  });
  return response.json();
};