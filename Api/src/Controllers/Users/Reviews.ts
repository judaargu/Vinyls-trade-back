import { Request, Response } from 'express';
import { Review } from '../../Models/Reviews';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { email, comment, rating } = req.body;

    if(rating < 1 || rating > 5) {
      return res.status(400).json({error: "La calificación debe ser entre 1 y 5 puntos"});
    }

    const newReview = await Review.create({ email, comment, rating });
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



