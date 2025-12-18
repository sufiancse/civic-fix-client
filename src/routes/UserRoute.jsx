import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Shared/LoadingSpinner'

const UserRoute = ({ children }) => {
  const {role, isRoleLoading} = useRole()

  if (isRoleLoading) return <LoadingSpinner />
  if (role === 'citizen') return children
  return <Navigate to='/' replace='true' />
}

export default UserRoute