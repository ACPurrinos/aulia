import subjectService from "../services/subjectService.js";

const saveSubject = async(req,res)=>{
    try {
        const result = await subjectService.saveSubject(req. body);
        res.status(201).json({message: result.message, subject: result.subject});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const getAllSubjects = async(req, res)=>{
    try {
        const subjects = await subjectService.findAllSubjects();
        if(subjects.length === 0){
            res.status(400).json({message: 'No subjects found'});
        }else{
            res.status(200).json({subjects});
        }
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findSubjectById = async(req, res)=>{
    try {
        const id = req.params.id;
        const subject = await subjectService.findSubjectById(id);
        res.status(200).json({subject});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateSubject = async(req, res)=>{
    try {
        const id = req.params.id;
        const result = await subjectService.updateSubject(id, req.body);
        res.status(200).json({message: result.message, subject: result.subject});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteSubject = async(req, res)=>{
    try {
        const id = req.params.id;
        const deleted = await subjectService.deleteSubject(id);
        if(!deleted){
            res.status(400).json({message: 'An error ocurred during delete'})
        }
        res.status(200).json( {message: 'Deleted sucessfully'});
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const subjectController = {
    saveSubject,
    findSubjectById,
    getAllSubjects,
    updateSubject,
    deleteSubject
}

export default subjectController;