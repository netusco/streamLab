import useSWR from 'swr'
import axios from 'axios'
import Link from '@material-ui/core/Link';
import authReqHeader from '../../../utils/authReqHeader'
import { useRouter } from 'next/router'

const fetcher = url => axios.get(url, authReqHeader)
    .then(res => res.data)

const User = () => {
  const router = useRouter()
  const { uId } = router.query
  const { data, error } = useSWR(`http://localhost:3000/api/users/${uId}`, fetcher)

  
  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>


  return <p>User: {data.email}</p>
}

export default User