import { Recommendations as RecommendationsType } from '../types';
import './Recommendations.css';

interface RecommendationsProps {
  recommendations: RecommendationsType;
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  const { bodyAnalysis, clothing } = recommendations;

  const getColorTypeName = (colorType: string) => {
    const names: Record<string, string> = {
      spring: 'Весна',
      summer: 'Лето',
      autumn: 'Осень',
      winter: 'Зима'
    };
    return names[colorType] || colorType;
  };

  const getBodyTypeName = (bodyType: string) => {
    const isMale = bodyAnalysis.gender === 'male';
    const names: Record<string, string> = {
      hourglass: 'Песочные часы',
      rectangle: 'Прямоугольник',
      triangle: isMale ? 'Треугольник' : 'Груша (Треугольник)',
      'inverted-triangle': isMale ? 'Перевернутый треугольник (Атлетическая)' : 'Перевернутый треугольник',
      apple: 'Яблоко'
    };
    return names[bodyType] || bodyType;
  };

  const getBodySizeName = (size: string) => {
    const names: Record<string, string> = {
      xs: 'XS',
      s: 'S',
      m: 'M',
      l: 'L',
      xl: 'XL',
      xxl: 'XXL'
    };
    return names[size] || size;
  };

  return (
    <div className="recommendations">
      <div className="analysis-section">
        <h2>Анализ вашей фигуры</h2>
        
        <div className="analysis-card">
          <h3>Тип фигуры</h3>
          <p className="result-value">{getBodyTypeName(bodyAnalysis.bodyType)}</p>
          <p className="description">{bodyAnalysis.description}</p>
        </div>

        <div className="analysis-card">
          <h3>Полнотная группа</h3>
          <p className="result-value">{getBodySizeName(bodyAnalysis.bodySize)}</p>
        </div>

        <div className="analysis-card">
          <h3>Цветотип внешности</h3>
          <p className="result-value">{getColorTypeName(bodyAnalysis.colorType)}</p>
        </div>
      </div>

      <div className="clothing-section">
        <h2>Рекомендации по одежде</h2>

        <div className="recommendation-card">
          <h3>Типы одежды</h3>
          <ul>
            {clothing.clothingTypes.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>

        <div className="recommendation-card">
          <h3>Рекомендуемые силуэты</h3>
          <ul>
            {clothing.silhouettes.map((silhouette, index) => (
              <li key={index}>{silhouette}</li>
            ))}
          </ul>
        </div>

        <div className="recommendation-card">
          <h3>Длина рукавов</h3>
          <p>{clothing.shoulderLength}</p>
        </div>

        <div className="recommendation-card">
          <h3>Посадка по талии</h3>
          <p>{clothing.waistLength}</p>
        </div>

        <div className="recommendation-card">
          <h3>Рекомендуемая цветовая палитра</h3>
          <div className="color-palette">
            {clothing.colorPalette.map((color, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="recommendation-card">
          <h3>Советы</h3>
          <ul>
            {clothing.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

