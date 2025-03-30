/**
 * Utilitaire de conversion entre alphabet latin et Tifinagh
 * Permet de convertir du texte de la transcription latine vers l'alphabet Tifinagh
 */

// Table de correspondance entre caractères latins et Tifinagh
// Basée sur les standards de transcription du Tamazight/Amazigh
const LATIN_TO_TIFINAGH_MAP = {
  // Consonnes
  'b': 'ⴱ',  // TIFINAGH LETTER YAB
  'd': 'ⴷ',  // TIFINAGH LETTER YAD
  'f': 'ⴼ',  // TIFINAGH LETTER YAF
  'g': 'ⴳ',  // TIFINAGH LETTER YAG
  'h': 'ⵀ',  // TIFINAGH LETTER YAH
  'j': 'ⵊ',  // TIFINAGH LETTER YAJ
  'k': 'ⴽ',  // TIFINAGH LETTER YAK
  'l': 'ⵍ',  // TIFINAGH LETTER YAL
  'm': 'ⵎ',  // TIFINAGH LETTER YAM
  'n': 'ⵏ',  // TIFINAGH LETTER YAN
  'p': 'ⵒ',  // TIFINAGH LETTER YAP
  'q': 'ⵇ',  // TIFINAGH LETTER YAQ
  'r': 'ⵔ',  // TIFINAGH LETTER YAR
  's': 'ⵙ',  // TIFINAGH LETTER YAS
  't': 'ⵜ',  // TIFINAGH LETTER YAT
  'v': 'ⵖ',  // TIFINAGH LETTER YAGGH
  'w': 'ⵡ',  // TIFINAGH LETTER YAW
  'x': 'ⵅ',  // TIFINAGH LETTER YAKH
  'z': 'ⵣ',  // TIFINAGH LETTER YAZ
  
  // Caractères spécifiques au Tamazight avec diacritiques
  'ɣ': 'ⵖ',  // TIFINAGH LETTER YAGH
  'ḥ': 'ⵃ',  // TIFINAGH LETTER YAH WITH DOT
  'ɛ': 'ⵄ',  // TIFINAGH LETTER YAƐ
  'č': 'ⵛ',  // TIFINAGH LETTER YAC
  'č': 'ⵛ',  // Alternative
  'ċ': 'ⵞ',  // TIFINAGH LETTER YAĊ
  'ğ': 'ⵯ',  // TIFINAGH MODIFIER LETTER LABIALIZATION
  'ř': 'ⵕ',  // TIFINAGH LETTER YARR
  'ẓ': 'ⵥ',  // TIFINAGH LETTER YAZZ
  'ž': 'ⵥ',  // Alternative for YAZZ
  'ž': 'ⵣ',  // Alternative pour le J français
  
  // Combinaisons spéciales
  'dj': 'ⵌ', // TIFINAGH LETTER YAJ (tendre)
  'gh': 'ⵖ', // TIFINAGH LETTER YAGH
  'ch': 'ⵛ', // TIFINAGH LETTER YAC
  'sh': 'ⵛ', // Alternative for YAC
  'th': 'ⵝ', // TIFINAGH LETTER YATH
  'kh': 'ⵅ', // TIFINAGH LETTER YAKH
  'ts': 'ⵜⵙ', // Combinaison
  
  // Voyelles
  'a': 'ⴰ',  // TIFINAGH LETTER YA
  'i': 'ⵉ',  // TIFINAGH LETTER YI
  'u': 'ⵓ',  // TIFINAGH LETTER YU
  'e': 'ⵏ',  // Approximation (souvent absent en Tifinagh)
  'o': 'ⵓ',  // Approximation
  
  // Voyelles avec diacritiques
  'ă': 'ⴰ',  // Approximation
  'ĕ': 'ⵏ',  // Approximation
  'ə': 'ⵏ',  // SCHWA - Approximation
  'œ': 'ⵓ',  // Approximation
  
  // Majuscules - mêmes caractères Tifinagh (pas de concept de casse en Tifinagh)
  'B': 'ⴱ', 'D': 'ⴷ', 'F': 'ⴼ', 'G': 'ⴳ', 'H': 'ⵀ', 'J': 'ⵊ', 'K': 'ⴽ',
  'L': 'ⵍ', 'M': 'ⵎ', 'N': 'ⵏ', 'P': 'ⵒ', 'Q': 'ⵇ', 'R': 'ⵔ', 'S': 'ⵙ',
  'T': 'ⵜ', 'V': 'ⵖ', 'W': 'ⵡ', 'X': 'ⵅ', 'Z': 'ⵣ',
  'A': 'ⴰ', 'I': 'ⵉ', 'U': 'ⵓ', 'E': 'ⵏ', 'O': 'ⵓ',
};

/**
 * Vérifie si un texte contient déjà des caractères Tifinagh
 * @param {string} text - Texte à vérifier
 * @returns {boolean} true si le texte contient des caractères Tifinagh
 */
export const isTifinaghText = (text) => {
  if (!text) return false;
  
  // Les caractères Tifinagh sont dans la plage Unicode U+2D30-2D7F
  const tifinaghRegex = /[\u2D30-\u2D7F]/;
  
  // Si au moins 10% des caractères sont des Tifinagh, on considère que c'est déjà du Tifinagh
  const tifinaghChars = text.match(new RegExp(tifinaghRegex, 'g')) || [];
  const ratio = tifinaghChars.length / text.length;
  
  return ratio > 0.1; // Seuil arbitraire
};

/**
 * Convertit un texte de l'alphabet latin vers l'alphabet Tifinagh
 * @param {string} text - Texte en alphabet latin à convertir
 * @returns {string} Texte converti en Tifinagh
 */
export const convertLatinToTifinagh = (text) => {
  if (!text) return '';
  
  // Si le texte est déjà en Tifinagh, le retourner tel quel
  if (isTifinaghText(text)) {
    return text;
  }
  
  // Traiter d'abord les combinaisons spéciales
  let result = text;
  const specialCombinations = ['dj', 'gh', 'ch', 'sh', 'th', 'kh', 'ts'];
  
  specialCombinations.forEach(combo => {
    const regex = new RegExp(combo, 'g');
    result = result.replace(regex, LATIN_TO_TIFINAGH_MAP[combo] || combo);
  });
  
  // Puis traiter les caractères individuels
  result = result.split('').map(char => {
    return LATIN_TO_TIFINAGH_MAP[char] || char;
  }).join('');
  
  return result;
};

/**
 * Détecte si un texte contient probablement du Tamazight en transcription latine
 * @param {string} text - Texte à analyser
 * @returns {boolean} true si le texte semble être du Tamazight
 */
export const isTamazightLatin = (text) => {
  if (!text) return false;
  
  // Certains caractères et combinaisons fréquents en Tamazight
  const tamazightPatterns = [
    /gh/, /kh/, /th/, /dh/, /ch/, /ts/,
    /[ɣḥɛčřẓžăĕə]/i
  ];
  
  // Si au moins un motif est trouvé, considérer comme du Tamazight
  return tamazightPatterns.some(pattern => pattern.test(text));
};

// Exporter les fonctions utiles
export default {
  convertLatinToTifinagh,
  isTifinaghText,
  isTamazightLatin
}; 