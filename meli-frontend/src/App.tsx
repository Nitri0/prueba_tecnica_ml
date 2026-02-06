import { Routes, Route } from 'react-router-dom';
import { ProductDetailPage } from '@/pages/ProductDetailPage';

function App() {
  return (
    <Routes>
      {/* Ruta de detalle de producto con layout propio (estilo ML) */}
      <Route path="/producto/:productId" element={<ProductDetailPage />} />
    </Routes>
  );
}

export default App;
