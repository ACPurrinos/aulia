import SubjectRepository from "../repositories/SubjectRepository";

const saveSubject = async(data)=>{
    try {
        const foundSubject = await SubjectRepository.findSubjectByName(data.name);
        if(foundSubject) throw new Error('Subject already exists');

        const subject = { ...data, active: true };
        const savedSubject = await SubjectRepository.saveSubject(subject);
        return {message: 'Saved successfully', subject: savedSubject};
    } catch (error) {
        throw new Error(error.message); 
    }
}

const findAllSubjects = async()=>{
    try {
        const subjects = await SubjectRepository.findAllSubjects();
        return subjects;
    } catch (error) {
        throw new Error(error.message); 
    }
}

const findSubjectById = async(id)=>{
    try {
        const foundSubject = await SubjectRepository.findSubjectById(id);
        if(!foundSubject) throw new Error('Subject not found');
        return foundSubject;
    } catch (error) {
        throw new Error(error.message); 
    }
}

const updateSubject = async(id, data)=>{
    try {
        const foundSubject = await SubjectRepository.findSubjectById(id);
        if(!foundSubject) throw new Error('Subject not found');

        const updatedSubject = await SubjectRepository.updateSubject(id, data);
        return {message: 'Updated successfully', subject: updatedSubject};
    } catch (error) {
        throw new Error(error.message); 
    }
}

const deleteSubject = async(id)=>{
    try {
        const foundSubject = await SubjectRepository.findSubjectById(id);
        if(!foundSubject) throw new Error('Subject not found');

        const deletedSubject = await SubjectRepository.deleteSubject(id);
        return deletedSubject;
    } catch (error) {
        throw new Error(error.message); 
    }
}

const subjectService = {
    saveSubject,
    findAllSubjects,
    findSubjectById,
    updateSubject,
    deleteSubject
}

export default subjectService;