import SideBar from "@/components/admintable/sideBar.tsx";
import TableMain from "@/components/admintable/tableMain.tsx";
import {useState} from "react";
import HomeTable from "@/components/admintable/tables/homeTable.tsx";

function AdminTable() {
    const [selectedView,setSelectedView] = useState<any>(null)

    return (
        <>
            <div className="border border-gray-100 rounded p-2 bg-gray-900 m-1 flex gap-2">
                <SideBar onSelect={setSelectedView} />
                {!selectedView && <HomeTable/>}
                {selectedView && <TableMain selectedView={selectedView} />}
            </div>
        </>
    )
}

export default AdminTable