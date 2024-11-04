import '@/components/widgets/Search/Search.scss';

import SearchInput from '@/components/shared/SearchInput';

const Search = () => {
  return (
    <div className="search">
      <div className="search__search-input-wrapper">
        <SearchInput />
      </div>
    </div>
  );
};

export default Search;
