import axios from "axios";
import {useQuery} from "@tanstack/react-query";

async function getData(){
    const res = await axios.get('http://localhost:3000/companies/homeStats',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('jwt')}`
        }
    })

    return res.data
}

function HomeTable(){

    const { data, isLoading, error } = useQuery({
        queryKey: ["homePageStats"],
        queryFn: () => getData(),
    });

    if (isLoading) return <p>Loading stats...</p>;
    if (error) return <p>Error loading stats</p>;

    return(
        <>
            <div className='bg-gray-600 p-1 rounded w-307 font-mono text-center'>
                <h1 className='text-2xl'>Home Table</h1>
                <hr className='bg-gray-900 h-1 m-2'></hr>
                <div className='grid grid-cols-2'>
                    <div>
                        <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                            <h1>Company Number</h1>
                            <h1 className='bg-gray-600 rounded-full w-7'>{data.companies}</h1>
                        </div>
                        <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                            <h1>Total Users</h1>
                            <h1 className='bg-gray-600 rounded-full w-7'>{data.users}</h1>
                        </div>
                    </div>

                    <div>
                        <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                            <h1>Total Devices</h1>
                            <h1 className='bg-gray-600 rounded-full w-7'>{data.devices}</h1>
                        </div>
                        <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                            <h1>Authorized Devices</h1>
                            <h1 className='bg-green-700 rounded-full w-7'>{data.isAuth}</h1>
                        </div>
                        <div className='bg-gray-900 rounded flex p-5 m-2 justify-between'>
                            <h1>Not Authorized Devices</h1>
                            <h1 className='bg-red-700 rounded-full w-7'>{data.notAuth}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeTable