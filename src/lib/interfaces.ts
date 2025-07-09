export interface post {
  id: number;
  title: string;
  content: string;
}

export interface Post {
  id: number;
  title: string;
  content?: string | null;
  published: boolean;
  authorId: number;
  author: User;
}

export interface PostShow {
  id: number;
  title: string;
  content?: string;
  author: AuthorShow;
}

export interface AuthorShow {
  name: string;
}

export interface AuthorCreate {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  name?: string | null;
  posts?: Post[]; // Optional to avoid circular dependency issues
}
