import { useState, useRef, useEffect, memo } from 'react';
import './Dropdown.scss';
import { useOutsideClick } from '../../../hooks/cec';
import classNames from 'classnames';

const Dropdown = ({ options, onSelect, sllectedOption, isOutsideClickEnabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(sllectedOption);
  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOutsideClickEnabled);

  useEffect(() => {
    setCurrentSelection(sllectedOption);
  }, [sllectedOption]);

  const handleSelect = (option) => {
    setCurrentSelection(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={classNames('dropdown', { 'dropdown--open': isOpen })} ref={dropdownRef}>
      <div className="dropdown__header" onClick={() => setIsOpen((prev) => !prev)}>
        <span className="dropdown__name">{currentSelection?.name}</span>
        <i className="dropdown__header-icon icon-arrow-down" />
      </div>
      {isOpen && (
        <div className="dropdown__list">
          {options.map((option) => (
            <div
              className={classNames('dropdown__item-wrapper', {
                'dropdown__item-wrapper--active': option.id === currentSelection?.id,
              })}
              key={option.id}
              onClick={() => handleSelect(option)}
            >
              <span className="dropdown__item">{option.name}</span>
              {option.id === currentSelection?.id && <i className="dropdown__item-icon icon-check" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Dropdown);
