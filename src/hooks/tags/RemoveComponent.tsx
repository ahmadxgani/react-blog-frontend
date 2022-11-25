import { KEYS } from "./ReactTag";
import { RemoveComponentPropTypes, removeComponentTypes } from "../../lib/types";

const crossStr = String.fromCharCode(215);
const RemoveComponent = (props: removeComponentTypes) => {
  const { readOnly, removeComponent, onRemove, className, tag, index } = props;

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
  if (removeComponent) {
    const Component = removeComponent;
    return <Component onRemove={onRemove} onKeyDown={onKeydown} className={className} aria-label={ariaLabel} tag={tag} index={index} />;
  }

  return (
    <button onClick={(event) => onRemove(event)} onKeyDown={onKeydown} className={className as string} type="button" aria-label={ariaLabel}>
      {crossStr}
    </button>
  );
};

RemoveComponent.propTypes = RemoveComponentPropTypes;

export default RemoveComponent;
