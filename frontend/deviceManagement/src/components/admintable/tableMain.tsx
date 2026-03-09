import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UserTable from "./tables/userTable.tsx";
import DeviceTable from "./tables/deviceTable.tsx";
import CompanyTable from "@/components/admintable/tables/companyTable.tsx";
import HomeTable from "@/components/admintable/tables/homeTable.tsx";

async function fetchUsers(id: string) {
    const res = await axios.get(`http://localhost:3000/users/company/${id}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('jwt')}`
        }
    });
    return res.data;
}

async function fetchDevices(companyId: string) {
    const res = await axios.get(`http://localhost:3000/devices/company/${companyId}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('jwt')}`
        }
    });
    return res.data;
}

function TableMain({ selectedView }: any) {
    if (!selectedView.company) return <HomeTable/>;

    const { data, isLoading, isError } = useQuery({
        queryKey: [selectedView.type, selectedView.company._id],
        queryFn: () =>
            selectedView.type === "users"
                ? fetchUsers(selectedView.company._id)
                : fetchDevices(selectedView.company._id),
        enabled: !!selectedView,
    });

    if (isLoading) return <div>Loading {selectedView.type}...</div>;
    if (isError) return <div>Error loading {selectedView.type}</div>;

    return (
        <div className='bg-gray-600 p-1 rounded w-307 font-mono text-center'>
            {selectedView.type === "users" && <UserTable users={data} selectedView={selectedView} />}
            {selectedView.type === "devices" && <DeviceTable devices={data} selectedView={selectedView} />}
            {selectedView.type === "company" && <CompanyTable selectedView={selectedView}/>}

        </div>
    );
}

export default TableMain;