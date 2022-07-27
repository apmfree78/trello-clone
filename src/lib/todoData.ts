export interface taskProp {
  category: string;
  title: string;
  desp: string;
}

export const tasks: taskProp[] = [
  { category: 'TO DO', title: 'Yoga', desp: 'Go to Yoga' },
  { category: 'TO DO', title: 'Gym', desp: 'Go to Gym' },
  { category: 'TO DO', title: 'Read', desp: 'Read a Book' },
  { category: 'IN PROGRESS', title: 'Code', desp: 'Coding now' },
  { category: 'IN PROGRESS', title: 'Grocery', desp: 'At Grocery Store' },
  { category: 'DONE', title: 'Dinner', desp: 'Made Dinner' },
  { category: 'DONE', title: 'Vacuum', desp: 'Done Vacuuming' },
];
