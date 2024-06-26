import { z } from 'zod';
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const MAX_PICTURE_SIZE = 1024 * 1024 * 1; // 1MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const signUpSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export const commentSchema = z.object({
  postId: z.string(),
  comment: z
    .string({ required_error: 'Comment is required' })
    .min(1, 'Comment is required')
    .min(2, 'Comment must be more than 2 characters'),
});
export const createPostSchema = z.object({
  imageUrl: z
    .instanceof(File, { message: 'Please upload an image.' })
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file?.type);
    }, 'File must be an Image(.jpg, .jpeg, .png and .webp formats are supported)'),
  caption: z.string(),
});

export const usernameSchema = z.object({
  username: z.string().min(3, 'Username must be more than 3 characters'),
});

export const bioSchema = z.object({
  bio: z.string().max(32, 'Bio must be less than 32 characters'),
});

export const pictureSchema = z.object({
  picture: z
    .instanceof(File, { message: 'Please upload an image.' })
    .refine((file) => {
      return !file || file.size <= MAX_PICTURE_SIZE;
    }, 'File size must be less than 1MB')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file?.type);
    }, 'File must be an Image(.jpg, .jpeg, .png and .webp formats are supported)'),
});

export const passwordSchema = z.object({
  password: z.string().min(8, 'Password must be more than 8 characters'),
  newpassword: z
    .string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});
