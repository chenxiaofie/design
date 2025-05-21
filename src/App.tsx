import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import Design from '@/pages/design';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Design />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
