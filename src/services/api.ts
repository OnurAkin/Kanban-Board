// services/api.ts

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

export const addTask = async (task: { name: string; description: string; boardId: number }) => {
  const response = await fetch('https://apitodo.azurewebsites.net/Assignment/Add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  return response.json();
};