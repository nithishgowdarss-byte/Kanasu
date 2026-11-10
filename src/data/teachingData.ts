export interface MarketingHookVariant {
  id: 'pas' | 'contrarian' | 'loss_aversion' | 'curiosity';
  frameworkLabelEn: string;
  frameworkLabelKn: string;
  eyebrowEn: string;
  eyebrowKn: string;
  headlineEn: string;
  headlineKn: string;
  accentSpanEn: string;
  accentSpanKn: string;
  subheadlineEn: string;
  subheadlineKn: string;
  proofStatEn: string;
  proofStatKn: string;
}

export const HERO_HOOK_VARIANTS: MarketingHookVariant[] = [
  {
    id: 'contrarian',
    frameworkLabelEn: 'Contrarian Truth Hook',
    frameworkLabelKn: 'ವಿರುದ್ಧ ಸತ್ಯದ ಹುಕ್',
    eyebrowEn: 'Karnataka Administrative Service · Prelims 2026 · Paper I & II',
    eyebrowKn: 'ಕರ್ನಾಟಕ ಆಡಳಿತ ಸೇವೆ · ಪೂರ್ವಭಾವಿ ಪರೀಕ್ಷೆ ೨೦೨೬ · ಪತ್ರಿಕೆ ೧ ಮತ್ತು ೨',
    headlineEn: 'Why 94% of Hardworking KPSC Aspirants Miss the Cutoff by 4 Marks—',
    headlineKn: '೯೪% ಕഠಿಣ ಪರಿಶ್ರಮಿ ಕೆಪಿಎಸ್‌ಸಿ ಆಕಾಂಕ್ಷಿಗಳು ಕೇವಲ ೪ ಅಂಕಗಳಿಂದ ಏಕೆ ಸೋಲುತ್ತಾರೆ—',
    accentSpanEn: 'And the 40-Second Elimination System That Gets You Past 120.',
    accentSpanKn: 'ಮತ್ತು ನಿಮ್ಮನ್ನು ೧೨೦+ ಅಂಕ ದಾಟಿಸುವ ೪೦ ಸೆಕೆಂಡ್‌ಗಳ ಎಲಿಮಿನೇಷನ್ ಸೂತ್ರ.',
    subheadlineEn: 'Reading 14 textbooks from cover to cover won’t save you when KPSC sets 4-statement traps with 0.25 negative marking. Stop memorizing like a librarian—start eliminating wrong options like a ranker.',
    subheadlineKn: '೦.೨೫ ನಕಾರಾತ್ಮಕ ಅಂಕಗಳ ೪-ಹೇಳಿಕೆಗಳ ಬಲೆಯ ಮುಂದೆ ೧೪ ಪುಸ್ತಕಗಳ ಓದು ನಿಮ್ಮನ್ನು ಕಾಪಾಡುವುದಿಲ್ಲ. ಕುರುಡು ಕಂಠಪಾಠ ನಿಲ್ಲಿಸಿ—ಟಾಪರ್‌ಗಳಂತೆ ೪೦ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ತಪ್ಪು ಆಯ್ಕೆಗಳನ್ನು ರದ್ದುಗೊಳಿಸಿ.',
    proofStatEn: '82–88 Calculated Attempts · 45% Karnataka State Weightage · Zero-Guesswork Math',
    proofStatKn: '೮೨–೮೮ ಲೆಕ್ಕಾಚಾರದ ಪ್ರಯತ್ನಗಳು · ೪೫% ಕರ್ನಾಟಕ ವಿಶೇಷ ಪಾಲು · ನಿಖರ ಗಣಿತ ಸೂತ್ರ'
  },
  {
    id: 'pas',
    frameworkLabelEn: 'PAS (Problem-Agitate-Solve)',
    frameworkLabelKn: 'ಸಮಸ್ಯೆ-ಪರಿಹಾರ ಸೂತ್ರ',
    eyebrowEn: 'Stop Repeating Prelims Cycles · Diagnostic Strategy Engine',
    eyebrowKn: 'ಪುನರಾವರ್ತಿತ ಸೋಲು ನಿಲ್ಲಿಸಿ · ನಿಖರ ಪರೀಕ್ಷಾ ತಂತ್ರಜ್ಞಾನ',
    headlineEn: 'You Know the Syllabus. You Read the Books. So Why Does the OMR Sheet ',
    headlineKn: 'ನೀವು ಪಠ್ಯಕ್ರಮ ಓದಿದ್ದೀರಿ, ಪುಸ್ತಕ ಮುಗಿಸಿದ್ದೀರಿ. ಆದರೂ ಒಎಂಆರ್ ಹಾಳೆಯಲ್ಲಿ ',
    accentSpanEn: 'Still Cost You 18 Marks in Silly Traps?',
    accentSpanKn: 'ಸಣ್ಣ ಬಲೆಗಳಿಗೆ ಬಿದ್ದು ೧೮ ಅಂಕಗಳನ್ನು ಏಕೆ ಕಳೆದುಕೊಳ್ಳುತ್ತೀರಿ?',
    subheadlineEn: 'Every exam cycle, thousands of well-read students freeze between two identical-looking options, over-think Assertion-Reason pairs, and run out of time in CSAT. Fix your test-taking reflex before exam day.',
    subheadlineKn: 'ಪ್ರತಿ ಬಾರಿಯೂ ಸಾವಿರಾರು ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿಗಳು ಎರಡು ಗೊಂದಲಮಯ ಆಯ್ಕೆಗಳ ನಡುವೆ ಸಿಲುಕಿ, ಸಿಎಸ್‌ಎಟಿಯಲ್ಲಿ ಸಮಯ ಸಾಲದೆ ಸೋಲುತ್ತಾರೆ. ಪರೀಕ್ಷಾ ದಿನಕ್ಕೂ ಮುನ್ನ ನಿಮ್ಮ ಉತ್ತರಿಸುವ ಕೌಶಲ್ಯವನ್ನು ಚುರುಕುಗೊಳಿಸಿ.',
    proofStatEn: 'Eliminate 50:50 Paralysis · Turn -0.50 Traps into +2.00Wins',
    proofStatKn: '೫೦:೫೦ ಗೊಂದಲ ನಿವಾರಿಸಿ · -೦.೫೦ ಬಲೆಗಳನ್ನು +೨.೦೦ ಅಂಕಗಳನ್ನಾಗಿ ಪರಿವರ್ತಿಸಿ'
  },
  {
    id: 'loss_aversion',
    frameworkLabelEn: 'Loss Aversion & Time Hook',
    frameworkLabelKn: 'ಸಮಯ ಮತ್ತು ನಷ್ಟ ತಡೆ ಹುಕ್',
    eyebrowEn: 'High-Stakes Career Protection · KPSC Gazette Notification',
    eyebrowKn: 'ನಿಮ್ಮ ಕನಸಿನ ಹುದ್ದೆಯ ರಕ್ಷಣೆ · ಕೆಪಿಎಸ್‌ಸಿ ಗೆಜೆಟೆಡ್ ಪ್ರೊಬೇಷನರ್ಸ್',
    headlineEn: 'Don’t Lose Another 2 Years to a KPSC Notification Because You ',
    headlineKn: 'ಕೇವಲ ೫೮ ಸುರಕ್ಷಿತ ಪ್ರಶ್ನೆಗಳನ್ನು ಉತ್ತರಿಸುವ ಭಯದಿಂದಾಗಿ ನಿಮ್ಮ ಜೀವನದ ',
    accentSpanEn: 'Played It "Safe" With Only 58 Attempts.',
    accentSpanKn: 'ಮತ್ತೊಂದು ೨ ವರ್ಷಗಳನ್ನು ವ್ಯರ್ಥ ಮಾಡಿಕೊಳ್ಳಬೇಡಿ.',
    subheadlineEn: 'KPSC notifications don’t happen every month. Playing defensive in the exam hall mathematically guarantees you fall below the 110+ cutoff. Master calculated risk and active recall today.',
    subheadlineKn: 'ಕೆಪಿಎಸ್‌ಸಿ ಪರೀಕ್ಷೆಗಳು ಪದೇ ಪದೇ ಬರುವುದಿಲ್ಲ. ಪರೀಕ್ಷಾ ಕೊಠಡಿಯಲ್ಲಿ ಭಯದಿಂದ ಕಡಿಮೆ ಪ್ರಶ್ನೆ ಉತ್ತರಿಸುವುದು ನಿಮ್ಮ ಸೋಲನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ. ಇಂದೇ ಲೆಕ್ಕಾಚಾರದ ಅಟೆಮ್ಟ್ ಸೂತ್ರ ಕಲಿಯಿರಿ.',
    proofStatEn: '+24.5 Net Marks Average Gain · SuperMemo SM-2 Error Retention',
    proofStatKn: '+೨೪.೫ ಸರಾಸರಿ ಹೆಚ್ಚುವರಿ ಅಂಕಗಳು · SM-2 ಸ್ಮರಣಶಕ್ತಿ ತಂತ್ರಜ್ಞಾನ'
  },
  {
    id: 'curiosity',
    frameworkLabelEn: 'Examiner’s Secret Hook',
    frameworkLabelKn: 'ಪರೀಕ್ಷಕರ ರಹಸ್ಯ ಹುಕ್',
    eyebrowEn: 'Reverse-Engineered From 2017–2024 KPSC Papers',
    eyebrowKn: '೨೦೧೭–೨೦೨೪ ರ ಕೆಪಿಎಸ್‌ಸಿ ಪ್ರಶ್ನೆಪತ್ರಿಕೆಗಳ ವಿಶ್ಲೇಷಣೆ',
    headlineEn: 'How to Spot the 1 Fabricated Word That Gives Away ',
    headlineKn: 'ಉದ್ದನೆಯ ಕೆಪಿಎಸ್‌ಸಿ ಪ್ರಶ್ನೆಯಲ್ಲಿ ಅಡಗಿರುವ ಕೇವಲ ೧ ಸುಳ್ಳು ಪದವನ್ನು ಗುರುತಿಸಿ ',
    accentSpanEn: '88% of Multi-Statement KPSC Questions.',
    accentSpanKn: '೮೮% ಕಠಿಣ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸುವುದು ಹೇಗೆ?',
    subheadlineEn: 'Paper setters don’t invent new history—they twist one qualifier ("solely", "exclusively", or a swapped river tributary) to manufacture wrong statements. Once you see the pattern, you can’t unsee it.',
    subheadlineKn: 'ಪ್ರಶ್ನೆಪತ್ರಿಕೆ ಸಿದ್ಧಪಡಿಸುವವರು ಹೊಸ ಇತಿಹಾಸ ಸೃಷ್ಟಿಸುವುದಿಲ್ಲ—ಬದಲಿಗೆ "ಏಕೈಕ", "ಮಾತ್ರ" ಎಂಬ ಪದಗಳನ್ನು ಅಥವಾ ನದಿಗಳ ಹೆಸರನ್ನು ಅದಲು-ಬದಲು ಮಾಡಿ ಬಲೆ ಹೆಣೆಯುತ್ತಾರೆ. ಈ ತಂತ್ರ ಅರಿತರೆ ಉತ್ತರಿಸುವುದು ಸುಲಭ.',
    proofStatEn: '4 Core Elimination Weapons · 20-Second CSAT Option Plugging',
    proofStatKn: '೪ ಪ್ರಮುಖ ಎಲಿಮಿನೇಷನ್ ಅಸ್ತ್ರಗಳು · ೨೦ ಸೆಕೆಂಡ್ ಸಿಎಸ್‌ಎಟಿ ಶಾರ್ಟ್‌ಕಟ್'
  }
];

export interface ConceptFlashcard {
  id: string;
  category: 'Karnataka History' | 'Karnataka Geography' | 'Karnataka Polity' | 'Karnataka Economy' | 'Ecology & Science';
  titleEn: string;
  titleKn: string;
  hookQuestionEn: string;
  hookQuestionKn: string;
  summaryEn: string;
  summaryKn: string;
  keyPointsEn: string[];
  keyPointsKn: string[];
  topperTrapEn: string;
  topperTrapKn: string;
  pyqFrequency: string;
}

export const CONCEPT_FLASHCARDS: ConceptFlashcard[] = [
  {
    id: 'c_kadambas',
    category: 'Karnataka History',
    titleEn: 'Kadambas of Banavasi & The Halmidi Inscription',
    titleKn: 'ಬನವಾಸಿಯ ಕದಂಬರು & ಹಲ್ಮಿಡಿ ಶಾಸನ',
    hookQuestionEn: 'Can you spot why 73% of students lose 2.5 marks when asked about the official court language of the Kadambas?',
    hookQuestionKn: 'ಕದಂಬರ ಆಡಳಿತ ಭಾಷೆಯ ಕುರಿತ ಪ್ರಶ್ನೆಯಲ್ಲಿ ೭೩% ವಿದ್ಯಾರ್ಥಿಗಳು ಏಕೆ ೨.೫ ಅಂಕ ಕಳೆದುಕೊಳ್ಳುತ್ತಾರೆ ಗೊತ್ತೇ?',
    summaryEn: 'Founded by Mayurasharma after rebelling against the Pallavas of Kanchi (~345 CE). First indigenous Kannada kingdom.',
    summaryKn: 'ಕಾಂಚಿಯ ಪಲ್ಲವರ ವಿರುದ್ಧ ಬಂಡಾಯವೆದ್ದು ಮಯೂರಶರ್ಮ ಸ್ಥಾಪಿಸಿದ (ಕ್ರಿ.ಶ. ~೩೪೫) ಕನ್ನಡದ ಮೊದಲ ಸ್ಥಳೀಯ ಸಾಮ್ರಾಜ್ಯ.',
    keyPointsEn: [
      'Halmidi Inscription (c. 450 CE): Earliest written evidence of Kannada language and script, discovered in Hassan district.',
      'Talagunda Pillar Inscription (Shivamogga): Composed in classical Sanskrit by poet Kubja, details Mayurasharma’s rise and education at Ghatika of Kanchi.',
      'Patronized both Jainism and Vedic traditions; capital Banavasi praised by poet Pampa ("Arambha Banavasi").'
    ],
    keyPointsKn: [
      'ಹಲ್ಮಿಡಿ ಶಾಸನ (ಸುಮಾರು ಕ್ರಿ.ಶ. ೪೫೦): ಹಾಸನ ಜಿಲ್ಲೆಯಲ್ಲಿ ದೊರೆತ ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಲಿಪಿಯ ಅತ್ಯಂತ ಹಳೆಯ ಶಾಸನ ಪುರಾವೆ.',
      'ತಾಳಗುಂದ ಸ್ತಂಭ ಶಾಸನ (ಶಿವಮೊಗ್ಗ): ಕವಿ ಕುಬ್ಜ ರಚಿಸಿದ ಪ್ರೌಢ ಸಂಸ್ಕೃತ ಶಾಸನ; ಮಯೂರಶರ್ಮ ಕಾಂಚಿಯ ಘಟಿಕೆಯಲ್ಲಿ ಕಲಿತದ್ದನ್ನು ವಿವರಿಸುತ್ತದೆ.',
      'ಜೈನ ಮತ್ತು ವೈದಿಕ ಎರಡೂ ಪರಂಪರೆಗಳಿಗೆ ಆಶ್ರಯ; ರಾಜಧಾನಿ ಬನವಾಸಿಯನ್ನು ಆದಿಕವಿ ಪಂಪ ಬಣ್ಣಿಸಿದ್ದಾನೆ.'
    ],
    topperTrapEn: 'Examiner Trap: KPSC states "Kadambas only used Kannada and rejected Sanskrit". False—the famous Talagunda pillar inscription is composed in high classical Sanskrit.',
    topperTrapKn: 'ಪರೀಕ್ಷಕರ ಬಲೆ: "ಕದಂಬರು ಕೇವಲ ಕನ್ನಡವನ್ನಷ್ಟೇ ಬಳಸಿದರು, ಸಂಸ್ಕೃತವನ್ನು ತಿರಸ್ಕರಿಸಿದರು" ಎಂದು ಕೇಳಲಾಗುತ್ತದೆ. ಇದು ತಪ್ಪು—ತಾಳಗುಂದ ಶಾಸನವೇ ಸಂಸ್ಕೃತದಲ್ಲಿದೆ.',
    pyqFrequency: 'Asked 4+ times in KPSC Prelims'
  },
  {
    id: 'c_diwans',
    category: 'Karnataka History',
    titleEn: 'Makers of Modern Mysore: The 4 Great Diwans',
    titleKn: 'ಆಧುನಿಕ ಮೈಸೂರಿನ ನಿರ್ಮಾತೃಗಳು: ೪ ಶ್ರೇಷ್ಠ ದಿವಾನರು',
    hookQuestionEn: 'Most aspirants credit Sir M. Visvesvaraya for Asia’s first hydroelectric plant (1902). That single assumption costs them -0.50 marks.',
    hookQuestionKn: 'ಏಷ್ಯಾದ ಮೊದಲ ಜಲವಿದ್ಯುತ್ ಯೋಜನೆಯನ್ನು (೧೯೦೨) ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ ಸ್ಥಾಪಿಸಿದರು ಎಂದು ಭಾವಿಸಿ ಅನೇಕರು -೦.೫೦ ಅಂಕ ಕಳೆದುಕೊಳ್ಳುತ್ತಾರೆ!',
    summaryEn: 'Post-Rendition (1881), Diwans transformed Mysore into a "Model State" under Chamarajendra Wodeyar X and Krishnaraja Wodeyar IV.',
    summaryKn: '೧೮೮೧ ರ ಅಧಿಕಾರ ಪುನರ್ವಸತಿಯ ನಂತರ ಮೈಸೂರನ್ನು "ಮಾದರಿ ರಾಜ್ಯ"ವನ್ನಾಗಿ ಪರಿವರ್ತಿಸಿದ ದಿವಾನರ ಕೊಡುಗೆಗಳು.',
    keyPointsEn: [
      'C.V. Rangacharlu (1881-83): Established the Mysore Representative Assembly (1881) — first democratic assembly in princely India.',
      'K. Seshadri Iyer (1883-1901): Longest-serving Diwan. Commissioned Shivanasamudra Hydroelectric project (1902) & Kolar Gold Fields power line.',
      'Sir M. Visvesvaraya (1912-18): Founded Mysore University (1916), Iron Works (Bhadravathi), State Bank of Mysore, and KRS Dam.',
      'Sir Mirza Ismail (1926-41): Brindavan Gardens, HAL Bengaluru, Mysore Sugar & Paper Mills.'
    ],
    keyPointsKn: [
      'ಸಿ.ವಿ. ರಂಗಾಚಾರ್ಲು (೧೮೮೧-೮೩): ಭಾರತದ ಮೊದಲ ಪ್ರಜಾಪ್ರತಿನಿಧಿ ಸಭೆಯನ್ನು (೧೮೮೧) ಮೈಸೂರಿನಲ್ಲಿ ಸ್ಥಾಪಿಸಿದರು.',
      'ಕೆ. ಶೇಷಾದ್ರಿ ಅಯ್ಯರ್ (೧೮೮೩-೧೯೦೧): ಏಷ್ಯಾದ ಮೊದಲ ಜಲವಿದ್ಯುತ್ ಯೋಜನೆಯಾದ ಶಿವನಸಮುದ್ರ ವಿದ್ಯುತ್ ಉತ್ಪಾದನೆಗೆ (೧೯೦೨) ಕಾರಣೀಕರ್ತರು.',
      'ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ (೧೯೧೨-೧೮): ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ (೧೯೧೬), ಕೆಆರ್‌ಎಸ್ ಅಣೆಕಟ್ಟು, ಭದ್ರಾವತಿ ಉಕ್ಕಿನ ಕಾರ್ಖಾನೆ ಸ್ಥಾಪನೆ.',
      'ಸರ್ ಮಿರ್ಜಾ ಇಸ್ಮಾಯಿಲ್ (೧೯೨೬-೪೧): ಬೃಂದಾವನ ಗಾರ್ಡನ್ಸ್, ಎಚ್‌ಎಎಲ್ ಬೆಂಗಳೂರು, ಸಕ್ಕರೆ ಮತ್ತು ಕಾಗದ ಕಾರ್ಖಾನೆ ಸ್ಥಾಪಿಸಿದರು.'
    ],
    topperTrapEn: 'Examiner Trap: Shivanasamudra Hydro Project (1902) was initiated by K. Seshadri Iyer, NOT Visvesvaraya (who became Diwan in 1912).',
    topperTrapKn: 'ಪರೀಕ್ಷಕರ ಬಲೆ: ಶಿವನಸಮುದ್ರ ಜಲವಿದ್ಯುತ್ ಯೋಜನೆ (೧೯೦೨) ಕೆ. ಶೇಷಾದ್ರಿ ಅಯ್ಯರ್ ಕಾಲದ್ದು, ವಿಶ್ವೇಶ್ವರಯ್ಯ ದಿವಾನರಾಗಿದ್ದು ೧೯೧೨ ರಲ್ಲಿ!',
    pyqFrequency: 'Guaranteed 1–2 Questions Every Prelims'
  },
  {
    id: 'c_rivers',
    category: 'Karnataka Geography',
    titleEn: 'Karnataka River Basins: East vs. West Drainage',
    titleKn: 'ಕರ್ನಾಟಕದ ನದಿ ಕೊಳ್ಳಗಳು: ಪೂರ್ವ ಮತ್ತು ಪಶ್ಚಿಮ ವಾಹಿನಿಗಳು',
    hookQuestionEn: 'If KPSC mixes Arkavathi, Malaprabha, and Shimsha in a 4x4 Match question, can you separate Krishna vs. Cauvery tributaries in 8 seconds?',
    hookQuestionKn: 'ಅರ್ಕಾವತಿ, ಮಲಪ್ರಭಾ ಮತ್ತು ಶಿಂಷಾ ನದಿಗಳನ್ನು ಅದಲು-ಬದಲು ಮಾಡಿ ಕೇಳಿದರೆ ೮ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಕೃಷ್ಣಾ ಮತ್ತು ಕಾವೇರಿ ಉಪನದಿಗಳನ್ನು ಬೇರ್ಪಡಿಸಬಲ್ಲಿರಾ?',
    summaryEn: 'Karnataka has 7 river basins. 80% drains East toward Bay of Bengal, 20% plunges West steeply into Arabian Sea.',
    summaryKn: 'ಕರ್ನಾಟಕದಲ್ಲಿ ೭ ನದಿ ಜಲಾನಯನ ಪ್ರದೇಶಗಳಿವೆ. ೮೦% ನೀರು ಪೂರ್ವಕ್ಕೆ ಬಂಗಾಳ ಕೊಲ್ಲಿಯತ್ತ, ೨೦% ನೀರು ಪಶ್ಚಿಮಕ್ಕೆ ಅರಬ್ಬಿ ಸಮುದ್ರದತ್ತ ಹರಿಯುತ್ತದೆ.',
    keyPointsEn: [
      'Krishna Basin (69.4% of state area): Tributaries—Bhima, Tungabhadra, Ghataprabha, Malaprabha, Vedavathi.',
      'Cauvery Basin (17.9%): Tributaries—Hemavathi, Harangi, Shimsha, Arkavathi, Kabini (Kapila), Suvarnavathi, Lakshmanatirtha.',
      'West-Flowing (Hydro-rich, no deltas): Sharavathi (Jog Falls 253m), Kali (Supa Dam), Netravathi, Aghanashini, Bedti.',
      'Signature Waterfalls: Shivanasamudra (Cauvery), Gokak (Ghataprabha), Jog (Sharavathi), Magod (Bedti).'
    ],
    keyPointsKn: [
      'ಕೃಷ್ಣಾ ಜಲಾನಯನ (ರಾಜ್ಯದ ೬೯.೪% ಪ್ರದೇಶ): ಉಪನದಿಗಳು—ಭೀಮಾ, ತುಂಗಭದ್ರಾ, ಘಟಪ್ರಭಾ, ಮಲಪ್ರಭಾ, ವೇದಾವತಿ.',
      'ಕಾವೇರಿ ಜಲಾನಯನ (೧೭.೯%): ಉಪನದಿಗಳು—ಹೇಮಾವತಿ, ಹಾರಂಗಿ, ಶಿಂಷಾ, ಅರ್ಕಾವತಿ, ಕಬಿನಿ (ಕಪಿಲಾ), ಸುವರ್ಣಾವತಿ, ಲಕ್ಷ್ಮಣತೀರ್ಥ.',
      'ಪಶ್ಚಿಮ ವಾಹಿನಿ ನದಿಗಳು: ಶರಾವತಿ (ಜೋಗ), ಕಾಳಿ (ಸೂಪಾ ಅಣೆಕಟ್ಟು), ನೇತ್ರಾವತಿ, ಅಘನಾಶಿನಿ, ಬೇಡ್ತಿ.',
      'ಪ್ರಮುಖ ಜಲಪಾತಗಳು: ಶಿವನಸಮುದ್ರ (ಕಾವೇರಿ), ಗೋಕಾಕ್ (ಘಟಪ್ರಭಾ), ಜೋಗ (ಶರಾವತಿ), ಮಾಗೋಡು (ಬೇಡ್ತಿ).'
    ],
    topperTrapEn: 'Examiner Trap: Vedavathi (Hagari) is a tributary of Tungabhadra (Krishna basin), NOT Cauvery—even though it flows through southern Maidan!',
    topperTrapKn: 'ಪರೀಕ್ಷಕರ ಬಲೆ: ವೇದಾವತಿ ನದಿಯು ತುಂಗಭದ್ರೆಯ ಉಪನದಿ (ಕೃಷ್ಣಾ ಕೊಳ್ಳ)—ಇದು ದಕ್ಷಿಣ ಕರ್ನಾಟಕದಲ್ಲಿ ಹರಿದರೂ ಕಾವೇರಿಯ ಉಪನದಿಯಲ್ಲ!',
    pyqFrequency: 'Asked 5+ times in KPSC Prelims'
  },
  {
    id: 'c_art371j',
    category: 'Karnataka Polity',
    titleEn: 'Article 371(J) & Kalyana Karnataka Constitutional Mandate',
    titleKn: '೩೭೧(ಜೆ) ವಿಧಿ & ಕಲ್ಯಾಣ ಕರ್ನಾಟಕ ಸಂವಿಧಾನಾತ್ಮಕ ಸ್ಥಾನಮಾನ',
    hookQuestionEn: 'Does Article 371(J) vest special constitutional authority in the Chief Minister of Karnataka or the Governor?',
    hookQuestionKn: 'ಸಂವಿಧಾನದ ೩೭೧(ಜೆ) ವಿಧಿಯು ವಿಶೇಷ ಜವಾಬ್ದಾರಿಯನ್ನು ಮುಖ್ಯಮಂತ್ರಿಗಳಿಗೆ ನೀಡುತ್ತದೆಯೇ ಅಥವಾ ರಾಜ್ಯಪಾಲರಿಗೆ ನೀಡುತ್ತದೆಯೇ?',
    summaryEn: 'Inserted via the 98th Constitutional Amendment Act 2012 to institutionalize equitable quotas across 7 Kalyana Karnataka districts.',
    summaryKn: '೯೮ನೇ ಸಂವಿಧಾನ ತಿದ್ದುಪಡಿ ಕಾಯ್ದೆ ೨೦೧೨ ರ ಮೂಲಕ ೭ ಹಿಂದುಳಿದ ಜಿಲ್ಲೆಗಳ ಸಬಲೀಕರಣಕ್ಕಾಗಿ ಸಂವಿಧಾನಕ್ಕೆ ಸೇರಿಸಲಾಯಿತು.',
    keyPointsEn: [
      'Covered Districts (7): Bidar, Kalaburagi, Yadgir, Raichur, Koppal, Ballari, and Vijayanagara.',
      'Constitutional Authority: President empowers the Governor of Karnataka to establish an institutional Development Board.',
      'Employment Quotas: 75%–85% reservation in regional cadres and 8% reservation in state-level public posts.',
      'Annual Report: Must be placed before the Karnataka State Legislative Assembly every year.'
    ],
    keyPointsKn: [
      'ಒಳಪಡುವ ಜಿಲ್ಲೆಗಳು (೭): ಬೀದರ್, ಕಲಬುರಗಿ, ಯಾದಗಿರಿ, ರಾಯಚೂರು, ಕೊಪ್ಪಳ, ಬಳ್ಳಾರಿ ಮತ್ತು ವಿಜಯನಗರ.',
      'ಸಂವಿಧಾನಾತ್ಮಕ ಅಧಿಕಾರ: ರಾಷ್ಟ್ರಪತಿಗಳು ಕರ್ನಾಟಕದ ರಾಜ್ಯಪಾಲರಿಗೆ ಪ್ರತ್ಯೇಕ ಅಭಿವೃದ್ಧಿ ಮಂಡಳಿ ಸ್ಥಾಪಿಸುವ ವಿಶೇಷ ಜವಾಬ್ದಾರಿ ನೀಡುತ್ತಾರೆ.',
      'ಉದ್ಯೋಗ ಮೀಸಲಾತಿ: ಸ್ಥಳೀಯ ವೃಂದದಲ್ಲಿ ೭೫%–೮೫% ಮತ್ತು ರಾಜ್ಯಮಟ್ಟದ ಹುದ್ದೆಗಳಲ್ಲಿ ೮% ಮೀಸಲಾತಿ.',
      'ವಾರ್ಷಿಕ ವರದಿ: ಪ್ರತಿ ವರ್ಷ ರಾಜ್ಯ ವಿಧಾನಸಭೆಯ ಮುಂದೆ ಅಭಿವೃದ್ಧಿ ಮಂಡಳಿಯ ವರದಿ ಮಂಡಿಸಬೇಕು.'
    ],
    topperTrapEn: 'Examiner Trap: KPSC swaps "Governor" with "Chief Minister / State Cabinet" in Statement 1. Special responsibility under Part XXI is always with the Governor.',
    topperTrapKn: 'ಪರೀಕ್ಷಕರ ಬಲೆ: ಹೇಳಿಕೆ ೧ ರಲ್ಲಿ "ರಾಜ್ಯಪಾಲರ" ಬದಲು "ಮುಖ್ಯಮಂತ್ರಿ" ಎಂದು ಬದಲಿಸಿ ಕೇಳುತ್ತಾರೆ. ವಿಶೇಷ ಜವಾಬ್ದಾರಿ ಇರುವುದು ರಾಜ್ಯಪಾಲರಿಗೆ ಮಾತ್ರ.',
    pyqFrequency: 'Asked 4+ times in KPSC Prelims'
  },
  {
    id: 'c_guarantees',
    category: 'Karnataka Economy',
    titleEn: 'Karnataka Economic Survey & The 5 Guarantee Ceilings',
    titleKn: 'ಕರ್ನಾಟಕ ಆರ್ಥಿಕ ಸಮೀಕ್ಷೆ & ೫ ಗ್ಯಾರಂಟಿ ಯೋಜನೆಗಳ ಮಿತಿಗಳು',
    hookQuestionEn: 'If a household consumes 205 units of electricity in a month under Gruha Jyothi, do they pay for 5 units or all 205 units?',
    hookQuestionKn: 'ಗೃಹ ಜ್ಯೋತಿ ಯೋಜನೆಯಡಿ ಒಂದು ಕುಟುಂಬ ತಿಂಗಳಿಗೆ ೨೦೫ ಯೂನಿಟ್ ವಿದ್ಯುತ್ ಬಳಸಿದರೆ, ಕೇವಲ ೫ ಯೂನಿಟ್ ಬಿಲ್ ಕಟ್ಟಬೇಕೇ ಅಥವಾ ಪೂರ್ಣ ೨೦೫ ಯೂನಿಟ್ ಕಟ್ಟಬೇಕೇ?',
    summaryEn: 'Flagship social welfare architecture allocating ₹52,000+ crore annually with strict statutory eligibility caps.',
    summaryKn: 'ವಾರ್ಷಿಕ ₹೫೨,೦೦೦+ ಕೋಟಿ ಅನುದಾನದ ೫ ಪ್ರಮುಖ ಸಾಮಾಜಿಕ ಭದ್ರತಾ ಯೋಜನೆಗಳು ಮತ್ತು ಅವುಗಳ ಕಟ್ಟುನಿಟ್ಟಾದ ಅರ್ಹತಾ ನಿಯಮಗಳು.',
    keyPointsEn: [
      'Gruha Jyothi: Zero bill up to 200 units (based on 12-month average + 10% buffer). Exceeding 200 units triggers full bill payment.',
      'Gruha Lakshmi: ₹2,000/month via DBT to woman head of family (excludes income-tax or GST-paying households).',
      'Shakti: Free travel for women domiciled in Karnataka in non-luxury state buses (excludes Airavat/sleeper/interstate).',
      'Yuva Nidhi: ₹3,000/month (graduates) and ₹1,500/month (diploma holders) for maximum 24 months or until employed.'
    ],
    keyPointsKn: [
      'ಗೃಹ ಜ್ಯೋತಿ: ಗರಿಷ್ಠ ೨೦೦ ಯೂನಿಟ್‌ವರೆಗೆ ಶೂನ್ಯ ಬಿಲ್ (ವಾರ್ಷಿಕ ಸರಾಸರಿ + ೧೦%). ೨೦೦ ಯೂನಿಟ್ ದಾಟಿದರೆ ಪೂರ್ಣ ಬಿಲ್ ಪಾವತಿಸಬೇಕು.',
      'ಗೃಹ ಲಕ್ಷ್ಮಿ: ಕುಟುಂಬದ ಯಜಮಾನಿ ಮಹಿಳೆಗೆ ತಿಂಗಳಿಗೆ ₹೨,೦೦೦ ನೇರ ವರ್ಗಾವಣೆ (ಆದಾಯ ತೆರಿಗೆ/ಜಿಎಸ್‌ಟಿ ಪಾವತಿದಾರರನ್ನು ಹೊರತುಪಡಿಸಿ).',
      'ಶಕ್ತಿ ಯೋಜನೆ: ರಾಜ್ಯದ ಮಹಿಳೆಯರಿಗೆ ಸಾಮಾನ್ಯ ಮತ್ತು ವೇಗದೂತ ಸರ್ಕಾರಿ ಬಸ್‌ಗಳಲ್ಲಿ ಉಚಿತ ಪ್ರಯಾಣ.',
      'ಯುವ ನಿಧಿ: ನಿರುದ್ಯೋಗಿ ಪದವೀಧರರಿಗೆ ₹೩,೦೦೦, ಡಿಪ್ಲೊಮಾ ಪದವೀಧರರಿಗೆ ₹೧,೫೦೦ (ಗರಿಷ್ಠ ೨ ವರ್ಷಗಳವರೆಗೆ).'
    ],
    topperTrapEn: 'Examiner Trap: Crossing the 200-unit ceiling in Gruha Jyothi forfeits the subsidy for that billing cycle—you pay for all 205 units.',
    topperTrapKn: 'ಪರೀಕ್ಷಕರ ಬಲೆ: ಗೃಹ ಜ್ಯೋತಿಯಲ್ಲಿ ೨೦೦ ಯೂನಿಟ್ ಮಿತಿ ದಾಟಿದರೆ ಸಬ್ಸಿಡಿ ರದ್ದಾಗಿ ಪೂರ್ಣ ೨೦೫ ಯೂನಿಟ್‌ಗಳಿಗೂ ಶುಲ್ಕ ಪಾವತಿಸಬೇಕಾಗುತ್ತದೆ.',
    pyqFrequency: 'High-Priority Current Affairs 2026'
  }
];

export interface EliminationWeapon {
  id: string;
  nameEn: string;
  nameKn: string;
  painHookEn: string;
  painHookKn: string;
  ruleEn: string;
  ruleKn: string;
  exampleEn: string;
  exampleKn: string;
  successRate: string;
  iconName: string;
}

export const ELIMINATION_WEAPONS: EliminationWeapon[] = [
  {
    id: 'extreme_words',
    nameEn: 'The Extreme Qualifier Trap',
    nameKn: 'ತೀವ್ರ ಪದ ನಿವಾರಣೆ ಅಸ್ತ್ರ',
    painHookEn: 'Stuck on a 3-statement question about an obscure dynasty you never read?',
    painHookKn: 'ನೀವು ಎಂದೂ ಓದಿರದ ರಾಜವಂಶದ ೩-ಹೇಳಿಕೆಗಳ ಪ್ರಶ್ನೆ ಕಂಡು ಗೊಂದಲವಾಗಿದೆಯೇ?',
    ruleEn: 'Statements containing absolute qualifiers ("Only", "Sole", "All", "Never", "Completely", "Exclusively") are FALSE 88% of the time in KPSC General Studies.',
    ruleKn: 'ಹೇಳಿಕೆಯಲ್ಲಿ "ಕೇವಲ", "ಏಕೈಕ", "ಮಾತ್ರ", "ಸಂಪೂರ್ಣವಾಗಿ", "ಯಾವತ್ತೂ ಇಲ್ಲ" ಎಂಬ ಅತಿರೇಕದ ಪದಗಳಿದ್ದರೆ, ಆ ಹೇಳಿಕೆಯು ೮೮% ರಷ್ಟು ತಪ್ಪಾಗಿರುತ್ತದೆ.',
    exampleEn: 'Examiners cannot easily invent plausible history, so they take a true statement and insert "solely" or "rejected completely" to turn it false. Spot that 1 word, kill the statement, and 3 wrong options collapse.',
    exampleKn: 'ಪರೀಕ್ಷಕರು ಸುಳ್ಳು ಹೇಳಿಕೆ ಸೃಷ್ಟಿಸಲು ಸತ್ಯವಾದ ವಾಕ್ಯದ ನಡುವೆ "ಏಕೈಕ" ಅಥವಾ "ಸಂಪೂರ್ಣವಾಗಿ ತಿರಸ್ಕರಿಸಿದರು" ಎಂಬ ಪದ ಸೇರಿಸುತ್ತಾರೆ. ಆ ೧ ಪದ ಗುರುತಿಸಿದರೆ ೩ ತಪ್ಪು ಆಯ್ಕೆಗಳು ತಕ್ಷಣ ರದ್ದಾಗುತ್ತವೆ.',
    successRate: '88% Accuracy Across 2017–2024 PYQs',
    iconName: 'AlertOctagon'
  },
  {
    id: 'anchor_match',
    nameEn: '1-Pair Anchor Sniping',
    nameKn: '೧-ಜೋಡಿ ಆಧಾರ ಸ್ನೈಪಿಂಗ್',
    painHookEn: 'Facing a 4x4 Match-the-Following where 3 items look completely foreign?',
    painHookKn: 'ಹೊಂದಿಸಿ ಬರೆಯಿರಿ ಪ್ರಶ್ನೆಯಲ್ಲಿ ೪ ರಲ್ಲಿ ೩ ಹೆಸರುಗಳು ಹೊಸದಾಗಿ ಕಾಣುತ್ತಿವೆಯೇ?',
    ruleEn: 'Never waste 90 seconds matching all 4 pairs. Lock the 1 pair you know with 100% certainty and scan the option columns vertically—it eliminates 2 to 3 options in 5 seconds.',
    ruleKn: 'ಎಲ್ಲಾ ೪ ಜೋಡಿಗಳನ್ನು ಹೊಂದಿಸಲು ೯೦ ಸೆಕೆಂಡ್ ವ್ಯರ್ಥ ಮಾಡಬೇಡಿ. ನಿಮಗೆ ೧೦೦% ಖಚಿತವಿರುವ ಕೇವಲ ೧ ಜೋಡಿಯನ್ನು ಹಿಡಿದು ಆಯ್ಕೆಗಳನ್ನು ನೋಡಿದರೆ ೫ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಉತ್ತರ ಸಿಗುತ್ತದೆ.',
    exampleEn: 'Everyone knows Jog Falls = Sharavathi River (A-1). If only Option A has A-1, you just solved a "hard" question without knowing where Magod or Gokak falls are.',
    exampleKn: 'ಜೋಗ ಜಲಪಾತ = ಶರಾವತಿ ನದಿ (A-1) ಎಂಬ ಒಂದೇ ಒಂದು ಸತ್ಯ ತಿಳಿದಿದ್ದರೆ, ಮಾಗೋಡು ಅಥವಾ ಗೋಕಾಕ್ ಜಲಪಾತ ಗೊತ್ತಿಲ್ಲದಿದ್ದರೂ ಸರಿಯಾದ ಉತ್ತರ ಗುರುತಿಸಬಹುದು.',
    successRate: 'Saves 65 Seconds Per Match Question',
    iconName: 'Link'
  },
  {
    id: 'causal_reason',
    nameEn: 'The "Because" Bridge Test',
    nameKn: '"ಏಕೆಂದರೆ" ಸೇತುವೆ ಪರೀಕ್ಷೆ',
    painHookEn: 'Torn between Option A ("R explains A") and Option B ("R does NOT explain A")?',
    painHookKn: 'ಆಯ್ಕೆ A (ಸರಿಯಾದ ವಿವರಣೆ) ಮತ್ತು ಆಯ್ಕೆ B (ವಿವರಣೆಯಲ್ಲ) ನಡುವೆ ಯಾವುದನ್ನು ಆರಿಸಬೇಕೆಂದು ತೋಚುತ್ತಿಲ್ಲವೇ?',
    ruleEn: 'Read Assertion (A), say the word "BECAUSE" out loud, and read Reason (R). If the sentence sounds like a direct cause-and-effect law, lock Option A without second-guessing.',
    ruleKn: 'ಪ್ರತಿಪಾದನೆ (A) ಓದಿದ ತಕ್ಷಣ "ಏಕೆಂದರೆ" ಎಂದು ಸೇರಿಸಿ ಕಾರಣ (R) ಓದಿ. ಅದು ನೇರ ಕಾರಣ-ಪರಿಣಾಮದಂತೆ ಕೇಳಿಸಿದರೆ ಯಾವುದೇ ಅನುಮಾನವಿಲ್ಲದೆ ಆಯ್ಕೆ A ಗುರುತಿಸಿ.',
    exampleEn: '"Article 371(J) vests special power in the Governor" BECAUSE "the 98th Amendment required constitutional executive oversight for regional quotas." Direct causal bridge = Option A.',
    exampleKn: '"೩೭೧(ಜೆ) ರಾಜ್ಯಪಾಲರಿಗೆ ವಿಶೇಷ ಅಧಿಕಾರ ನೀಡುತ್ತದೆ" ಏಕೆಂದರೆ "೯೮ನೇ ತಿದ್ದುಪಡಿಯು ಹಿಂದುಳಿದ ಜಿಲ್ಲೆಗಳ ಮೀಸಲಾತಿ ರಕ್ಷಣೆಗೆ ಈ ಜವಾಬ್ದಾರಿ ವಿಧಿಸಿದೆ." ನೇರ ಸಂಬಂಧ = ಆಯ್ಕೆ A.',
    successRate: '82% Win Rate on Assertion-Reason',
    iconName: 'GitFork'
  },
  {
    id: 'csat_reverse',
    nameEn: 'CSAT Reverse Option Injection',
    nameKn: 'ಸಿಎಸ್‌ಎಟಿ ಹಿಮ್ಮುಖ ಆಯ್ಕೆ ಪ್ರಯೋಗ',
    painHookEn: 'Running out of time in Paper II because you write x and y equations?',
    painHookKn: 'ಪತ್ರಿಕೆ ೨ ರಲ್ಲಿ x ಮತ್ತು y ಸಮೀಕರಣ ಬರೆಯುತ್ತಾ ಕುಳಿತು ಸಮಯ ಕಳೆದುಕೊಳ್ಳುತ್ತಿದ್ದೀರಾ?',
    ruleEn: 'The correct answer is already printed right in front of you inside the 4 options. Start with Option B or C and plug the number backward into the question stem.',
    ruleKn: 'ಸರಿಯಾದ ಉತ್ತರವು ನಿಮ್ಮ ಕಣ್ಣ ಮುಂದೆಯೇ ೪ ಆಯ್ಕೆಗಳಲ್ಲಿ ಅಡಗಿದೆ! ಸಮೀಕರಣ ಬರೆಯುವ ಬದಲು ಆಯ್ಕೆ B ಅಥವಾ C ಯನ್ನು ನೇರವಾಗಿ ಪ್ರಶ್ನೆಯ ಸಂಖ್ಯೆಗಳಿಗೆ ಅನ್ವಯಿಸಿ ಪರೀಕ್ಷಿಸಿ.',
    exampleEn: 'Instead of solving quadratic equations for train speeds, test Option B (2.0 hours): 2 hrs × (60 + 90 km/h) = 300 km. Matches the question stem in 12 seconds flat.',
    exampleKn: 'ದೀರ್ಘ ಸೂತ್ರ ಬರೆಯುವ ಬದಲು ಆಯ್ಕೆ B (೨ ಗಂಟೆ) ಪರೀಕ್ಷಿಸಿ: ೨ ಗಂ × (೬೦ + ೯೦ ಕಿ.ಮೀ/ಗಂ) = ೩೦೦ ಕಿ.ಮೀ. ಕೇವಲ ೧೨ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಉತ್ತರ ಸಿದ್ಧ!',
    successRate: '3x Faster Than School Algebra',
    iconName: 'Rewind'
  }
];
