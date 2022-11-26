import { useDrag, useDrop } from "react-dnd";
import ClassNames from "classnames";

import RemoveComponent from "./RemoveComponent";
import { useRef } from "react";
import { canDrag, canDrop } from "../../lib/utils";
import { TagPropTypes, TagTypes } from "../../lib/types";

const ItemTypes = { TAG: "tag" };

const Tag = (props: TagTypes) => {
  const tagRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TAG,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    item: props,
    canDrag: () => canDrag(props),
  }));

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.TAG,
    drop: (item: any) => {
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return;
      }

      props.moveTag!(dragIndex, hoverIndex);
    },
    canDrop: (item) => canDrop(item),
  }));

  drag(drop(tagRef));

  const label = props.tag[props.labelField];
  const opacity = isDragging ? 0 : 1;
  const tagComponent = (
    <span
      ref={tagRef}
      className={ClassNames("tag-wrapper", (props.classNames as any).tag)}
      style={{
        opacity,
        cursor: canDrag(props) ? "move" : "auto",
      }}
      onClick={props.onTagClicked as React.MouseEventHandler<HTMLSpanElement>}
      onTouchStart={props.onTagClicked as React.TouchEventHandler<HTMLSpanElement>}
    >
      {label}
      <RemoveComponent tag={props.tag} className={(props.classNames as any).remove} removeComponent={props.removeComponent} onRemove={props.onDelete} readOnly={props.readOnly} index={props.index} />
    </span>
  );
  return tagComponent;
};

Tag.propTypes = TagPropTypes;

Tag.defaultProps = {
  labelField: "name",
  readOnly: false,
};

export default Tag;
