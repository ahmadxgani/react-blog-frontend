import PropTypes, { InferProps } from "prop-types";
import { INPUT_FIELD_POSITIONS } from "./constants";

export const SuggestionsPropTypes = {
  query: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  suggestions: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleHover: PropTypes.func.isRequired,
  minQueryLength: PropTypes.number,
  shouldRenderSuggestions: PropTypes.func,
  isFocused: PropTypes.bool.isRequired,
  classNames: PropTypes.object,
  labelField: PropTypes.string.isRequired,
  renderSuggestion: PropTypes.func,
};

export type SuggestionsTypes = InferProps<typeof SuggestionsPropTypes>;

export const TagPropTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  moveTag: PropTypes.func,
  removeComponent: PropTypes.func,
  onTagClicked: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

export type TagTypes = InferProps<typeof TagPropTypes>;

export const ClearAllTagsPropTypes = {
  classNames: PropTypes.object,
  onClick: PropTypes.func,
};

export type ClearAllTagsTypes = InferProps<typeof ClearAllTagsPropTypes>;

export const RemoveComponentPropTypes = {
  className: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  removeComponent: PropTypes.func,
  tag: PropTypes.shape({
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    key: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

export type removeComponentTypes = InferProps<typeof RemoveComponentPropTypes>;

export const ReactTagsPropTypes = {
  placeholder: PropTypes.string,
  labelField: PropTypes.string,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  delimiters: PropTypes.arrayOf(PropTypes.number),
  autofocus: PropTypes.bool,
  inline: PropTypes.bool, // TODO: Remove in v7.x.x
  inputFieldPosition: PropTypes.oneOf([INPUT_FIELD_POSITIONS.INLINE, INPUT_FIELD_POSITIONS.TOP, INPUT_FIELD_POSITIONS.BOTTOM]),
  handleDelete: PropTypes.func,
  handleAddition: PropTypes.func,
  onTagUpdate: PropTypes.func,
  handleDrag: PropTypes.func,
  handleFilterSuggestions: PropTypes.func,
  handleTagClick: PropTypes.func,
  allowDeleteFromEmptyInput: PropTypes.bool,
  allowAdditionFromPaste: PropTypes.bool,
  allowDragDrop: PropTypes.bool,
  handleInputChange: PropTypes.func,
  handleInputFocus: PropTypes.func,
  handleInputBlur: PropTypes.func,
  minQueryLength: PropTypes.number,
  shouldRenderSuggestions: PropTypes.func,
  removeComponent: PropTypes.func,
  autocomplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  readOnly: PropTypes.bool,
  classNames: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.number,
  inputValue: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
    })
  ),
  allowUnique: PropTypes.bool,
  renderSuggestion: PropTypes.func,
  inputProps: PropTypes.object,
  editable: PropTypes.bool,
  clearAll: PropTypes.bool,
  onClearAll: PropTypes.func,
};

export type ReactTagTypes = InferProps<typeof ReactTagsPropTypes>;
