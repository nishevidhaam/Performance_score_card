
import PerformanceScorecard from './PerformanceScorecard';
import LoginPage from './LoginPage';
import {Chartcomp} from './Chartcomp';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import WelcomePage from './WelcomePage';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<WelcomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/PerformanceScorecard" element={<PerformanceScorecard/>} />

      
      </Routes>
      
    </BrowserRouter>
    {/* <Chartcomp /> */}
    </div>
  );
}
export default App;
