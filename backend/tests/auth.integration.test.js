import { jest } from '@jest/globals';
import request from 'supertest';

const userRepository = {
    findUserByUsernameWithPassword: jest.fn()
};

const rolRepository = {
    findRolById: jest.fn()
};

await jest.unstable_mockModule(
    '../repositories/UserRepository.js',
    () => ({
        default: userRepository
    })
);

await jest.unstable_mockModule(
    '../repositories/RolRepository.js',
    () => ({
        default: rolRepository
    })
);

process.env.SECRET_KEY = 'test-secret';

const { default: app } = await import('./authTestApp.js');
const bcrypt = (await import('bcryptjs')).default;

describe('POST /api/login', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        rolRepository.findRolById.mockResolvedValue({
            id: 1,
            name: 'ADMIN'
        });
    });

    test('should return 400 when username is missing', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                password: 'password123'
            });
        expect(response.status).toBe(400);
    });

    test('should return 400 when password is missing', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'johndoe'
            });
        expect(response.status).toBe(400);
    });

    test('should return 401 when user does not exist', async () => {
        userRepository.findUserByUsernameWithPassword
            .mockResolvedValue(null);

        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'johndoe',
                password: 'password123'
            });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });

    test('should return 401 when password is invalid', async () => {
        userRepository.findUserByUsernameWithPassword
            .mockResolvedValue({
                id: 1,
                username: 'johndoe',
                password: '$2a$10$fakehash',
                roleId: 1
            });

        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'johndoe',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body.message)
            .toBe('Invalid credentials');
    });

    test('should login successfully', async () => {
        const hash = await bcrypt.hash('password123', 1);
        userRepository.findUserByUsernameWithPassword
            .mockResolvedValue({
                id: 1,
                username: 'johndoe',
                password: hash,
                roleId: 1
            });

        const response = await request(app)
            .post('/api/login')
            .send({
                username: 'johndoe',
                password: 'password123'
            });

        expect(response.status).toBe(200);

        expect(response.body).toMatchObject({
            isLogin: true,
            role: 'ADMIN'
        });
        expect(response.body.token).toBeDefined();
        expect(userRepository.findUserByUsernameWithPassword).toHaveBeenCalledWith('johndoe');
        expect(rolRepository.findRolById).toHaveBeenCalledWith(1);
    });
});