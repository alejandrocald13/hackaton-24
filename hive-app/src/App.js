import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
// import Principal from './pages/Principal';
import Principal from './pages/Principal';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Principal/>}/> 
      <Route path="*" element={<Navigate to="/" replace={true} />} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
