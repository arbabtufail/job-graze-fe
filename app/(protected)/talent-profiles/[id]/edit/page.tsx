'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  User,
  GraduationCap,
  FileText,
  Award,
  ChevronRight,
} from 'lucide-react';
import { PersonalInfoForm } from './forms/personal-info-form';
import { EducationForm } from './forms/education-form';
import { ProfileForm } from './forms/profile-form';
import { LicensesForm } from './forms/licenses-form';
import {
  getTalentProfileById,
  updateEducationAndExperience,
  updatePersonalInformation,
  updateProfessionalLicense,
  updateProfileDetails,
} from '@/services/network/networkManager';

export default function EditTalentPage() {
  const params = useParams();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [talent, setTalent] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const response = await getTalentProfileById(params.id as string);
        if (response) {
          setTalent(response.data.data);
        }
      } catch (error) {}
    };
    fetchTalent();
  }, [params.id]);

  const sections = [
    {
      id: 'candidate',
      title: 'Personal Information',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      component: PersonalInfoForm,
    },
    {
      id: 'educationAndExperience',
      title: 'Education & Experience',
      icon: GraduationCap,
      color: 'from-emerald-500 to-emerald-600',
      component: EducationForm,
    },
    {
      id: 'profileDetails',
      title: 'Profile Details',
      icon: FileText,
      color: 'from-violet-500 to-violet-600',
      component: ProfileForm,
    },
    {
      id: 'professionalLicense',
      title: 'Licenses & Certifications',
      icon: Award,
      color: 'from-orange-500 to-orange-600',
      component: LicensesForm,
    },
  ];

  const handleSectionClick = (sectionId: string) => {
    if (selectedSection === sectionId) {
      setSelectedSection(null);
      return;
    }
    setSelectedSection(sectionId);
  };

  const handleUpdate = async (data: any) => {
    setLoading(true);
    const getFunction = {
      candidate: updatePersonalInformation,
      educationAndExperience: updateEducationAndExperience,
      profileDetails: updateProfileDetails,
      professionalLicense: updateProfessionalLicense,
    };
    try {
      const response = await getFunction[
        selectedSection as keyof typeof getFunction
      ](params.id as string, data);
      if (response) {
        setTalent(response.data.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      setSelectedSection(null);
    }
  };

  if (!talent) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen bg-background'>
      <Sidebar />
      <div className='flex-1 flex flex-col md:pl-64'>
        <DashboardHeader />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-background p-6'>
          <div className='container mx-auto max-w-6xl'>
            <h1 className='text-3xl font-bold mb-6 text-[#004E64]'>
              Edit Talent Profile
            </h1>

            {/* Grid of section tiles */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
              {sections.map((section) => (
                <Card
                  key={section.id}
                  className={`audit-tile relative overflow-hidden rounded-lg cursor-pointer ${
                    selectedSection === section.id
                      ? 'ring-4 ring-[#F2994A]'
                      : ''
                  }`}
                  onClick={() => handleSectionClick(section.id)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-90`}
                  ></div>
                  <CardContent className='relative p-6 text-white'>
                    <div className='flex items-center mb-4'>
                      <section.icon className='tile-icon w-8 h-8 mr-3' />
                      <h2 className='text-xl font-semibold'>{section.title}</h2>
                    </div>
                    <p className='text-sm opacity-90'>Click to view</p>
                    <ChevronRight className='tile-chevron absolute bottom-4 right-4 w-6 h-6' />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Form section */}
            {selectedSection && (
              <div className='bg-white rounded-lg shadow-lg p-6 animate-fadeIn'>
                {sections.map((section) => {
                  if (section.id === selectedSection) {
                    const FormComponent = section.component;
                    return (
                      <div key={section.id}>
                        {/* <h2 className="text-2xl font-bold mb-6 text-[#004E64]">{section.title}</h2> */}
                        <FormComponent
                          data={talent[section.id]}
                          onUpdate={(updatedData: any) => {
                            setTalent({ ...talent, [section.id]: updatedData });
                            handleUpdate(updatedData);
                          }}
                          loading={loading}
                          closeForm={() => setSelectedSection(null)}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
