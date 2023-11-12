import { useEffect, useRef } from "react";

import Tags from "@yaireo/tagify/dist/react.tagify";
// import { TagifySettings, TagData, AddEventData  } from "@yaireo/tagify";
import Tagify from '@yaireo/tagify';
// import 'tagify/dist/tagify.css';
import '@yaireo/tagify/src/tagify.scss'
import './TagsField.scss';

const initialValue = [
  'qa',
  'front',
  'back',
  'design'
];


const TagsField = () => {

  const tagifyRef = useRef(null);

  useEffect(() => {
    // Ініціалізація бібліотеки Tagify

    if (tagifyRef.current !== null) {
      const tagify = new Tagify(tagifyRef.current, {
        enforceWhitelist: true, // Дозволяє додавати тільки технології з білих списків
        whitelist: ['React', 'JavaScript', 'HTML', 'CSS', 'Adobe Ilistratore'], // Список доступних технологій
        placeholder: "Введіть технології",
        dropdown: {
          maxItems: 20, // Максимальна кількість елементів в спадному списку
        },
      });

      tagify.on('add', e => {
        if (e.detail.data !== undefined && Array.isArray(e.detail.data)) {
          const addedTags = e.detail.data.map(tag => tag.value);
          console.log('Додано технології:', addedTags);
        }
        
      });
    }

    
  })
  // const baseTagifySettings: TagifySettings<TagData> = {
  //   blacklist: [],
  //   // maxTags: 6,
  //   backspace: false,
  //   whitelist: initialValue,
  //   placeholder: "Введіть технології",
  //   // editTags: 1,
  //   classNames: {},
  //   dropdown: {
  //     enabled: 0
  //   },
  //   callbacks: {}
  // };

  // const handleChange = (e: CustomEvent<AddEventData<TagData>>) => {
  //   // console.log(e.type, " ==> ", e.detail.tagify.value.map(item => item.value));
  // };

  // const settings: TagifySettings<TagData> = {
  //   ...baseTagifySettings,
  //   // whitelist: suggestions,
  //   callbacks: {
  //     add: handleChange,
  //     remove: handleChange,
  //     // blur: handleChange,
  //     // edit: handleChange,
  //     invalid: handleChange,
  //     click: handleChange,
  //     // focus: handleChange,
  //     "edit:updated": handleChange,
  //     "edit:start": handleChange
  //   }
  // };

  

  return (
    <div className="tags-field">
      {/* <Tags settings={settings}  showDropdown='true'/> */}
      <textarea 
        className="tags-field__textarea" 
        name="" 
        id="" 
        ref={tagifyRef}
        
      >

      </textarea>
    </div>
  )
}

export default TagsField;