export interface IFormType {
  _id: string;
  title: string;
  description: string;
  type: string;
  questions: { title: string }[];
}
