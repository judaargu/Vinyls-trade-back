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

export const getAllReviews = async () => {
  try {
    const reviews = await Review.findAll(); 
    return {status: 200, json: reviews}
  } catch (error) {
    return {status: 500, json: "Error al traer los reviews"}
  }
};


