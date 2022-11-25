import { WithContext as ReactTags } from "../../hooks/tags/ReactTag";
import { useState } from "react";
import { COUNTRIES } from "../dummy";
import { tags, TagsPropTypes, TagsTypes } from "../../lib/types";

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

const Tags = ({ suggestions }: TagsTypes) => {
  const [tags, setTags] = useState<tags[]>([]);

  const handleDelete = (i: any, event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setTags((currentTags) => currentTags.filter((_, index) => index !== i));
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

  return (
    <ReactTags tags={tags} suggestions={suggestions} delimiters={delimiters} handleDelete={handleDelete} handleAddition={handleAddition} handleDrag={handleDrag} inputFieldPosition="inline" autocomplete editable onTagUpdate={onTagUpdate} />
  );
};

Tags.propTypes = TagsPropTypes;

export default Tags;
