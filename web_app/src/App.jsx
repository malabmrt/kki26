import Navbar from "./Components/Navbar"
import { Routes,Route } from "react-router";
import logobmrt from './assets/bmrt.png';
import logopolbat from './assets/polbat.png';
import LintasanA from './routes/LintasanA';
import LintasanB from './routes/LintasanB';
import Kolsu from './routes/Kolsu';

function App(){
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-50">

        <header className="bg-white py-4 px-6 md:px-12 border-b border-gray-200">
          
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-6">
            <div className="flex-shrink-0">
              <img 
                src={logopolbat} 
                alt="Logo polbat"
                className="h-20 w-auto object-contain" 
              />
            </div>
            <div className="flex flex-1 justify-between items-center mx-8">
              <h1 className="text-xl font-extrabold tracking-wide text-gray-900 text-left">
                POLITEKNIK NEGERI BATAM
              </h1>
              
              <h1 className="text-xl font-extrabold tracking-wide text-gray-900 text-right">
                BARELANG MARINE ROBTICS TEAM
              </h1>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={logobmrt}
                alt="Logo bmrt" 
                className="h-20 w-auto object-contain" 
              />
            </div>
          </div>

        </header>
        
        <Navbar />
        <Routes>
          <Route path="/Lintasan A" element={<LintasanA />}/>
          <Route path="/Lintasan B" element={<LintasanB />}/>
          <Route path="/Kolsu" element={<Kolsu />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;