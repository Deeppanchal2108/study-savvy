
import { useParams } from 'react-router-dom'
import InfoPart from '@/components/profile/info-part'
function ProfilePage() {
    const {id}=  useParams()

  return (
    <div>
          <InfoPart/>
          Id here is {id}
    </div>
  )
}

export default ProfilePage
