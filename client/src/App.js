import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Quiz from './components/Quiz';
import Result from './components/Result';
import SharedResult from './components/SharedResult';
import Today from './components/Today';
import { CheckUserExist } from './helper/helper';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/quiz" element={<CheckUserExist><Quiz /></CheckUserExist>} />
        <Route path="/result" element={<CheckUserExist><Result /></CheckUserExist>} />
        <Route path="/share/:code" element={<SharedResult />} />
        <Route path="/today" element={<Today />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
