import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import SchoolIcon from '@mui/icons-material/School';

export const SidebarData = [
    {
        icon: <DashboardIcon />,
        title: "Dashboard",
        link: "/dashboard",
    },
    {
        icon: <PersonIcon />,
        title: "Account",
        link: "/account",
    },
    {
        icon: <HistoryEduIcon />,
        title: "Hồ Sơ",
        link: "/hoso",
    },
    {
        icon: <SchoolIcon />,
        title: "Trường",
        link: "/truong",
    },
]