import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = "uploads",
  publicId?: string,
) => {
  return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
    const uploadOptions: any = {
      folder,
      resource_type: "auto",
      ...(publicId && { public_id: publicId }),
    };

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result?.secure_url || "",
            public_id: result?.public_id || "",
          });
        }
      })
      .end(fileBuffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export default cloudinary;
