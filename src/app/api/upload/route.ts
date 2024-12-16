import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary'; // Pastikan cloudinary diimpor dengan benar

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Konversi Blob ke Buffer
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${file.type || 'image/png'};base64,${base64}`;

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: 'blog-images',
    });

    return NextResponse.json({ url: result.secure_url }); // Return image URL
  } catch (error:any) {
    console.error('Error during upload:', error);
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    );
  }
}
