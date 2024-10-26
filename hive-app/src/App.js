import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import Principal from './pages/Principal';
import Grupos from './pages/Grupos';
import SingleGroup from './pages/SingleGroup';
import Login from './pages/Login';
import Calendario from './pages/Calendario';
import Miembros from './pages/Miembros';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Login/>}/> 
      <Route path='/principal' element={<Principal/>}/> 
      <Route path='/grupos-generales' element={<Grupos/>}/> 
      <Route path='/grupo' element={<SingleGroup/>}/>
      <Route path='/calendario' element={<Calendario/>}/> 
      <Route path='/miembros' element={<Miembros/>}/> 
      <Route path="*" element={<Navigate to="/" replace={true} />} exact={true} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
