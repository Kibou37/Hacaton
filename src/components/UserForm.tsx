import { useState } from 'react';
import { UserParameters } from '../types';
import './UserForm.css';

interface UserFormProps {
  onSubmit: (params: UserParameters) => void;
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState<Partial<UserParameters>>({
    gender: 'female',
    height: 165,
    hairColor: 'brown',
    eyeColor: 'brown',
    skinTone: 'medium',
    chest: 90,
    waist: 70,
    hips: 95
  });

  const handleChange = (field: keyof UserParameters, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData as UserParameters);
    }
  };

  const isFormValid = (): boolean => {
    return !!(
      formData.gender &&
      formData.height &&
      formData.hairColor &&
      formData.eyeColor &&
      formData.skinTone &&
      formData.chest &&
      formData.waist &&
      formData.hips
    );
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h2>Введите ваши параметры</h2>
      
      <div className="form-group">
        <label>Пол</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={(e) => handleChange('gender', e.target.value)}
            />
            Женский
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={(e) => handleChange('gender', e.target.value)}
            />
            Мужской
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="height">Рост (см)</label>
        <input
          id="height"
          type="number"
          min="140"
          max="220"
          value={formData.height || ''}
          onChange={(e) => handleChange('height', parseInt(e.target.value) || 0)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="hairColor">Цвет волос</label>
        <select
          id="hairColor"
          value={formData.hairColor || ''}
          onChange={(e) => handleChange('hairColor', e.target.value)}
          required
        >
          <option value="blonde">Светлый</option>
          <option value="brown">Каштановый</option>
          <option value="black">Темный/Черный</option>
          <option value="red">Рыжий</option>
          <option value="gray">Седой</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="eyeColor">Цвет глаз</label>
        <select
          id="eyeColor"
          value={formData.eyeColor || ''}
          onChange={(e) => handleChange('eyeColor', e.target.value)}
          required
        >
          <option value="blue">Голубой</option>
          <option value="green">Зеленый</option>
          <option value="brown">Карий</option>
          <option value="gray">Серый</option>
          <option value="hazel">Ореховый</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="skinTone">Оттенок кожи</label>
        <select
          id="skinTone"
          value={formData.skinTone || ''}
          onChange={(e) => handleChange('skinTone', e.target.value)}
          required
        >
          <option value="light">Светлый</option>
          <option value="medium">Средний</option>
          <option value="olive">Оливковый</option>
          <option value="tan">Загорелый</option>
          <option value="dark">Темный</option>
        </select>
      </div>

      <div className="measurements-group">
        <h3>Замеры (в см)</h3>
        
        <div className="form-group">
          <label htmlFor="chest">ОГ - Обхват груди</label>
          <input
            id="chest"
            type="number"
            min="60"
            max="150"
            value={formData.chest || ''}
            onChange={(e) => handleChange('chest', parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="waist">ОТ - Обхват талии</label>
          <input
            id="waist"
            type="number"
            min="50"
            max="150"
            value={formData.waist || ''}
            onChange={(e) => handleChange('waist', parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hips">ОБ - Обхват бедер</label>
          <input
            id="hips"
            type="number"
            min="60"
            max="150"
            value={formData.hips || ''}
            onChange={(e) => handleChange('hips', parseInt(e.target.value) || 0)}
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-button" disabled={!isFormValid()}>
        Получить рекомендации
      </button>
    </form>
  );
}

