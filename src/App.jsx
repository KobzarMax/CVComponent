import {CV} from "./components/CV.jsx";
import data from '../data.json';

function App() {
  return (
      <div className='container'>
        <CV data={data} />
      </div>
  )
}

export default App
