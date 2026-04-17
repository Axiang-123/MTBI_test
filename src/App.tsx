import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

// 懒加载组件
const TestModeSelection = lazy(() => import('./pages/TestModeSelection'));
const TestPage = lazy(() => import('./pages/TestPage'));
const ResultPage = lazy(() => import('./pages/ResultPage'));

// 大五人格测试组件
const BigFiveTestModeSelection = lazy(() => import('./pages/BigFiveTestModeSelection'));
const BigFiveTestPage = lazy(() => import('./pages/BigFiveTestPage'));
const BigFiveResultPage = lazy(() => import('./pages/BigFiveResultPage'));

function App() {
  return (
    <Router>
      <div className="decorative-bg"></div>
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div><p className="text-gray-600">加载中...</p></div></div>}>
        <Routes>
          {/* MBTI测试路由 */}
          <Route path="/" element={<TestModeSelection />} />
          <Route path="/test/:mode" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          
          {/* 大五人格测试路由 */}
          <Route path="/big-five" element={<BigFiveTestModeSelection />} />
          <Route path="/big-five/test/:mode" element={<BigFiveTestPage />} />
          <Route path="/big-five/result" element={<BigFiveResultPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;