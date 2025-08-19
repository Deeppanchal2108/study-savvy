import InfoPart from '@/components/profile/info-part'
import { getCurrentUserId } from '@/lib/userId'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ProfilePage() {
  const userId = getCurrentUserId()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userId) {
      
      navigate('/login')
    }
  }, [userId, navigate])

  if (!userId) {

    return <div>No user logged in. Please log in to view your profile.</div>
  }


  return (
    <div>
      <InfoPart userId={userId} />
  
    </div>
  )
}

export default ProfilePage
