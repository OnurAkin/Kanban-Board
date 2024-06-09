import React, { useEffect, useState } from 'react';
import Column from './Column';
import { COLUMN_NAMES, Column as ColumnType, Task, ColumnName } from '../types';
import { getTasksByBoardId, addTask, deleteTask } from '../services/api';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

// Board bileşeni için prop türlerini tanımlar.
interface BoardProps {
  boardId: number; 
}

// Board bileşenini tanımlar.
const Board: React.FC<BoardProps> = ({ boardId }) => {
  // Sütunlar için durum değişkenini tanımlar.
  const [columns, setColumns] = useState<ColumnType[]>([]);

  // Bileşen yüklendiğinde veya boardId değiştiğinde görevleri getirmek için useEffect kullanılır.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTasksByBoardId(boardId); // Belirli bir tahtadaki görevleri API'den getirir.

        if (result.isSuccess) { // İstek başarılıysa görevleri duruma ayarlar.
          const data: Task[] = result.data;

          // Gelen verilere göre yeni sütunları oluşturur.
          const newColumns: ColumnType[] = COLUMN_NAMES.map((name) => {
            const cards = data.filter((task) => task.status === name); // Sütunun adını görev durumuna göre filtreler.
            return {
              id: `column-${COLUMN_NAMES.indexOf(name) + 1}`, // Sütun ID'si oluşturur.
              title: name, // Sütun başlığı.
              cards, // Görevleri karta dönüştürür.
            };
          });

          setColumns(newColumns); // Yeni sütunları duruma ayarlar.
        } else { // Başarısızsa hata mesajını konsola yazar.
          console.error('Error fetching tasks:', result.message);
        }
      } catch (error) { // Bir hata olursa yakalar ve konsola yazar.
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData(); // Görevleri getirir.
  }, [boardId]);

  // Sürükleme işlemi sona erdiğinde görevlerin yeni sütunlarına taşınmasını işleyen işlevi tanımlar.
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return; // Eğer hedef yoksa (örneğin sürükleme iptal edilirse) hiçbir şey yapmaz.
    }

    // Kaynak ve hedef sütun indekslerini bulur.
    const sourceColumnIndex = columns.findIndex(col => col.id === source.droppableId);
    const destinationColumnIndex = columns.findIndex(col => col.id === destination.droppableId);

    // Kaynak ve hedef sütunları alır.
    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumn = columns[destinationColumnIndex];

    // Taşınan kartı kaynak sütundan çıkarır.
    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    movedCard.status = destinationColumn.title; // Kartın durumunu günceller.

    // Taşınan kartı hedef sütuna ekler.
    destinationColumn.cards.splice(destination.index, 0, movedCard);

    // Yeni sütunları oluşturur ve durumu günceller.
    const newColumns = [...columns];
    newColumns[sourceColumnIndex] = sourceColumn;
    newColumns[destinationColumnIndex] = destinationColumn;

    setColumns(newColumns);
  };

  // Yeni görev eklemek için işlev tanımlar.
  const handleAddTask = async (task: { name: string; description: string; boardId: number; status: ColumnName }) => {
    try {
      task.boardId = boardId; // Görevi ilgili tahtaya ekler.
      const result = await addTask(task); // Görevi API'ye ekler.
      if (result.isSuccess) {
        // Yeni sütunları günceller ve yeni görevi ekler.
        setColumns((prevColumns) => {
          const updatedColumns = [...prevColumns];
          const columnIndex = updatedColumns.findIndex((col) => col.title === task.status);
          if (columnIndex >= 0) {
            // Daha önce aynı görev eklenmişse eklemeyi atla.
            if (!updatedColumns[columnIndex].cards.find((card) => card.id === result.data.id)) {
              updatedColumns[columnIndex].cards.push(result.data);
            }
          }
          return updatedColumns;
        });
      } else { // Başarısızsa hata mesajını konsola yazar.
        console.error('Error adding task:', result.message);
      }
    } catch (error) { // Bir hata olursa yakalar ve konsola yazar.
      console.error('Error adding task:', error);
    }
  };

  // Görev silmek için işlev tanımlar.
  const handleDeleteTask = async (taskId: number) => {
    try {
      const result = await deleteTask(taskId); // Görevi API'den siler.
      if (result.isSuccess) {
        // Sütunları günceller ve silinen görevi çıkarır.
        setColumns((prevColumns) => {
          const updatedColumns = prevColumns.map((col) => ({
            ...col,
            cards: col.cards.filter((card) => card.id !== taskId),
          }));
          return updatedColumns;
        });
      } else { // Başarısızsa hata mesajını konsola yazar.
        console.error("Error deleting task:", result.message);
      }
    } catch (error) { // Bir hata olursa yakalar ve konsola yazar.
      console.error("Error deleting task:", error);
    }
  };

  return (
    // DragDropContext bileşeni ile sürükle-bırak işlevselliğini uygular.
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center items-start p-4 sm:p-6 md:p-8 min-h-screen">
        {/* Sütunları düzenler ve her sütun için Column bileşenini oluşturur. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <Column
              key={column.id} // Sütunun benzersiz anahtarı.
              column={column} // Sütun verileri.
              onAddTask={handleAddTask} // Görev ekleme işlevi.
              onDeleteTask={handleDeleteTask} // Görev silme işlevi.
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
