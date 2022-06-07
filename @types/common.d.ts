declare namespace Common {
  // type Task = {
  //   id: string;
  //   createdAt: string;
  //   updatedAt: string;
  //   archivedAt: string;
  //   text: string;
  //   position: number;
  // };
  type Task = {
    id: number;
    createdAt: date;
    updatedAt: date;
    archivedAt?: date | null;
    deletedAt?: date | null;
    text: string;
    position: number | null;
  };
}
