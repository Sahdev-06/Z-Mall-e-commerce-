import UsersPageHeader from "../components/AdminComponent/Users/UsersPageHeader";
import UsersToolbar from "../components/AdminComponent/Users/UsersToolbar";
import UsersTable from "../components/AdminComponent/Users/UsersTable";
import { getAllUsers, getUserById } from "../services/userService";
import { useState, useEffect } from "react";
import AdminPageLoader from "../components/AdminComponent/Layout/AdminPageLoader"

function UsersPage() {
  const [users, setusers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalUsers, setTotalUsers] = useState(0)
  const [search, setSearch] = useState("")
  const [appliedSearch, setAppliedSearch] = useState("")
  const [status, setStatus] = useState("")

  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUsers(currentPage, limit, appliedSearch, status)
        setusers(result.data.users)
        setCurrentPage(result.data.currentPage)
        setTotalPages(result.data.totalPages)
        setTotalUsers(result.data.totalUsers)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage, appliedSearch, status])

  // handle reset filters and search
  const handleReset = () => {
    setSearch("");
    setAppliedSearch("");
    setStatus("");
    setCurrentPage(1);
  }

  if(loading) {
    return <AdminPageLoader />
  }


  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <UsersPageHeader />

      <UsersToolbar 
        search={search}
        setSearch={setSearch}
        onSearch={() => {
          setAppliedSearch(search)
          setCurrentPage(1)
        }}
        status={status}
        setStatus={setStatus}
        onStatusChange={() => {
          setCurrentPage(1)
        }}
        onReset={handleReset}
      />

      <UsersTable 
        users={users}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalUsers={totalUsers}
        limit={limit}
      />
    </div>
  );
}

export default UsersPage;