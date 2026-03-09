import {useState} from "react";
import AddDevicePopUp from "@/components/admintable/AddDevicePopUp.tsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

type DeviceTableProps = {
    devices: any[],
    selectedView: any
}

function DeviceTable({ devices, selectedView }: DeviceTableProps) {
    const [addDevice,setAddDevice] = useState(false)
    const [searchQuery,setSearchQuery] = useState('')

    const queryClient = useQueryClient();

    const updateDeviceMutation = useMutation({
        mutationFn: ({ id, isAuthorized }: { id: string; isAuthorized: boolean }) => axios.post(`http://localhost:3000/devices/authorize/${id}`,
                { isAuthorized },
                { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } }
            ),
        onSuccess: () => queryClient.invalidateQueries({queryKey:['devices']}),
        onError: (err) => console.error(err),
    });

    const changeAuthorization = (deviceId: string, currentStatus: boolean) => {
        updateDeviceMutation.mutate({ id: deviceId, isAuthorized: !currentStatus });
    };

    return (
        <>
            <div className='flex justify-between m-1 mx-3 '>
                <div className='flex'>
                    <h1 className='p-2'>{selectedView.company.name}</h1>
                    <h1 className='p-2'>{selectedView.type}</h1>
                </div>
                <div>
                    <input type='text'
                           className='border bg-gray-900 rounded p-1 m-1 w-66 text-center' placeholder='search by serial numbers'
                           value={searchQuery}
                           onChange={(e)=>setSearchQuery(e.target.value)}
                    >
                    </input>
                </div>
                <div className='flex gap-5'>
                    <h1 className='p-2'>add device</h1>
                    <button
                        onClick={()=>{setAddDevice(true)}}
                        className='bg-gray-900 p-1 rounded-4xl w-10 cursor-pointer hover:rounded hover:bg-gray-800 transition-all duration-300'
                    >+
                    </button>
                </div>
            </div>
            <hr className='w-300 bg-gray-900 m-2 h-1'></hr>
            <div className='bg-gray-600 p-1 rounded w-303 font-mono text-left'>
                {addDevice && <AddDevicePopUp selectedView={selectedView} onClose={()=>setAddDevice(false)}/>}
                <div className='grid grid-cols-5 text-center'>
                    <h1>index</h1>
                    <h1>name</h1>
                    <h1>serialNumber</h1>
                    <h1>isAuthorized</h1>
                </div>
                {devices.filter((device:any)=> device.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()))?.map((device, i) => (
                    <div key={device._id} className='grid grid-cols-5 text-center p-1 m-1 bg-gray-700 rounded border border-gray-900 '>
                        <h1 className='mt-2'>{i + 1}.</h1>
                        <h1 className='mt-2'>{device.name}</h1>
                        <h1 className='mt-2'>{device.serialNumber}</h1>
                        <h1 className='mt-2'>{device.isAuthorized.toString()}</h1>
                        <button
                            className={`p-1 m-1 rounded transition-all cursor-pointer ${
                                device.isAuthorized ? 'bg-red-700 hover:bg-red-600' : 'bg-green-700 hover:bg-green-600'
                            }`}
                            onClick={() => changeAuthorization(device._id,device.isAuthorized)}>
                            {device.isAuthorized ? 'Unauthorize' : 'Authorize'}
                        </button>
                    </div>
                ))}
            </div>
        </>

    );
}

export default DeviceTable;