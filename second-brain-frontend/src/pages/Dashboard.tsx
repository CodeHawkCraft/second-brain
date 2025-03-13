import  { useState } from 'react'
import SideBar, { activeTabValidValues } from '../Components/SideBar'
import DashboardContent from '../pages/DashboardContent'

const Dashboard = () => {
  const [activeTab,setActiveTab]=useState<activeTabValidValues>('all');
return (
  <div className="flex h-screen w-full">
    <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />
    
    <DashboardContent activeTab={activeTab} />
  </div>
);
}

export default Dashboard