export type Gender = 'male' | 'female';

export type HairColor = 'blonde' | 'brown' | 'black' | 'red' | 'gray';
export type EyeColor = 'blue' | 'green' | 'brown' | 'gray' | 'hazel';
export type SkinTone = 'light' | 'medium' | 'olive' | 'tan' | 'dark';

export type BodyType = 
  | 'hourglass'      // Песочные часы
  | 'rectangle'      // Прямоугольник
  | 'triangle'       // Треугольник (груша)
  | 'inverted-triangle' // Перевернутый треугольник
  | 'apple';         // Яблоко

export type BodySize = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

export type ColorType = 
  | 'spring'   // Весна
  | 'summer'   // Лето
  | 'autumn'   // Осень
  | 'winter';  // Зима

export interface UserParameters {
  gender: Gender;
  height: number; // в см
  hairColor: HairColor;
  eyeColor: EyeColor;
  skinTone: SkinTone;
  chest: number;  // ОГ - обхват груди в см
  waist: number;  // ОТ - обхват талии в см
  hips: number;   // ОБ - обхват бедер в см
}

export interface BodyAnalysis {
  bodyType: BodyType;
  bodySize: BodySize;
  colorType: ColorType;
  description: string;
  gender: Gender;
}

export interface ClothingRecommendation {
  clothingTypes: string[];
  silhouettes: string[];
  shoulderLength: string;
  waistLength: string;
  colorPalette: string[];
  tips: string[];
}

export interface Recommendations {
  bodyAnalysis: BodyAnalysis;
  clothing: ClothingRecommendation;
}

export interface Exercise {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

