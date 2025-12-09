import { useState, useEffect } from 'react';
import { UserForm } from './components/UserForm';
import { Recommendations } from './components/Recommendations';
import { Exercises } from './components/Exercises';
import { UserParameters, Recommendations as RecommendationsType } from './types';
import { analyzeBody } from './utils/bodyAnalysis';
import { generateRecommendations } from './utils/recommendations';
import './App.css';

type AppState = 'form' | 'results' | 'exercises';

function App() {
  const [state, setState] = useState<AppState>('form');
  const [recommendations, setRecommendations] = useState<RecommendationsType | null>(null);

  // Прокрутка к началу страницы при изменении состояния
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [state]);

  const handleFormSubmit = (params: UserParameters) => {
    const bodyAnalysis = analyzeBody(params);
    const recs = generateRecommendations(bodyAnalysis);
    setRecommendations(recs);
    setState('results');
  };

  const handleStartExercises = () => {
    setState('exercises');
  };

  const handleBackToForm = () => {
    setState('form');
    setRecommendations(null);
  };

  const handleBackToResults = () => {
    setState('results');
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Рекомендации по выбору одежды</h1>
        <p className="subtitle">Получите персональные рекомендации на основе ваших параметров</p>
      </header>

      <main className="app-main">
        {state === 'form' && (
          <UserForm onSubmit={handleFormSubmit} />
        )}

        {state === 'results' && recommendations && (
          <div>
            <Recommendations recommendations={recommendations} />
            <div className="action-buttons">
              <button onClick={handleStartExercises} className="action-button primary">
                Пройти упражнения
              </button>
              <button onClick={handleBackToForm} className="action-button secondary">
                Ввести новые данные
              </button>
            </div>
          </div>
        )}

        {state === 'exercises' && recommendations && (
          <div>
            <Exercises bodyAnalysis={recommendations.bodyAnalysis} />
            <div className="action-buttons">
              <button onClick={handleBackToResults} className="action-button secondary">
                Вернуться к рекомендациям
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© 2025 Проект хакатон</p>
      </footer>
    </div>
  );
}

export default App;

