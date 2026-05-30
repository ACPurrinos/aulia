/**
 * Dominios basados en el modelo integral de intervención psicopedagógica.
 * Clasificamos las alertas según la dimensión del desarrollo afectada.
 */
export const AlertTypes = Object.freeze({
  // Dimensión Socio-Emocional (Basado en bienestar subjetivo)
  EMOTIONAL: 'Socioemocional',
  ACADEMIC: 'Académico',
  BEHAVIORAL: 'Conductual',
  ATTENDANCE: 'Ausentismo',
  FAMILY: 'Contexto Familiar',
  VIOLENCE: 'Violencia',
  BULLYING: 'Bullying',
  SELF_HARM_RISK: 'Riesgo de Autolesión',
  DROPOUT_RISK: 'Riesgo de Deserción',
  OTHER: 'Otras Observaciones'

});

/**
 * Niveles de Prioridad según el Triaje Psicopedagógico
 */
export const AlertPriorities = Object.freeze({
  LOW: 'Baja',
  NORMAL: 'Normal',
  HIGH: 'Alta',
  CRITICAL: 'Crítica'

});

export const AlertStatusEnum = Object.freeze({

  PENDING: 'Pendiente',
  UNDER_REVIEW: 'En revisión',
  REFERRED: 'Derivada',
  RESOLVED: 'Resuelta',
  DISMISSED: 'Descartada'

});