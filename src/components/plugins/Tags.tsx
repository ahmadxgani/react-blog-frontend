import { WithContext as ReactTags } from "../../hooks/tags/ReactTag";
import { TagsPropTypes, TagsTypes } from "../../lib/types";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const Tags = ({ suggestions, tags, setTags }: TagsTypes) => {
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
