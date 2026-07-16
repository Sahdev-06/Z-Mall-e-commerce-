import Breadcrumb from "../components/Common/Breadcrumb"
import ProfileSidebar from "../components/Profile/ProfileSidebar"
import PersonalInfo from "../components/Profile/PersonalInfo"
import ChangePassword from "../components/Profile/ChangePassword"
import AddressSection from "../components/Profile/AddressSection"
import { useState } from "react"

function Profile() {
    const [activeTab, setActiveTab] = useState("profile")
    return (
        <>
            <div className="space-y-8">
                <Breadcrumb />
                <h2 className="text-3xl font-bold text-slate-900">
                    My Account
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab}/>
                    </div>
                    <div className="col-span-3">
                        {activeTab === "profile" && <PersonalInfo />}
                        {activeTab === "password" && <ChangePassword />}
                        {activeTab === "address" && <AddressSection />}
                    </div>
                </div>
            </div>
        </>
    )
}


export default Profile