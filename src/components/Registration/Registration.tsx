import React, {useState} from 'react'
import Button from '../UI/Button/Button'
import User from './User'
import { useCurrentUsers } from '../../hooks/useUsers'

interface RegistrationProps {
    onStartGame: () => void
}

export const colors = [
    {name: 'Белый', value: '#fff'},
    {name: 'Синий', value: 'cyan'},
    {name: 'Черный', value: '#000'},
    {name: 'Красный', value: 'red'},
    {name: 'Зеленый', value: 'green'},
]
export const variants = [
    {name: 'X', value: 'X'}, 
    {name: 'O', value: 'O'},
]

const Registration: React.FC<RegistrationProps> = ({ onStartGame }) => {

    const users = useCurrentUsers()
    const usersCount = new Array(2).fill('')

    const [availableColors, setAvailableColors] = useState(colors)
    const [availableVariants, setAvailabaleVariants] = useState(variants)

    const onColorPicked = (color: string) => {
        setAvailableColors(availableColors.filter(c => c.value !== color))
    }
    const onVariantPicked = (variant: string) => {
        setAvailabaleVariants(availableVariants.filter(v => v.value !== variant))
    }
    const canStart = () => {
        return users.size === 2 ? false : true
    }

    return (
        <div>
            <div className="App">
            {usersCount.map((_, i) => (
                <User 
                    key={i} 
                    id={++i} 
                    availableColors={availableColors} 
                    onColorPicked={onColorPicked} 
                    availableVariants={availableVariants} 
                    onVariantPicked={onVariantPicked} 
                />
            ))}
            </div>
            <Button 
                style={{bottom: '50px', position: 'absolute'}} 
                onClick={onStartGame} 
                disabled={canStart()}
            >
                Начать игру
            </Button>
      </div>
    );
};

export default Registration;