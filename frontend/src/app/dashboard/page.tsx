'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService, User } from '@/lib/auth';
import { seekretService, Seekret } from '@/lib/seekret';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [seekrets, setSeekrets] = useState<Seekret[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    setUser(currentUser);
    loadSeekrets()
  }, [router]);

  const loadSeekrets = async () => {
    try {
      const data = await seekretService.getMySeekrets();
      setSeekrets(data);
    } catch (error) {
      console.error('Failed to load seekrets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <div className="space-x-2">
          <Link href="/seekrets/new" className="btn btn-primary">
            Create New Seekret
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {seekrets.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No Seekrets created yet</p>
            <Link href="/seekrets/new" className="btn btn-primary">
              Create Your First Seekret
            </Link>
          </div>
        ) : (
          seekrets.map((seekret) => (
            <div key={seekret.id} className="card">
              <h3 className="text-xl font-semibold mb-2">{seekret.name}</h3>
              <p className="text-gray-600 mb-2">
                {seekret.participants.length} participants
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Created: {new Date(seekret.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-sm ${
                  seekret.assignmentsGenerated 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {seekret.assignmentsGenerated ? 'Assigned' : 'Pending'}
                </span>

                <Link 
                  href={`/seekrets/${seekret.uniqueLink}`}
                  className="text-red-600 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
