import { Question, SyllabusItem } from '../types/kas';

export const SYLLABUS_DATA: SyllabusItem[] = [
  {
    id: 'p1_hist',
    paper: 'Paper I',
    subject: 'Karnataka & Indian History',
    subjectKn: 'ಕರ್ನಾಟಕ ಮತ್ತು ಭಾರತದ ಇತಿಹಾಸ',
    weightagePercent: 24,
    pyqTrendEn: '18-22 Qs in 2024. Heavy emphasis on Kadambas, Rashtrakutas, Vijayanagara architecture, and Mysore State unification movement.',
    pyqTrendKn: '2024 ರಲ್ಲಿ 18-22 ಪ್ರಶ್ನೆಗಳು. ಕದಂಬರು, ರಾಷ್ಟ್ರಕೂಟರು, ವಿಜಯನಗರ ವಾಸ್ತುಶಿಲ್ಪ ಮತ್ತು ಮೈಸೂರು ರಾಜ್ಯ ಏಕೀಕರಣ ಚಳವಳಿಗೆ ಹೆಚ್ಚಿನ ಆದ್ಯತೆ.',
    topics: [
      { nameEn: 'Early Karnataka Dynasties (Kadamba, Ganga, Chalukya)', nameKn: 'ಆರಂಭಿಕ ಕರ್ನಾಟಕ ರಾಜವಂಶಗಳು (ಕದಂಬ, ಗಂಗ, ಚಾಲುಕ್ಯ)', highYield: true },
      { nameEn: 'Rashtrakutas & Kalyana Chalukyas (Literature, Architecture)', nameKn: 'ರಾಷ್ಟ್ರಕೂಟರು ಮತ್ತು ಕಲ್ಯಾಣ ಚಾಲುಕ್ಯರು (ಸಾಹಿತ್ಯ, ವಾಸ್ತುಶಿಲ್ಪ)', highYield: true },
      { nameEn: 'Vijayanagara Empire: Administration & Temple Architecture', nameKn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ: ಆಡಳಿತ ಮತ್ತು ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ', highYield: true },
      { nameEn: 'Modern Mysore: Wodeyars, Sir M. Visvesvaraya, Diwans', nameKn: 'ಆಧುನಿಕ ಮೈಸೂರು: ಒಡೆಯರ್, ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ, ದಿವಾನರು', highYield: true },
      { nameEn: 'Karnataka Unification Movement & Freedom Struggle', nameKn: 'ಕರ್ನಾಟಕ ಏಕೀಕರಣ ಚಳವಳಿ ಮತ್ತು ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟ', highYield: true },
      { nameEn: 'Ancient & Medieval Indian Heritage & Bhakti Movement', nameKn: 'ಪ್ರಾಚೀನ ಮತ್ತು ಮಧ್ಯಕಾಲೀನ ಭಾರತೀಯ ಪರಂಪರೆ ಮತ್ತು ಭಕ್ತಿ ಚಳವಳಿ', highYield: false },
    ]
  },
  {
    id: 'p1_geo',
    paper: 'Paper I',
    subject: 'Geography of Karnataka & India',
    subjectKn: 'ಕರ್ನಾಟಕ ಮತ್ತು ಭಾರತದ ಭೂಗೋಳ',
    weightagePercent: 18,
    pyqTrendEn: '14-16 Qs. Focus on Western Ghats river systems (Cauvery, Krishna basins), agro-climatic zones, and mineral reserves (Bellary, Kudremukh).',
    pyqTrendKn: '14-16 ಪ್ರಶ್ನೆಗಳು. ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ನದಿ ಜಾಲಗಳು (ಕಾವೇರಿ, ಕೃಷ್ಣಾ ಕೊಳ್ಳಗಳು), ಕೃಷಿ-ಹವಾಮಾನ ವಲಯಗಳು ಮತ್ತು ಖನಿಜ ಸಂಪನ್ಮೂಲಗಳ ಮೇಲೆ ಕೇಂದ್ರೀಕೃತ.',
    topics: [
      { nameEn: 'Physiographic Divisions: Coastal, Malnad, Maidan (North & South)', nameKn: 'ಭೌಗೋಳಿಕ ವಿಭಾಗಗಳು: ಕರಾವಳಿ, ಮಲೆನಾಡು, ಮೈದಾನ (ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ)', highYield: true },
      { nameEn: 'River Systems: Krishna, Cauvery, Sharavathi & Hydro Projects', nameKn: 'ನದಿ ಜಾಲಗಳು: ಕೃಷ್ಣಾ, ಕಾವೇರಿ, ಶರಾವತಿ ಮತ್ತು ಜಲವಿದ್ಯುತ್ ಯೋಜನೆಗಳು', highYield: true },
      { nameEn: 'Karnataka Agro-Climatic Zones, Soils & Major Crops', nameKn: 'ಕರ್ನಾಟಕ ಕೃಷಿ-ಹವಾಮಾನ ವಲಯಗಳು, ಮಣ್ಣುಗಳು ಮತ್ತು ಪ್ರಮುಖ ಬೆಳೆಗಳು', highYield: true },
      { nameEn: 'Forest Resources, Wildlife Sanctuaries & Western Ghats Ecology', nameKn: 'ಅರಣ್ಯ ಸಂಪತ್ತು, ವನ್ಯಜೀವಿ ಧಾಮಗಳು ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪರಿಸರ', highYield: true },
      { nameEn: 'Mineral Wealth: Iron Ore, Manganese, Gold & Limestone', nameKn: 'ಖನಿಜ ಸಂಪತ್ತು: ಕಬ್ಬಿಣದ ಅದಿರು, ಮ್ಯಾಂಗನೀಸ್, ಚಿನ್ನ ಮತ್ತು ಸುಣ್ಣದ ಕಲ್ಲು', highYield: false }
    ]
  },
  {
    id: 'p1_pol',
    paper: 'Paper I',
    subject: 'Indian Polity & Karnataka Governance',
    subjectKn: 'ಭಾರತೀಯ ರಾಜಕೀಯ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಕರ್ನಾಟಕ ಆಡಳಿತ',
    weightagePercent: 22,
    pyqTrendEn: '18-20 Qs. Strict constitutional interpretation, 73rd/74th amendments, Karnataka Panchayat Raj Act 1993, Sakala & K-PTP Act.',
    pyqTrendKn: '18-20 ಪ್ರಶ್ನೆಗಳು. ಸಂವಿಧಾನಾತ್ಮಕ ನಿಬಂಧನೆಗಳು, 73 ಮತ್ತು 74 ನೇ ತಿದ್ದುಪಡಿಗಳು, ಕರ್ನಾಟಕ ಪಂಚಾಯತ್ ರಾಜ್ ಕಾಯ್ದೆ 1993, ಸಕಾಲ ಕಾಯ್ದೆ.',
    topics: [
      { nameEn: 'Preamble, Fundamental Rights & DPSP Key Judgments', nameKn: 'ಪೀಠಿಕೆ, ಮೂಲಭೂತ ಹಕ್ಕುಗಳು ಮತ್ತು ರಾಜ್ಯ ನೀತಿಯ ನಿರ್ದೇಶಕ ತತ್ವಗಳು', highYield: true },
      { nameEn: 'Karnataka Panchayati Raj Act 1993 & Grama Swaraj', nameKn: 'ಕರ್ನಾಟಕ ಪಂಚಾಯತ್ ರಾಜ್ ಕಾಯ್ದೆ 1993 ಮತ್ತು ಗ್ರಾಮ ಸ್ವರಾಜ್', highYield: true },
      { nameEn: 'State Executive: Governor, Chief Minister & State Legislature', nameKn: 'ರಾಜ್ಯ ಕಾರ್ಯಾಂಗ: ರಾಜ್ಯಪಾಲರು, ಮುಖ್ಯಮಂತ್ರಿ ಮತ್ತು ಶಾಸಕಾಂಗ', highYield: true },
      { nameEn: 'Article 371(J) Special Provisions for Kalyana Karnataka', nameKn: 'ಕಲ್ಯಾಣ ಕರ್ನಾಟಕಕ್ಕೆ 371(ಜೆ) ವಿಶೇಷ ಸೌಲಭ್ಯಗಳು', highYield: true },
      { nameEn: 'Governance Initiatives: Sakala, Bhoomi, Kutumba, Seva Sindhu', nameKn: 'ಆಡಳಿತ ಉಪಕ್ರಮಗಳು: ಸಕಾಲ, ಭೂಮಿ, ಕುಟುಂಬ, ಸೇವಾ ಸಿಂಧು', highYield: true }
    ]
  },
  {
    id: 'p1_eco',
    paper: 'Paper I',
    subject: 'Indian Economy & Karnataka State Budget',
    subjectKn: 'ಭಾರತೀಯ ಅರ್ಥವ್ಯವಸ್ಥೆ ಮತ್ತು ಕರ್ನಾಟಕ ಆಯವ್ಯಯ',
    weightagePercent: 18,
    pyqTrendEn: '12-15 Qs. Karnataka Economic Survey figures, GSDP sector shares, Five Guarantees scheme allocations, GST share.',
    pyqTrendKn: '12-15 ಪ್ರಶ್ನೆಗಳು. ಕರ್ನಾಟಕ ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆ ಅಂಕಿಅಂಶಗಳು, ಜಿಎಸ್‌ಡಿಪಿ ವಲಯವಾರು ಪಾಲು, ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳ ಅನುದಾನ.',
    topics: [
      { nameEn: 'Karnataka Economic Survey & State Budget Key Indicators', nameKn: 'ಕರ್ನಾಟಕ ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆ ಮತ್ತು ರಾಜ್ಯ ಬಜೆಟ್ ಪ್ರಮುಖ ಸೂಚಕಗಳು', highYield: true },
      { nameEn: 'Fiscal Health: Fiscal Deficit, FRBM Targets & GSDP Growth', nameKn: 'ಹಣಕಾಸು ಸ್ಥಿತಿ: ವಿತ್ತೀಯ ಕೊರತೆ, ಎಫ್‌ಆರ್‌ಬಿಎಂ ಗುರಿಗಳು ಮತ್ತು ಬೆಳವಣಿಗೆ', highYield: true },
      { nameEn: 'Social Welfare & State Guarantees (Gruha Lakshmi, Yuva Nidhi etc.)', nameKn: 'ಸಾಮಾಜಿಕ ಕಲ್ಯಾಣ ಮತ್ತು ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳು (ಗೃಹಲಕ್ಷ್ಮಿ, ಯುವನಿಧಿ ಇತ್ಯಾದಿ)', highYield: true },
      { nameEn: 'Industrial Policy of Karnataka & IT/BT/Aerospace Corridors', nameKn: 'ಕರ್ನಾಟಕದ ಕೈಗಾರಿಕಾ ನೀತಿ ಮತ್ತು ಐಟಿ/ಬಿಟಿ/ಏರೋಸ್ಪೇಸ್ ಕಾರಿಡಾರ್‌ಗಳು', highYield: false }
    ]
  },
  {
    id: 'p2_sci',
    paper: 'Paper II',
    subject: 'General Science, Tech & Ecology',
    subjectKn: 'ಸಾಮಾನ್ಯ ವಿಜ್ಞಾನ, ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ಪರಿಸರ',
    weightagePercent: 26,
    pyqTrendEn: '22-26 Qs. Space missions (ISRO Bengaluru footprint), biotech, renewable energy parks (Pavagada), biodiversity hotspots.',
    pyqTrendKn: '22-26 ಪ್ರಶ್ನೆಗಳು. ಬಾಹ್ಯಾಕಾಶ ಯೋಜನೆಗಳು (ಇಸ್ರೋ ಬೆಂಗಳೂರು), ಜೈವಿಕ ತಂತ್ರಜ್ಞಾನ, ಪಾವಗಡ ಸೌರ ಪಾರ್ಕ್, ಜೀವವೈವಿಧ್ಯ ತಾಣಗಳು.',
    topics: [
      { nameEn: 'ISRO Missions & Deep Space Technology', nameKn: 'ಇಸ್ರೋ ಯೋಜನೆಗಳು ಮತ್ತು ಬಾಹ್ಯಾಕಾಶ ತಂತ್ರಜ್ಞಾನ', highYield: true },
      { nameEn: 'Climate Change, Western Ghats Ecology & Biosphere Reserves', nameKn: 'ಹವಾಮಾನ ಬದಲಾವಣೆ, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪರಿಸರ ಮತ್ತು ಜೀವಗೋಳ ತಾಣಗಳು', highYield: true },
      { nameEn: 'Renewable Energy: Solar (Pavagada), Wind & Hydro in Karnataka', nameKn: 'ನವೀಕರಿಸಬಹುದಾದ ಇಂಧನ: ಪಾವಗಡ ಸೌರಶಕ್ತಿ, ಪವನ ಮತ್ತು ಜಲವಿದ್ಯುತ್', highYield: true },
      { nameEn: 'Public Health, Vaccines, Biotechnology & Disease Vectors', nameKn: 'ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ, ಲಸಿಕೆಗಳು, ಬಯೋಟೆಕ್ನಾಲಜಿ ಮತ್ತು ರೋಗವಾಹಕಗಳು', highYield: false }
    ]
  },
  {
    id: 'p2_csat',
    paper: 'Paper II',
    subject: 'Mental Ability, Logical Reasoning & Data Interpretation',
    subjectKn: 'ಮಾನಸಿಕ ಸಾಮರ್ಥ್ಯ, ತಾರ್ಕಿಕ ಚಿಂತನೆ ಮತ್ತು ದತ್ತಾಂಶ ವಿವರಣೆ',
    weightagePercent: 30,
    pyqTrendEn: '28-32 Qs. Crucial scoring section. Syllogisms, coding patterns, speed-distance-time, probability, Venn diagrams.',
    pyqTrendKn: '28-32 ಪ್ರಶ್ನೆಗಳು. ಹೆಚ್ಚು ಅಂಕ ಗಳಿಸಬಹುದಾದ ವಿಭಾಗ. ಸಿಲಾಜಿಜಂ, ಕೋಡಿಂಗ್, ವೇಗ-ದೂರ-ಸಮಯ, ವೆನ್ ನಕ್ಷೆಗಳು.',
    topics: [
      { nameEn: 'Number Series, Missing Numbers & Pattern Completion', nameKn: 'ಸಂಖ್ಯಾ ಸರಣಿ, ಕಾಣೆಯಾದ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ವಿನ್ಯಾಸ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ', highYield: true },
      { nameEn: 'Syllogisms & Logical Deductions (Venn Diagrams)', nameKn: 'ಸಿಲಾಜಿಜಂ ಮತ್ತು ತಾರ್ಕಿಕ ತೀರ್ಮಾನಗಳು (ವೆನ್ ನಕ್ಷೆಗಳು)', highYield: true },
      { nameEn: 'Direction Sense, Blood Relations & Seating Arrangements', nameKn: 'ದಿಕ್ಕು ಗ್ರಹಿಕೆ, ರಕ್ತ ಸಂಬಂಧಗಳು ಮತ್ತು ಆಸನ ವ್ಯವಸ್ಥೆ', highYield: true },
      { nameEn: 'Time, Speed, Distance & Quantitative Data Interpretation', nameKn: 'ಸಮಯ, ವೇಗ, ದೂರ ಮತ್ತು ಪರಿಮಾಣಾತ್ಮಕ ದತ್ತಾಂಶ ವಿಶ್ಲೇಷಣೆ', highYield: true }
    ]
  }
];

export const QUESTION_BANK: Question[] = [
  {
    id: 'kas_q1',
    paper: 'paper1',
    subject: 'Karnataka History',
    topic: 'Kadambas of Banavasi',
    type: 'statement',
    difficulty: 'Moderate',
    textEn: 'Consider the following statements regarding the Kadamba dynasty of Banavasi:',
    textKn: 'ಬನವಾಸಿಯ ಕದಂಬ ರಾಜವಂಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ಈ ಕೆಳಗಿನ ಹೇಳಿಕೆಗಳನ್ನು ಪರಿಗಣಿಸಿ:',
    statementsEn: [
      'Mayurasharma was the founder of the Kadamba dynasty after rebelling against the Pallavas of Kanchi.',
      'The Halmidi inscription, the earliest known Kannada epigraph in Brahmic script, belongs to the Kadamba period (circa 450 CE).',
      'The Kadambas declared Prakrit as the sole administrative language, rejecting Sanskrit and Halegannada.'
    ],
    statementsKn: [
      'ಕಾಂಚಿಯ ಪಲ್ಲವರ ವಿರುದ್ಧ ಬಂಡಾಯವೆದ್ದು ಕದಂಬ ರಾಜವಂಶವನ್ನು ಸ್ಥಾಪಿಸಿದವರು ಮಯೂರಶರ್ಮ.',
      'ಬ್ರಾಹ್ಮೀ ಲಿಪಿಯಲ್ಲಿರುವ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಕನ್ನಡ ಶಾಸನವಾದ ಹಲ್ಮಿಡಿ ಶಾಸನವು ಕದಂಬರ ಕಾಲಕ್ಕೆ ಸೇರಿದೆ (ಸುಮಾರು ಕ್ರಿ.ಶ. 450).',
      'ಕದಂಬರು ಸಂಸ್ಕೃತ ಮತ್ತು ಹಳಗನ್ನಡವನ್ನು ತಿರಸ್ಕರಿಸಿ ಪ್ರಾಕೃತವನ್ನು ಮಾತ್ರ ಏಕೈಕ ಆಡಳಿತ ಭಾಷೆಯಾಗಿ ಘೋಷಿಸಿದರು.'
    ],
    optionsEn: [
      '1 and 2 only',
      '2 and 3 only',
      '1 and 3 only',
      '1, 2 and 3'
    ],
    optionsKn: [
      '1 ಮತ್ತು 2 ಮಾತ್ರ',
      '2 ಮತ್ತು 3 ಮಾತ್ರ',
      '1 ಮತ್ತು 3 ಮಾತ್ರ',
      '1, 2 ಮತ್ತು 3'
    ],
    correctIndex: 0,
    explanationEn: 'Statements 1 and 2 are correct. Mayurasharma was insulted at the Ghatika of Kanchi and founded the dynasty. The Halmidi inscription dates to circa 450 CE under King Kakusthavarma. Statement 3 is incorrect: Kadambas patronized both Sanskrit (Talagunda pillar inscription) and early Kannada; they did not ban Sanskrit or Kannada.',
    explanationKn: 'ಹೇಳಿಕೆ 1 ಮತ್ತು 2 ಸರಿ. ಮಯೂರಶರ್ಮ ಕಾಂಚಿಯ ಘಟಿಕೆಯಲ್ಲಿ ಅವಮಾನಿತನಾಗಿ ಕದಂಬ ಸಾಮ್ರಾಜ್ಯ ಸ್ಥಾಪಿಸಿದನು. ಹಲ್ಮಿಡಿ ಶಾಸನವು ಕಾಕುಸ್ಥವರ್ಮನ ಕಾಲದ್ದಾಗಿದೆ. ಹೇಳಿಕೆ 3 ತಪ್ಪು: ಕದಂಬರು ಸಂಸ್ಕೃತ ಮತ್ತು ಆರಂಭಿಕ ಕನ್ನಡ ಎರಡನ್ನೂ ಪ್ರೋತ್ಸಾಹಿಸಿದರು (ತಾಳಗುಂದ ಸ್ತಂಭ ಶಾಸನವು ಉನ್ನತ ಸಂಸ್ಕೃತದಲ್ಲಿದೆ).',
    eliminationTechniqueEn: 'Extreme Word Elimination: Statement 3 uses the extreme assertion "sole administrative language, rejecting Sanskrit and Halegannada". In ancient Indian epigraphy, kings rarely banned established religious/court languages like Sanskrit. Eliminating statement 3 leaves only Option A (1 and 2 only).',
    eliminationTechniqueKn: 'ತೀವ್ರ ಪದ ನಿವಾರಣೆ ತಂತ್ರ: ಹೇಳಿಕೆ 3 ರಲ್ಲಿ "ಏಕೈಕ ಆಡಳಿತ ಭಾಷೆ, ತಿರಸ್ಕರಿಸಿ" ಎಂಬ ಅತಿರೇಕದ ಶಬ್ದವಿದೆ. ಪ್ರಾಚೀನ ಭಾರತೀಯ ಇತಿಹಾಸದಲ್ಲಿ ಸಂಸ್ಕೃತವನ್ನು ಪೂರ್ಣವಾಗಿ ತಿರಸ್ಕರಿಸಿದ ದಾಖಲೆಗಳಿಲ್ಲ. ಆದ್ದರಿಂದ 3 ನ್ನು ತೆಗೆದುಹಾಕಿದರೆ ನೇರವಾಗಿ ಆಯ್ಕೆ A ಲಭಿಸುತ್ತದೆ.'
  },
  {
    id: 'kas_q2',
    paper: 'paper1',
    subject: 'Karnataka Governance',
    topic: 'Article 371(J)',
    type: 'assertion_reason',
    difficulty: 'Hard',
    textEn: 'Examine the following statements on Article 371(J) of the Constitution of India:',
    textKn: 'ಭಾರತ ಸಂವಿಧಾನದ 371(ಜೆ) ವಿಧಿ ಕುರಿತ ಕೆಳಗಿನ ಹೇಳಿಕೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ:',
    assertionEn: 'Article 371(J) empowers the Governor of Karnataka to establish a separate development board for the Kalyana Karnataka (Hyderabad Karnataka) region.',
    assertionKn: 'ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ (ಹೈದರಾಬಾದ್ ಕರ್ನಾಟಕ) ಪ್ರದೇಶಕ್ಕೆ ಪ್ರತ್ಯೇಕ ಅಭಿವೃದ್ಧಿ ಮಂಡಳಿಯನ್ನು ಸ್ಥಾಪಿಸಲು ಕರ್ನಾಟಕದ ರಾಜ್ಯಪಾಲರಿಗೆ 371(ಜೆ) ವಿಧಿಯು ಅಧಿಕಾರ ನೀಡುತ್ತದೆ.',
    reasonEn: 'The 98th Constitutional Amendment Act 2012 was enacted to provide equitable opportunities in education and state public employment for residents of backward districts in the region.',
    reasonKn: 'ಈ ಪ್ರದೇಶದ ಹಿಂದುಳಿದ ಜಿಲ್ಲೆಗಳ ನಿವಾಸಿಗಳಿಗೆ ಶಿಕ್ಷಣ ಮತ್ತು ರಾಜ್ಯ ಸಾರ್ವಜನಿಕ ಉದ್ಯೋಗಗಳಲ್ಲಿ ಸಮಾನ ಅವಕಾಶಗಳನ್ನು ಕಲ್ಪಿಸಲು 98ನೇ ಸಂವಿಧಾನ ತಿದ್ದುಪಡಿ ಕಾಯ್ದೆ 2012 ಅನ್ನು ಜಾರಿಗೆ ತರಲಾಯಿತು.',
    optionsEn: [
      'Both Assertion (A) and Reason (R) are true, and (R) is the correct explanation of (A)',
      'Both Assertion (A) and Reason (R) are true, but (R) is NOT the correct explanation of (A)',
      '(A) is true, but (R) is false',
      '(A) is false, but (R) is true'
    ],
    optionsKn: [
      'ಪ್ರತಿಪಾದನೆ (A) ಮತ್ತು ಕಾರಣ (R) ಎರಡೂ ಸರಿ, ಮತ್ತು (R) ಯು (A) ಗೆ ಸರಿಯಾದ ವಿವರಣೆಯಾಗಿದೆ',
      'ಪ್ರತಿಪಾದನೆ (A) ಮತ್ತು ಕಾರಣ (R) ಎರಡೂ ಸರಿ, ಆದರೆ (R) ಯು (A) ಗೆ ಸರಿಯಾದ ವಿವರಣೆಯಲ್ಲ',
      '(A) ಸರಿ, ಆದರೆ (R) ತಪ್ಪು',
      '(A) ತಪ್ಪು, ಆದರೆ (R) ಸರಿ'
    ],
    correctIndex: 0,
    explanationEn: 'Both statements are true. Article 371(J) was inserted by the 98th Amendment Act 2012. It provides special provisions including a development board, reservation in state government jobs (local cadres), and educational institutional quotas for Bidar, Bellary, Kalaburagi, Koppal, Raichur, and Yadgir (now including Vijayanagara). Reason directly explains the rationale for vesting powers in the Governor.',
    explanationKn: 'ಎರಡೂ ಹೇಳಿಕೆಗಳು ಸರಿ. 98ನೇ ತಿದ್ದುಪಡಿ ಮೂಲಕ 371(ಜೆ) ಸೇರಿಸಲಾಯಿತು. ಇದು ಅಭಿವೃದ್ಧಿ ಮಂಡಳಿ, ಸ್ಥಳೀಯ ವೃಂದದ ಉದ್ಯೋಗ ಮೀಸಲಾತಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಸೀಟುಗಳ ಮೀಸಲಾತಿಯನ್ನು 7 ಜಿಲ್ಲೆಗಳಿಗೆ ನೀಡುತ್ತದೆ. ಆದ್ದರಿಂದ (R) ಯು (A) ಗೆ ನೇರ ಸಮರ್ಥನೆಯಾಗಿದೆ.',
    eliminationTechniqueEn: 'Causal Linkage Test: Ask "Why did Article 371(J) mandate the Governor to have special responsibility?" Because constitutional amendments require executive oversight to ensure backward district quotas in education/employment are strictly implemented without political dilution.',
    eliminationTechniqueKn: 'ಕಾರಣ-ಪರಿಣಾಮ ಪರೀಕ್ಷೆ: "ರಾಜ್ಯಪಾಲರಿಗೆ ವಿಶೇಷ ಜವಾಬ್ದಾರಿ ಏಕೆ ನೀಡಲಾಯಿತು?" ಎಂದು ಪ್ರಶ್ನಿಸಿದಾಗ, ಹಿಂದುಳಿದ ಪ್ರದೇಶಗಳ ಮೀಸಲಾತಿ ಹಕ್ಕುಗಳು ರಾಜಕೀಯ ಹಸ್ತಕ್ಷೇಪವಿಲ್ಲದೆ ಜಾರಿಯಾಗಲು ಎಂಬುದಕ್ಕೆ ಕಾರಣ (R) ನೇರ ಉತ್ತರ ನೀಡುತ್ತದೆ.'
  },
  {
    id: 'kas_q3',
    paper: 'paper1',
    subject: 'Karnataka Geography',
    topic: 'River Basins & Waterfalls',
    type: 'match',
    difficulty: 'Moderate',
    textEn: 'Match the Waterfalls of Karnataka in List-I with their respective Rivers in List-II:',
    textKn: 'ಪಟ್ಟಿ-I ರಲ್ಲಿರುವ ಕರ್ನಾಟಕದ ಜಲಪಾತಗಳನ್ನು ಪಟ್ಟಿ-II ರಲ್ಲಿರುವ ಅವುಗಳ ನದಿಗಳೊಂದಿಗೆ ಹೊಂದಿಸಿ:',
    matchPairsEn: [
      { left: 'A. Jog Falls (Gersoppa)', right: '1. Sharavathi River' },
      { left: 'B. Shivanasamudra Falls', right: '2. Cauvery River' },
      { left: 'C. Gokak Falls', right: '3. Ghataprabha River' },
      { left: 'D. Magod Falls', right: '4. Bedti River' }
    ],
    matchPairsKn: [
      { left: 'A. ಜೋಗ ಜಲಪಾತ (ಗೇರುಸೊಪ್ಪೆ)', right: '1. ಶರಾವತಿ ನದಿ' },
      { left: 'B. ಶಿವನಸಮುದ್ರ ಜಲಪಾತ', right: '2. ಕಾವೇರಿ ನದಿ' },
      { left: 'C. ಗೋಕಾಕ್ ಜಲಪಾತ', right: '3. ಘಟಪ್ರಭಾ ನದಿ' },
      { left: 'D. ಮಾಗೋಡು ಜಲಪಾತ', right: '4. ಬೇಡ್ತಿ ನದಿ' }
    ],
    optionsEn: [
      'A-1, B-2, C-3, D-4',
      'A-2, B-1, C-4, D-3',
      'A-1, B-3, C-2, D-4',
      'A-3, B-2, C-1, D-4'
    ],
    optionsKn: [
      'A-1, B-2, C-3, D-4',
      'A-2, B-1, C-4, D-3',
      'A-1, B-3, C-2, D-4',
      'A-3, B-2, C-1, D-4'
    ],
    correctIndex: 0,
    explanationEn: 'Jog Falls is on Sharavathi (Shivamogga district). Shivanasamudra (Gaganachukki & Bharachukki) is on Cauvery (Mandya/Chamarajanagar). Gokak Falls (Horseshoe waterfall of Karnataka) is on Ghataprabha (Belagavi). Magod Falls is formed by Bedti River (Uttara Kannada).',
    explanationKn: 'ಜೋಗ ಜಲಪಾತವು ಶರಾವತಿ ನದಿಯಲ್ಲಿದೆ (ಶಿವಮೊಗ್ಗ). ಶಿವನಸಮುದ್ರವು ಕಾವೇರಿ ನದಿಯಲ್ಲಿದೆ (ಗಗನಚುಕ್ಕಿ ಮತ್ತು ಭರಚುಕ್ಕಿ). ಗೋಕಾಕ್ ಜಲಪಾತವು ಘಟಪ್ರಭಾ ನದಿಯಲ್ಲಿದೆ (ಬೆಳಗಾವಿ - ಕರ್ನಾಟಕದ ನಯಾಗರಾ). ಮಾಗೋಡು ಜಲಪಾತವು ಬೇಡ್ತಿ ನದಿಯಲ್ಲಿದೆ.',
    eliminationTechniqueEn: 'Anchor Matching: Most KAS aspirants know Jog is Sharavathi (A-1) and Shivanasamudra is Cauvery (B-2). Checking options where A=1 and B=2 immediately narrows it down to Option A without needing to memorize obscure rivers!',
    eliminationTechniqueKn: 'ಆಧಾರ ಜೋಡಿ ತಂತ್ರ: ಜೋಗ ಜಲಪಾತವು ಶರಾವತಿ ನದಿಯಲ್ಲಿದೆ (A-1) ಮತ್ತು ಶಿವನಸಮುದ್ರವು ಕಾವೇರಿಯಲ್ಲಿದೆ (B-2) ಎಂಬ ಎರಡು ಖಚಿತ ಮಾಹಿತಿಗಳನ್ನಿಟ್ಟುಕೊಂಡು ನೋಡಿದರೆ ಕೇವಲ ಆಯ್ಕೆ A ಮಾತ್ರ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.'
  },
  {
    id: 'kas_q4',
    paper: 'paper2',
    subject: 'Mental Ability',
    topic: 'Number Series Pattern',
    type: 'mental_ability',
    difficulty: 'Moderate',
    textEn: 'Find the next number in the KPSC CSAT series: 7, 26, 63, 124, 215, ?',
    textKn: 'ಕೆಳಗಿನ ಕೆಪಿಎಸ್‌ಸಿ ಸಂಖ್ಯಾ ಸರಣಿಯ ಮುಂದಿನ ಸಂಖ್ಯೆಯನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ: 7, 26, 63, 124, 215, ?',
    optionsEn: [
      '342',
      '343',
      '336',
      '328'
    ],
    optionsKn: [
      '342',
      '343',
      '336',
      '328'
    ],
    correctIndex: 0,
    explanationEn: 'The logic is n³ - 1:\n2³ - 1 = 8 - 1 = 7\n3³ - 1 = 27 - 1 = 26\n4³ - 1 = 64 - 1 = 63\n5³ - 1 = 125 - 1 = 124\n6³ - 1 = 216 - 1 = 215\nTherefore, the next number is 7³ - 1 = 343 - 1 = 342.',
    explanationKn: 'ಸರಣಿಯ ತರ್ಕವು n³ - 1 ಆಗಿದೆ:\n2³ - 1 = 8 - 1 = 7\n3³ - 1 = 27 - 1 = 26\n4³ - 1 = 64 - 1 = 63\n5³ - 1 = 125 - 1 = 124\n6³ - 1 = 216 - 1 = 215\nಮುಂದಿನ ಸಂಖ್ಯೆ: 7³ - 1 = 343 - 1 = 342.',
    eliminationTechniqueEn: 'Cube minus one identity: Numbers like 26, 63, 124 are classic signature numbers close to perfect cubes (27, 64, 125). 7³ is 343, so 343 - 1 = 342. Option B (343) is the trap option (n³ instead of n³-1)!',
    eliminationTechniqueKn: 'ಘನ ಸಂಖ್ಯೆಯ ಸಮೀಪದ ಗುರುತು: 26, 63, 124 ಇವು ಪರಿಪೂರ್ಣ ಘನಗಳಿಗಿಂತ (27, 64, 125) 1 ಕಡಿಮೆ ಇರುವ ಸಂಖ್ಯೆಗಳು. 7 ರ ಘನ 343 ಆಗಿದ್ದು, ಅದರಲ್ಲಿ 1 ಕಳೆದರೆ 342 ಬರುತ್ತದೆ. 343 ಎನ್ನುವುದು ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಗೊಂದಲಕ್ಕೀಡುಮಾಡುವ ಬಲೆ!',
    mentalAbilitySteps: [
      'Step 1: Check difference between terms: 19, 37, 61, 91 (differences of differences: 18, 24, 30 -> arithmetic progression of 6).',
      'Step 2: Alternatively recognize algebraic identity: n³ - 1 for n = 2, 3, 4, 5, 6, 7.',
      'Step 3: Calculate 7³ = 343.',
      'Step 4: Subtract 1: 343 - 1 = 342.'
    ]
  },
  {
    id: 'kas_q5',
    paper: 'paper2',
    subject: 'Environment & Ecology',
    topic: 'Western Ghats Ecology & Committees',
    type: 'statement',
    difficulty: 'Hard',
    textEn: 'With reference to Western Ghats conservation in Karnataka, consider the following statements:',
    textKn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಸಂರಕ್ಷಣೆಗೆ ಸಂಬಂಧಿಸಿದಂತೆ, ಕೆಳಗಿನ ಹೇಳಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ:',
    statementsEn: [
      'The Western Ghats Ecology Expert Panel (WGEEP) was headed by Madhav Gadgil, which recommended designating the entire Western Ghats as an Ecologically Sensitive Area (ESA).',
      'The High-Level Working Group chaired by Dr. K. Kasturirangan recommended bringing approximately 37% of the total area under an Ecologically Sensitive Area regime.',
      'Kudremukh National Park was declared a Tiger Reserve under Project Tiger in Karnataka.'
    ],
    statementsKn: [
      'ಮಾಧವ್ ಗಾಡ್ಗೀಳ್ ನೇತೃತ್ವದ ಪಶ್ಚಿಮ ಘಟ್ಟ ಪರಿಸರ ತಜ್ಞರ ಸಮಿತಿ (WGEEP) ಸಂಪೂರ್ಣ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳನ್ನು ಪರಿಸರ ಸೂಕ್ಷ್ಮ ಪ್ರದೇಶ (ESA) ಎಂದು ಘೋಷಿಸಲು ಶಿಫಾರಸು ಮಾಡಿತು.',
      'ಡಾ. ಕೆ. ಕಸ್ತೂರಿರಂಗನ್ ನೇತೃತ್ವದ ಉನ್ನತ ಮಟ್ಟದ ಕಾರ್ಯಕಾರಿ ಗುಂಪು ಒಟ್ಟು ವಿಸ್ತೀರ್ಣದ ಸುಮಾರು 37% ಪ್ರದೇಶವನ್ನು ಪರಿಸರ ಸೂಕ್ಷ್ಮ ಪ್ರದೇಶ ವ್ಯಾಪ್ತಿಗೆ ತರಲು ಶಿಫಾರಸು ಮಾಡಿತು.',
      'ಕರ್ನಾಟಕದ ಕುದುರೆಮುಖ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನವನ್ನು ಪ್ರಾಜೆಕ್ಟ್ ಟೈಗರ್ ಅಡಿಯಲ್ಲಿ ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶವೆಂದು ಘೋಷಿಸಲಾಗಿದೆ.'
    ],
    optionsEn: [
      '1 and 2 only',
      '2 and 3 only',
      '1 and 3 only',
      '1, 2 and 3'
    ],
    optionsKn: [
      '1 ಮತ್ತು 2 ಮಾತ್ರ',
      '2 ಮತ್ತು 3 ಮಾತ್ರ',
      '1 ಮತ್ತು 3 ಮಾತ್ರ',
      '1, 2 ಮತ್ತು 3'
    ],
    correctIndex: 3,
    explanationEn: 'All three statements are correct. Gadgil recommended classifying the entire Western Ghats into ESA Zones I, II, and III. Kasturirangan scaled it down to 37% natural landscape. Kudremukh National Park was declared a Tiger Reserve in Karnataka (alongside Bandipur, Nagarahole, BRT, and Bhadra).',
    explanationKn: 'ಮೂರು ಹೇಳಿಕೆಗಳೂ ಸರಿಯಾಗಿವೆ. ಗಾಡ್ಗೀಳ್ ಸಮಿತಿಯು ಇಡೀ ಪಶ್ಚಿಮ ಘಟ್ಟವನ್ನು ಇಎಸ್‌ಎ ಎಂದು ಗುರುತಿಸಿತು. ಕಸ್ತೂರಿರಂಗನ್ ವರದಿಯು ಕೇವಲ 37% ಸ್ವಾಭಾವಿಕ ಭೂಪ್ರದೇಶವನ್ನು ಪರಿಸರ ಸೂಕ್ಷ್ಮವೆಂದು ಪರಿಗಣಿಸಲು ತಿಳಿಸಿತು. ಕುದುರೆಮುಖ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನವು ಕರ್ನಾಟಕದ 5 ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.',
    eliminationTechniqueEn: 'Policy Nuance check: High-level administrative questions often distinguish between Gadgil (100% strict) vs Kasturirangan (pragmatic 37% cutoff). Both are historic milestones frequently asked together in KPSC Mains and Prelims.',
    eliminationTechniqueKn: 'ವರದಿಗಳ ಹೋಲಿಕೆ: ಗಾಡ್ಗೀಳ್ ವರದಿ (100% ಕಟ್ಟುನಿಟ್ಟು) ಮತ್ತು ಕಸ್ತೂರಿರಂಗನ್ ವರದಿ (37% ವಾಸ್ತವಿಕ) ನಡುವಿನ ವ್ಯತ್ಯಾಸವು ಕೆಪಿಎಸ್‌ಸಿಯ ಅತಿ ನೆಚ್ಚಿನ ಪ್ರಶ್ನೆಯಾಗಿದೆ.'
  },
  {
    id: 'kas_q6',
    paper: 'paper1',
    subject: 'Karnataka Economy',
    topic: 'State Guarantees & Fiscal Metrics',
    type: 'standard',
    difficulty: 'Moderate',
    textEn: 'Under the Karnataka Government’s "Gruha Jyothi" scheme, what is the maximum monthly domestic electricity consumption eligible for zero-bill subsidy?',
    textKn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ "ಗೃಹ ಜ್ಯೋತಿ" ಯೋಜನೆಯಡಿ ಶೂನ್ಯ ಬಿಲ್ ಸಬ್ಸಿಡಿಗೆ ಅರ್ಹವಾದ ಗರಿಷ್ಠ ಮಾಸಿಕ ಗೃಹಬಳಕೆಯ ವಿದ್ಯುತ್ ಮಿತಿ ಎಷ್ಟು?',
    optionsEn: [
      '100 units',
      '150 units',
      '200 units',
      '250 units'
    ],
    optionsKn: [
      '100 ಯೂನಿಟ್‌ಗಳು',
      '150 ಯೂನಿಟ್‌ಗಳು',
      '200 ಯೂನಿಟ್‌ಗಳು',
      '250 ಯೂನಿಟ್‌ಗಳು'
    ],
    correctIndex: 2,
    explanationEn: 'The Gruha Jyothi scheme provides free electricity to all domestic households up to a ceiling limit of 200 units per month, calculated based on the household average consumption plus a 10% entitlement buffer.',
    explanationKn: 'ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆಯು ಎಲ್ಲಾ ಗೃಹಬಳಕೆದಾರರಿಗೆ ತಿಂಗಳಿಗೆ ಗರಿಷ್ಠ 200 ಯೂನಿಟ್‌ಗಳವರೆಗೆ ಉಚಿತ ವಿದ್ಯುತ್ ಸೌಲಭ್ಯವನ್ನು ನೀಡುತ್ತದೆ (ವಾರ್ಷಿಕ ಸರಾಸರಿ ಬಳಕೆಗೆ 10% ಹೆಚ್ಚುವರಿ ಸೇರಿಸಿ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ).',
    eliminationTechniqueEn: 'Direct factual recall: Scheme rules set 200 units as the statutory ceiling, while consumption beyond 200 units requires full tariff payment.',
    eliminationTechniqueKn: 'ನೇರ ಸತ್ಯಾಂಶ: ಯೋಜನೆಯ ಅಧಿಕೃತ ಮಾರ್ಗಸೂಚಿಗಳಲ್ಲಿ 200 ಯೂನಿಟ್‌ಗಳ ಗರಿಷ್ಠ ಮಿತಿಯನ್ನು ನಿಗದಿಪಡಿಸಲಾಗಿದೆ.'
  },
  {
    id: 'kas_q7',
    paper: 'paper2',
    subject: 'Mental Ability',
    topic: 'Syllogism Logic',
    type: 'mental_ability',
    difficulty: 'Hard',
    textEn: 'Statements:\nI. All Civil Servants are Administrators.\nII. Some Administrators are Policy Makers.\n\nConclusions:\n1. Some Civil Servants are Policy Makers.\n2. Some Administrators are Civil Servants.',
    textKn: 'ಹೇಳಿಕೆಗಳು:\nI. ಎಲ್ಲಾ ನಾಗರಿಕ ಸೇವಾಧಿಕಾರಿಗಳೂ ಆಡಳಿತಗಾರರು.\nII. ಕೆಲ ಆಡಳಿತಗಾರರು ನೀತಿ ನಿರೂಪಕರು.\n\nತೀರ್ಮಾನಗಳು:\n1. ಕೆಲ ನಾಗರಿಕ ಸೇವಾಧಿಕಾರಿಗಳು ನೀತಿ ನಿರೂಪಕರು.\n2. ಕೆಲ ಆಡಳಿತಗಾರರು ನಾಗರಿಕ ಸೇವಾಧಿಕಾರಿಗಳು.',
    optionsEn: [
      'Only Conclusion 1 follows',
      'Only Conclusion 2 follows',
      'Both Conclusion 1 and 2 follow',
      'Neither Conclusion 1 nor 2 follows'
    ],
    optionsKn: [
      'ತೀರ್ಮಾನ 1 ಮಾತ್ರ ಅನುಸರಿಸುತ್ತದೆ',
      'ತೀರ್ಮಾನ 2 ಮಾತ್ರ ಅನುಸರಿಸುತ್ತದೆ',
      'ತೀರ್ಮಾನ 1 ಮತ್ತು 2 ಎರಡೂ ಅನುಸರಿಸುತ್ತವೆ',
      'ತೀರ್ಮಾನ 1 ಅಥವಾ 2 ಯಾವುದೂ ಅನುಸರಿಸುವುದಿಲ್ಲ'
    ],
    correctIndex: 1,
    explanationEn: 'Statement I is universal affirmative (All A are B). Conversion of "All A are B" yields "Some B are A" (Some Administrators are Civil Servants), hence Conclusion 2 definitely follows. However, the middle term "Administrators" is not distributed in both premises, so no definite relation can be inferred between Civil Servants and Policy Makers without additional overlap (Conclusion 1 is only a possibility, not a necessity).',
    explanationKn: 'ಹೇಳಿಕೆ 1 ರಿಂದ: "ಎಲ್ಲಾ A ಗಳು B" ಆದರೆ "ಕೆಲ B ಗಳು A" ಎಂಬುದು ಸತ್ಯ (ಕೆಲ ಆಡಳಿತಗಾರರು ನಾಗರಿಕ ಸೇವಾಧಿಕಾರಿಗಳು). ಆದ್ದರಿಂದ ತೀರ್ಮಾನ 2 ಸರಿ. ಆದರೆ ನಾಗರಿಕ ಸೇವಾಧಿಕಾರಿಗಳು ಮತ್ತು ನೀತಿ ನಿರೂಪಕರ ನಡುವೆ ನೇರ ಸಂಪರ್ಕವಿಲ್ಲದಿರುವುದರಿಂದ ತೀರ್ಮಾನ 1 ಕಡ್ಡಾಯವಾಗಿ ಸಿದ್ಧವಾಗುವುದಿಲ್ಲ.',
    eliminationTechniqueEn: 'Venn Diagram minimum overlap test: Draw circle of Civil Servants inside Administrators. Draw circle of Policy Makers overlapping Administrators on the other side. They do not need to touch each other. Thus Conclusion 1 does not necessarily follow!',
    eliminationTechniqueKn: 'ವೆನ್ ನಕ್ಷೆ ಕನಿಷ್ಠ ಅತಿಕ್ರಮಣ ಪರೀಕ್ಷೆ: ಆಡಳಿತಗಾರರ ವೃತ್ತದೊಳಗೆ ನಾಗರಿಕ ಸೇವಾಧಿಕಾರಿಗಳ ವೃತ್ತವನ್ನು ಬಿಡಿಸಿ. ನೀತಿ ನಿರೂಪಕರ ವೃತ್ತವು ಆಡಳಿತಗಾರರ ಇನ್ನೊಂದು ಬದಿಯನ್ನು ಸ್ಪರ್ಶಿಸಬಹುದು. ಇವೆರಡೂ ಒಂದನ್ನೊಂದು ಮುಟ್ಟಲೇಬೇಕೆಂಬ ನಿಯಮವಿಲ್ಲ.',
    mentalAbilitySteps: [
      'Step 1: Universal affirmative conversion: "All X are Y" implies "Some Y are X" -> Conclusion 2 is valid.',
      'Step 2: Undistributed middle test: "Administrators" is predicate in premise 1 and subject in particular premise 2.',
      'Step 3: Particular premise + Universal premise cannot guarantee particular conclusion across distant sets.',
      'Step 4: Only Conclusion 2 stands strictly true.'
    ]
  },
  {
    id: 'kas_q8',
    paper: 'paper1',
    subject: 'Indian Polity',
    topic: 'Panchayati Raj in Karnataka',
    type: 'statement',
    difficulty: 'Moderate',
    textEn: 'Which of the following is TRUE regarding reservation for women in Panchayati Raj Institutions in Karnataka?',
    textKn: 'ಕರ್ನಾಟಕದ ಪಂಚಾಯತ್ ರಾಜ್ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ ಮೀಸಲಾತಿ ಕುರಿತು ಈ ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಸತ್ಯ?',
    optionsEn: [
      'Karnataka provides 33% reservation for women in PRIs as per the 73rd Constitutional Amendment minimum.',
      'Karnataka was among the pioneering states to enhance women reservation to 50% in Grama, Taluk, and Zilla Panchayats.',
      'Reservation for women is only applicable to member seats and not to Adhyaksha/Upadhyaksha posts.',
      'Karnataka offers 25% reservation for women with rotation once every 10 years.'
    ],
    optionsKn: [
      'ಕರ್ನಾಟಕವು 73ನೇ ಸಂವಿಧಾನ ತಿದ್ದುಪಡಿಯ ಕನಿಷ್ಠ ಮಿತಿಯಂತೆ 33% ಮಹಿಳಾ ಮೀಸಲಾತಿ ನೀಡುತ್ತದೆ.',
      'ಗ್ರಾಮ, ತಾಲೂಕು ಮತ್ತು ಜಿಲ್ಲಾ ಪಂಚಾಯಿತಿಗಳಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ 50% ಮೀಸಲಾತಿಯನ್ನು ಹೆಚ್ಚಿಸಿದ ಪ್ರಮುಖ ರಾಜ್ಯಗಳಲ್ಲಿ ಕರ್ನಾಟಕವೂ ಒಂದಾಗಿದೆ.',
      'ಮಹಿಳಾ ಮೀಸಲಾತಿಯು ಸದಸ್ಯ ಸ್ಥಾನಗಳಿಗೆ ಮಾತ್ರ ಅನ್ವಯಿಸುತ್ತದೆ ಮತ್ತು ಅಧ್ಯಕ್ಷ/ಉಪಾಧ್ಯಕ್ಷ ಹುದ್ದೆಗಳಿಗಲ್ಲ.',
      'ಕರ್ನಾಟಕವು 10 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಬದಲಾಗುವ 25% ಮಹಿಳಾ ಮೀಸಲಾತಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ.'
    ],
    correctIndex: 1,
    explanationEn: 'Karnataka amended the Karnataka Panchayat Raj Act to provide 50% reservation for women in all three tiers (Gram, Taluk, and Zilla Panchayats), including the offices of Adhyaksha and Upadhyaksha, well exceeding the constitutional minimum of 33%.',
    explanationKn: 'ಕರ್ನಾಟಕ ಪಂಚಾಯತ್ ರಾಜ್ ಕಾಯ್ದೆಗೆ ತಿದ್ದುಪಡಿ ತಂದು ಗ್ರಾಮ, ತಾಲೂಕು ಮತ್ತು ಜಿಲ್ಲಾ ಪಂಚಾಯತ್‌ಗಳ ಸದಸ್ಯ ಹಾಗೂ ಅಧ್ಯಕ್ಷ/ಉಪಾಧ್ಯಕ್ಷ ಸ್ಥಾನಗಳಲ್ಲಿ ಮಹಿಳೆಯರಿಗೆ 50% ಮೀಸಲಾತಿ ನೀಡಿದ ಮುಂಚೂಣಿ ರಾಜ್ಯ ಕರ್ನಾಟಕವಾಗಿದೆ.',
    eliminationTechniqueEn: 'Policy Landmark recognition: Karnataka consistently leads in local body empowerment, taking the constitutional 1/3rd (33%) threshold up to a full 50% equal representation.',
    eliminationTechniqueKn: 'ಮೈಲಿಗಲ್ಲು ಗುರುತಿಸುವಿಕೆ: ಕರ್ನಾಟಕವು ಸಂವಿಧಾನದ ಕನಿಷ್ಠ 33% ಮಿತಿಗಿಂತ ಹೆಚ್ಚಾಗಿ ಪೂರ್ಣ 50% ಸಮಾನ ಪ್ರಾತಿನಿಧ್ಯ ನೀಡಿದೆ.'
  }
];

export const EXAM_CHECKLIST_ITEMS = [
  { id: 'admit_card', labelEn: 'KPSC Official Hall Ticket / Admit Card (Clear printout with barcode)', labelKn: 'ಕೆಪಿಎಸ್‌ಸಿ ಅಧಿಕೃತ ಪ್ರವೇಶ ಪತ್ರ (ಸ್ಪಷ್ಟ ಪ್ರಿಂಟ್‌ಔಟ್ ಬಾರ್‌ಕೋಡ್ ಸಹಿತ)', category: 'Mandatory', required: true },
  { id: 'gov_id', labelEn: 'Original Govt Photo ID (Aadhaar, Voter ID, Passport, or Driving License)', labelKn: 'ಮೂಲ ಸರ್ಕಾರಿ ಗುರುತಿನ ಚೀಟಿ (ಆಧಾರ್, ವೋಟರ್ ಐಡಿ, ಪಾಸ್‌ಪೋರ್ಟ್ ಅಥವಾ ಡಿಎಲ್)', category: 'Mandatory', required: true },
  { id: 'id_photocopy', labelEn: 'One self-attested photocopy of the Photo ID card', labelKn: 'ಗುರುತಿನ ಚೀಟಿಯ ಒಂದು ಸ್ವಯಂ ದೃಢೀಕೃತ ಜೆರಾಕ್ಸ್ ಪ್ರತಿ', category: 'Recommended', required: false },
  { id: 'photos', labelEn: '2 Recent Passport Size Photographs (matching application upload)', labelKn: '2 ಇತ್ತೀಚಿನ ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರಗಳು (ಅರ್ಜಿಯ ಭಾವಚಿತ್ರದಂತೆಯೇ)', category: 'Mandatory', required: true },
  { id: 'pen', labelEn: '2 Black Ballpoint Pens (Gel pens strictly prohibited on OMR sheets)', labelKn: '2 ಕಪ್ಪು ಬಾಲ್‌ಪಾಯಿಂಟ್ ಪೆನ್ನುಗಳು (ಒಎಂಆರ್ ಹಾಳೆಯಲ್ಲಿ ಜೆಲ್ ಪೆನ್ ನಿಷೇಧಿಸಲಾಗಿದೆ)', category: 'Mandatory', required: true },
  { id: 'watch', labelEn: 'Analog Wrist Watch (Smart watches, digital wearables banned in hall)', labelKn: 'ಸಾದಾ ಅನಲಾಗ್ ಕೈಗಡಿಯಾರ (ಸ್ಮಾರ್ಟ್‌ವಾಚ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಸಾಧನಗಳು ನಿಷೇಧಿತ)', category: 'Recommended', required: false },
  { id: 'timing', labelEn: 'Reach center 60 minutes before Paper I (9:00 AM) and Paper II (1:30 PM)', labelKn: 'ಪತ್ರಿಕೆ 1 (ಬೆಳಗ್ಗೆ 9:00) ಮತ್ತು ಪತ್ರಿಕೆ 2 (ಮಧ್ಯಾಹ್ನ 1:30) ಕ್ಕಿಂತ 60 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ತಲುಪಿ', category: 'Logistics', required: true },
  { id: 'dress_code', labelEn: 'KPSC Dress Code: Light clothes without large metallic buttons, slippers/sandals', labelKn: 'ಕೆಪಿಎಸ್‌ಸಿ ಡ್ರೆಸ್ ಕೋಡ್: ಸರಳ ಬಟ್ಟೆಗಳು, ದೊಡ್ಡ ಲೋಹದ ಬಟನ್‌ಗಳಿರದಂತೆ, ಚಪ್ಪಲಿ/ಸ್ಯಾಂಡಲ್', category: 'Logistics', required: false }
];
