function determineBodyType(params) {
  const { chest, waist, hips, gender } = params;
  
  // Разница между бедрами и грудью
  const hipsChestDiff = hips - chest;
  // Разница между бедрами и талией
  const hipsWaistDiff = hips - waist;
  // Разница между грудью и талией
  const chestWaistDiff = chest - waist;
  
  if (gender === 'male') {
    // Для мужчин логика определения типа фигуры 
    
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
function determineBodySize(params) {
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
function determineColorType(params) {
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
function getBodyTypeDescription(bodyType, gender) {
  if (gender === 'male') {
    const descriptions = {
      hourglass: 'У вас фигура типа "Песочные часы" - сбалансированная фигура с выраженной талией.',
      rectangle: 'У вас фигура типа "Прямоугольник" - классическая мужская фигура. Плечи, грудь и бедра примерно равны по объему, талия слабо выражена.',
      triangle: 'У вас фигура типа "Треугольник" - бедра шире плеч. Нижняя часть тела более объемная.',
      'inverted-triangle': 'У вас фигура типа "Перевернутый треугольник" (атлетическая) - широкие плечи и грудь, узкие бедра. Верхняя часть тела более объемная.',
      apple: 'У вас фигура типа "Яблоко" - объем сосредоточен в области талии и живота, ноги и руки относительно стройные.'
    };
    return descriptions[bodyType];
  } else {
    const descriptions = {
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
function analyzeBody(params) {
  const bodyType = determineBodyType(params);
  const bodySize = determineBodySize(params);
  const colorType = determineColorType(params);
  const description = getBodyTypeDescription(bodyType, params.gender);
  
  return {
    bodyType: bodyType,
    bodySize: bodySize,
    colorType: colorType,
    description: description,
    gender: params.gender
  };
}

/**
 * Возвращает цветовую палитру для цветотипа
 */
function getColorPalette(colorType) {
  const palettes = {
    spring: [
      '#FFE5B4', // Персиковый
      '#FFD700', // Золотистый
      '#FFA07A', // Светло-лососевый
      '#98FB98', // Бледно-зеленый
      '#87CEEB', // Небесно-голубой
      '#FFB6C1', // Светло-розовый
      '#F0E68C', // Хаки
      '#FFEFD5'  // Папайя
    ],
    summer: [
      '#E6E6FA', // Лавандовый
      '#B0E0E6', // Пороховой голубой
      '#FFB6C1', // Розовый
      '#DDA0DD', // Сливовый
      '#F0F8FF', // Синий
      '#E0E0E0', // Светло-серый
      '#C8A2C8', // Сиреневый
      '#AFEEEE'  // Бледно-бирюзовый
    ],
    autumn: [
      '#8B4513', // Коричневый
      '#CD853F', // Перу
      '#A0522D', // Сиена
      '#D2691E', // Шоколадный
      '#B8860B', // Темно-золотой
      '#8B7355', // Бежевый
      '#A0522D', // Сиена
      '#D2B48C'  // Загар
    ],
    winter: [
      '#000080', // Темно-синий
      '#8B0000', // Темно-красный
      '#2F4F4F', // Темно-серый
      '#191970', // Полуночно-синий
      '#800080', // Фиолетовый
      '#000000', // Черный
      '#FFFFFF', // Белый
      '#FF1493'  // Глубокий розовый
    ]
  };
  
  return palettes[colorType] || [];
}

/**
 * Рекомендации для мужчин
 */
function getMaleRecommendations(bodyType, colorType) {
  const recommendations = {
    rectangle: {
      clothingTypes: [
        'Классические рубашки с прямым кроем',
        'Пиджаки и блейзеры стандартного покроя',
        'Прямые брюки и джинсы',
        'Свитеры и кардиганы прямого силуэта'
      ],
      silhouettes: [
        'Прямой силуэт',
        'Классический крой',
        'Стандартный покрой'
      ],
      shoulderLength: 'Рукава стандартной длины, подходящие по размеру',
      waistLength: 'Средняя посадка брюк, классический пояс',
      colorPalette: [],
      tips: [
        'Выбирайте одежду стандартного покроя',
        'Избегайте слишком обтягивающей или мешковатой одежды',
        'Классический стиль подчеркнет вашу фигуру'
      ]
    },
    'inverted-triangle': {
      clothingTypes: [
        'Рубашки с V-образным вырезом',
        'Пиджаки с мягкими плечами',
        'Брюки с прямым или слегка расклешенным кроем',
        'Светлые низы, темные верхи для баланса'
      ],
      silhouettes: [
        'Приталенный верх, свободный низ',
        'Классический крой с акцентом на низ',
        'Прямой силуэт'
      ],
      shoulderLength: 'Рукава стандартной длины без дополнительных деталей',
      waistLength: 'Средняя посадка брюк',
      colorPalette: [],
      tips: [
        'Балансируйте пропорции: строгий верх, более объемный низ',
        'Используйте темные цвета для верха',
        'Избегайте объемных плеч и деталей на груди'
      ]
    },
    triangle: {
      clothingTypes: [
        'Рубашки с деталями на плечах (погоны)',
        'Пиджаки с подплечниками',
        'Брюки прямого кроя',
        'Темные низы, светлые верхи'
      ],
      silhouettes: [
        'Приталенный верх, прямой низ',
        'Классический крой с акцентом на верх',
        'Прямой силуэт'
      ],
      shoulderLength: 'Рукава с деталями для создания объема в плечах',
      waistLength: 'Средняя посадка брюк',
      colorPalette: [],
      tips: [
        'Балансируйте пропорции: объемный верх, строгий низ',
        'Используйте темные цвета для низа',
        'Акцентируйте внимание на верхней части тела'
      ]
    },
    apple: {
      clothingTypes: [
        'Рубашки с V-образным вырезом',
        'Пиджаки прямого кроя',
        'Брюки с завышенной талией',
        'Свободные свитеры и кардиганы'
      ],
      silhouettes: [
        'Прямой силуэт',
        'Классический крой',
        'Свободный покрой'
      ],
      shoulderLength: 'Рукава стандартной длины',
      waistLength: 'Завышенная талия, избегайте низкой посадки',
      colorPalette: [],
      tips: [
        'Избегайте обтягивающей одежды в области талии',
        'Используйте вертикальные линии и принты',
        'Выбирайте одежду прямого кроя'
      ]
    },
    hourglass: {
      clothingTypes: [
        'Приталенные рубашки',
        'Пиджаки с акцентом на талии',
        'Брюки классического кроя',
        'Ремни для подчеркивания талии'
      ],
      silhouettes: [
        'Приталенный силуэт',
        'Классический крой',
        'Прямой силуэт с акцентом на талии'
      ],
      shoulderLength: 'Рукава стандартной длины',
      waistLength: 'Подчеркивайте талию поясом',
      colorPalette: [],
      tips: [
        'Используйте ремни для подчеркивания талии',
        'Избегайте мешковатой одежды',
        'Выбирайте приталенную одежду'
      ]
    }
  };
  
  const baseRecommendation = recommendations[bodyType] || recommendations.rectangle;
  baseRecommendation.colorPalette = getColorPalette(colorType);
  
  return baseRecommendation;
}

/**
 * Рекомендации для женщин
 */
function getFemaleRecommendations(bodyType, colorType) {
  const recommendations = {
    hourglass: {
      clothingTypes: [
        'Приталенные платья и блузки',
        'Поясные ремни для подчеркивания талии',
        'V-образные и круглые вырезы',
        'Юбки-карандаш и А-силуэт'
      ],
      silhouettes: [
        'Приталенный силуэт',
        'A-силуэт',
        'Прямой силуэт с акцентом на талии'
      ],
      shoulderLength: 'Любая длина, но предпочтительно 3/4 или короткий рукав',
      waistLength: 'Подчеркивайте талию поясом или приталенным кроем',
      colorPalette: [],
      tips: [
        'Используйте пояса для подчеркивания талии',
        'Избегайте мешковатой одежды',
        'Выбирайте одежду, которая следует линиям вашего тела'
      ]
    },
    rectangle: {
      clothingTypes: [
        'Одежда с деталями на груди и бедрах',
        'Платья с баской',
        'Блузки с воланами и рюшами',
        'Юбки с карманами и складками'
      ],
      silhouettes: [
        'A-силуэт',
        'Трапеция',
        'Одежда с акцентами на плечах и бедрах'
      ],
      shoulderLength: 'Рукава с деталями (буфы, воланы) для создания объема',
      waistLength: 'Используйте пояса и баски для создания талии',
      colorPalette: [],
      tips: [
        'Создавайте иллюзию талии с помощью поясов',
        'Добавляйте объем в области груди и бедер',
        'Избегайте прямых мешковатых силуэтов'
      ]
    },
    triangle: {
      clothingTypes: [
        'Блузки с широкими плечами (погоны, воланы)',
        'Платья с открытыми плечами',
        'Юбки прямого или слегка расклешенного кроя',
        'Темные низы, светлые верхи'
      ],
      silhouettes: [
        'A-силуэт',
        'Трапеция',
        'Приталенный верх, свободный низ'
      ],
      shoulderLength: 'Короткие рукава или рукава 3/4 с деталями',
      waistLength: 'Средняя посадка, избегайте низкой посадки',
      colorPalette: [],
      tips: [
        'Балансируйте пропорции: объемный верх, строгий низ',
        'Используйте темные цвета для низа',
        'Акцентируйте внимание на верхней части тела'
      ]
    },
    'inverted-triangle': {
      clothingTypes: [
        'Платья и блузки с V-образным вырезом',
        'Юбки А-силуэт и расклешенные',
        'Одежда с акцентами на бедрах',
        'Светлые низы, темные верхи'
      ],
      silhouettes: [
        'A-силуэт',
        'Приталенный верх, объемный низ',
        'Трапеция'
      ],
      shoulderLength: 'Минималистичные рукава без деталей',
      waistLength: 'Средняя или высокая посадка для баланса',
      colorPalette: [],
      tips: [
        'Балансируйте пропорции: строгий верх, объемный низ',
        'Используйте темные цвета для верха',
        'Добавляйте детали и объем в области бедер'
      ]
    },
    apple: {
      clothingTypes: [
        'Платья и блузки с V-образным вырезом',
        'Одежда с завышенной талией',
        'Прямые и А-силуэт платья',
        'Свободные блузки и туники'
      ],
      silhouettes: [
        'A-силуэт',
        'Прямой силуэт',
        'Трапеция'
      ],
      shoulderLength: 'Рукава 3/4 или длинные, избегайте коротких',
      waistLength: 'Завышенная талия, избегайте пояса на талии',
      colorPalette: [],
      tips: [
        'Избегайте обтягивающей одежды в области талии',
        'Используйте вертикальные линии и принты',
        'Акцентируйте внимание на ногах и декольте'
      ]
    }
  };
  
  const baseRecommendation = recommendations[bodyType] || recommendations.rectangle;
  baseRecommendation.colorPalette = getColorPalette(colorType);
  
  return baseRecommendation;
}

/**
 * Генерирует рекомендации по одежде на основе анализа фигуры
 */
function generateRecommendations(analysis) {
  const { bodyType, colorType, gender } = analysis;
  
  let clothing;
  if (gender === 'male') {
    clothing = getMaleRecommendations(bodyType, colorType);
  } else {
    clothing = getFemaleRecommendations(bodyType, colorType);
  }
  
  return {
    bodyAnalysis: analysis,
    clothing: clothing
  };
}

/**
 * ГЛАВНАЯ ФУНКЦИЯ ДЛЯ ИСПОЛЬЗОВАНИЯ В TILDA
 * 
 * @param {Object} userParams - Параметры пользователя
 * @param {string} userParams.gender - 'male' или 'female'
 * @param {number} userParams.height - Рост в см
 * @param {string} userParams.hairColor - 'blonde', 'brown', 'black', 'red', 'gray'
 * @param {string} userParams.eyeColor - 'blue', 'green', 'brown', 'gray', 'hazel'
 * @param {string} userParams.skinTone - 'light', 'medium', 'olive', 'tan', 'dark'
 * @param {number} userParams.chest - Обхват груди в см
 * @param {number} userParams.waist - Обхват талии в см
 * @param {number} userParams.hips - Обхват бедер в см
 * 
 * @returns {Object} Результат с анализом и рекомендациями
 */
function getFashionRecommendations(userParams) {
  // Проверка обязательных полей
  const required = ['gender', 'height', 'hairColor', 'eyeColor', 'skinTone', 'chest', 'waist', 'hips'];
  for (let field of required) {
    if (userParams[field] === undefined || userParams[field] === null) {
      throw new Error('Отсутствует обязательное поле: ' + field);
    }
  }
  
  // Анализ фигуры
  const analysis = analyzeBody(userParams);
  
  // Генерация рекомендаций
  const recommendations = generateRecommendations(analysis);
  
  return recommendations;
}

// Экспорт для использования в браузере (если используется как модуль)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getFashionRecommendations,
    analyzeBody,
    generateRecommendations
  };
}

