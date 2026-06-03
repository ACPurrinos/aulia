import { jest } from '@jest/globals';

const userRepository = {
    saveUser: jest.fn(),
    findByUsername: jest.fn(),
    findByEmail: jest.fn(),
    findUserById: jest.fn(),
    findAllUsers: jest.fn(),
    findActiveUsers: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
    findUserByIdWithPassword: jest.fn()
};

const rolRepository = { findByName: jest.fn() };
const bcrypt = { genSaltSync: jest.fn(), hashSync: jest.fn(), compare: jest.fn() };

await jest.unstable_mockModule('../repositories/UserRepository.js', () => ({ default: userRepository }));
await jest.unstable_mockModule('../repositories/RolRepository.js', () => ({ default: rolRepository }));
await jest.unstable_mockModule('bcryptjs', () => ({ default: bcrypt }));

const { default: userService } = await import('../services/userService.js');

const USER_DATA = {
    firstName: 'John', lastName: 'Doe',
    email: 'john@example.com', username: 'johndoe',
    password: 'password123', role: 'ADMIN'
};

const USER = {
    id: 1, firstName: 'John', lastName: 'Doe',
    email: 'john@example.com', username: 'johndoe', active: true
};

describe('User Service', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        userRepository.findByUsername.mockResolvedValue(null);
        userRepository.findByEmail.mockResolvedValue(null);
        rolRepository.findByName.mockResolvedValue({ id: 1, name: 'ADMIN' });
        bcrypt.genSaltSync.mockReturnValue('salt');
        bcrypt.hashSync.mockReturnValue('hashedPassword');
    });

    describe('createUser', () => {

        test('creates user successfully', async () => {
            
            userRepository.saveUser.mockResolvedValue(USER);

            const result = await userService.createUser(USER_DATA);

            expect(userRepository.saveUser).toHaveBeenCalledWith({
                firstName: USER_DATA.firstName, lastName: USER_DATA.lastName,
                email: USER_DATA.email, username: USER_DATA.username,
                password: 'hashedPassword', active: true, roleId: 1
            });
            expect(result).toEqual({ message: 'User created successfully', user: USER });
        });

        test('throws if username already exists', async () => {
            userRepository.findByUsername.mockResolvedValue(USER);
            await expect(userService.createUser(USER_DATA)).rejects.toThrow('The username already exists');
        });

        test('throws if email already exists', async () => {
            userRepository.findByEmail.mockResolvedValue(USER);
            await expect(userService.createUser(USER_DATA)).rejects.toThrow('The user already exists');
        });

        test('throws if role does not exist', async () => {
            rolRepository.findByName.mockResolvedValue(null);
            await expect(userService.createUser(USER_DATA)).rejects.toThrow('The role dont exists');
        });

        test('throws if save fails', async () => {
            userRepository.saveUser.mockResolvedValue(null);
            await expect(userService.createUser(USER_DATA)).rejects.toThrow('Error while saving user');
        });
    });

    describe('findUserById', () => {

        test('returns user dto', async () => {
            userRepository.findUserById.mockResolvedValue(USER);
            expect(await userService.findUserById(1)).toEqual(USER);
        });

        test('throws when user does not exist', async () => {
            userRepository.findUserById.mockResolvedValue(null);
            await expect(userService.findUserById(1)).rejects.toThrow('No user found');
        });
    });

    describe('findAllUsers', () => {

        test('returns all users', async () => {
            const users = { data: [{ id: 1, username: 'john' }, { id: 2, username: 'mary' }], totalItems: 2 };
            userRepository.findAllUsers.mockResolvedValue(users);
            expect(await userService.findAllUsers()).toEqual(users);
        });
    });

    describe('findActiveUsers', () => {

        test('returns active users', async () => {
            const users = { data: [{ id: 1, username: 'john', active: true }] };
            userRepository.findActiveUsers.mockResolvedValue(users);
            expect(await userService.findActiveUsers()).toEqual(users);
        });
    });

    describe('updateUser', () => {

        test('updates user successfully', async () => {
            userRepository.findUserById.mockResolvedValue(USER);
            userRepository.updateUser.mockResolvedValue({ ...USER, firstName: 'John Updated' });

            const result = await userService.updateUser(1, { firstName: 'John Updated' });
            expect(result.message).toBe('User updated successfully');
        });

        test('throws when user does not exist', async () => {
            userRepository.findUserById.mockResolvedValue(null);
            await expect(userService.updateUser(1, {})).rejects.toThrow('No user found');
        });

        test('updates role successfully', async () => {
            userRepository.findUserById.mockResolvedValue(USER);
            rolRepository.findByName.mockResolvedValue({ id: 2, name: 'ADMIN' });
            userRepository.updateUser.mockResolvedValue({ ...USER, roleId: 2 });

            const result = await userService.updateUser(1, { role: 'ADMIN' });
            expect(rolRepository.findByName).toHaveBeenCalledWith('ADMIN');
            expect(result.message).toBe('User updated successfully');
        });

        test('throws if role does not exist', async () => {
            userRepository.findUserById.mockResolvedValue(USER);
            rolRepository.findByName.mockResolvedValue(null);
            await expect(userService.updateUser(1, { role: 'ADMIN' })).rejects.toThrow('The role dont exists');
        });
    });

    describe('deleteUser', () => {

        test('deletes user successfully', async () => {
            userRepository.findUserById.mockResolvedValue(USER);
            userRepository.deleteUser.mockResolvedValue(true);
            expect(await userService.deleteUser(1)).toBe(true);
        });

        test('throws if user does not exist', async () => {
            userRepository.findUserById.mockResolvedValue(null);
            await expect(userService.deleteUser(1)).rejects.toThrow('No user found');
        });

        test('throws if delete fails', async () => {
            userRepository.findUserById.mockResolvedValue(USER);
            userRepository.deleteUser.mockResolvedValue(false);
            await expect(userService.deleteUser(1)).rejects.toThrow('Error while deleting user');
        });
    });
});
