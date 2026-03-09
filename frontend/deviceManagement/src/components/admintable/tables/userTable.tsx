import {useState} from "react";
import AddUserPopUp from "@/components/admintable/AddUserPopUp.tsx";

type UserTableProps = {
    users: any[],
    selectedView: any
}

function UserTable({ users, selectedView }: UserTableProps) {
    const [addUser,setAddUser] = useState(false)
    return (
        <>
            <div>
                <div className='flex justify-between m-1 mx-3 '>
                    <div className='flex'>
                        <h1 className='p-1'>{selectedView.company.name}</h1>
                        <h1 className='p-1'>{selectedView.type}</h1>
                    </div>
                    <div className='flex gap-5'>
                        <h1 className='p-1'>add user</h1>
                        <button
                            onClick={()=>{setAddUser(true)}}
                            className='bg-gray-900 p-1 rounded-4xl w-8 cursor-pointer hover:rounded hover:bg-gray-800 transition-all duration-300'
                        >+
                        </button>
                    </div>
                </div>
                <hr className='w-300 bg-gray-900 m-2 h-1'></hr>

                <div className='bg-gray-600 p-1 rounded w-305font-mono text-left'>
                    {addUser && <AddUserPopUp selectedView={selectedView} onClose={()=>setAddUser(false)} />}
                    <div className='grid grid-cols-3 text-center'>
                        <h1>index</h1>
                        <h1>name</h1>
                        <h1>email</h1>
                    </div>
                    {users.map((user, i) => (
                        <div key={user._id} className='grid grid-cols-3 text-center p-1 m-1 bg-gray-700 rounded  border border-gray-900'>
                            <h1>{i + 1}.</h1>
                            <h1>{user.name}</h1>
                            <h1>{user.email}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserTable;