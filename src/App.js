import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';
function App() {
  const [progress, setProgress] = useState(0)
  const Apikey = process.env.REACT_APP_API_KEY;
  const progressUpdate = (value) =>{
      setProgress(progress + value);
  }
  return (
    <>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <News progress={progressUpdate} Apikey={Apikey}/>
    </>
  );
}

export default App;
