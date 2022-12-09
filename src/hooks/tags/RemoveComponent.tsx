import { KEYS } from "./ReactTag";
import { RemoveComponentPropTypes, removeComponentTypes } from "../../lib/types";
import { XCircleIcon } from "@heroicons/react/24/solid";

const RemoveComponent = (props: removeComponentTypes) => {
  const { readOnly, onRemove, tag, index } = props;

  const onKeydown = (event: any) => {
    if (KEYS.ENTER.includes(event.keyCode) || event.keyCode === KEYS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (event.keyCode === KEYS.BACKSPACE) {
      onRemove(event);
    }
  };

  if (readOnly) {
    return <span />;
  }

  const ariaLabel = `Tag at index ${index} with value ${tag.name} focussed. Press backspace to remove`;
  return <XCircleIcon onClick={(event) => onRemove(event)} onKeyDown={onKeydown} type="button" aria-label={ariaLabel} className="w-5 cursor-pointer" />;
};

RemoveComponent.propTypes = RemoveComponentPropTypes;

export default RemoveComponent;
