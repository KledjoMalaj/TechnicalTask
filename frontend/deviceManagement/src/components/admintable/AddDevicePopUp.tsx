import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

function AddDevicePopUp({onClose,selectedView}:any) {
    const {register,handleSubmit} = useForm()
    const queryClient = useQueryClient()

    const mutate = useMutation({
        mutationFn:(data:any) => axios.post('http://localhost:3000/devices/register',data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('jwt')}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['devices']})
            onClose()
        }
    })

    const onSubmit = (data:any) => {
        const newData = {
            ...data,
            companyId:selectedView.company._id
        }
        mutate.mutate(newData)
    }
    return (
        <>
            <div className='bg-gray-700 rounded p-2 m-1'>
                <h1 className='text-center'>add device</h1>
                <div className='border border-gray-900 p-1 m-1 rounded '>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex justify-between'>
                        <div>
                            <input className='bg-gray-600 p-1 m-1 rounded text-center' {...register('name',{required:true})} id='name' type='text' placeholder='device name'></input>
                            <input className='bg-gray-600 p-1 m-1 rounded text-center' {...register('serialNumber',{required:true})} id='serialNumber' type='text' placeholder='serial Number'></input>
                        </div>
                        <div className='flex gap-2'>
                            <h1 className='p-2'>quit</h1>
                            <button type='button' className='bg-gray-900 rounded-full w-10 hover:bg-gray-800 transition-all cursor-pointer' onClick={()=>onClose()}>-</button>
                        </div>
                        <button className='absolute' type='submit'></button>
                    </form>
                </div>
                <br></br>
            </div>
        </>
    )
}

export default AddDevicePopUp