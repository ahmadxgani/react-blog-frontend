// @ts-nocheck
import "./reactTags.css";
import React, { useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { isEqual, noop, uniq } from "lodash";
import ClearAllTags from "./ClearAllTags";
import Suggestions from "./Suggestions";
import ClassNames from "classnames";
import Tag from "./Tag";

import { buildRegExpFromDelimiters } from "../../lib/utils";

import { KEYS, DEFAULT_PLACEHOLDER, DEFAULT_CLASSNAMES, DEFAULT_LABEL_FIELD, INPUT_FIELD_POSITIONS } from "../../lib/constants";
import { ReactTagsPropTypes, ReactTagTypes } from "../../lib/types";
import { useStateCallback } from "../useStateCallback";
import { usePrevious } from "../usePrevious";

const ReactTags = (props: ReactTagTypes) => {
  const classNames = { ...DEFAULT_CLASSNAMES, ...props.classNames };

  const [state, setState] = useStateCallback({
    suggestions: props.suggestions,
    query: "",
    isFocused: false,
    selectedIndex: -1,
    selectionMode: false,
    ariaLiveStatus: "",
    currentEditIndex: -1,
  });

  const reactTagsRef = useRef<HTMLDivElement | null>(null);
  const inputTextRef = useRef<HTMLInputElement | null>(null);
  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const addTag = (tag: any) => {
    const { tags, labelField, allowUnique } = props;
    const { currentEditIndex } = state;
    if (!tag.id || !tag[labelField as string]) {
      return;
    }
    const existingKeys = tags!.map((tag) => tag!.id.toLowerCase());

    // Return if tag has been already added
    if (allowUnique && existingKeys.indexOf(tag.id.toLowerCase()) >= 0) {
      return;
    }
    if (props.autocomplete) {
      const possibleMatches = filteredSuggestions(tag[labelField as string]);

      if ((props.autocomplete === 1 && possibleMatches.length === 1) || (props.autocomplete === true && possibleMatches.length)) {
        tag = possibleMatches[0];
      }
    }

    // call method to add
    if (currentEditIndex !== -1 && props.onTagUpdate) props.onTagUpdate(currentEditIndex, tag);
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

  const getQueryIndex = (query: any, item: any) => {
    return item[props.labelField as string].toLowerCase().indexOf(query.toLowerCase());
  };

  const filteredSuggestions = (query: any) => {
    let suggestions = props.suggestions;
    // suggestions = suggestions.filter((tag) => {
    //   const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    //   return RegExp(escapedRegex, "gi").test(tag[props.labelField]);
    // });
    if (props.allowUnique) {
      const existingTags = props.tags!.map((tag) => tag!.id.toLowerCase());
      suggestions = suggestions!.filter((suggestion) => !existingTags.includes(suggestion!.id.toLowerCase()));
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
  };

  const updateSuggestions = () => {
    const { query, selectedIndex } = state;
    const suggestions = filteredSuggestions(query);

    setState((currentState) => ({
      ...currentState,
      suggestions: suggestions,
      selectedIndex: selectedIndex >= suggestions.length ? suggestions.length - 1 : selectedIndex,
    }));
  };

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

    setState((currentState) => ({ ...currentState, query }), updateSuggestions);
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (event) => {
    if (!props.allowAdditionFromPaste) {
      return;
    }

    event.preventDefault();

    const clipboardData = event.clipboardData || (window as any).clipboardData;
    const clipboardText = clipboardData.getData("text");

    const { maxLength = clipboardText.length } = props;

    const maxTextLength = Math.min(maxLength as number, clipboardText.length);
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
    const { editable, handleTagClick, labelField } = props;
    if (editable) {
      setState(
        (currentState) => ({ ...currentState, currentEditIndex: i, query: tag[labelField as string] }),
        () => {
          tagInputRef.current!.focus();
        }
      );
    }

    if (handleTagClick) {
      handleTagClick(i, e);
    }
  };

  const handleMoveTag = (dragIndex: number, hoverIndex: number) => {
    const tags = props.tags;

    // locate tags
    const dragTag = tags![dragIndex];

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
    const { tags, labelField, removeComponent, readOnly, allowDragDrop } = props;

    const { currentEditIndex, query } = state;
    const moveTag = allowDragDrop ? handleMoveTag : null;
    return tags!.map((tag, index) => {
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
              labelField={labelField}
              onDelete={(ev) => props!.handleDelete(index, ev)}
              moveTag={moveTag}
              removeComponent={removeComponent}
              onTagClicked={handleTagClick.bind(this, index, tag)}
              readOnly={readOnly}
              classNames={classNames}
              allowDragDrop={allowDragDrop}
            />
          )}
        </React.Fragment>
      );
    });
  };

  const tagItems = getTagItems(),
    query = state.query.trim(),
    selectedIndex = state.selectedIndex,
    suggestions = state.suggestions;

  const resetAndFocusInput = () => {
    setState((currentState) => ({ ...currentState, query: "" }));
    if (inputTextRef.current) {
      inputTextRef.current.value = "";
      inputTextRef.current.focus();
    }
  };

  useEffect(() => {
    const { autofocus, readOnly } = props;

    if (autofocus && !readOnly) {
      resetAndFocusInput();
    }
  }, []);

  const prevSuggestions = usePrevious(state.suggestions);

  useEffect(() => {
    if (!isEqual(prevSuggestions, state.suggestions)) {
      updateSuggestions();
    }
  }, [state.suggestions, prevSuggestions]);

  const { placeholder, name: inputName, id: inputId, maxLength, inline, inputFieldPosition, inputValue, inputProps, clearAll, tags } = props;

  const position = !inline ? INPUT_FIELD_POSITIONS.BOTTOM : inputFieldPosition;

  const tagInput = !props.readOnly ? (
    <div className={classNames.tagInput}>
      <input
        {...inputProps}
        ref={(input) => {
          inputTextRef.current = input;
        }}
        className={classNames.tagInputField}
        type="text"
        placeholder={placeholder as string}
        aria-label={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        name={inputName as string}
        id={inputId as string}
        maxLength={maxLength as number}
        value={inputValue as string}
        data-automation="input"
        data-testid="input"
      />

      <Suggestions
        query={query}
        setSuggestions={setState}
        suggestions={suggestions as any[]}
        labelField={props.labelField as string}
        selectedIndex={selectedIndex}
        handleClick={handleSuggestionClick}
        handleHover={handleSuggestionHover}
        minQueryLength={props.minQueryLength}
        shouldRenderSuggestions={props.shouldRenderSuggestions}
        isFocused={state.isFocused}
        classNames={classNames}
        renderSuggestion={props.renderSuggestion}
      />
      {clearAll && tags!.length > 0 && <ClearAllTags classNames={classNames} onClick={clearAllTags} />}
    </div>
  ) : null;

  return (
    <div className={ClassNames(classNames.tags, "react-tags-wrapper")} ref={reactTagsRef}>
      <p
        role="alert"
        className="sr-only"
        style={{
          position: "absolute",
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          margin: "-1px",
          padding: 0,
          width: "1px",
          height: "1px",
          border: 0,
        }}
      >
        {state.ariaLiveStatus}
      </p>
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
