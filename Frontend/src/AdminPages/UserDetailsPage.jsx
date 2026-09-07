import UserDetailsHeader from "../components/AdminComponent/Users/UserDetails/UserDetailsHeader";
import UserAccountStatus from "../components/AdminComponent/Users/UserDetails/UserAccountStatus";
import UserInformation from "../components/AdminComponent/Users/UserDetails/UserInformation";
import UserOrderStats from "../components/AdminComponent/Users/UserDetails/UserOrderStats";
import UserOrdersTable from "../components/AdminComponent/Users/UserDetails/UserOrdersTable";

function UserDetailsPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <UserDetailsHeader />

      <div className="space-y-5">
        <UserInformation />

        <UserOrderStats />

        <UserAccountStatus />

        <UserOrdersTable />
      </div>
    </div>
  );
}

export default UserDetailsPage;