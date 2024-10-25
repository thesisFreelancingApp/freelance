"use client";

import React from 'react';
import { getUserProfileByUsername } from '@/server.actions/profilePublic/profilePublic.actions';
import UserProfilePage from '@/app/pages/profilepublic/index'; // Import the UserProfilePage component

// Define a type for the user profile based on the Prisma schema
type UserProfile = {
  id: string; // Ensure 'id' is included in the UserProfile type
  firstName: string | null;
  lastName: string | null;
  profilePic: string | null; // Ensure 'profilePic' is included in the UserProfile type
  phoneNumber: string | null;
  address: string | null;
  bio: string | null;
  birthDate: Date | null;
  userEmail: string;
  username: string;
  name: string | null; // This can be constructed from firstName and lastName
  // Add any other fields from your Prisma model if necessary
};

const AnotherPage = ({
  params,
}: {
  params: { username: string };
}) => {
  const username = params.username;

  if (!username) {
    return <div>Username not provided</div>;
  }

  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfileByUsername(username);
        console.log(profile); // Log the profile to check if 'id' is present
        if (profile) { // Add a null check for profile
          const completeProfile: UserProfile = {
            id: profile.id || '',
            firstName: profile.firstName || null,
            lastName: profile.lastName || null,
            profilePic: profile.profilePic || null,
            phoneNumber: profile.phoneNumber || null,
            address: profile.address || null,
            bio: profile.bio || null,
            birthDate: profile.birthDate || null,
            userEmail: profile.userEmail || '',
            username: profile.username || '',
            name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
            // Add any other fields from your Prisma model if necessary
          };
          setUserProfile(completeProfile);
        } else {
          console.error("Profile is null");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  return (
                <UserProfilePage username={username} /> // Ensure UserProfilePage accepts userProfile prop



  );
};

export default AnotherPage;
