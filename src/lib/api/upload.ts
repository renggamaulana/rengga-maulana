import cloudinary from '@/lib/cloudinary';

export default async function handler(req:any, res:any) {
    if(req.method === 'POST') {
        try {
            const file = req.body.file;

            const result = await cloudinary.uploader.upload(file, {
                folder: 'blog-images'
            });

            res.status(200).json({ url: result.secure_url });
        } catch(error:any) {
            res.status(500).json({ error: 'Upload failed', details: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}