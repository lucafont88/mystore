import request from 'supertest';
import app from '../app';
import prisma from '../config/db';

describe('Auth Service - Registration', () => {
  const testUser = {
    email: 'test@example.com',
    password: 'Password123!',
  };

  beforeAll(async () => {
    // Clean up test data
    await prisma.user.deleteMany({
      where: {
        email: testUser.email,
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should register a new user successfully', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(testUser.email);
    expect(response.body).not.toHaveProperty('passwordHash');
  });

  it('should not register a user with an existing email', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty('error');
  });

  it('should validate registration input', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'invalid-email', password: 'short' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
