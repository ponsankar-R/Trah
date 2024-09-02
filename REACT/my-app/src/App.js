import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './LOGINCOMP/Login';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Login/>} />
    
    </Routes>
  );
}

export default App;
