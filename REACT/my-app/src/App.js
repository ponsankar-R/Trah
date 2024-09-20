import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './LOGINCOMP/Login';
// import login_update from './backend/index.js';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Login/>} />
    
    </Routes>
  );
}

export default App;
