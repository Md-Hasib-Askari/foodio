import * as Yup from 'yup';

export const addItemValidationSchema = Yup.object({
    name: Yup.string()
        .min(2, 'Name is too short')
        .required('Name is required'),

    price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be greater than 0')
        .required('Price is required'),

    category: Yup.string()
        .required('Category is required'),

    description: Yup.string()
        .min(10, 'Description must be at least 10 characters')
        .required('Description is required'),

    image: Yup.mixed<File>()
        .nullable()
        .test(
            'fileSize',
            'File size must be less than 2MB',
            (file) => !file || file.size <= 2 * 1024 * 1024
        )
        .test(
            'fileType',
            'Only PNG and JPEG are supported',
            (file) =>
                !file || ['image/png', 'image/jpeg'].includes(file.type)
        ),

    available: Yup.boolean(),
});
