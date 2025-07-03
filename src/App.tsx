import './App.css'
import AudioInputOutput from './components/AudioInputOutput';
import Metronome from './components/Metronome';
import Waveform from './components/Waveform';
import Tuner from './components/Tuner';
import SaveModal from './components/SaveModal';

function App() {
  
  return (
    <>
      <SaveModal />
      <Waveform />
      <AudioInputOutput />
      <Metronome />
      <Tuner />
    </>
  )
}

export default App
