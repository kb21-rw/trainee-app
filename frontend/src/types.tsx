export interface User {
    _id?: string;
    name: string;
    coach?: Coach;
  }
  
  export interface Coach {
    _id?: string;
    name: string;
  }
  
  export interface Response {
    _id?: string;
    text: string | null;
    user: User;
  }
  
  export interface Question {
    _id?: string;
    title: string;
    responses: Response[];
  }
  
  export interface Form {
    _id?: string;
    title: string;
    description: string;
    questions: Question[];
  }
  