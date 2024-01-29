import { FC } from 'react'
import './IdeasOrTalentNotFind.scss'

const IdeasOrTalentNotFind: FC<{
  searchQuery: string
  isTalent: boolean
}> = ({ searchQuery, isTalent }) => {
  return (
    <h1 className="ideas-or-talent-not-find">
      {`Нажаль, за вашим запитом "${searchQuery}" ${
        isTalent ? 'таланти' : 'ідеї'
      } не знайдені`}
    </h1>
  )
}

export default IdeasOrTalentNotFind
