import { useEffect, useRef, memo } from "react";

import Tagify from "@yaireo/tagify";
import { TGetAllStack, TprofileChange } from "../../types/types";

import "@yaireo/tagify/src/tagify.scss";
import "./TagsField.scss";


const TagsField = ({
  stackUser,
  allStack,
  changeStack
}: {
  stackUser: {name: string}[];
  allStack: string[];
  changeStack: React.Dispatch<React.SetStateAction<TprofileChange | null>>
}) => {

  const tagifyRef = useRef(null);  

  

  useEffect(() => {
    if (tagifyRef.current !== null && allStack as TGetAllStack ) {
      const tagify = new Tagify(tagifyRef.current, {
        enforceWhitelist: false,
        whitelist: allStack,
  
        placeholder: "Введіть технології",
        dropdown: {
          maxItems: 20, 
        },
      });      
  
      tagify.on("add", (e) => {  
  
        if (e.detail.data !== undefined ) {
  
          const addedTags = e.detail.data.value;             
          
          changeStack(state => state && state !== null ? 
            ({
              ...state,
              stack: [...state.stack, {name: addedTags.toLocaleUpperCase()}]
            })
            :
            null
          )
        }
      });
  
      tagify.on("remove", (e) => {
  
        if (e.detail.data !== undefined ) {
          
          const deleteTags = e.detail.data.value           
          
          changeStack(state => state && state !== null ? 
            ({
              ...state,
              stack: state.stack.filter(item => item.name !== deleteTags)
            })
            :
            null
          )
        }
      });  
    } 
    // eslint-disable-next-line
  }, []);
 
  const renderTags = () => {
    if (stackUser.length > 0) {
      return stackUser.map((item) => item.name)
    } else {
      return []
    }
  }

  return (
    <div className="tags-field">
      <textarea
        className="tags-field__textarea"
        name=""
        id=""
        value={renderTags()}
        onChange={() => {''}}
        ref={tagifyRef}
      ></textarea>
    </div>
  );
};

export default memo(TagsField) ;
