import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

function AddCompany({onClose}:any) {
    const { register, handleSubmit } = useForm()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn : (data:any) => axios.post('http://localhost:3000/companies/register',data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("jwt")}`
            }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] })
            queryClient.invalidateQueries({ queryKey: ["homePageStats"]})
            onClose()
        },
        onError: (error: any) => {
            alert(error || 'Something went wrong')
        }
    })

    const onSubmit = (data:any) => {
        mutation.mutate(data)
    }

    return (
        <>

            <div className='text-center flex justify-between'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register('name',{required:true})} id='name' type='text' placeholder='add company'
                    className='border p-1 m-1 rounded text-center w-55 border-gray-900'>
                    </input>
                    <button type='submit'></button>
                </form>
                <button className='bg-gray-900 m-1 rounded-full w-8 cursor-pointer hover:bg-gray-800 transition-all' onClick={()=>onClose()}>-</button>
            </div>
        </>
    )
}

export default AddCompany