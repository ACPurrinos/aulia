import studentService from '../services/studentService.js';


const saveStudent = async(req, res)=>{
    try {
        const result = await studentService.createStudent(req.body);
        res.status(201).json({ message: result.message, user: result.user });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findAllStudents = async(req, res)=>{
    try {
        const students = await studentService.findAllStudents();
        if(students.length !== 0){
            res.status(200).json(students);
        }else{
            res.status(400).json({message: 'No students found'});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findStudentById = async (req, res) => {
    try{
        const id = req.params.id;
        const student = await studentService.findStudentById(id);
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await studentService.updateStudent(id, req.body);

        if (result.error) {
            return res.status(400).json({ message: result.error });
        }
        res.status(200).json({ cliente: result.cliente, message: result.message });
    } catch (error) {
        res.status(400).json({message: error.message});
    }    
};


const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await studentService.deleteStudent(id);

        if (!result){
            return res.status(400).json({error: 'An error ocurred during delete'});
        }
        res.status(200).json( {message: 'Deleted sucessfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const studentController = {
    saveStudent,
    findAllStudents,
    findStudentById,
    updateStudent,
    deleteStudent
}

export default studentController;