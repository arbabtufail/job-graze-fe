'use client';

import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { FlipCard } from '@/components/flip-card';
import { TalentFilters } from '@/components/talent-filters';
import { toast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  deleteTalentProfileById,
  getAllTalentProfiles,
} from '@/services/network/networkManager';
import { talentInfo } from '@/shared/types/talentInfo';

export default function TalentProfilesPage() {
  const [talents, setTalents] = useState<talentInfo[]>([]);
  const [displayedTalents, setDisplayedTalents] = useState<talentInfo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    talentId: string | null;
  }>({ isOpen: false, talentId: null });
  const loader = useRef(null);

  // const loadMoreTalents = useCallback(() => {
  //   if (page < totalPages) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // }, [page, totalPages]);

  useEffect(() => {
    const fetchTalents = async () => {
      setIsLoading(true);
      try {
        const response = await getAllTalentProfiles();
        if (response) {
          setTalents(response.data.data);
          setDisplayedTalents(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching talents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTalents();
  }, []);
  // useEffect(() => {
  //   const fetchTalents = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(
  //         `/api/talent-profiles?page=${page}&limit=16`
  //       );
  //       const data = await response.json();
  //       setTalents((prevTalents) => [...prevTalents, ...data.talents]);
  //       setDisplayedTalents((prevTalents) => [...prevTalents, ...data.talents]);
  //       setTotalPages(data.totalPages);
  //     } catch (error) {
  //       console.error('Error fetching talents:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchTalents();
  // }, [page]);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         loadMoreTalents();
  //       }
  //     },
  //     { threshold: 1.0 }
  //   );

  //   if (loader.current) {
  //     observer.observe(loader.current);
  //   }

  //   return () => observer.disconnect();
  // }, [loadMoreTalents]);

  const handleFilterChange = (filters: any) => {
    let filteredTalents = talents;

    if (filters.status) {
      filteredTalents = filteredTalents.filter(
        (talent) =>
          talent.status && talent.status.toLowerCase() === filters.status
      );
    }

    if (filters.dateRange.from && filters.dateRange.to) {
      filteredTalents = filteredTalents.filter((talent) => {
        const createdDate = new Date(talent.createdAt);
        return (
          createdDate >= filters.dateRange.from &&
          createdDate <= filters.dateRange.to
        );
      });
    }

    setDisplayedTalents(filteredTalents);
  };

  const handleSortChange = (sort: string) => {
    let sortedTalents = [...displayedTalents];
    switch (sort) {
      case 'date':
        sortedTalents.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'name':
        sortedTalents.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'score':
        sortedTalents.sort((a, b) => b.profileScore - a.profileScore);
        break;
    }
    setDisplayedTalents(sortedTalents);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteTalentProfileById(id);
      if (response.status === 200) {
        setTalents((prevTalents) =>
          prevTalents.filter((talent) => talent.id !== id)
        );
        setDisplayedTalents((prevTalents) =>
          prevTalents.filter((talent) => talent.id !== id)
        );
        toast({
          title: 'Talent Deleted',
          description: 'The talent profile has been successfully deleted.',
        });
      } else {
        throw new Error(response.data.message || 'Failed to delete talent');
      }
    } catch (error) {
      console.error('Error deleting talent:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete talent. Please try again.',
        variant: 'destructive',
      });
    }
    setDeleteConfirmation({ isOpen: false, talentId: null });
  };

  return (
    <div className='min-h-screen bg-background'>
      <Sidebar />
      <div className='flex-1 flex flex-col md:pl-64'>
        <DashboardHeader />
        <main className='flex-1 overflow-x-hidden overflow-y-auto bg-background p-4 md:p-8'>
          <div className='container mx-auto px-2 md:px-6 py-8'>
            <h1 className='text-3xl font-bold text-foreground mb-6'>
              Talent Profiles
            </h1>
            <TalentFilters
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
            {isLoading && talents.length === 0 ? (
              <p>Loading...</p>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
                {displayedTalents.map((talent) => (
                  <FlipCard
                    key={talent.id}
                    talent={talent}
                    onDelete={() =>
                      setDeleteConfirmation({
                        isOpen: true,
                        talentId: talent.id,
                      })
                    }
                  />
                ))}
              </div>
            )}
            {page < totalPages && <div ref={loader} className='h-10' />}
          </div>
        </main>
      </div>
      <AlertDialog
        open={deleteConfirmation.isOpen}
        onOpenChange={(isOpen) =>
          setDeleteConfirmation({ isOpen, talentId: null })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this talent?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              talent profile from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteConfirmation.talentId &&
                handleDelete(deleteConfirmation.talentId)
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
