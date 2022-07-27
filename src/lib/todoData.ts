export interface taskProp {
  category: string;
  title: string;
  desp: string;
}

export const tasks: taskProp[] = [
  { category: 'TODO', title: 'Yoga', desp: 'Go to Yoga' },
  { category: 'TODO', title: 'Gym', desp: 'Go to Gym' },
  { category: 'TODO', title: 'Read', desp: 'Read a Book' },
  { category: 'IN-PROGRESS', title: 'Code', desp: 'Coding now' },
  { category: 'IN-PROGRESS', title: 'Grocery', desp: 'At Grocery Store' },
  { category: 'DONE', title: 'Dinner', desp: 'Made Dinner' },
  { category: 'DONE', title: 'Vacuum', desp: 'Done Vacuuming' },
];
