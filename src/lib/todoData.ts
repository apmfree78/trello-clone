import { cardProp } from "./interfaces";

// hold card sample data , for a full fledge app this
// data would be pull via API to backend database
export const cardItems: cardProp[] = [
  { category: "TO DO", title: "Yoga", desp: "Go to Yoga" },
  { category: "TO DO", title: "Gym", desp: "Go to Gym" },
  { category: "TO DO", title: "Read", desp: "Read a Book" },
  { category: "TO DO", title: "Get Gas for Car", desp: "Get Gas for Car" },
  { category: "TO DO", title: "Go for Walk", desp: "Go for Walk" },
  { category: "TO DO", title: "Read", desp: "Read a Book" },
  { category: "IN PROGRESS", title: "Code", desp: "Coding now" },
  {
    category: "IN PROGRESS",
    title: "Write Blog Post",
    desp: "Write on leetcode",
  },
  { category: "IN PROGRESS", title: "Buy Grocery", desp: "At Grocery Store" },
  { category: "DONE", title: "Dinner", desp: "Made Dinner" },
  { category: "DONE", title: "Vacuum", desp: "Done Vacuuming" },
  { category: "DONE", title: "Feed Cats", desp: "Feed Cats at 9pm" },
];
