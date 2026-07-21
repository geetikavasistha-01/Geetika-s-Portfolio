import { Router } from 'express';
import { ShelfItem } from '../models/ShelfItem';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/shelf', async (req, res) => {
  try {
    const items = await ShelfItem.find().sort({ order: 1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving shelf items' });
  }
});

router.post('/admin/shelf', protect, async (req, res) => {
  try {
    const item = await ShelfItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error creating shelf item' });
  }
});

router.delete('/admin/shelf/:id', protect, async (req, res) => {
  try {
    await ShelfItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Shelf item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shelf item' });
  }
});

export default router;
