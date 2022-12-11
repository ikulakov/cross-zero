import React, {useState} from 'react';
import './App.css';
import Game from './components/Game/Game';
import Registration from './components/Registration/Registration';

function App() {
  const [appStatus, setAppStatus] = useState<string> ('init')

  return (
    appStatus === 'init'
      ? <Registration onStartGame={() => setAppStatus('inProgress')} />
      : <Game />
  )
}

export default App;
