import '@/components/shared/Dropdown/Dropdown.scss';

import classNames from 'classnames';
import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks/useOutsideClick';

const generateUniqueId = () => `id-${Math.random().toString(36).substr(2, 9)}`;

const Dropdown = ({
  options = [],
  onSelect,
  selectedOption,
  isOutsideClickEnabled,
  label,
  height,
  required,
  withStar,
  optionKey = 'name',
}) => {
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // Memoize options with unique IDs
  const optionsWithId = useMemo(
    () =>
      options?.map((option) => ({
        ...option,
        id: option.id ?? generateUniqueId(),
      })),
    [options]
  );

  // Only update current selection if the selectedOption actually changes
  const [currentSelection, setCurrentSelection] = useState(() => {
    const matchedOption = optionsWithId?.find((option) => option[optionKey] === selectedOption?.[optionKey]);
    return matchedOption || { ...selectedOption, id: selectedOption?.id ?? generateUniqueId() };
  });

  useEffect(() => {
    const matchedOption = optionsWithId?.find((option) => option[optionKey] === selectedOption?.[optionKey]);
    if (matchedOption && matchedOption.id !== currentSelection?.id) {
      setCurrentSelection(matchedOption);
    }
  }, [selectedOption, optionsWithId, optionKey, currentSelection]);

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOutsideClickEnabled);

  const handleSelect = (option) => {
    setCurrentSelection(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={classNames('dropdown', { 'dropdown--open': isOpen })} ref={dropdownRef}>
      {label && (
        <span className="dropdown__label">
          {label} {required && withStar && <span className="dropdown__label-required">*</span>}
        </span>
      )}
      <div style={{ height: height || 'auto' }} className="dropdown__header-body-wrapper">
        <div className="dropdown__header" onClick={() => setIsOpen((prev) => !prev)}>
          <span className="dropdown__name">{currentSelection?.[optionKey] || 'Select an option'}</span>
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
                <span className="dropdown__item">{option[optionKey]}</span>
                {option.id === currentSelection?.id && <i className="dropdown__item-icon icon-check" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(Dropdown);
