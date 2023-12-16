import * as bcryptjs from 'bcryptjs';
import * as fs from 'fs';
import { Image } from '@prisma/client';
import { UploadApiResponse } from 'cloudinary';

type ImageOption = {
  customerId?: string;
  productId?: string;
};

const utils = {
  bcryptHash: (secret: string) => {
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(secret, salt);
    return hash;
  },

  generateImage: (result: UploadApiResponse, option?: ImageOption) => {
    const defaultImage: Pick<Image, 'path' | 'size' | 'publicId'> = {
      path: '',
      size: 0,
      publicId: '',
    };
    return {
      ...defaultImage,
      ...option,
      path: result.secure_url,
      size: result.bytes,
      publicId: result.public_id,
    };
  },

  removeFile: (path: string, message = 'Filed is deleted') => {
    if (!path) return;
    return fs.unlink(path, (error) => {
      if (error) throw error;
      console.log(message);
    });
  },
};

export default utils;
