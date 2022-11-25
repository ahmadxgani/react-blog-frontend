import "./reactTags.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isEqual, noop, uniq } from "lodash";
import ClearAllTags from "./ClearAllTags";
import Suggestions from "./Suggestions";
import ClassNames from "classnames";
import Tag from "./Tag";

import { buildRegExpFromDelimiters } from "../../lib/utils";

import { KEYS, DEFAULT_PLACEHOLDER, DEFAULT_CLASSNAMES, DEFAULT_LABEL_FIELD, INPUT_FIELD_POSITIONS } from "../../lib/constants";
import { ReactTagsPropTypes, ReactTagsState, ReactTagTypes, tags } from "../../lib/types";
import { usePrevious } from "../usePrevious";

const ReactTags = (props: ReactTagTypes) => {
  const classNames = { ...DEFAULT_CLASSNAMES };

  const [state, setState] = useState<ReactTagsState>({
    suggestions: props.suggestions,
    query: "",
    isFocused: false,
    selectedIndex: -1,
    selectionMode: false,
    currentEditIndex: -1,
  });

  const reactTagsRef = useRef<HTMLDivElement | null>(null);
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const addTag = (tag: tags) => {
    if (!tag.id || !tag[props.labelField as string]) {
      return;
    }
    const existingKeys = props.tags.map((tag) => tag.name.toLowerCase());

    // Return if tag has been already added
    if (props.allowUnique && existingKeys.indexOf((tag.name as string).toLowerCase()) >= 0) {
      return;
    }
    if (props.autocomplete) {
      const possibleMatches = filteredSuggestions(tag[props.labelField as string]);

      if ((props.autocomplete === 1 && possibleMatches.length === 1) || (props.autocomplete === true && possibleMatches.length)) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    if (state.currentEditIndex !== -1 && props.onTagUpdate) props.onTagUpdate(state.currentEditIndex, tag);
    else props.handleAddition!(tag);

    // reset the state
    setState((currentState) => ({
      ...currentState,
      query: "",
      selectionMode: false,
      selectedIndex: -1,
      currentEditIndex: -1,
    }));

    resetAndFocusInput();
  };

  const getQueryIndex = useCallback(
    (query: any, item: any) => {
      return item[props.labelField as string].toLowerCase().indexOf(query.toLowerCase());
    },
    [props.labelField]
  );

  const filteredSuggestions = useCallback(
    (query: any) => {
      let suggestions = props.suggestions;
      if (props.allowUnique) {
        const existingTags = props.tags!.map((tag) => tag!.name.toLowerCase());
        suggestions = suggestions!.filter((suggestion) => !existingTags.includes(suggestion.name.toLowerCase()));
      }
      if (props.handleFilterSuggestions) {
        return props.handleFilterSuggestions(query, suggestions);
      }

      const exactSuggestions = suggestions!.filter((item) => {
        return getQueryIndex(query, item) === 0;
      });
      const partialSuggestions = suggestions!.filter((item) => {
        return getQueryIndex(query, item) > 0;
      });
      return exactSuggestions.concat(partialSuggestions);
    },
    [getQueryIndex, props]
  );

  const updateSuggestions = useCallback(() => {
    const suggestions = filteredSuggestions(state.query.trim());

    setState((currentState) => ({
      ...currentState,
      suggestions: suggestions,
      selectedIndex: currentState.selectedIndex >= suggestions.length ? suggestions.length - 1 : currentState.selectedIndex,
    }));
  }, [filteredSuggestions, state]);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    if (props.handleInputFocus) {
      props.handleInputFocus(value);
    }
    setState((currentState) => ({ ...currentState, isFocused: true }));
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;
    if (props.handleInputBlur) {
      props.handleInputBlur(value);
      if (inputTextRef.current) {
        inputTextRef.current.value = "";
      }
    }
    setState((currentState) => ({ ...currentState, isFocused: false, currentEditIndex: -1 }));
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { query, selectedIndex, suggestions, selectionMode } = state;

    // hide suggestions menu on escape
    if (event.keyCode === KEYS.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      setState((currentState) => ({
        ...currentState,
        selectedIndex: -1,
        selectionMode: false,
        suggestions: [],
        currentEditIndex: -1,
      }));
    }

    // When one of the terminating keys is pressed, add current query to the tags.
    // If no text is typed in so far, ignore the action - so we don't end up with a terminating
    // character typed in.
    if (props.delimiters!.indexOf(event.keyCode) !== -1 && !event.shiftKey) {
      if (event.keyCode !== KEYS.TAB || query !== "") {
        event.preventDefault();
      }

      const selectedQuery: any = selectionMode && selectedIndex !== -1 ? suggestions![selectedIndex] : { id: query, [props.labelField as string]: query };

      if (selectedQuery !== "") {
        addTag(selectedQuery);
      }
    }

    // when backspace key is pressed and query is blank, delete tag
    if (event.keyCode === KEYS.BACKSPACE && query === "" && props.allowDeleteFromEmptyInput) {
      props.handleDelete!(props.tags!.length - 1, event);
    }

    // up arrow
    if (event.keyCode === KEYS.UP_ARROW) {
      event.preventDefault();
      setState((currentState) => ({
        ...currentState,
        selectedIndex: selectedIndex <= 0 ? suggestions!.length - 1 : selectedIndex - 1,
        selectionMode: true,
      }));
    }

    // down arrow
    if (event.keyCode === KEYS.DOWN_ARROW) {
      event.preventDefault();
      setState((currentState) => ({
        ...currentState,
        selectedIndex: suggestions!.length === 0 ? -1 : (selectedIndex + 1) % suggestions!.length,
        selectionMode: true,
      }));
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (props.handleInputChange) {
      props.handleInputChange(event.target.value);
    }

    const query = event.target.value.trim();

    setState((currentState) => ({ ...currentState, query }));
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (event) => {
    if (!props.allowAdditionFromPaste) {
      return;
    }

    event.preventDefault();

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const clipboardText = clipboardData.getData("text");

    const maxTextLength = Math.min(props.maxLength || clipboardText.length, clipboardText.length);
    const pastedText = clipboardData.getData("text").substr(0, maxTextLength);

    // Used to determine how the pasted content is split.
    const delimiterRegExp = buildRegExpFromDelimiters(props.delimiters);
    const tags = pastedText.split(delimiterRegExp);

    // Only add unique tags
    uniq(tags).forEach((tag) => addTag({ id: tag, [props.labelField as string]: tag }));
  };

  const handleSuggestionHover = (i: number) =>
    setState((currentState) => ({
      ...currentState,
      selectedIndex: i,
      selectionMode: true,
    }));

  const handleSuggestionClick = (i: number) => addTag(state.suggestions![i]);

  const handleTagClick = (i: any, tag: any, e: any) => {
    if (props.editable) {
      setState((currentState) => ({ ...currentState, currentEditIndex: i, query: tag[props.labelField as string] }));
    }
  };

  const handleMoveTag = (dragIndex: number, hoverIndex: number) => {
    // locate tags
    const dragTag = props.tags![dragIndex];

    // call handler with the index of the dragged tag
    // and the tag that is hovered
    props.handleDrag!(dragTag, dragIndex, hoverIndex);
  };

  const clearAllTags = () => {
    if (props.onClearAll) {
      props.onClearAll();
    }
  };

  const getTagItems = () => {
    const { currentEditIndex, query } = state;
    const moveTag = props.allowDragDrop ? handleMoveTag : null;
    return props.tags!.map((tag, index) => {
      return (
        <React.Fragment key={index}>
          {currentEditIndex === index ? (
            <div className={classNames.editTagInput}>
              <input
                ref={(input) => {
                  tagInputRef.current = input;
                }}
                onFocus={handleFocus}
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={classNames.editTagInputField}
                onPaste={handlePaste}
                data-testid="tag-edit"
              />
            </div>
          ) : (
            <Tag
              index={index}
              tag={tag}
              labelField={props.labelField}
              onDelete={(ev) => props!.handleDelete!(index, ev)}
              moveTag={moveTag}
              removeComponent={props.removeComponent}
              onTagClicked={handleTagClick.bind(this, index, tag)}
              readOnly={props.readOnly}
              classNames={classNames}
              allowDragDrop={props.allowDragDrop}
            />
          )}
        </React.Fragment>
      );
    });
  };

  const tagItems = getTagItems();

  const resetAndFocusInput = () => {
    setState((currentState) => ({ ...currentState, query: "" }));
    if (inputTextRef.current) {
      inputTextRef.current.value = "";
      inputTextRef.current.focus();
    }
  };

  useEffect(() => {
    if (props.autofocus && !props.readOnly) {
      resetAndFocusInput();
    }
  }, [props.autofocus, props.readOnly]);

  const prevSuggestions = usePrevious(state.suggestions);

  useEffect(() => {
    if (state.currentEditIndex !== -1) {
      tagInputRef.current!.focus();
    }
  }, [state.currentEditIndex]);

  useEffect(() => {
    if (!isEqual(prevSuggestions, state.suggestions) || state.query) {
      updateSuggestions();
    }
  }, [state.query]);

  const position = !props.inline ? INPUT_FIELD_POSITIONS.BOTTOM : props.inputFieldPosition;

  const tagInput = !props.readOnly ? (
    <div className={classNames.tagInput}>
      <input
        {...props.inputProps}
        ref={(input) => {
          inputTextRef.current = input;
        }}
        className={classNames.tagInputField}
        type="text"
        placeholder={props.placeholder as string}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        name={props.name as string}
        id={props.id as string}
        maxLength={props.maxLength as number}
        value={props.inputValue as string}
        data-automation="input"
        data-testid="input"
      />

      <Suggestions
        query={state.query.trim()}
        setSuggestions={setState}
        suggestions={state.suggestions as any[]}
        labelField={props.labelField as string}
        selectedIndex={state.selectedIndex}
        handleClick={handleSuggestionClick}
        handleHover={handleSuggestionHover}
        minQueryLength={props.minQueryLength as number}
        shouldRenderSuggestions={props.shouldRenderSuggestions}
        isFocused={state.isFocused}
        classNames={classNames}
        renderSuggestion={props.renderSuggestion}
      />
      {props.clearAll && props.tags!.length > 0 && <ClearAllTags classNames={classNames} onClick={clearAllTags} />}
    </div>
  ) : null;

  return (
    <div className={ClassNames(classNames.tags, "react-tags-wrapper")} ref={reactTagsRef}>
      {position === INPUT_FIELD_POSITIONS.TOP && tagInput}
      <div className={classNames.selected}>
        {tagItems}
        {position === INPUT_FIELD_POSITIONS.INLINE && tagInput}
      </div>
      {position === INPUT_FIELD_POSITIONS.BOTTOM && tagInput}
    </div>
  );
};

const WithContext = ({ ...props }) => (
  <DndProvider backend={HTML5Backend}>
    <ReactTags {...props} />
  </DndProvider>
);

ReactTags.defaultProps = {
  placeholder: DEFAULT_PLACEHOLDER,
  labelField: DEFAULT_LABEL_FIELD,
  suggestions: [],
  delimiters: [...KEYS.ENTER, KEYS.TAB],
  autofocus: true,
  inline: true, // TODO: Remove in v7.x.x
  inputFieldPosition: INPUT_FIELD_POSITIONS.INLINE,
  handleDelete: noop,
  handleAddition: noop,
  allowDeleteFromEmptyInput: true,
  allowAdditionFromPaste: true,
  autocomplete: false,
  readOnly: false,
  allowUnique: true,
  allowDragDrop: true,
  tags: [],
  inputProps: {},
  onTagUpdate: noop,
  editable: false,
  clearAll: false,
  handleClearAll: noop,
};

ReactTags.propTypes = ReactTagsPropTypes;

export { WithContext };
export { ReactTags as WithOutContext };
export { KEYS };
