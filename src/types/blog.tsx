export interface Blog {
    id: number;
    slug:string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    category_id: string;
    created_at: Date;
    updated_at: Date;
  }