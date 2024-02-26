import useUUID from '../../hooks/useUUID'

import './RenderStack.scss'

function RenderStack({
  stack,
  stackItemsQuantity = 5,
}: {
  stack: { name: string }[]
  stackItemsQuantity?: number
}) {
  const stackKeys = useUUID(stack.length)
  if (stack.length > stackItemsQuantity) {
    return (
      <>
        {stack.map((technology, i) =>
          i < stackItemsQuantity ? (
            <span
              className="idea-talent-stack-item"
              key={stackKeys[i]}
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
        {stack.map((technology, index) => (
          <span
            className="idea-talent-stack-item"
            key={stackKeys[index]}
          >{`+${technology.name}`}</span>
        ))}
      </>
    )
  } else {
    return null
  }
}

export default RenderStack
