import '@/components/entities/categories/CategoryFormRenderer/CategoryFormRenderer.scss';

import Button from '@/components/shared/Button';

const CategoryFormRenderer = ({ renderSection, handleFormSubmit }) => {
  return (
    <form className="category-form-renderer" onSubmit={handleFormSubmit}>
      <div className="category-form-renderer__render-section-wrapper">{renderSection}</div>
      <div className="category-form-renderer__button-wrapper">
        <Button type="submit" variant="gradient">
          Create Post
        </Button>
      </div>
    </form>
  );
};

export default CategoryFormRenderer;
