import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SelectImage from './components/SelectImage';
import EditImage from './components/EditImage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelectImage />} />
        <Route path="/edit" element={<EditImage />} />
      </Routes>
    </Router>
  );
}

export default App;