import { Router } from 'express';
import { Media } from './media';
import envConfig from './config/environment';

const router = Router();

const media = new Media(envConfig);

router.post('/upload', async (req, res) => {
    try {
        const statusData: UploadUrlOptions = req.body;
        const newStatus = await media.uploadStreamFromUrl(statusData);
        res.status(201).json(newStatus);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;