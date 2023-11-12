import { useEffect, useRef } from "react";

import Tags from "@yaireo/tagify/dist/react.tagify";
// import { TagifySettings, TagData, AddEventData  } from "@yaireo/tagify";
import Tagify from "@yaireo/tagify";

import ServiceBanyak from "../../service/ServiceBanyak";

// import 'tagify/dist/tagify.css';
import "@yaireo/tagify/src/tagify.scss";
import "./TagsField.scss";
import { TUserProfile, TprofileChange } from "../../types/types";

// const initialValue = ["qa", "front", "back", "design"];

const TagsField = ({
  stackUser,
  allStack,
  changeStack
}: {
  stackUser: { name: string }[];
  allStack: { name: string; id: string }[];
  changeStack: React.Dispatch<React.SetStateAction<TprofileChange>>
}) => {
  const { workWithAllStack } = ServiceBanyak();

  

  const tagifyRef = useRef(null);

  useEffect(() => {
    // Ініціалізація бібліотеки Tagify

    console.log(allStack);

    if (tagifyRef.current !== null && allStack.length > 1) {
      const tagify = new Tagify(tagifyRef.current, {
        enforceWhitelist: true, // Дозволяє додавати тільки технології з білих списків
        whitelist: allStack.map((item) => item.name),
        // ['sdf', 'sdf'],
        // stackList(),

        // ['React', 'JavaScript', 'HTML', 'CSS', 'Adobe Ilistratore'], // Список доступних технологій
        placeholder: "Введіть технології",
        dropdown: {
          maxItems: 20, // Максимальна кількість елементів в спадному списку
        },
      });

      tagify.on("add", (e) => {

        if (e.detail.data !== undefined ) {
          
          const addedTags = e.detail.data.value
          const searchId = allStack.filter(item => {
            if (item.name === addedTags) {
              return item
            }
          })
          console.log(searchId);
          

            changeStack(stack => ({
              ...stack,
              stack: [...stack.stack, searchId[0]]
            }))
          // }
          
          
          // 
          // workWithAllStack('stack-list/', 'PUT', searchId[0])
          //   .then(res => console.log(res))

        }
      });
    }
  });
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
        value={stackUser.map(item => item.name)}
        onChange={() => {''}}
        ref={tagifyRef}
      ></textarea>
    </div>
  );
};

export default TagsField;
