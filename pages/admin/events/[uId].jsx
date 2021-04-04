import useSWR from 'swr'
import axios from 'axios'
import authReqHeader from '../../../utils/authReqHeader'
import { useRouter } from 'next/router'

const fetcher = url => axios.get(url, authReqHeader)
    .then(res => res.data)

const Event = () => {
  const router = useRouter()
  const { uId } = router.query
  const { data, error } = useSWR(`http://localhost:3000/api/events/${uId}`, fetcher)

  
  if (error) return <div>Failed to load event</div>
  if (!data) return <div>Loading...</div>


  return <p>Event: {data.email}</p>
}

export default Event