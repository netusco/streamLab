import { useContext } from 'react';

import UserContext from '../components/UserContext';


const useUser = () => {
    return useContext(UserContext)
}

export default useUser