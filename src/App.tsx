import './App.css'
import AudioInputOutput from './components/AudioInputOutput';
import Metronome from './components/Metronome';
import Waveform from './components/Waveform';
import Tuner from './components/Tuner';

function App() {
  
  return (
    <>
      <Waveform />
      <AudioInputOutput />
      <Metronome />
      <Tuner />
    </>
  )
}

export default App
