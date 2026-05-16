/**
 * Estados emocionales para el Check-In del alumno.
 * Mapea los estados básicos de regulación emocional y del ánimo.
 */
export const EmotionalStates = {
  HAPPY: 'Feliz / Con energía',
  CALM: 'Tranquilo / Enfocado',
  TIRED: 'Cansado / Aburrido',
  SAD: 'Triste / Desanimado',
  ANXIOUS: 'Nervioso / Ansioso',
  ANGRY: 'Enojado / Frustrado'
};


/**
 * Contexto o momento donde el alumno realiza el Check-In.
 * Ayuda al gabinete a entender si el estado emocional está atado a lo académico,
 * a lo social o al entorno familiar.
 */
export const CheckInContexts = {
  START_OF_DAY: 'Inicio de Jornada',
  END_OF_DAY: 'Fin de Jornada',
  BEFORE_EXAM: 'Antes de un Examen', 
  AFTER_EXAM: 'Post-Evaluación',
  CLASSROOM: 'Durante la Clase',
  RECESS: 'En el Recreo',            
  AT_HOME: 'En Casa',                
  CABINET: 'Espacio de Gabinete',
  OTHER: 'En otro lado'              
};