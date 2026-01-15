import { useState } from 'react';

export function WeatherSearch() {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 날씨 검색 로직 구현
    // eslint-disable-next-line no-console
    console.log('검색할 도시:', city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="도시 이름을 입력하세요"
      />
      <button type="submit">검색</button>
    </form>
  );
}
