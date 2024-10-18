export interface Categories {
  id: number;
  name: string;
}

export interface Blogs {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category_id: string;
}