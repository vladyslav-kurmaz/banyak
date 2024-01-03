import { v4 as uuidv4 } from 'uuid'

import './RenderStack.scss'

function RenderStack({
  stack,
  stackItemsQuantity = 5,
}: {
  stack: { name: string }[]
  stackItemsQuantity?: number
}) {
  if (stack.length > stackItemsQuantity) {
    return (
      <>
        {stack.map((technology, i) =>
          i < stackItemsQuantity ? (
            <span
              className="idea-talent-stack-item"
              key={uuidv4()}
            >{`+${technology.name}`}</span>
          ) : (
            ''
          )
        )}
        <span className="idea-talent-stack-item__dots">...</span>
      </>
    )
  } else if (stack.length < stackItemsQuantity && stack.length > 0) {
    return (
      <>
        {stack.map((technology) => (
          <span
            className="idea-talent-stack-item"
            key={uuidv4()}
          >{`+${technology.name}`}</span>
        ))}
      </>
    )
  } else {
    return null
  }
}

export default RenderStack
