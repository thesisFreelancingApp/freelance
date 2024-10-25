import React from 'react';
import { getUserProfileByUsername } from '@/server.actions/profilePublic/profilePublic.actions';
import Profile from '@/app/pages/profilepublic/profile';
import { GetServerSidePropsContext } from 'next';

type UserProfile = {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  userEmail?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  bio?: string | null;
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { username } = context.params || {};
  if (typeof username !== 'string') {
    return { props: { userProfile: null } }; // Handle the case where username is not a string
  }
  const userProfile = await getUserProfileByUsername(username);
  return { props: { userProfile } };
}

const UserProfilePage = ({ userProfile }: { userProfile: UserProfile | null }) => {
  if (!userProfile) {
    return <div>User not found</div>;
  }

  return (
    <Profile
      firstName={userProfile.firstName || ''}
      lastName={userProfile.lastName || ''}
      username={userProfile.username || ''}
      email={userProfile.userEmail || ''}
      address={userProfile.address || ''}
      phoneNumber={userProfile.phoneNumber || ''}
      bio={userProfile.bio || ''}
    />
  );
};

export default UserProfilePage;
