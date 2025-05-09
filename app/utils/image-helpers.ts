import axios from 'axios';

/**
 * Request a presigned URL from the API
 * @param fileType - MIME type of the file
 * @param fileName - Name of the file
 * @returns The presigned URL and other upload info
 */
export const getPresignedUrl = async (fileType: string, fileName: string): Promise<{ url: string; key: string; bucketName: string }> => {
  try {
    // Make sure we have a fileName
    if (!fileName) {
      fileName = `upload-${Date.now()}.${fileType.split('/')[1] || 'jpg'}`;
    }

    const response = await axios.post(
      'https://xt0lvmo75a.execute-api.us-east-1.amazonaws.com/Prod/presigned-url',
      { contentType: fileType, fileName }
    );
    return response.data;
  } catch (error) {
    console.error('Error getting presigned URL:', error);
    throw error;
  }
};

/**
 * Upload a file to S3 using a presigned URL
 * @param file - The file to upload
 * @returns The S3 URL of the uploaded file
 */
export const uploadFileToS3 = async (file: File): Promise<string> => {
  try {
    // Generate a unique filename with timestamp
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    // Get a presigned URL for the file
    const { url, key, bucketName } = await getPresignedUrl(file.type, fileName);

    // Upload the file directly to S3 using the presigned URL
    const uploadResponse = await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });

    // Check if upload was successful
    if (uploadResponse.status !== 200) {
      throw new Error(`Failed to upload file to S3. Status: ${uploadResponse.status}`);
    }

    // Return the full S3 URL of the uploaded file
    const s3Url = `https://${bucketName}.s3.us-east-1.amazonaws.com/${key}`;
    return s3Url;
  } catch (error) {
    throw error;
  }
};

/**
 * Convert file to base64 for preview
 * @param file - The file to convert
 * @returns Base64 string of the file
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Convert Base64 string to a File object
 * @param base64 - Base64 string
 * @param filename - Filename to use
 * @returns File object
 */
export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

/**
 * Check if a string is a base64 encoded image
 * @param str - String to check
 * @returns Whether the string is a base64 encoded image
 */
export const isBase64Image = (str: string): boolean => {
  if (typeof str !== 'string') return false;
  return str.startsWith('data:image/');
};

/**
 * Process all image uploads in a form and replace base64 data with S3 URLs
 * This can be used in a form submit handler
 * @param data - Form data
 * @returns Processed form data with S3 URLs instead of base64
 */
export const processFormImages = async (data: any): Promise<any> => {
  // Deep clone the data to avoid mutating the original
  const processedData = JSON.parse(JSON.stringify(data));
  let hasErrors = false;
  let errorMessages: string[] = [];

  // Helper function to recursively process objects
  const processObject = async (obj: any) => {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        // Recursively process nested objects and arrays
        await processObject(obj[key]);
      } else if (typeof obj[key] === 'string' && isBase64Image(obj[key])) {
        try {
          // Convert base64 to File and upload to S3
          const filename = `${key}-${Date.now()}.jpg`;
          const file = base64ToFile(obj[key], filename);
          const s3Url = await uploadFileToS3(file);

          // Replace base64 with S3 URL
          obj[key] = s3Url;

          // If there's a corresponding 'src' field for this 'image' field, update it too
          if (key === 'image' && obj.hasOwnProperty('src')) {
            obj.src = s3Url;
          }
        } catch (error) {
          console.error(`Error processing image for field ${key}:`, error);
          hasErrors = true;
          errorMessages.push(`Failed to upload image for ${key}: ${error instanceof Error ? error.message : 'Unknown error'}`);

          // Keep the base64 data if upload fails
          // The API will need to handle this case appropriately
        }
      }
    }
  };

  try {
    await processObject(processedData);

    if (hasErrors) {
      console.warn('Some images failed to upload:', errorMessages);
      // You could choose to throw an error here, or continue with submission
      // with some base64 images still in the data
    }

    return processedData;
  } catch (error) {
    console.error('Error processing form images:', error);
    throw new Error(`Failed to process images: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
