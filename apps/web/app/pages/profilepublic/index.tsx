import React, { useState, useEffect } from 'react';
import { getUserProfileByUsername } from '@/server.actions/profilePublic/profilePublic.actions';
import { GetServerSidePropsContext } from 'next';
import { StarIcon, MapPinIcon, GlobeAltIcon, HeartIcon } from '@heroicons/react/24/solid';
import Profile from './profile';
import UserProfileCard from './profilecontactemoi';

type UserProfile = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  userEmail?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  bio?: string | null;
  profilePic?: string | null;
  title?: string | null;
  rating?: number;
  reviews?: number;
  languages?: string[];
  skills?: string[];
};

export default function UserProfilePage({ username }: { username: string }) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userProfile = await getUserProfileByUsername(username);
        if (userProfile) {
          setProfile(userProfile as UserProfile);
        } else {
          console.error("Profil utilisateur non trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur :", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [username]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center h-screen">Profil non trouvé</div>;
  }

  return (
    
    
    <div className="flex items-start space-x-8 mb-5">
      
        
          <Profile profile={{ ...profile, username: username, profilePic: profile.profilePic || '/placeholder.svg' }} />

    
      <UserProfileCard
      
            firstName={profile.firstName || ''}
            lastName={profile.lastName || ''}
            username={profile.username || ''}
            profilePic={profile.profilePic || '/placeholder.svg'}
          />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { username } = context.params || {};
  if (typeof username !== 'string') {
    return { props: { initialUsername: '' } };
  }
  return { props: { initialUsername: username } };
}
