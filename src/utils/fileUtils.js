export const convertFileToBinaryString = async (file) => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload an image file');
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('File size exceeds 5MB');
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const binaryString = Array.from(new Uint8Array(arrayBuffer))
      .map((byte) => String.fromCharCode(byte));
    console.log('Converted file to binary string, length:', binaryString.length);
    return binaryString;
  } catch (error) {
    console.error('File conversion error:', error);
    throw error;
  }
};