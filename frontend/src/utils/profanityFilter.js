import filter from 'leo-profanity';

filter.loadDictionary('ru');

export const profanityFilter = {
  filter: (text) => filter.clean(text),
};

export default profanityFilter;
