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
import Papa from 'papaparse';
import { createTalentProfile } from '@/services/network/networkManager';

export default function BulkUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  // const handleFileAccepted = (acceptedFile: File) => {
  //   setFile(acceptedFile);
  //   Papa.parse(acceptedFile, {
  //     header: true, // Assume the first row contains headers
  //     skipEmptyLines: true,
  //     complete: (results) => {
  //       const parsedData = results.data;

  //       // Transform the parsed data into the JSON structure
  //       const transformedData = parsedData.map((row: any) => {
  //         return {
  //           candidate: {
  //             title: row['Title'],
  //             firstName: row['First Name'],
  //             lastName: row['Last Name'],
  //             email: row['Email'],
  //             mobileNumber: row['Mobile Number'],
  //             country: row['Country'],
  //             stateOrProvince: row['State/Province'],
  //             city: row['City'],
  //             zipCode: row['Zip Code'],
  //             address1: row['Address 1'],
  //             address2: row['Address 2'],
  //             eligibility: row['Eligibility'],
  //           },
  //           educationAndExperience: {
  //             degree: row['Degree'],
  //             year: row['Year'],
  //             school: row['School'],
  //             jobExperiences: [
  //               {
  //                 jobTitle: row['Job Titles'],
  //                 rolesAndResponsibilities: row['Job Roles'],
  //                 startDate: row['Job Start Dates'],
  //                 endDate: row['Job End Dates'],
  //               },
  //             ],
  //             languages: row['Languages'] ? row['Languages'].split(',') : [],
  //           },
  //           profileDetails: {
  //             profileHeadline: row['Profile Headline'],
  //             backgroundSummary: row['Background Summary'],
  //             availableStartDate: row['Available Start Date'],
  //             specialties: row['Specialties']
  //               ? row['Specialties'].split(',')
  //               : [],
  //             skills: row['Skills'] ? row['Skills'].split(',') : [],
  //           },
  //           professionalLicense: {
  //             licenseType: row['License Type'],
  //             licenseState: row['License State'],
  //             licenseCountry: row['License Country'],
  //             licenseNumber: row['License Number'],
  //             licenseIssuedBy: row['License Issued By'],
  //             licenseEffectiveDate: row['License Effective Date'],
  //             licenseExpirationDate: row['License Expiration Date'],
  //             nclexRn: row['NCLEX RN'],
  //             euRn: row['EU RN'],
  //             languageExam: row['Language Exam'],
  //           },
  //         };
  //       });
  //       setData(transformedData);
  //       console.log('Transformed Data: ', transformedData);
  //     },
  //     error: (error) => {
  //       console.error('Error parsing CSV file: ', error);
  //     },
  //   });
  //   // setTimeout(() => {
  //   //   setUploadStatus(Math.random() > 0.5 ? 'success' : 'error');
  //   // }, 3000);
  // };

  const handleFileAccepted = (acceptedFile: File) => {
    setFile(acceptedFile);
    Papa.parse(acceptedFile, {
      header: true, // Assume the first row contains headers
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;

        // Transform the parsed data into the JSON structure
        const transformedData = parsedData.map((row: any, index: number) => {
          // Collect errors for the current row
          const errors: string[] = [];

          // Function to validate a field
          const validateField = (fieldName: string, value: string) => {
            if (!value || value.trim() === '') {
              errors.push(
                `Row ${index + 1}: Missing value for "${fieldName}".`
              );
            }
            return value;
          };

          // Validate required fields
          const candidate = {
            title: validateField('Title', row['Title']),
            firstName: validateField('First Name', row['First Name']),
            lastName: validateField('Last Name', row['Last Name']),
            email: validateField('Email', row['Email']),
            mobileNumber: validateField('Mobile Number', row['Mobile Number']),
            country: validateField('Country', row['Country']),
            stateOrProvince: validateField(
              'State/Province',
              row['State/Province']
            ),
            city: validateField('City', row['City']),
            zipCode: validateField('Zip Code', row['Zip Code']),
            address1: validateField('Address 1', row['Address 1']),
            address2: validateField('Address 2', row['Address 2']),
            eligibility: validateField('Eligibility', row['Eligibility']),
          };

          const educationAndExperience = {
            degree: validateField('Degree', row['Degree']),
            year: validateField('Year', row['Year']),
            school: validateField('School', row['School']),
            jobExperiences: [
              {
                jobTitle: validateField('Job Titles', row['Job Titles']),
                rolesAndResponsibilities: validateField(
                  'Job Roles',
                  row['Job Roles']
                ),
                startDate: validateField(
                  'Job Start Dates',
                  row['Job Start Dates']
                ),
                endDate: validateField('Job End Dates', row['Job End Dates']),
              },
            ],
            languages: row['Languages'] ? row['Languages'].split(',') : [],
          };

          const profileDetails = {
            profileHeadline: validateField(
              'Profile Headline',
              row['Profile Headline']
            ),
            backgroundSummary: validateField(
              'Background Summary',
              row['Background Summary']
            ),
            availableStartDate: validateField(
              'Available Start Date',
              row['Available Start Date']
            ),
            specialties: row['Specialties']
              ? row['Specialties'].split(',')
              : [],
            skills: row['Skills'] ? row['Skills'].split(',') : [],
          };

          const professionalLicense = {
            licenseType: validateField('License Type', row['License Type']),
            licenseState: validateField('License State', row['License State']),
            licenseCountry: validateField(
              'License Country',
              row['License Country']
            ),
            licenseNumber: validateField(
              'License Number',
              row['License Number']
            ),
            licenseIssuedBy: validateField(
              'License Issued By',
              row['License Issued By']
            ),
            licenseEffectiveDate: validateField(
              'License Effective Date',
              row['License Effective Date']
            ),
            licenseExpirationDate: validateField(
              'License Expiration Date',
              row['License Expiration Date']
            ),
            nclexRn: validateField('NCLEX RN', row['NCLEX RN']),
            euRn: validateField('EU RN', row['EU RN']),
            languageExam: validateField('Language Exam', row['Language Exam']),
          };

          if (errors.length > 0) {
            throw new Error(errors.join('\n'));
          }

          return {
            candidate,
            educationAndExperience,
            profileDetails,
            professionalLicense,
          };
        });

        setData(transformedData);
        console.log('Transformed Data: ', transformedData);
      },
      error: (error) => {
        console.log('Error parsing CSV file: ', error);
      },
    });
  };

  const simulateUpload = async () => {
    setUploadProgress(0);
    try {
      // const res = await createTalentProfile(data);
      // console.log('Response: ', res);
      // if (res.status === 200) {
      setUploadStatus('success');
      // }
    } catch (error) {
      console.error('Error uploading data: ', error);
      setUploadStatus('error');
    }
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 500);
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
                    simulateUpload={() => simulateUpload()}
                    uploadProgress={uploadProgress}
                  />
                  {uploadStatus === 'success' && (
                    <Alert className='mt-4'>
                      <CheckCircle className='h-4 w-4' />
                      <AlertTitle>Success</AlertTitle>
                      <AlertDescription>
                        Your file has been successfully uploaded and processed.
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
                  <Button className='mt-4 bg-[#F2994A] hover:bg-[#D9823B] text-white'>
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
