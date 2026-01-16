import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherDetail } from '@pages/home';
import { WeatherSearch } from '@/features/weather-search';
import ThemeController from '@/shared/ui/ThemeController/ThemeController';
import TabWidget from '@/widgets/tabWidget/ui/TabWidget';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ThemeController />
      <Routes>
        <Route path="/" element={<WeatherDetail />} />
        <Route path="/search" element={<WeatherSearch />} />
      </Routes>
      <TabWidget />
    </BrowserRouter>
  );
}
