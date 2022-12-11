import React, {useState, useEffect} from 'react'
import { UserT } from '../../types/types'
import Item from './Item'
import { checkWinner } from './checkWinner'
import Button from '../UI/Button/Button'
import { useCurrentUsers } from '../../hooks/useUsers';

const Game: React.FC = () => {
  const users = useCurrentUsers()
  const [board, setBoard] = useState <Array <string | null>> (Array(9).fill(null))
  const [activePlayer, setActivePlayer] = useState <UserT> (users.get('X') as UserT)
  const [winner, setWinner] = useState <string | null> (null)
  const [step, setStep] = useState(0)

  const onItemClick = (e: any, index: number) => {

    if (e.currentTarget.innerText.length < 1 && !winner) {
      const boardCopy = [...board]

      boardCopy[index] = activePlayer.type
      setBoard(boardCopy)

      if (activePlayer.type === 'X') {
        setActivePlayer(users.get('O') as UserT)
      } else {
        setActivePlayer(users.get('X') as UserT)
      }
      setStep(step + 1)
    }
  }

  const onRestartGame = () => {
    setWinner('')
    setActivePlayer(users.get('X') as UserT)
    setStep(0)
    setBoard(Array.from({length: 9}, i => null))
  }

  useEffect(() => {
    if (checkWinner(board)) {
      setWinner(checkWinner(board))
    } else if (step === 9) {
      setWinner('Ничья')
    }
  }, [board, step])

  return (
    <div>
      <div className='game-wrapper'>
        {winner ? (
            <div className='information'>
              Победил: {winner}
              <Button onClick={() => onRestartGame()}>Начать заново</Button>
            </div>
          )
          : <div className='information' style={{backgroundColor: activePlayer.color}}>
              Сейчас ходит: {activePlayer.userName} ({activePlayer.type}) 
            </div>
        }
        {board.map( (val, key) => {
          return (
              <Item 
                  key={key}
                  onClick={(e: React.MouseEvent) => onItemClick(e, key)}
                  value={val}
              />
          )
        })}
      </div>
    </div>
  );
};

export default Game;