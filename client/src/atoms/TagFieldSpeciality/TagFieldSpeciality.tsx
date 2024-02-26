import { useEffect, useRef, memo, useState } from 'react'

import Tagify from '@yaireo/tagify'
import {
  TGetAllSpeciality,
  TGetAllStack,
  TIdeasChange,
  TprofileChange,
} from '../../types/types'

import '@yaireo/tagify/src/tagify.scss'
import './TagFieldSpeciality.scss'

const TagFieldSpeciality = ({
  speciality,
  allSpeciality,
  changeSpeciality,
}: {
  speciality: { name: string }[]
  allSpeciality: string[]
  changeSpeciality: React.Dispatch<React.SetStateAction<TprofileChange | null>>
}) => {
  const tagifyRef = useRef(null)
  const [find, setFind] = useState(false)

  useEffect(() => {
    if (tagifyRef.current !== null && (allSpeciality as TGetAllSpeciality)) {
      const tagify = new Tagify(tagifyRef.current, {
        enforceWhitelist: false,
        whitelist: allSpeciality,
        duplicates: true,
        placeholder: 'Введіть технології',
        // editTags: false,
        dropdown: {
          maxItems: 20,
        },
        templates: {
          tag({ value }) {
            return find
              ? `<div class="custom-tag">
 
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="11" stroke="#061730" stroke-width="2"/>
                      </svg>
 
                      <span class="tag-label">${value}</span>
                      
                    </div>`
              : `<div class="custom-tag">
 
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <g clip-path="url(#clip0_168_8867)">
                        <path d="M9.5501 18.0001L3.8501 12.3001L5.2751 10.8751L9.5501 15.1501L18.7251 5.9751L20.1501 7.4001L9.5501 18.0001Z" fill="#061730"/>
                        <circle cx="12" cy="12" r="11" stroke="#061730" stroke-width="2"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_168_8867">
                          <rect width="24" height="24" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
 
                      <span class="tag-label">${value}</span>
                      
                    </div>`

            // <span class="${this.settings.classNames.tagText}">${tagData[this.settings.tagTextProp] || tagData.value}</span>
            // ${this.getAttributes(tagData)}

            // return `<tag class="custom-tag"><i class="custom-icon">X</i>${value}</tag>`;
          },
        },
      })

      tagify.on('add', (e) => {
        if (e.detail.data !== undefined) {
          const addedTags = e.detail.data.value.toUpperCase()

          changeSpeciality((state) =>
            state && state !== null
              ? {
                  ...state,
                  speciality: [
                    ...state.speciality,
                    { name: addedTags.toUpperCase() },
                  ],
                }
              : null
          )
        }
      })

      tagify.on('remove', (e) => {
        if (e.detail.data !== undefined) {
          const deleteTags = e.detail.data.value

          changeSpeciality((state) =>
            state && state !== null
              ? {
                  ...state,
                  speciality: state.speciality.filter(
                    (item) => item.name !== deleteTags
                  ),
                }
              : null
          )
        }
      })
    }
    // eslint-disable-next-line
  }, [])

  const renderTags = () => {
    if (speciality && speciality.length > 0) {
      return speciality.map((item) => item.name)
    } else {
      return []
    }
  }

  return (
    <div className="tags-field-spesiality">
      <textarea
        className="tags-field-spesiality__textarea"
        name=""
        id=""
        value={renderTags()}
        onChange={() => {}}
        ref={tagifyRef}
      ></textarea>
    </div>
  )
}

export default memo(TagFieldSpeciality)
