import logo from './logo.svg';
import './App.css';
import NavBar from './components/navbar/NavBar';
import PredictorPage from './pages/predictor/PredictorPage';
import CurrentValuesPage from './pages/currentvalues/CurrentValuesPage';
import HistogramPage from './pages/histogram/HistogramPage';
import ScatterPlotPage from './pages/scatterplot/ScatterPlotPage';
import HeatMapPage from './pages/heatmap/HeatMapPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' exact element={<PredictorPage/>}/>
        <Route path='/currentvalues' element={<CurrentValuesPage/>} />
        <Route path='/histogram' element={<HistogramPage/>} />
        <Route path='/scatterplot' element={<ScatterPlotPage/>} />
        <Route path='/heatmap' element={<HeatMapPage/>} />
      </Routes>
    </div>
  );
}

export default App;
