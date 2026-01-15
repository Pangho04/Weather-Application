import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { WeatherSearch } from '@/features/weather-search';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<WeatherSearch />} />
      </Routes>
    </BrowserRouter>
  );
}
