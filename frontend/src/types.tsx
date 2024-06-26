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

  export interface Option {
    title: string;
  }
  
  export interface Question {
    _id?: string;
    title: string;
    responses: Response[];
    options: string[];
  }
  
  export interface Form {
    _id?: string;
    title: string;
    description: string;
    questions: Question[];
  }
  
  /* eslint-disable no-unused-vars */
  export enum ButtonVariant{
    Small = "small",
    Large = "large",
    Delete = "delete",
  }

  export type ButtonType = "button" | "submit" | "reset" | undefined;
