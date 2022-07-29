// interface for the position of a trello
// card, specified by it's category:
// 'TO DO', 'IN PROGRESS', OR 'DONE'
// and it index within that category
export interface Position {
  category: string;
  index: number;
}

// gives the start and current position of the card while
// it's being dragged by the user
export interface DragVector {
  start?: Position | undefined;
  current?: Position | undefined;
}

// information held by specific card or task
export interface taskProp {
  category: string;
  title: string;
  desp: string;
}
