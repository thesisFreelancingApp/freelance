import Sidebar from "@/app/pages/Profile/Sidebar";
import UserInfo from "@/app/pages/Profile/UserInfo";

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
