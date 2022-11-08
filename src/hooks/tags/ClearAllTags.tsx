import { ClearAllTagsPropTypes, ClearAllTagsTypes } from "../../lib/types";

const ClearAllTags = (props: ClearAllTagsTypes) => {
  return (
    <button className={props.classNames.clearAll} onClick={props.onClick}>
      Clear all
    </button>
  );
};

ClearAllTags.propTypes = ClearAllTagsPropTypes;

export default ClearAllTags;
