import { Routes, Route } from 'react-router';
import Home from './pages/Home';
import HallGuide from './pages/HallGuide';
import HallDetail from './pages/HallDetail';
import Encyclopedia from './pages/Encyclopedia';
import SpeciesDetail from './pages/SpeciesDetail';
import KnowledgeCards from './pages/KnowledgeCards';
import Assistant from './pages/Assistant';
import Stories from './pages/Stories';
import StoryDetail from './pages/StoryDetail';
import SearchPage from './pages/Search';
import Profile from './pages/Profile';
import NavigationMenu from './components/NavigationMenu';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/halls" element={<HallGuide />} />
        <Route path="/halls/:id" element={<HallDetail />} />
        <Route path="/encyclopedia" element={<Encyclopedia />} />
        <Route path="/species/:id" element={<SpeciesDetail />} />
        <Route path="/cards" element={<KnowledgeCards />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <NavigationMenu />
    </>
  );
}
