interface Category {
    id: number;          // ID kategori
    name: string;       // Nama kategori
  }

export default interface Blog {
    id:number;
    title:string;
    excerpt:string;
    content:string;
    category:Category;
    created_at:string;
    updated_at:string;
}