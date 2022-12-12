import React, {useState, useEffect} from 'react'
import '../../App.css'
import Input from '../UI/Input/Input'
import Select from '../UI/Select/Select'
import { Option, UserT } from '../../types/types'
import { deleteUser, setUsers, useCurrentUsers } from '../../hooks/useUsers'


type UserComponentProps = {
  id: number
  availableColors: Array<Option>
  availableVariants: Array<Option>
  onVariantPicked: (variant: string) => void
  onColorPicked: (color: string) => void
}

const User: React.FC<UserComponentProps> = ({id, availableColors, availableVariants, onVariantPicked, onColorPicked}) => {

    const users = useCurrentUsers()

    const [userData, setUserData] = useState <UserT >({
      id,
      userName: '',
      color: '',
      type: '',
      status: false
    })

    const onInputChage = (e: any) => {
      setUserData({
        ...userData, 
        userName: e.target.value
      })
    }
    const onColorChange = (color: string) => {
      setUserData({
        ...userData, 
        color
      })
    }
    const onTypeChange = (type: string) => {
      setUserData({
        ...userData, 
        type
      })
    }
    const formAccept = (e: any) => {
      setUserData({
        ...userData, 
        status: !userData.status,
      })
      e.preventDefault()
    }

    useEffect(() => {
      if (users && userData.status && !users.get(userData.type)) {
        setUsers(userData.type, userData)
        // onColorPicked(userData.color)
        // onVariantPicked(userData.type)
      } else if (users && !userData.status) {
        deleteUser(userData.type)
      }
    }, [userData.status])

    return (
        <div className='user'>
          <h1>{userData.userName || 'Игрок ' + id}</h1>
          <div>
            <form onSubmit={formAccept}>
              <span>Введите ваше имя</span>
              <Input 
                name='userName'
                value={userData.userName}
                onChange={onInputChage}
                required={true}
              />
              <Select
                value={userData.color}
                onChange={onColorChange}
                options={availableColors}
                defaultValue='Выбрите ваш цвет'
                required={true}
              />
              <Select
                value={userData.type}
                onChange={onTypeChange}
                options={availableVariants}
                defaultValue='Выберите X или О'
                required={true}
              />
              <button type="submit">
                {!userData.status ? 'Готов': 'Не готов'}
              </button>
            </form>
          </div>
        </div>
    );
};

export default User;