// Contenido placeholder para las landings de servicio.
// Se sustituye por datos reales del cliente (o por queries a DB una vez sembrados).
// Por ahora alimenta el render estático de cada landing.

import type { ServiceSlug } from '@/lib/constants'

export interface ServiceContent {
  eyebrow: string
  intro: string
  description: string[]
  analyses: string[]
  audience: string
  preparation: string[]
  includes: string
}

export const SERVICE_CONTENT: Record<ServiceSlug, ServiceContent> = {
  'clinica-humana': {
    eyebrow: 'Análisis humanos · Diagnóstico clínico',
    intro:
      'Chequeos de rutina, perfiles hormonales, screening neonatal, diabetes, celiaquía, exudado vaginal, PRP y más — con equipamiento calibrado y personal bioquímico matriculado.',
    description: [
      'La Clínica Humana es nuestra área con mayor volumen y alcance. Cubrimos todo el espectro de estudios básicos y especializados — desde perfiles lipídicos y hepáticos de rutina hasta perfiles hormonales pro, screening de celiaquía y detección temprana de diabetes.',
      'Recibimos todas las obras sociales sin cobro de adicionales y realizamos extracciones a domicilio para particulares. Resultados informados digitalmente y en copia impresa.',
    ],
    analyses: [
      // Chequeo de rutina
      'Chequeo de rutina completo (función renal, metabolismo, sangre, hepática)',
      // Hematología
      'Hematología completa (hemograma, VSG, hierro, ferritina, transferrina, saturación)',
      'Perfil metabólico (glucemia, insulina basal, HbA1c, índice HOMA)',
      // Perfil lipídico
      'Perfil lipídico completo (colesterol total, HDL, LDL, triglicéridos)',
      // Diabetes
      'Diabetes — hemoglobina glicosilada (HbA1c)',
      'Curva de tolerancia oral a la glucosa',
      'Fructosamina (glucosa circulante de las últimas 2–3 semanas)',
      // Hormonales
      'Perfil hormonal pro completo (testosterona total y libre, SHBG, cortisol, hormonas catabólicas)',
      'Perfil tiroideo (TSH, T4 libre, T3 libre)',
      'Hormonas de rendimiento (prolactina, LH, FSH)',
      'Nivel extremo deportivo (estradiol, DHEA-S, IGF-1)',
      // Vitamínico
      'Perfil vitamínico pro (vitamina D, B12, ácido fólico)',
      // Renal + electrolitos
      'Función renal (urea, creatinina, ácido úrico, ionograma)',
      'Perfil electrolítico (sodio, potasio, cloro, calcio, magnesio, fósforo)',
      'Orina completa y urocultivo',
      // Muscular (deporte)
      'Perfil muscular completo (CPK, LDH, TGO/AST, TGP/ALT)',
      'Perfil deportivo pro — el estudio más completo para deportistas',
      // Celiaquía
      'Celiaquía (anti-transglutaminasa tTG IgA, anti-endomisio EMA IgA, anti-gliadina AGA IgA/IgG)',
      // Exudado
      'Exudado vaginal para detección de infecciones',
      'Exudado vaginal y rectal en embarazo (Streptococcus grupo B, semanas 35–37)',
      // Serología
      'Serología viral (HIV, hepatitis B/C, sífilis, dengue)',
      // Neonatal
      'Screening neonatal — "prueba del piecito"',
      // Otros
      'Coagulograma completo',
      'Hisopados y cultivos específicos',
    ],
    audience:
      'Personas adultas de cualquier edad, deportistas, embarazadas, recién nacidos y pacientes con seguimiento crónico. Recibimos derivaciones de médicos clínicos, endocrinólogos, ginecólogos, cardiólogos y pediatras.',
    preparation: [
      'Ayuno de 8 a 12 horas (agua permitida) para perfil lipídico, glucemia y hepatograma.',
      'Para perfil lipídico: evitar alcohol y comidas grasas las 24 horas previas. Informar medicación actual.',
      'Suspender vitaminas y suplementos 72 hs antes si es posible — consultar en la orden.',
      'Llevar la orden médica original (impresa o digital).',
      'Concurrir hidratado para facilitar la extracción.',
      'Extracciones a domicilio disponibles para particulares — coordinar por WhatsApp.',
    ],
    includes:
      'Extracción a cargo de personal bioquímico, informe digital y copia impresa, consulta de dudas post-resultado sin cargo. Recibimos todas las obras sociales sin cobro de adicionales.',
  },

  veterinaria: {
    eyebrow: 'Análisis veterinarios · Salud y nutrición animal',
    intro:
      'Estudios de laboratorio para perros, gatos, equinos y animales de producción. Trabajamos en conjunto con el veterinario tratante.',
    description: [
      'Nuestra área veterinaria brinda apoyo diagnóstico al médico veterinario con la misma rigurosidad que usamos en clínica humana. Cubrimos desde hemogramas de rutina hasta perfiles específicos por especie.',
      'Recibimos muestras por derivación o toma directa en el laboratorio. Los resultados se entregan con valores de referencia por especie.',
    ],
    analyses: [
      'Hemograma completo por especie',
      'Perfil bioquímico general (hepático, renal, glucosa)',
      'Perfil tiroideo y endocrinológico',
      'Análisis de orina y sedimento',
      'Coprológico y parasitológico',
      'Serología: leptospirosis, brucelosis, erlichiosis',
      'Test de gestación',
      'Cultivos microbiológicos y antibiograma',
      'Citología de derrames y punciones',
    ],
    audience:
      'Veterinarios que requieren apoyo diagnóstico y tutores que buscan controles preventivos de sus animales.',
    preparation: [
      'Para animales pequeños: ayuno de 8 hs si el estudio lo requiere.',
      'Coordinar horario de extracción con anticipación — minimiza el estrés del animal.',
      'Traer carnet sanitario o historia clínica disponible.',
    ],
    includes:
      'Toma de muestra o recepción de muestra derivada, informe con valores de referencia por especie, consulta con el bioquímico si hay dudas interpretativas.',
  },

  'agro-alimentos': {
    eyebrow: 'Análisis agroalimentario · Calidad y nutrición',
    intro:
      'Análisis microbiológicos y bromatológicos de alimentos balanceados, materias primas, forrajes, harinas y productos terminados.',
    description: [
      'Para productores, industrias y distribuidores — evaluamos composición nutricional, carga microbiana y calidad sanitaria de cada lote. Cumplimos con parámetros del Código Alimentario Argentino y estándares internacionales.',
      'Tiempo de respuesta promedio de 5 a 10 días hábiles según el análisis. Los informes incluyen recomendaciones interpretativas.',
    ],
    analyses: [
      'Análisis proximal (humedad, proteína, grasa, fibra, cenizas)',
      'Minerales mayores y menores',
      'Aflatoxinas y micotoxinas',
      'Carga microbiana total y específica (E. coli, Salmonella, coliformes)',
      'Análisis de agua para uso animal',
      'Control de calidad de materias primas',
      'Perfil de aminoácidos',
    ],
    audience:
      'Productores agropecuarios, fábricas de alimento balanceado, industria láctea y cárnica, distribuidores y tambos.',
    preparation: [
      'Muestra mínima según análisis — consultar previamente.',
      'Envasar en bolsa limpia, identificada con fecha, lote y origen.',
      'Mantener refrigerada si la muestra es perecedera.',
    ],
    includes:
      'Recepción y procesamiento de muestra, informe técnico con valores medidos vs. referencia legal, asesoramiento en caso de no conformidad.',
  },

  ambiental: {
    eyebrow: 'Análisis ambientales · Aguas y efluentes',
    intro:
      'Control físico-químico y microbiológico de agua potable, agua de uso agropecuario y efluentes industriales o domiciliarios.',
    description: [
      'Analizamos aguas para consumo humano, animal y uso industrial, además de efluentes que requieren control ambiental. Seguimos protocolos del ENRESS, Código Alimentario y normativas provinciales.',
      'Resultados aptos para presentación ante organismos de contralor.',
    ],
    analyses: [
      'Análisis físico-químico de agua potable',
      'Análisis bacteriológico (coliformes totales y fecales, E. coli)',
      'Dureza, alcalinidad, pH, conductividad',
      'Nitratos, nitritos, amonio',
      'Metales pesados',
      'DBO, DQO en efluentes',
      'Sólidos totales y suspendidos',
    ],
    audience:
      'Propietarios de pozos, municipios, industrias con efluentes, tambos, frigoríficos y desarrollos inmobiliarios.',
    preparation: [
      'Retirar botellas esterilizadas en el laboratorio con 48 hs de anticipación.',
      'Toma de muestra según protocolo entregado al retirar los envases.',
      'Entregar en un plazo máximo de 24 hs desde la toma.',
    ],
    includes:
      'Envases esterilizados, procesamiento según norma, informe oficial apto para presentación ante organismos de contralor.',
  },

  'medicina-regenerativa': {
    eyebrow: 'Medicina regenerativa · Plasma rico en plaquetas',
    intro:
      'Preparación y aplicación de PRP (Plasma Rico en Plaquetas) para tratamientos traumatológicos, estéticos y odontológicos.',
    description: [
      'El Plasma Rico en Plaquetas es un procedimiento donde extraemos sangre del paciente, centrifugamos para concentrar las plaquetas y obtenemos un concentrado autólogo rico en factores de crecimiento.',
      'Ese concentrado se utiliza para acelerar la reparación tisular en lesiones musculares, articulares, tendinosas y en tratamientos de regeneración capilar o dérmica.',
      'En CBI preparamos el PRP con equipamiento calibrado y protocolos sanitarios estrictos. La extracción y el procesamiento se realizan el mismo día que la aplicación por parte del médico tratante.',
    ],
    analyses: [
      'PRP para traumatología (rodilla, hombro, codo)',
      'PRP para odontología e implantes',
      'PRP para estética facial y capilar',
      'PRP enriquecido con factores de crecimiento',
      'Perfil sanguíneo pre-procedimiento',
    ],
    audience:
      'Pacientes derivados por médicos traumatólogos, odontólogos implantólogos, dermatólogos o médicos estéticos.',
    preparation: [
      'Ayuno no requerido, sí hidratación abundante las 24 hs previas.',
      'Suspender antiinflamatorios y aspirina 5 días antes (consultar con el médico).',
      'Firmar consentimiento informado el día del procedimiento.',
      'Traer orden médica con el protocolo específico.',
    ],
    includes:
      'Extracción, procesamiento por centrifugación, entrega del concentrado listo para aplicación en jeringa estéril, informe del procesamiento y asesoramiento al profesional tratante.',
  },

  genetica: {
    eyebrow: 'Análisis genéticos · Paternidad y filiación',
    intro:
      'Estudios de ADN para determinación de paternidad, filiación y parentesco con validez legal y confidencialidad absoluta.',
    description: [
      'El estudio de paternidad por ADN compara marcadores genéticos entre los involucrados para establecer con certeza mayor al 99,999% la existencia (o exclusión) del vínculo biológico.',
      'Realizamos tanto estudios con validez judicial (cadena de custodia, presencia de testigo) como estudios privados e informativos.',
    ],
    analyses: [
      'Paternidad padre-hijo/a',
      'Paternidad prenatal no invasiva',
      'Maternidad biológica',
      'Parentesco entre hermanos',
      'Estudios de filiación post-mortem',
      'Identificación genética individual',
    ],
    audience:
      'Particulares, abogados, juzgados y organismos estatales que requieran establecer filiación biológica.',
    preparation: [
      'Presentar documento de identidad original de cada participante.',
      'En menores: acompañados por el adulto a cargo con documentación.',
      'Para validez judicial: se coordina con el juzgado la cadena de custodia.',
      'La muestra es un hisopado bucal — rápido e indoloro.',
    ],
    includes:
      'Toma de muestra de todos los participantes, procesamiento en laboratorio certificado, informe con validez legal o informativa según corresponda, confidencialidad total.',
  },
}
