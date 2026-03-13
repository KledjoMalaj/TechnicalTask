import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import AddCompany from "@/components/admintable/addCompany.tsx";

async function fetchCompanies(search?: string){
    const res = await axios.get('http://localhost:3000/companies',{
        params:{search},
        headers:{
            Authorization:`Bearer ${localStorage.getItem('jwt')}`
        }
    })
    return res.data
}

function SideBar({onSelect}:any){
    const [companyPopUp,setCompanyPopUp] = useState(false)
    const [openCompanyId, setOpenCompanyId] = useState<string| null>(null)
    const queryClient = useQueryClient()
    const [searchQuery, setSearchQuery] = useState('');

    const {data} = useQuery({
        queryKey:['companies', searchQuery],
        queryFn: () => fetchCompanies(searchQuery)
    })

    const deleteCompany = useMutation({
        mutationFn: (id: string) => axios.delete(`http://localhost:3000/companies/${id}`, {
            headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["companies"] })
        }
    })

    const onDelete = (id:string) => {
        deleteCompany.mutate(id)
    }


    return (
        <>
            <div className='bg-gray-600 p-1 rounded w-70 font-mono'>
                <div className='flex justify-between'>
                    <h1 className='p-1'>Companies</h1>
                    <div>
                        <button onClick={()=>setCompanyPopUp(true)}
                            className='bg-gray-900 p-1 rounded-4xl w-8 cursor-pointer hover:rounded hover:bg-gray-800 transition-all duration-300'>+</button>
                    </div>
                </div>

                <input type='text'
                       className='border bg-gray-900 rounded p-1 m-1 w-66 text-center' placeholder='search company'
                       value={searchQuery}
                       onChange={(e)=> setSearchQuery(e.target.value)}
                >
                </input>

                <div>
                    <div className='text-center bg-gray-800 m-1 p-1 rounded border border-gray-900 cursor-pointer hover:bg-gray-900 transition-all'
                         onClick={()=>{onSelect({type:"home"})}}
                    >Home</div>
                    {data?.map((company:any) => (
                        <div key={company._id}>

                            <div
                                className='text-center bg-gray-700 m-1 p-1 rounded border border-gray-900 cursor-pointer hover:bg-gray-900 transition-all'
                                onClick={() =>{ setOpenCompanyId(openCompanyId === company._id? null : company._id),
                                                onSelect({type:'company',company})
                                }}>
                                <h1>{company.name}</h1>
                                {openCompanyId === company._id && (
                                    <div className="bg-gray-800 p-2 rounded text-left  text-sm">
                                        <p className='p-1 hover:bg-gray-700 transition-all rounded'
                                           onClick={(e) => {e.stopPropagation(),onSelect({ type: "users", company })}}
                                        >Users</p>
                                        <p className='p-1 hover:bg-gray-700 transition-all rounded'
                                           onClick={(e) => {e.stopPropagation(),onSelect({ type: "devices", company })}}
                                        >Devices</p>
                                        <p className='p-1 mt-3 hover:bg-red-800 transition-all rounded'
                                           onClick={(e)=>{e.stopPropagation(),onDelete(company._id)}}
                                        >Delete</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {companyPopUp && <AddCompany onClose={()=> setCompanyPopUp(false)} />}
                </div>
            </div>
        </>
    )
}

export default SideBar