import { Response, NextFunction } from 'express';
import { authenticate, AuthRequest } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';
import * as tokenUtil from '../utils/token.util';

describe('Auth Middleware', () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('authenticate', () => {
    it('should call next() if a valid token is provided', () => {
      const payload = { id: '1', email: 'test@example.com', role: 'CUSTOMER' };
      const token = 'valid-token';
      mockRequest.headers = { authorization: `Bearer ${token}` };
      
      jest.spyOn(tokenUtil, 'verifyAccessToken').mockReturnValue(payload);

      authenticate(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
      expect(mockRequest.user).toEqual(payload);
    });

    it('should return 401 if no authorization header is provided', () => {
      mockRequest.headers = {};

      authenticate(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access token missing or invalid' });
    });

    it('should return 401 if token is invalid', () => {
      mockRequest.headers = { authorization: 'Bearer invalid-token' };
      jest.spyOn(tokenUtil, 'verifyAccessToken').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authenticate(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Invalid or expired access token' });
    });
  });

  describe('authorize', () => {
    it('should call next() if user has the required role', () => {
      mockRequest.user = { id: '1', email: 'admin@example.com', role: 'ADMIN' };
      
      const middleware = authorize(['ADMIN']);
      middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalled();
    });

    it('should return 403 if user does not have the required role', () => {
      mockRequest.user = { id: '1', email: 'user@example.com', role: 'CUSTOMER' };
      
      const middleware = authorize(['ADMIN']);
      middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Access denied: insufficient permissions' });
    });

    it('should return 401 if user is not authenticated', () => {
      mockRequest.user = undefined;
      
      const middleware = authorize(['ADMIN']);
      middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'User not authenticated' });
    });
  });
});
