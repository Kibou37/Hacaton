import { useState } from 'react';
import { Exercise, BodyAnalysis } from '../types';
import './Exercises.css';

interface ExercisesProps {
  bodyAnalysis: BodyAnalysis;
}

export function Exercises({ bodyAnalysis }: ExercisesProps) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  function getColorTypeName(colorType: string): string {
    const names: Record<string, string> = {
      spring: 'Весна',
      summer: 'Лето',
      autumn: 'Осень',
      winter: 'Зима'
    };
    return names[colorType] || colorType;
  }

  function getBodyTypeName(bodyType: string): string {
    const isMale = bodyAnalysis.gender === 'male';
    const names: Record<string, string> = {
      hourglass: 'Песочные часы',
      rectangle: 'Прямоугольник',
      triangle: isMale ? 'Треугольник' : 'Груша',
      'inverted-triangle': isMale ? 'Перевернутый треугольник (Атлетическая)' : 'Перевернутый треугольник',
      apple: 'Яблоко'
    };
    return names[bodyType] || bodyType;
  }

  function getColorOptions(colorType: string): string[] {
    const options: Record<string, string[]> = {
      spring: ['Персиковый и золотистый', 'Темно-синий и черный', 'Серый и бежевый', 'Коричневый и оливковый'],
      summer: ['Лавандовый и розовый', 'Ярко-оранжевый', 'Темно-коричневый', 'Черный и белый'],
      autumn: ['Коричневый и бежевый', 'Ярко-розовый', 'Светло-голубой', 'Черный'],
      winter: ['Темно-синий и черный', 'Персиковый', 'Светло-бежевый', 'Оливковый']
    };
    return options[colorType] || options.spring;
  }

  function getSilhouetteOptions(bodyType: string): string[] {
    const isMale = bodyAnalysis.gender === 'male';
    if (isMale) {
      const options: Record<string, string[]> = {
        hourglass: ['Приталенный силуэт с акцентом на талии', 'Мешковатый силуэт', 'Прямой силуэт без деталей', 'Очень свободный силуэт'],
        rectangle: ['Прямой силуэт', 'Классический крой', 'Стандартный покрой', 'Приталенный силуэт'],
        triangle: ['Приталенный верх, прямой низ', 'Классический крой с акцентом на верх', 'Прямой силуэт', 'Объемный верх'],
        'inverted-triangle': ['Приталенный верх, свободный низ', 'Классический крой с акцентом на низ', 'Прямой силуэт', 'Строгий верх'],
        apple: ['Прямой силуэт', 'Классический крой', 'Свободный покрой', 'Приталенный силуэт']
      };
      return options[bodyType] || options.rectangle;
    } else {
      const options: Record<string, string[]> = {
        hourglass: ['Приталенный силуэт с акцентом на талии', 'Мешковатый силуэт', 'Прямой силуэт без деталей', 'Очень свободный силуэт'],
        rectangle: ['A-силуэт с деталями', 'Обтягивающий силуэт', 'Прямой мешковатый', 'Без акцентов'],
        triangle: ['A-силуэт с объемным верхом', 'Обтягивающий низ', 'Прямой силуэт', 'Без деталей на верхе'],
        'inverted-triangle': ['A-силуэт с объемным низом', 'Объемный верх', 'Прямой обтягивающий', 'Без деталей на низах'],
        apple: ['A-силуэт с завышенной талией', 'Обтягивающий в талии', 'Прямой облегающий', 'С поясом на талии']
      };
      return options[bodyType] || options.rectangle;
    }
  }

  function getShoulderAnswer(bodyType: string): number {
    const answers: Record<string, number> = {
      hourglass: 3,
      rectangle: 0,
      triangle: 0,
      'inverted-triangle': 1,
      apple: 2
    };
    return answers[bodyType] || 3;
  }

  const exercises: Exercise[] = [
    {
      id: 1,
      question: `Для вашего цветотипа "${getColorTypeName(bodyAnalysis.colorType)}" какой цвет будет наиболее подходящим?`,
      options: getColorOptions(bodyAnalysis.colorType),
      correctAnswer: 0,
      explanation: `Для цветотипа "${getColorTypeName(bodyAnalysis.colorType)}" лучше всего подходят цвета из вашей палитры, которые гармонируют с вашим естественным оттенком кожи, волос и глаз.`
    },
    {
      id: 2,
      question: `Для типа фигуры "${getBodyTypeName(bodyAnalysis.bodyType)}" какой силуэт будет наиболее выгодным?`,
      options: getSilhouetteOptions(bodyAnalysis.bodyType),
      correctAnswer: 0,
      explanation: `Для типа фигуры "${getBodyTypeName(bodyAnalysis.bodyType)}" рекомендуется выбирать силуэты, которые подчеркивают ваши достоинства и скрывают недостатки.`
    },
    {
      id: 3,
      question: `Какой тип рукава лучше всего подойдет для вашей фигуры?`,
      options: [
        'Короткий рукав с деталями',
        'Длинный рукав без деталей',
        'Рукав 3/4',
        'Любой тип рукава'
      ],
      correctAnswer: getShoulderAnswer(bodyAnalysis.bodyType),
      explanation: 'Выбор длины рукава зависит от типа вашей фигуры и пропорций тела.'
    }
  ];

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    const exercise = exercises[currentExercise];
    if (selectedAnswer === exercise.correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    return (
      <div className="exercises">
        <div className="exercise-completed">
          <h2>Упражнения завершены!</h2>
          <p className="score">
            Ваш результат: {score} из {exercises.length}
          </p>
          <p className="score-percentage">
            {Math.round((score / exercises.length) * 100)}% правильных ответов
          </p>
          <button onClick={handleRestart} className="restart-button">
            Пройти заново
          </button>
        </div>
      </div>
    );
  }

  const exercise = exercises[currentExercise];

  return (
    <div className="exercises">
      <div className="exercise-header">
        <h2>Упражнения для закрепления</h2>
        <p className="exercise-progress">
          Вопрос {currentExercise + 1} из {exercises.length}
        </p>
      </div>

      <div className="exercise-card">
        <h3>{exercise.question}</h3>
        
        <div className="options">
          {exercise.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showExplanation
                  ? index === exercise.correctAnswer
                    ? 'correct'
                    : selectedAnswer === index && index !== exercise.correctAnswer
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="explanation">
            <p><strong>Объяснение:</strong></p>
            <p>{exercise.explanation}</p>
          </div>
        )}

        <div className="exercise-actions">
          {!showExplanation ? (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedAnswer === null}
              className="check-button"
            >
              Проверить ответ
            </button>
          ) : (
            <button onClick={handleNext} className="next-button">
              {currentExercise < exercises.length - 1 ? 'Следующий вопрос' : 'Завершить'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

