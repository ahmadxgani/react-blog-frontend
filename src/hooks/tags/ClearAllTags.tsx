import { ClearAllTagsPropTypes, ClearAllTagsTypes } from "../../lib/types";

const ClearAllTags = (props: ClearAllTagsTypes) => {
  return (
    <button className="p-1 rounded bg-[#57b3f4] text-white uppercase" onClick={props.onClick as React.MouseEventHandler<HTMLButtonElement>}>
      Clear all
    </button>
  );
};

ClearAllTags.propTypes = ClearAllTagsPropTypes;

export default ClearAllTags;
