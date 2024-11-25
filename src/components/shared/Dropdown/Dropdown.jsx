import '@/components/shared/Dropdown/Dropdown.scss';

import classNames from 'classnames';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';

const generateUniqueId = () => `id-${Math.random().toString(36).substr(2, 9)}`;

const Dropdown = ({ options = [], onSelect, sllectedOption, isOutsideClickEnabled }) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Generate IDs for options if missing
  const optionsWithId = useMemo(
    () =>
      Array.isArray(options)
        ? options.map((option) => ({
            ...option,
            id: option.id ?? generateUniqueId(),
          }))
        : [],
    [options]
  );

  // Ensure the initial selection has an ID, and reuse existing ID if possible
  const initialSelection = useMemo(() => {
    if (sllectedOption) {
      // Check if the sllectedOption exists in optionsWithId
      const matchedOption = optionsWithId.find((option) => option.name === sllectedOption.name);
      return matchedOption ? matchedOption : { ...sllectedOption, id: sllectedOption.id ?? generateUniqueId() };
    }
    return null;
  }, [sllectedOption, optionsWithId]);

  const [currentSelection, setCurrentSelection] = useState(initialSelection);

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOutsideClickEnabled);

  useEffect(() => {
    if (sllectedOption) {
      const matchedOption = optionsWithId.find((option) => option.name === sllectedOption.name);
      setCurrentSelection(
        matchedOption ? matchedOption : { ...sllectedOption, id: sllectedOption.id ?? generateUniqueId() }
      );
    }
  }, [sllectedOption, optionsWithId]);

  const handleSelect = (option) => {
    setCurrentSelection(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={classNames('dropdown', { 'dropdown--open': isOpen })} ref={dropdownRef}>
      <div className="dropdown__header" onClick={() => setIsOpen((prev) => !prev)}>
        <span className="dropdown__name">{currentSelection?.name || 'Select an option'}</span>
        <i className="dropdown__header-icon icon-arrow-down" />
      </div>
      {isOpen && (
        <div className="dropdown__list">
          {optionsWithId.map((option) => (
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
