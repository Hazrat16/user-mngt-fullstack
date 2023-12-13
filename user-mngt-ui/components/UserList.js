"use client"
import { useEffect, useState } from "react";
import { USER_API_BASE_URL } from "./ApiRoute";
import UpdateUser from "./UpdateUser";
import User from "./User";


   
const UserList = ({user}) => {
    const [users,setUsers] = useState(null);
    const [loading,setLoading] = useState(false);
    const [userId,setUserId] = useState(null);
    const [responseUser,setResponseUser] = useState(null)

    useEffect(() => {
      const userData = async () => {
        setLoading(true);
        try {
                const response = await fetch(USER_API_BASE_URL,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    },
                })
            const users = await response.json();
            setUsers(users);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
      }
      userData();
    }, [user,responseUser])

    const deleteUser = (e,id) =>{
        e.preventDefault();
        fetch(`${USER_API_BASE_URL}/${id}`,{
            method:"DELETE",
        }).then((res)=>{
            if(users){
                setUsers((prevElement)=> prevElement.filter((user)=> user.id !== id) )
            }
        })
    }

    const updateUser = (e,id) =>{
        e.preventDefault();
        setUserId(id);
    }


  return (
    <>
    <div className=' container mx-auto my-8 ' >
        <div className=' flex shadow border-b '>
            <table className=' min-w-full ' >
                <thead className=' bg-gray-50 ' >
                    <tr>
                        <th className=" text-left font-medium uppercase text-gray-500 tracking-wide py-3 px-6 " >
                            First Name
                        </th>
                        <th className=" text-left font-medium uppercase text-gray-500 tracking-wide py-3 px-6 " >
                            Last Name
                        </th>
                        <th className=" text-left font-medium uppercase text-gray-500 tracking-wide py-3 px-6 " >
                            Email
                        </th>
                        <th className=" text-right font-medium uppercase text-gray-500 tracking-wide py-3 px-6 " >
                            Action 
                        </th>
                    </tr>
                </thead>
                {!loading && <tbody className=" bg-white" >
                    {users?.map((user)=>(
                        <User user={user} key={user.id} deleteUser={deleteUser} updateUser={updateUser} />
                    ))}
                    
                </tbody>}
                
            </table>
        </div>
    </div>
    <UpdateUser userId={userId} setResponseUser={setResponseUser} />
    </>
  )
}

export default UserList