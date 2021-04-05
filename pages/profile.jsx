import useAuth from '../hooks/useAuth'

const Profile = () => {
    const { user } = useAuth()

    return (<div>name: {user?.firstName}</div>)
}

export default Profile;