import { jest } from '@jest/globals';

// Mocks
const checkInRepository = {
    create: jest.fn(),
    getDailySummary: jest.fn(),
    getUrgentHelpRequests: jest.fn()
};

const studentRepository = {
    findStudentById: jest.fn()
};

const courseRepository = {
    getById: jest.fn()
};

await jest.unstable_mockModule('../repositories/CheckInRepository.js', () => ({
    default: checkInRepository
}));

await jest.unstable_mockModule('../repositories/StudentRepository.js', () => ({
    default: studentRepository
}));

await jest.unstable_mockModule('../repositories/CourseRepository.js', () => ({
    default: courseRepository
}));

const { default: checkInService } = await import('../services/checkInService.js');

const CHECKIN_DATA = {
    studentId: 1,
    courseId: 2,
    emotionalState: 'Bien',
    helpRequested: false,
    comment: 'Todo tranquilo'
};

const SAVED_CHECKIN = { id: 10, ...CHECKIN_DATA };

const STUDENT = { id: 1, active: true };
const COURSE   = { id: 2, active: true };


describe('CheckInService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        studentRepository.findStudentById.mockResolvedValue(STUDENT);
        courseRepository.getById.mockResolvedValue(COURSE);
    });

    describe('saveCheckIn', () => {
        test('saves check-in successfully', async () => {
            checkInRepository.create.mockResolvedValue(SAVED_CHECKIN);

            const result = await checkInService.saveCheckIn(CHECKIN_DATA);

            expect(studentRepository.findStudentById).toHaveBeenCalledWith(CHECKIN_DATA.studentId);
            expect(courseRepository.getById).toHaveBeenCalledWith(CHECKIN_DATA.courseId);
            expect(checkInRepository.create).toHaveBeenCalledWith(CHECKIN_DATA);
            expect(result).toEqual({ message: 'Saved successfully', checkIn: SAVED_CHECKIN });
        });

        test('throws if student not found', async () => {
            studentRepository.findStudentById.mockResolvedValue(null);
            await expect(
                checkInService.saveCheckIn(CHECKIN_DATA)
            ).rejects.toThrow('Student not found');
            expect(checkInRepository.create).not.toHaveBeenCalled();
        });

        test('throws if course not found', async () => {
            courseRepository.getById.mockResolvedValue(null);
            await expect(
                checkInService.saveCheckIn(CHECKIN_DATA)
            ).rejects.toThrow('Course not found');
            expect(checkInRepository.create).not.toHaveBeenCalled();
        });

        test('throws if repository fails', async () => {
            checkInRepository.create.mockRejectedValue(new Error('DB error'));
            await expect(
                checkInService.saveCheckIn(CHECKIN_DATA)
            ).rejects.toThrow('DB error');
        });
    });

    describe('getDailySummary', () => {
        test('returns daily summary', async () => {
            const summary = [
                { emotionalState: 'Bien', count: 10 },
                { emotionalState: 'Mal',  count: 3  }
            ];
            checkInRepository.getDailySummary.mockResolvedValue(summary);
            const result = await checkInService.getDailySummary();
            expect(checkInRepository.getDailySummary).toHaveBeenCalled();
            expect(result).toEqual(summary);
        });

        test('throws if repository fails', async () => {
            checkInRepository.getDailySummary.mockRejectedValue(new Error('DB error'));
            await expect(
                checkInService.getDailySummary()
            ).rejects.toThrow('DB error');
        });
    });

    describe('getUrgentHelperRequest', () => {

        test('returns urgent help requests', async () => {
            const requests = [
                { id: 1, studentId: 5, helpRequested: true, emotionalState: 'Muy mal' },
                { id: 2, studentId: 8, helpRequested: true, emotionalState: 'Mal'     }
            ];
            checkInRepository.getUrgentHelpRequests.mockResolvedValue(requests);
            const result = await checkInService.getUrgentHelperRequest();
            expect(checkInRepository.getUrgentHelpRequests).toHaveBeenCalled();
            expect(result).toEqual(requests);
        });

        test('returns empty array when no urgent requests', async () => {
            checkInRepository.getUrgentHelpRequests.mockResolvedValue([]);
            const result = await checkInService.getUrgentHelperRequest();
            expect(result).toEqual([]);
        });

        test('throws if repository fails', async () => {
            checkInRepository.getUrgentHelpRequests.mockRejectedValue(new Error('DB error'));
            await expect(
                checkInService.getUrgentHelperRequest()
            ).rejects.toThrow('DB error');
        });
    });
});