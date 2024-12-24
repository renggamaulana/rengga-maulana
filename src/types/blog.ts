export interface Blog {
    id: string;
    slug:string;
    title: string;
    excerpt: string;
    content: string;
    image_url: string;
    categoryId: string;
    categoryName: string;
    // categorySlug: string;
    categoryColor: string;
    created_at: Date;
    updated_at: Date;
  }