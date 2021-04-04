import RequireAuthentication from '../utils/RequireAuthentication'
import useUser from '../hooks/useUser'

const Profile = () => {
    const { user } = useUser()

    return (<div>name: {user?.firstName}</div>)
}

export default RequireAuthentication(Profile);