import { COLUMN_NAMES, ColumnName } from '../types';

// API taban URL'sini tanımlar.
const API_BASE_URL = 'https://apitodo.azurewebsites.net';

// Yeni bir board eklemek için bir fonksiyon oluşturur.
export const addBoard = async (name: string) => {
  // 'Board/Add' endpointine POST isteği yapar ve yeni tahtanın adını gönderir.
  const response = await fetch(`${API_BASE_URL}/Board/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }), // Gönderilen JSON nesnesine tahtanın adı eklenir.
  });
  return response.json(); // Yanıtı JSON formatında döner.
};

// Tüm boardları getirmek için bir fonksiyon oluşturur.
export const getAllBoards = async () => {
  // 'Board/GetAll' endpointine GET isteği yapar.
  const response = await fetch(`${API_BASE_URL}/Board/GetAll`);
  return response.json(); // Yanıtı JSON formatında döner.
};

// Belirli bir boarddaki tüm görevleri (tasks) getirmek için bir fonksiyon oluşturur.
export const getTasksByBoardId = async (boardId: number) => {
  // 'Assignment/GetAll' endpointine POST isteği yapar ve tahta ID'sini gönderir.
  const response = await fetch(`${API_BASE_URL}/Assignment/GetAll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ boardId }), // Gönderilen JSON nesnesine tahta ID'si eklenir.
  });
  return response.json(); // Yanıtı JSON formatında döner.
};

// Yeni bir görev (task) eklemek için bir fonksiyon oluşturur.
export const addTask = async (task: { name: string; description: string; boardId: number; status: ColumnName }) => {
  // Görevin durumunu (status) 1'den başlatmak için dizindeki yerine göre indeksini alır ve 1 ekler.
  const statusIndex = COLUMN_NAMES.indexOf(task.status) + 1;
  // 'Assignment/Add' endpointine POST isteği yapar ve yeni görevi gönderir.
  const response = await fetch(`${API_BASE_URL}/Assignment/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...task, status: statusIndex }), // Gönderilen JSON nesnesine görevin verilerini ve durum indeksini ekler.
  });
  return response.json(); // Yanıtı JSON formatında döner.
};

// Belirli bir görevi (task) silmek için bir fonksiyon oluşturur.
export const deleteTask = async (taskId: number) => {
  // 'Assignment/Delete' endpointine DELETE isteği yapar ve görev ID'sini gönderir.
  const response = await fetch(`${API_BASE_URL}/Assignment/Delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: taskId }) // Gönderilen JSON nesnesine görev ID'si eklenir.
  });
  return response.json(); // Yanıtı JSON formatında döner.
};