import { ClearAllTagsPropTypes, ClearAllTagsTypes } from "../../lib/types";

const ClearAllTags = (props: ClearAllTagsTypes) => {
  return (
    <button className={(props.classNames as any).clearAll} onClick={props.onClick as React.MouseEventHandler<HTMLButtonElement>}>
      Clear all
    </button>
  );
};

ClearAllTags.propTypes = ClearAllTagsPropTypes;

export default ClearAllTags;
