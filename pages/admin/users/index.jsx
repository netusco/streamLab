import useSWR from 'swr'
import axios from 'axios'
import Link from '@material-ui/core/Link';
import authReqHeader from '../../../utils/authReqHeader'


const fetcher = url => axios.get(url, authReqHeader)
    .then(res => res.data)

const UsersList = (props) => {
  const { data, error } = useSWR('http://localhost:3000/api/users', fetcher)

  
  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <ul>
      {data && data.map(({ email, _id: id }) => (
        <li key={id}>
          <Link href={`/admin/users/${id}`}>
            <a>{`User ${email}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default UsersList;