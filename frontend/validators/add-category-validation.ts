import * as Yup from 'yup';

export const addCategoryValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Category name is too short')
        .required('Category name is required'),
});
