import { body } from 'express-validator';

export const vendorProfileValidator = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('dateOfBirth')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().withMessage('Date of birth must be a valid date (YYYY-MM-DD)'),
  body('gender').optional().trim(),
  body('fiscalCode')
    .trim()
    .notEmpty().withMessage('Fiscal code (codice fiscale) is required')
    .isLength({ min: 11, max: 16 }).withMessage('Fiscal code must be between 11 and 16 characters'),
  body('businessName').trim().notEmpty().withMessage('Business name is required'),
  body('vatNumber').optional().trim(),
  body('contactEmail')
    .trim()
    .notEmpty().withMessage('Contact email is required')
    .isEmail().withMessage('Contact email must be valid'),
  body('phoneNumber').trim().notEmpty().withMessage('Phone number is required'),
  body('address').notEmpty().withMessage('Address is required'),
  body('address.street').optional().trim(),
  body('address.city').optional().trim(),
  body('address.postalCode').optional().trim(),
  body('address.country').optional().trim(),
];
