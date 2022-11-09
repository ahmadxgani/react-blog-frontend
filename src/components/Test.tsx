import { WithContext as ReactTags } from "../hooks/tags/ReactTag";
import { useState } from "react";
import { COUNTRIES } from "./dummy";

const suggestions = COUNTRIES.map((country) => {
  return {
    id: country,
    text: country,
  };
});

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Test = () => {
  const [tags, setTags] = useState([
    { id: "Thailand", text: "Thailand" },
    { id: "India", text: "India" },
    { id: "Vietnam", text: "Vietnam" },
    { id: "Turkey", text: "Turkey" },
  ]);

  const handleDelete = (i: any, event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setTags((currentTags) => currentTags.filter((tag, index) => index !== i));
  };

  const onTagUpdate = (i: any, newTag: any) => {
    setTags((currentTags) => {
      const updatedTags = currentTags.slice();
      updatedTags.splice(i, 1, newTag);
      return updatedTags;
    });
  };

  const handleAddition = (tag: any) => {
    setTags((currentTags) => [...currentTags, tag]);
  };

  const handleDrag = (tag: any, currPos: any, newPos: any) => {
    // re-render
    setTags((currentTags) => {
      const newTags = currentTags.slice();
      newTags.splice(newPos, 0, newTags.splice(currPos, 1)[0]);

      return newTags;
    });
  };

  const handleTagClick = (index: any) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };
  return (
    <div className="app">
      <h1 className="text-lg"> React Tags Example </h1>
      <div>
        <ReactTags
          tags={tags}
          suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
          editable
          clearAll
          onClearAll={onClearAll}
          onTagUpdate={onTagUpdate}
        />
      </div>
    </div>
  );
};
export default Test;
