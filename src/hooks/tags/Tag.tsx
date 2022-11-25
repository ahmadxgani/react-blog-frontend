// @ts-nocheck
import { useDrag, useDrop } from "react-dnd";
import ClassNames from "classnames";

import RemoveComponent from "./RemoveComponent";
import { useRef } from "react";
import { canDrag, canDrop } from "../../lib/utils";
import { TagPropTypes, TagTypes } from "../../lib/types";

const ItemTypes = { TAG: "tag" };

const Tag = (props: TagTypes) => {
  const tagRef = useRef(null);
  const { readOnly, tag, classNames, index } = props;

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
    drop: (item: any, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      props.moveTag!(dragIndex, hoverIndex);
    },
    canDrop: (item) => canDrop(item),
  }));

  drag(drop(tagRef));

  const label = tag[props.labelField as string];
  const opacity = isDragging ? 0 : 1;
  const tagComponent = (
    <span
      ref={tagRef}
      className={ClassNames("tag-wrapper", (classNames as any).tag)}
      style={{
        opacity,
        cursor: canDrag(props) ? "move" : "auto",
      }}
      onClick={props.onTagClicked as React.MouseEventHandler<HTMLSpanElement>}
      onTouchStart={props.onTagClicked as React.TouchEventHandler<HTMLSpanElement>}
    >
      {label}
      <RemoveComponent tag={props.tag} className={(classNames as any).remove} removeComponent={props.removeComponent} onRemove={props.onDelete} readOnly={readOnly} index={index} />
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
