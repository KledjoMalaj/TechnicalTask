import axios from "axios";
import {useQuery} from "@tanstack/react-query";

async function getCompanyStats(id:string){
    const res = await axios.get(`http://localhost:3000/companies/stats/${id}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('jwt')}`
        }
    })
    return res.data
}

function CompanyTable({selectedView}:any){

    const { data, isLoading, error } = useQuery({
        queryKey: ["companyStats", selectedView.company._id],
        queryFn: () => getCompanyStats(selectedView.company._id),
        enabled: !!selectedView.company?._id,
    });

    if (isLoading) return <p>Loading stats...</p>;
    if (error) return <p>Error loading stats</p>;

    return (
        <>
            <h1 className='text-2xl'>{selectedView.company.name} Table</h1>
            <hr className='bg-gray-900 h-1 m-2'></hr>
            <div className='grid grid-cols-2 p-2 m-2'>
                <div>
                    <h1>Users</h1>
                    <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                        <h1>Total Users</h1>
                        <h1 className='bg-gray-600 rounded-full w-7'>{data.users}</h1>
                    </div>
                    <br></br>
                </div>
                <div>
                    <h1>Devices</h1>
                    <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                        <h1>Total Devices</h1>
                        <h1 className='bg-gray-600 rounded-full w-7'>{data.devices}</h1>
                    </div>
                    <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                        <h1>Authorised Devices</h1>
                        <h1 className='bg-green-700 rounded-full w-7'>{data.authorisedDevices}</h1>
                    </div>
                    <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                        <h1>Unauthorised Devices</h1>
                        <h1 className='bg-red-700 rounded-full w-7 '>{data.unauthorizedDevices}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyTable