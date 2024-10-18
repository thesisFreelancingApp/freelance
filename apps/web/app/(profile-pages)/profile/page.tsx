import Sidebar from "@/app/pages/profile/Sidebar";
import UserInfo from "@/app/pages/profile/UserInfo";

export default function ProfilePage() {
  const activeTab = "user-info";
  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} />
      <main className="flex-1 p-4">
        <UserInfo />
      </main>
    </div>
  );
}
