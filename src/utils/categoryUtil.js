export const transformGeneralListData = (data) => {
  return data?.map((item) => ({
    ...item,
    hasChildren: !(item.name.toLowerCase().includes('home') || item.name.toLowerCase().includes('vehicles')),
    name: item.name.split(' ')[0],
  }));
};

export const getGridStyle = (direction) => ({
  gridTemplateColumns: `repeat(${direction === 'row' ? '2' : '1'}, 1fr)`,
});

export const buildFormData = ({
  formState,
  selectedGeneralCategory,
  selectedCategory,
  selectedSubcategory,
  selectedSubcategoryOptions,
}) => {
  const form = new FormData();

  if (selectedGeneralCategory?.id) {
    form.append('general_category_id', selectedGeneralCategory.id);
  }
  if (selectedCategory?.id) {
    form.append('category_id', selectedCategory.id);
  }
  if (selectedSubcategory?.id) {
    form.append('subcategory_id', selectedSubcategory.id);
  }
  if (formState?.location?.value) {
    form.append('location_id', formState.location.value);
  }
  if (formState?.condition?.value?.name && selectedSubcategoryOptions?.options?.length) {
    const selectedCondition = selectedSubcategoryOptions.options.find(
      (item) => item?.name === formState.condition.value.name
    );
    if (selectedCondition) {
      form.append('options[1]', selectedCondition.id);
    }
  }
  if (formState?.postTitle?.value) {
    form.append('title', formState.postTitle.value);
  }
  if (formState?.price?.value) {
    form.append('price', formState.price.value);
  }
  if (formState?.phoneNumber?.value) {
    form.append('settings[phone]', formState.phoneNumber.value);
  }
  if (formState?.description?.value) {
    form.append('description', formState.description.value);
  }
  if (formState?.pictures?.value) {
    formState.pictures.value.forEach((picture, index) => {
      form.append(`images[${index + 1}]`, picture);
    });
  }

  return form;
};
