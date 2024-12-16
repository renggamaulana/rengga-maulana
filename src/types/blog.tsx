export interface Blog {
    id: number;
    slug:string;
    title: string;
    excerpt: string;
    content: string;
    category_id: string;
    created_at: Date;
    updated_at: Date;
  }