type ValidateIdeaPropsType = {
  title: string
  description: string
  specialization: string[]
  stack: string[]
  setError: React.Dispatch<
    React.SetStateAction<{ error: boolean; message: string }>
  >
}

const validateIdea = ({
  title,
  description,
  specialization,
  stack,
  setError,
}: ValidateIdeaPropsType): boolean => {
  const TITLE_LENGTH = 4
  const DESCRIPTION_LENGTH = 50
  const STACK_LENGTH = 1
  const SPECIALIZATION_LENGTH = 1
  if (title.length < TITLE_LENGTH) {
    setError({
      error: true,
      message: `Назва має містити принаймні ${TITLE_LENGTH} символів`,
    })
    return false
  }

  if (description.length < DESCRIPTION_LENGTH) {
    setError({
      error: true,
      message: `Поле "Про ідею" має бути не менше ${DESCRIPTION_LENGTH} символів`,
    })
    return false
  }

  if (specialization.length < SPECIALIZATION_LENGTH) {
    setError({
      error: true,
      message: `Поле "Потрібні фахівці" повинно включати мінімум ${SPECIALIZATION_LENGTH} фахівця`,
    })
    return false
  }

  if (stack.length < STACK_LENGTH) {
    setError({
      error: true,
      message: `Поле "Потрібні технології" повинно включати мінімум ${STACK_LENGTH} технологію`,
    })
    return false
  }
  return true
}

export default validateIdea
