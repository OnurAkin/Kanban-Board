// Belirli sütun isimlerini bir dizi olarak tanımlar ve 'const' kullanımıyla bu diziye değiştirilemez bir özellik kazandırır.
export const COLUMN_NAMES = ['Backlog', 'To Do', 'In Progress', 'Done'] as const;

// 'COLUMN_NAMES' dizisinin elemanlarını 'ColumnName' tipi olarak tanımlar. Bu sayede sadece bu isimlerin kullanılmasını sağlar.
export type ColumnName = typeof COLUMN_NAMES[number];

// Her sütun ismi için bir renk tanımlayan bir nesne oluşturur. Sütun ismini anahtar, rengi ise değer olarak kullanır.
export const COLUMN_COLORS: { [key in ColumnName]: string } = {
  "Backlog": "#ff6f61", // Kırmızı
  "To Do": "#ffcc00", // Sarı
  "In Progress": "#4caf50", // Yeşil
  "Done": "#9e9e9e" // Gri
};

// Bir görevin (task) yapısının nasıl olacağını tanımlar. Görev id'si, ismi, açıklaması, bağlı olduğu tahta (board) id'si ve durumu içerir.
export interface Task {
  id: number;
  name: string;
  description: string;
  boardId: number;
  status: ColumnName;
}

// Bir kartın (card) yapısının nasıl olacağını tanımlar. Kart id'si, ismi, açıklaması ve durumu içerir.
export interface Card {
  id: number;
  name: string;
  description: string;
  status: ColumnName;
}

// Bir sütunun (column) yapısını tanımlar. Sütun id'si, başlığı ve içinde bulundurduğu kartlar yer alır.
export interface Column {
  id: string;
  title: ColumnName;
  cards: Card[];
}