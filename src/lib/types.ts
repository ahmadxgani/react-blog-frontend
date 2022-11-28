import PropTypes, { InferProps } from "prop-types";
import { INPUT_FIELD_POSITIONS } from "./constants";

export interface HandleData {
  title: string;
  content: string;
  slug: string;
}

export interface SelectedTag {
  name: string;
  id: number;
}

export type Pages = {
  label: string;
  path: string;
}[];

export interface EditorProps {
  handleData: (data: HandleData) => void;
  content?: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface ReactTagsState {
  suggestions: any;
  query: string;
  isFocused: boolean;
  selectedIndex: number;
  selectionMode: boolean;
  currentEditIndex: number;
}

export const SuggestionsPropTypes = {
  setSuggestions: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  suggestions: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleHover: PropTypes.func.isRequired,
  minQueryLength: PropTypes.number.isRequired,
  shouldRenderSuggestions: PropTypes.func,
  isFocused: PropTypes.bool.isRequired,
  classNames: PropTypes.object.isRequired,
  labelField: PropTypes.string.isRequired,
  renderSuggestion: PropTypes.func,
};

export type SuggestionsTypes = InferProps<typeof SuggestionsPropTypes>;

export const TagPropTypes = {
  labelField: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  tag: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  moveTag: PropTypes.func,
  removeComponent: PropTypes.func,
  onTagClicked: PropTypes.func,
  classNames: PropTypes.object,
  readOnly: PropTypes.bool,
  index: PropTypes.number.isRequired,
  allowDragDrop: PropTypes.bool.isRequired,
};

interface tag<K extends string = "name"> {
  labelField: K;
  tag: Array<{ id: string } & { [k in K]: string }>;
}

export type TagTypes = Omit<InferProps<typeof TagPropTypes>, "tag" & "labelField"> & tag;

export type Tag = Pick<TagTypes, "tag">;

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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export type removeComponentTypes = InferProps<typeof RemoveComponentPropTypes>;

export const TagsPropTypes = {
  suggestions: PropTypes.array.isRequired,
  setTags: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
};

interface tagState extends Omit<InferProps<typeof TagsPropTypes>, "tags" & "setTags"> {
  setTags: React.Dispatch<React.SetStateAction<tags[]>>;
  tags: tags[];
}

export type TagsTypes = tagState;
export type tags = Record<string, string | number>;

export const ReactTagsPropTypes = {
  placeholder: PropTypes.string,
  labelField: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
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
  allowDeleteFromEmptyInput: PropTypes.bool,
  allowAdditionFromPaste: PropTypes.bool,
  allowDragDrop: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func,
  handleInputFocus: PropTypes.func,
  handleInputBlur: PropTypes.func,
  minQueryLength: PropTypes.number,
  shouldRenderSuggestions: PropTypes.func,
  removeComponent: PropTypes.func,
  autocomplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  maxLength: PropTypes.number,
  inputValue: PropTypes.string,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  allowUnique: PropTypes.bool,
  renderSuggestion: PropTypes.func,
  inputProps: PropTypes.object,
  editable: PropTypes.bool,
  clearAll: PropTypes.bool,
  onClearAll: PropTypes.func,
};

export type ReactTagTypes = InferProps<typeof ReactTagsPropTypes>;
