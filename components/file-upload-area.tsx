"use client"

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FileUploadAreaProps {
  onFileAccepted: (file: File) => void
}

export function FileUploadArea({ onFileAccepted }: FileUploadAreaProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0]
      setFile(acceptedFile)
      onFileAccepted(acceptedFile)
      simulateUpload()
    }
  }, [onFileAccepted])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  })

  const simulateUpload = () => {
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10
      })
    }, 500)
  }

  const removeFile = () => {
    setFile(null)
    setUploadProgress(0)
  }

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex flex-col items-center">
            <File className="w-12 h-12 text-primary mb-4" />
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-gray-500 mb-2">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            <Progress value={uploadProgress} className="w-full max-w-xs mb-2" />
            <Button variant="outline" size="sm" onClick={removeFile}>
              <X className="w-4 h-4 mr-2" />
              Remove File
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-16 h-16 text-gray-400 mb-6" />
            <p className="text-2xl font-medium mb-3">Drag and drop your CSV file here</p>
            <p className="text-lg text-gray-500 mb-6">or click to select a file</p>
            <Button className="bg-[#F2994A] hover:bg-[#D9823B] text-white text-lg py-6 px-8">Select File</Button>
          </div>
        )}
      </div>
    </div>
  )
}

