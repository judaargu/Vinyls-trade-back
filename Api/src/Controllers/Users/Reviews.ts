import { Request, Response } from 'express';
import { Review } from '../../Models/Reviews';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { name, email, country, comment } = req.body;
    const newReview = await Review.create({ name, email, country, comment });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getReviewsByVinylId = async (req: Request, res: Response) => {
  try {
    const vinylId = req.params.vinylId;
    const reviews = await Review.findAll({ where: { vinylId } });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
