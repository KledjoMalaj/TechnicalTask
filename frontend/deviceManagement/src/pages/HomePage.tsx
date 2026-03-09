import AdminTable from "@/components/AdminTable.tsx";

function HomePage(){
    return(
        <>
            <div className='text-center m-5'>
                <h1>Admin Page</h1>
            </div>
            <div>
                <AdminTable/>
            </div>
        </>
    )
}

export default HomePage