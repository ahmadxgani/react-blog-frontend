import { SuggestionsPropTypes, SuggestionsTypes } from "../../lib/types";

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
  return <></>;
};

Suggestions.propTypes = SuggestionsPropTypes;

export default Suggestions;
