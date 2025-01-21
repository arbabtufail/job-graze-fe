'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import {
  FileEdit,
  RefreshCw,
  Trash2,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { FileUploadArea } from '@/components/file-upload-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bulkCreateTalentProfiles } from '@/services/network/networkManager';

export default function BulkUploadPage() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [responseData, setResponseData] = useState<{
    rejectedProfilesCount: number;
    createdProfilesCount: number;
    rejectedProfiles: {
      invalidRecordNumber: number;
      errors: string;
    }[];
  } | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleFileAccepted = async (acceptedFile: File) => {
    setUploadProgress(20);
    try {
      setUploadProgress(50);
      const res = await bulkCreateTalentProfiles(acceptedFile);
      setUploadProgress(80);
      if (res.data.code === 200) {
        setUploadProgress(100);
        setResponseData(res.data.data);
        setUploadStatus('success');
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      setUploadStatus('error');
    }
  };

  const resetFile = () => {
    setResponseData(null);
    setUploadStatus('idle');
  };

  const downloadFile = () => {
    const link = document.createElement('a');
    link.href = '/bulkTalentsTemplates.csv';
    link.download = 'bulkTalentsTemplates.csv';
    link.click();
  };

  const templateStructure = [
    {
      icon: FileEdit,
      title: 'Create or Update (upsert)',
      description: 'Used to create new rows, and update existing ones',
      color: 'text-[#F2994A]',
    },
    {
      icon: RefreshCw,
      title: 'Update',
      description: 'Used to update existing rows',
      color: 'text-[#004E64]',
    },
    {
      icon: Trash2,
      title: 'Delete',
      description: 'Used to delete existing rows',
      color: 'text-[#004E64]',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <Sidebar />

      <main className='flex-1 ml-64 p-4 flex items-center justify-center min-h-screen'>
        <div className='w-full max-w-6xl mx-auto'>
          <h1 className='text-4xl font-bold text-[#333333] mb-3'>
            Bulk Upload
          </h1>
          <p className='text-xl text-[#4D4D4D] mb-10'>
            Upload a CSV to create or update multiple nurse profiles in one go
          </p>

          <Tabs defaultValue='upload' className='mb-8 text-lg'>
            <TabsList>
              <TabsTrigger value='upload'>Upload</TabsTrigger>
              <TabsTrigger value='instructions'>Instructions</TabsTrigger>
              <TabsTrigger value='template'>Template Structure</TabsTrigger>
            </TabsList>
            <TabsContent value='upload'>
              <Card>
                <CardHeader>
                  <CardTitle>Upload CSV File</CardTitle>
                  <CardDescription>
                    Drag and drop your CSV file or click to select
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUploadArea
                    onFileAccepted={handleFileAccepted}
                    uploadProgress={uploadProgress}
                    resetFile={resetFile}
                  />
                  {uploadStatus === 'success' && responseData && (
                    <Alert className='mt-4'>
                      <CheckCircle className='h-4 w-4' />
                      <AlertTitle>Accepted Profiles</AlertTitle>
                      <AlertDescription>
                        Your file has been successfully uploaded and processed.
                        ({responseData?.createdProfilesCount}) Profiles were
                        accepted.
                      </AlertDescription>
                    </Alert>
                  )}
                  {uploadStatus === 'error' && (
                    <Alert variant='destructive' className='mt-4'>
                      <AlertCircle className='h-4 w-4' />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        There was an error processing your file. Please check
                        the format and try again.
                      </AlertDescription>
                    </Alert>
                  )}
                  {responseData && responseData?.rejectedProfilesCount > 0 && (
                    <Alert variant='destructive' className='mt-4'>
                      <AlertCircle className='h-4 w-4' />
                      <AlertTitle>Rejected Profile</AlertTitle>
                      <AlertDescription>
                        ({responseData?.rejectedProfilesCount})
                        {responseData?.rejectedProfilesCount > 1
                          ? ' Profiles '
                          : ' Profile '}
                        were rejected. These are the rejected profiles.
                        {responseData?.rejectedProfiles?.map(
                          (profile, index) => (
                            <div key={index} className='my-2 border-t py-1'>
                              <p>Record # {profile.invalidRecordNumber}</p>
                              <p>{profile.errors}</p>
                            </div>
                          )
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='instructions'>
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                  <CardDescription>
                    Follow these steps to successfully upload your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className='list-decimal list-inside text-[#4D4D4D] space-y-2'>
                    <li>Download the CSV template using the button below.</li>
                    <li>
                      Open the template in a spreadsheet application (e.g.,
                      Excel, Google Sheets).
                    </li>
                    <li>
                      Fill in the details for each row (e.g., Name, Contact
                      Information, Specialization).
                    </li>
                    <li>Save the file as a CSV.</li>
                    <li>
                      Return to this page and upload your CSV file in the Upload
                      tab.
                    </li>
                    <li>
                      Wait for the upload to complete and check for any error
                      messages.
                    </li>
                  </ol>
                  <Button
                    className='mt-4 bg-[#F2994A] hover:bg-[#D9823B] text-white'
                    onClick={downloadFile}
                  >
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='template'>
              <Card>
                <CardHeader>
                  <CardTitle>Template Structure</CardTitle>
                  <CardDescription>
                    Understanding the CSV template structure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {templateStructure.map((item, index) => (
                      <div key={index} className='flex items-center space-x-4'>
                        <item.icon className={`w-6 h-6 ${item.color}`} />
                        <div>
                          <h3 className='font-medium text-[#333333]'>
                            {item.title}
                          </h3>
                          <p className='text-sm text-[#4D4D4D]'>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
