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
    eyebrow: 'Laboratorio veterinario · Diagnóstico por derivación',
    intro:
      'Estudios de laboratorio para pequeños y grandes animales, realizados a partir de muestras derivadas por el médico veterinario.',
    description: [
      'Nuestra área veterinaria está orientada exclusivamente al procesamiento y análisis de muestras derivadas. Trabajamos en conjunto con el profesional tratante, brindando resultados confiables con valores de referencia específicos por especie.',
      'Procesamos muestras con criterios de calidad equivalentes a la clínica humana, adaptando cada análisis a la especie. Rigurosidad de laboratorio clínico aplicada al diagnóstico veterinario.',
    ],
    analyses: [
      'Hemograma completo por especie',
      'Perfil bioquímico sérico (urea, creatinina, glucosa, enzimas)',
      'Perfil renal (urea, creatinina, fósforo, ionograma)',
      'Perfil hepático (ALT/GPT, FA, bilirrubina, albúmina)',
      'Perfil pancreático (amilasa, lipasa, glucosa)',
      'Perfil endocrino (tiroideo, adrenal)',
      'Serología (Leptospirosis, Brucelosis, Ehrlichiosis, Toxoplasmosis)',
      'Coprológico y parasitológico',
      'Cultivos y antibiograma',
      'Progesterona y citología vaginal',
      'Análisis de orina completo',
      'Perfil geriátrico completo adaptado a edad',
    ],
    audience:
      'Médicos veterinarios y clínicas veterinarias que requieran derivación de muestras para procesamiento en laboratorio.',
    preparation: [
      'Las muestras son recibidas por derivación — no realizamos extracción en animales.',
      'Rotular correctamente: especie, nombre del paciente, médico veterinario y estudio solicitado.',
      'Mantener condiciones de conservación adecuadas según el tipo de muestra.',
      'Para consultas o envíos: contactar al laboratorio con anticipación.',
    ],
    includes:
      'Procesamiento de muestra, informe con valores de referencia específicos por especie, posibilidad de consulta bioquímica ante hallazgos relevantes.',
  },

  'agro-alimentos': {
    eyebrow: 'Análisis agroalimentarios · Calidad y nutrición',
    intro:
      'Evaluamos la calidad microbiológica, bromatológica y nutricional de materias primas, alimentos balanceados, forrajes, harinas y productos terminados, acompañando a productores e industrias en el control sanitario y la toma de decisiones.',
    description: [
      'Para productores, industrias y distribuidores — evaluamos composición nutricional, carga microbiana y calidad sanitaria de cada lote. Cumplimos con parámetros del Código Alimentario Argentino y estándares internacionales.',
      'Tiempo de respuesta promedio de 5 a 10 días hábiles según el análisis. Los informes incluyen valores medidos vs. referencia legal y recomendaciones interpretativas.',
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
    eyebrow: 'Cosmetología bioquímica · Plasma autólogo y formulaciones personalizadas',
    intro:
      'Aplicamos principios bioquímicos al cuidado de la piel y la regeneración tisular: plasma autólogo (PRP), cosméticos formulados individualmente y protocolos con base científica.',
    description: [
      'La cosmetología bioquímica regenerativa integra el conocimiento bioquímico con el cuidado de la piel. Cada formulación se realiza de manera individual, con selección de activos y ajuste de concentraciones según las necesidades específicas de cada paciente.',
      'El plasma autólogo (PRP) es el componente central: concentramos plaquetas de la propia sangre del paciente para liberar factores de crecimiento que estimulan la regeneración tisular. Este principio no solo tiene aplicación estética, sino también en traumatología, odontología y oftalmología.',
      'En CBI contamos con la especialización bioquímica necesaria para garantizar que cada procedimiento se realice con rigor científico, protocolos sanitarios estrictos y equipamiento calibrado.',
    ],
    analyses: [
      'Plasma autólogo (PRP) facial y capilar',
      'PRP para traumatología (rodilla, hombro, codo)',
      'PRP para odontología e implantes',
      'Cosméticos personalizados con activos bioquímicos',
      'Formulaciones con incorporación de plasma autólogo',
      'Perfil sanguíneo pre-procedimiento',
    ],
    audience:
      'Personas que buscan un enfoque científico en el cuidado de la piel, y pacientes derivados por médicos traumatólogos, odontólogos, dermatólogos o médicos estéticos.',
    preparation: [
      'Hidratación abundante las 24 hs previas al procedimiento con PRP.',
      'Suspender antiinflamatorios y aspirina 5 días antes (consultar con el médico tratante).',
      'Firmar consentimiento informado el día del turno.',
      'Concurrir sin maquillaje ni cremas en la zona a tratar.',
    ],
    includes:
      'Evaluación inicial, extracción y procesamiento del plasma autólogo (cuando aplica), formulación personalizada de cosméticos según diagnóstico de piel, protocolo escrito del tratamiento y seguimiento post-procedimiento.',
  },

  genetica: {
    eyebrow: 'Análisis genéticos · Paternidad y filiación',
    intro:
      'Estudios de ADN para determinación de paternidad y filiación con certeza mayor al 99,99 %, exclusión 100 % certera y confidencialidad absoluta.',
    description: [
      'El estudio de filiación por ADN determina con una certeza mayor al 99,99 % el vínculo biológico de paternidad entre el presunto padre y el hijo/a. La exclusión es 100 % certera.',
      'El informe es estrictamente confidencial: se entrega únicamente a las partes involucradas o debidamente autorizadas. El estudio tiene un costo de $480.000, abonables en hasta 3 cuotas sin interés en efectivo o transferencia (presupuesto válido por 15 días).',
    ],
    analyses: [
      'Filiación paternidad padre-hijo/a',
      'Maternidad biológica',
      'Parentesco entre hermanos',
      'Estudios de filiación post-mortem',
      'Identificación genética individual',
    ],
    audience:
      'Particulares, familias, abogados, juzgados y organismos estatales que requieran establecer filiación biológica con validez legal o informativa.',
    preparation: [
      'Avisar con anticipación para coordinar el turno.',
      'Se extrae 3 mL de sangre de cada parte y se toma muestra de hisopado bucal — rápido e indoloro.',
      'No requiere ayunas.',
      'Horarios de toma de muestra: 7 a 13 hs y de 16 a 20 hs.',
      'La madre y el presunto padre deben firmar el consentimiento informado.',
      'Presentar documento de identidad original de cada participante. En menores: acompañados por el adulto a cargo con documentación.',
    ],
    includes:
      'Toma de muestra de todos los participantes, procesamiento, informe con resultado y confidencialidad total. El informe se entrega únicamente a las partes involucradas o autorizadas.',
  },
}
