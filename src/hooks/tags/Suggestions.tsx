// @ts-nocheck

import { useEffect, useRef } from "react";
import escape from "lodash/escape";
import { SuggestionsPropTypes, SuggestionsTypes } from "../../lib/types";
import { usePrevious } from "../Previous";

const maybeScrollSuggestionIntoView = (suggestionEl: any, suggestionsContainer: any) => {
  const containerHeight = suggestionsContainer.offsetHeight;
  const suggestionHeight = suggestionEl.offsetHeight;
  const relativeSuggestionTop = suggestionEl.offsetTop - suggestionsContainer.scrollTop;

  if (relativeSuggestionTop + suggestionHeight >= containerHeight) {
    suggestionsContainer.scrollTop += relativeSuggestionTop - containerHeight + suggestionHeight;
  } else if (relativeSuggestionTop < 0) {
    suggestionsContainer.scrollTop += relativeSuggestionTop;
  }
};

const Suggestions = (props: SuggestionsTypes) => {
  const suggestionsContainer = useRef<HTMLDivElement | null>(null);

  const markIt = (input, query) => {
    const escapedRegex = query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    const { [props.labelField]: labelValue } = input;

    return {
      __html: labelValue.replace(RegExp(escapedRegex, "gi"), (x) => {
        return `<mark>${escape(x)}</mark>`;
      }),
    };
  };

  const renderSuggestion = (item, query) => {
    if (typeof props.renderSuggestion === "function") {
      return props.renderSuggestion(item, query);
    }
    return <span dangerouslySetInnerHTML={markIt(item, query)} />;
  };

  useEffect(() => {
    props.setSuggestions((currentState) => ({
      ...currentState,
      suggestions: props.suggestions.filter((tag) => {
        const escapedRegex = props.query.trim().replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
        return RegExp(escapedRegex, "gi").test(tag[props.labelField]);
      }),
    }));
  }, [props.query]);

  const suggestions = props.suggestions.map((item, i) => {
    return (
      <li key={i} onMouseDown={() => props.handleClick(i)} onTouchStart={() => props.handleClick(i)} onMouseOver={() => props.handleHover(i)} className={i === props.selectedIndex ? props.classNames.activeSuggestion : ""}>
        {renderSuggestion(item, props.query)}
      </li>
    );
  });

  const shouldRenderSuggestions =
    props.shouldRenderSuggestions ||
    ((query) => {
      return query.length >= props.minQueryLength && props.isFocused;
    });

  const prevSelectedIndex = usePrevious(props.selectedIndex);

  useEffect(() => {
    if (suggestionsContainer.current && prevSelectedIndex !== props.selectedIndex) {
      const activeSuggestion = suggestionsContainer.current.querySelector(`.${props.classNames.activeSuggestion}`);

      if (activeSuggestion) {
        maybeScrollSuggestionIntoView(activeSuggestion, suggestionsContainer.current);
      }
    }
  }, [prevSelectedIndex, props.classNames, props.selectedIndex]);

  if (suggestions.length === 0 || !shouldRenderSuggestions(props.query)) {
    return null;
  }

  return (
    <div
      ref={(elem) => {
        suggestionsContainer.current = elem;
      }}
      className={props.classNames.suggestions}
    >
      <ul> {suggestions} </ul>
    </div>
  );
};

Suggestions.propTypes = SuggestionsPropTypes;
Suggestions.defaultProps = {
  minQueryLength: 2,
};

export default Suggestions;
