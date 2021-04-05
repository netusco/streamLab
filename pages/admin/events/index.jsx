import useSWR from 'swr'
import axios from 'axios'
import Link from 'next/link'
import useAuth from '../../../hooks/useAuth'
import authReqHeader from '../../../utils/authReqHeader'

const fetcher = url => axios.get(url, authReqHeader)
    .then(res => res.data)

const EventsList = (props) => {
  const { user } = useAuth()
  const { data, error } = useSWR('http://localhost:3000/api/events', fetcher)

  
  if (error) return <div>Failed to load events</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data && data.map(({ email, _id: id }) => (
        <li key={id}>
          <Link href={`/admin/events/${id}`}>
            <a>{`User ${email}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default EventsList;