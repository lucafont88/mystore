import { body } from 'express-validator';

export const registerValidator = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter'),
];

export const loginValidator = [
  body('email').isEmail().withMessage('Must be a valid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];
