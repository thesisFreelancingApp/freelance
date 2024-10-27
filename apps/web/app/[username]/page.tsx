import UserProfilePage from "@/app/pages/profilePublic/index";

const AnotherPage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;

  return <UserProfilePage username={username} />;
};

export default AnotherPage;
