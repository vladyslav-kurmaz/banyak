import DisplayDateFromDB from '../../atoms/DisplayDateFromDB/DisplayDateFromDB'
import ViewsIconAndQuantity from '../../atoms/ViewsIconAndQuantity/ViewsIconAndQuantity'
import plugIcon from '../../image/logo/small_logo.webp'

const IdeaDescriptionPage = () => {
  return (
    <div>
      <div className="idea__img">
        <img src={plugIcon} alt="logo for idea" className="idea__img-picture" />
      </div>
      <h4>Потрібні фахівці:</h4>
      <p>UI/UX designer</p>
      <h1>Мобільний застосунок для домогосподарок</h1>
      <p>
        Шукаю UI/UX дизайнера щоб розробити мобільний застосунок, для
        домогосподарок, під ios платформу.
      </p>
      <h4>Потрібні технології</h4>
      <p>Figma A/B testing Adobe ILLustrator</p>
      <ViewsIconAndQuantity viewsQuantity={10} />
      <DisplayDateFromDB date={'2023-12-05T08:53:07.571657Z'} />
    </div>
  )
}

export default IdeaDescriptionPage
