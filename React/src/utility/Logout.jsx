import { useNavigate } from 'react-router-dom'

const OnLogOut = () => {
    const navigate = useNavigate()  
    sessionStorage.removeItem('token')
    navigate('/')
}

export default OnLogOut