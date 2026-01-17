import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WeatherDetail } from '@pages/home';
import SearchPage from '@/pages/search/ui/SearchPage';
import ThemeController from '@/shared/ui/ThemeController/ThemeController';
import TabWidget from '@/widgets/tabWidget/ui/TabWidget';
import FavoritesPage from '@/pages/favorites/ui/FavoritesPage';

export function AppRouter() {
  return (
    <BrowserRouter>
      <ThemeController />
      <Routes>
        <Route path="/" element={<WeatherDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <TabWidget />
    </BrowserRouter>
  );
}
