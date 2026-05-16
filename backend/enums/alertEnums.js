/**
 * Dominios basados en el modelo integral de intervención psicopedagógica.
 * Clasificamos las alertas según la dimensión del desarrollo afectada.
 */
export const AlertTypes = Object.freeze({
  // Dimensión Socio-Emocional (Basado en bienestar subjetivo)
  MOOD_DYSREGULATION: 'Desregulación del Ánimo', 
  CHECKIN_AUTO: 'Detección Automática (Check-in)',
  EMOTIONAL_CRISIS: 'Crisis Aguda / Riesgo',

  // Dimensión Académica y Cognitiva (Procesos de aprendizaje)
  LEARNING_GAP: 'Bajo Rendimiento Académico',
  COGNITIVE_OTHER: 'Otro Factor Cognitivo/Académico',
  
  DROPOUT_RISK: 'Riesgo de Deserción',
  // Dimensión Institucional y Social (Contexto y asistencia)
  CHRONIC_ABSENTEEISM: 'Ausentismo Reiterado',
  BEHAVIORAL_ADAPTATION: 'Dificultad de Adaptación Conductual',
  FAMILY_CONTEXT: 'Situación Familiar Urgente',

  // Genérico
  UNCLASSIFIED: 'Otras Observaciones'
});

/**
 * Niveles de Prioridad según el Triaje Psicopedagógico
 */
export const AlertPriorities = Object.freeze({
  LOW: 'Baja - Seguimiento preventivo',
  MEDIUM: 'Media - Requiere intervención',
  HIGH: 'Alta - Intervención inmediata'
});