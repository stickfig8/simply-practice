import './App.css'
import AudioInputOutput from './components/AudioInputOutput';
import Metronome from './components/Metronome';
import Waveform from './components/Waveform';

function App() {
  
  return (
    <>
      <Waveform />
      <AudioInputOutput />
      <Metronome />
    </>
  )
}

export default App
