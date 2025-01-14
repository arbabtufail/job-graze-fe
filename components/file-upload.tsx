import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  photo: string;
  onFileSelect: (file: File) => void;
  accept: string;
  maxSize: number;
}

export function FileUpload({
  onFileSelect,
  accept,
  maxSize,
  photo,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        onFileSelect(selectedFile);
        console.log('Selected file: ', selectedFile);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className='w-full'>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-300 hover:border-blue-600'
        }`}
      >
        <input {...getInputProps()} />
        {file || photo ? (
          <div className='flex flex-col items-center'>
            <img
              src={file ? URL.createObjectURL(file) : photo}
              alt='Preview'
              className='w-32 h-32 object-cover mb-4 rounded-lg'
            />
            {file && (
              <>
                <p className='text-sm font-medium'>{file.name}</p>
                <p className='text-xs text-gray-500 mb-2'>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            )}
            <Button
              variant='outline'
              size='sm'
              onClick={removeFile}
              type='button'
            >
              <X className='w-4 h-4 mr-2' />
              Remove File
            </Button>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <Upload className='w-12 h-12 text-gray-400 mb-4' />
            <p className='text-lg font-medium mb-2'>
              Drag and drop your photo here
            </p>
            <p className='text-sm text-gray-500 mb-4'>
              or click to select a file
            </p>
            <Button type='button'>Select File</Button>
          </div>
        )}
      </div>
    </div>
  );
}
