import './FormRenderer.scss';

import { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/shared/Button';
import { POST_TYPES } from '@/constants/create-post';
import useFormValidator from '@/hooks/useFormValidator';
import useRenderField from '@/hooks/useRenderField';
import { getSelectedCategory, getSelectedGeneralCategory } from '@/store/categories/categoriesSlice';
import { getGridStyle } from '@/utils/categoryUtil';
import { extractFields, getInitialState } from '@/utils/formUtils';
import { clearObjectStore, openDatabase, saveFilesToIndexedDB } from '@/utils/imageUtil';

const FormRenderer = ({ onNext }) => {
  const selectedGeneralCategory = useSelector(getSelectedGeneralCategory);
  const selectedCategory = useSelector(getSelectedCategory);

  const ctaegoryForm = POST_TYPES?.[selectedGeneralCategory?.name]?.subcategories?.[selectedCategory?.name];
  const collectionOfFields = useMemo(() => ctaegoryForm && extractFields(ctaegoryForm), [ctaegoryForm]);
  const initialState = useMemo(() => {
    if (collectionOfFields) {
      return getInitialState(collectionOfFields);
    }
  }, [collectionOfFields]);

  const { formState, errors, handleChange } = useFormValidator(initialState);

  const renderField = useRenderField({ formState, errors, handleChange });

  const handleClick = useCallback(async () => {
    const { pictures, ...others } = formState;
    localStorage.setItem('formState', JSON.stringify(others));
    if (pictures?.value?.length) {
      try {
        const db = await openDatabase();
        await clearObjectStore(db);

        await saveFilesToIndexedDB(db, Array.from(pictures.value)).then(() => onNext());
      } catch (error) {
        console.error(error);
      }
    }
  }, [formState, onNext]);

  if (!ctaegoryForm || !selectedCategory) return null;

  return (
    <div className="form-renderer">
      <div className="form-renderer__section-wrapper">
        {Object.values(ctaegoryForm).map(({ label, fields, direction }, index) => (
          <div className="form-renderer__section" key={index}>
            <span className="form-renderer__section-label">{label}</span>
            <div style={getGridStyle(direction)} className="form-renderer__fields">
              {fields.map((field) => renderField(field))}
            </div>
          </div>
        ))}
      </div>
      <div className="form-renderer__button-wrapper">
        <Button onClick={handleClick} type="submit" variant="gradient">
          Preview
        </Button>
      </div>
    </div>
  );
};

export default memo(FormRenderer);
