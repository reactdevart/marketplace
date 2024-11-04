import '@/components/shared/SearchInput/SearchInput.scss';

import Input from '@/components/shared/Input';

const SearchInput = ({ placeholder = 'Search', name = 'search', ...props }) => {
  return (
    <div className="search-input">
      <div className="search-input__input-wrapper">
        <Input animatedPlaceholder={false} type="text" placeholder={placeholder} name={name} {...props} />
        <i className="search-input__icon icon-search" />
      </div>
    </div>
  );
};

export default SearchInput;
