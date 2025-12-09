import { UserParameters, BodyType, BodySize, ColorType, BodyAnalysis, Gender } from '../types';

/**
 * Определяет тип фигуры на основе замеров
 */
export function determineBodyType(params: UserParameters): BodyType {
  const { chest, waist, hips, gender } = params;
  
  // Разница между бедрами и грудью
  const hipsChestDiff = hips - chest;
  // Разница между бедрами и талией
  const hipsWaistDiff = hips - waist;
  // Разница между грудью и талией
  const chestWaistDiff = chest - waist;
  
  if (gender === 'male') {
    // Для мужчин логика определения типа фигуры отличается
    
    // Перевернутый треугольник (атлетическая фигура): грудь значительно больше бедер
    if (chest - hips > 8) {
      return 'inverted-triangle';
    }
    
    // Прямоугольник: все замеры примерно равны (классическая мужская фигура)
    if (Math.abs(hips - chest) <= 8 && Math.abs(waist - chest) <= 8) {
      return 'rectangle';
    }
    
    // Яблоко: талия больше или равна груди/бедрам
    if (waist >= chest - 3 || waist >= hips - 3) {
      return 'apple';
    }
    
    // Треугольник: бедра больше груди (редко для мужчин)
    if (hipsChestDiff > 5 && hips > chest) {
      return 'triangle';
    }
    
    return 'rectangle'; // По умолчанию для мужчин
  } else {
    // Для женщин - оригинальная логика
    // Песочные часы: бедра и грудь примерно равны, талия значительно меньше
    if (Math.abs(hips - chest) <= 5 && hipsWaistDiff >= 20 && chestWaistDiff >= 20) {
      return 'hourglass';
    }
    
    // Прямоугольник: все замеры примерно равны
    if (Math.abs(hips - chest) <= 5 && Math.abs(waist - chest) <= 5) {
      return 'rectangle';
    }
    
    // Треугольник (груша): бедра значительно больше груди
    if (hipsChestDiff > 5 && hips > chest) {
      return 'triangle';
    }
    
    // Перевернутый треугольник: грудь значительно больше бедер
    if (chest - hips > 5) {
      return 'inverted-triangle';
    }
    
    // Яблоко: талия больше или равна груди/бедрам
    if (waist >= chest - 5 || waist >= hips - 5) {
      return 'apple';
    }
    
    return 'rectangle'; // По умолчанию
  }
}

/**
 * Определяет полнотную группу на основе замеров
 */
export function determineBodySize(params: UserParameters): BodySize {
  const { chest, waist, hips } = params;
  const average = (chest + waist + hips) / 3;
  
  if (average < 80) return 'xs';
  if (average < 90) return 's';
  if (average < 100) return 'm';
  if (average < 110) return 'l';
  if (average < 120) return 'xl';
  return 'xxl';
}

/**
 * Определяет цветотип внешности
 */
export function determineColorType(params: UserParameters): ColorType {
  const { hairColor, eyeColor, skinTone } = params;
  
  // Весна: светлые волосы, светлые глаза, светлая кожа
  if (
    (hairColor === 'blonde' || hairColor === 'red') &&
    (eyeColor === 'blue' || eyeColor === 'green') &&
    skinTone === 'light'
  ) {
    return 'spring';
  }
  
  // Лето: светлые или серые волосы, светлые глаза, светлая кожа
  if (
    (hairColor === 'blonde' || hairColor === 'gray') &&
    (eyeColor === 'blue' || eyeColor === 'gray') &&
    (skinTone === 'light' || skinTone === 'medium')
  ) {
    return 'summer';
  }
  
  // Осень: рыжие или каштановые волосы, теплые глаза, средняя кожа
  if (
    (hairColor === 'red' || hairColor === 'brown') &&
    (eyeColor === 'brown' || eyeColor === 'green' || eyeColor === 'hazel') &&
    (skinTone === 'medium' || skinTone === 'olive')
  ) {
    return 'autumn';
  }
  
  // Зима: темные волосы, контрастные глаза, любая кожа
  if (
    (hairColor === 'black' || hairColor === 'brown') &&
    (eyeColor === 'brown' || eyeColor === 'blue' || eyeColor === 'green')
  ) {
    return 'winter';
  }
  
  // Дополнительная логика для неоднозначных случаев
  if (skinTone === 'dark' || skinTone === 'tan') {
    return 'winter';
  }
  
  if (hairColor === 'brown' && eyeColor === 'brown') {
    return skinTone === 'light' ? 'autumn' : 'winter';
  }
  
  return 'summer'; // По умолчанию
}

/**
 * Получает описание типа фигуры
 */
export function getBodyTypeDescription(bodyType: BodyType, gender: Gender): string {
  if (gender === 'male') {
    const descriptions: Record<BodyType, string> = {
      hourglass: 'У вас фигура типа "Песочные часы" - сбалансированная фигура с выраженной талией.',
      rectangle: 'У вас фигура типа "Прямоугольник" - классическая мужская фигура. Плечи, грудь и бедра примерно равны по объему, талия слабо выражена.',
      triangle: 'У вас фигура типа "Треугольник" - бедра шире плеч. Нижняя часть тела более объемная.',
      'inverted-triangle': 'У вас фигура типа "Перевернутый треугольник" (атлетическая) - широкие плечи и грудь, узкие бедра. Верхняя часть тела более объемная.',
      apple: 'У вас фигура типа "Яблоко" - объем сосредоточен в области талии и живота, ноги и руки относительно стройные.'
    };
    return descriptions[bodyType];
  } else {
    const descriptions: Record<BodyType, string> = {
      hourglass: 'У вас фигура типа "Песочные часы" - сбалансированная фигура с выраженной талией. Грудь и бедра примерно равны по объему.',
      rectangle: 'У вас фигура типа "Прямоугольник" - прямые линии, талия слабо выражена. Все части тела примерно равны по объему.',
      triangle: 'У вас фигура типа "Груша" (Треугольник) - бедра шире плеч, талия выражена. Нижняя часть тела более объемная.',
      'inverted-triangle': 'У вас фигура типа "Перевернутый треугольник" - широкие плечи, узкие бедра. Верхняя часть тела более объемная.',
      apple: 'У вас фигура типа "Яблоко" - объем сосредоточен в области талии и живота, ноги и руки относительно стройные.'
    };
    return descriptions[bodyType];
  }
}

/**
 * Полный анализ фигуры
 */
export function analyzeBody(params: UserParameters): BodyAnalysis {
  const bodyType = determineBodyType(params);
  const bodySize = determineBodySize(params);
  const colorType = determineColorType(params);
  const description = getBodyTypeDescription(bodyType, params.gender);
  
  return {
    bodyType,
    bodySize,
    colorType,
    description,
    gender: params.gender
  };
}

