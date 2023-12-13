"use client"
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { USER_API_BASE_URL } from "./ApiRoute";
import UserList from "./UserList";

const AddUser = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        id:"",
        firstName:"",
        lastName:"",
        email:""
    });
    const [responseUser, setResponseUser] = useState({
        id:"",
        firstName:"",
        lastName:"",
        email:""
    });

    const handleOnChangeValue = (event) =>{
        const value = event.target.value;
        setUser({...user,[event.target.name]:value});
    }
    const closeModal=()=>{
        setIsOpen(false);
    }
    const openModal =()=>{
        setIsOpen(true);
    }

    const handleSaveUser = async(e) =>{
        e.preventDefault();
    const response = await fetch(USER_API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const _user = await response.json();
    setResponseUser(_user)
        handleResetUser(e);
    }
    const handleResetUser = (e) =>{
        e.preventDefault();
        setUser({
            id:"",
        firstName:"",
        lastName:"",
        email:""
        })
        setIsOpen(false);
    }

  return (
    <>
    <div className=" container mx-auto my-8" >
        <div className=" h-12" >
            <button onClick={openModal} className=" rounded bg-slate-600 text-white px-6 py-2 font-semibold" >+ Add User</button>
        </div>
    </div>
    <Transition appear show={isOpen} as={Fragment} >
        <Dialog as="div" className=" fixed inset-0 z-0 overflow-y-auto" onClose={closeModal} >
            <div className=" min-h-screen px-4 text-center" >
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded" >
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900" >
                            Add New User
                        </Dialog.Title>
                        <div className=" flex mx-w-md max-auto">
                            <div className="py-2">
                                <div className="h-14 my-4">
                                    <label className=" block text-gray-600 text-sm font-normal">First Name</label>
                                    <input type="text" name="firstName" value={user.firstName} onChange={(e)=>handleOnChangeValue(e)} className="h-10 w-96 border mt-2 p-2"/>
                                </div>
                                <div className="h-14 my-4">
                                    <label className=" block text-gray-600 text-sm font-normal">Last Name</label>
                                    <input type="text" name="lastName" value={user.lastName} onChange={(e)=>handleOnChangeValue(e)}   className="h-10 w-96 border mt-2 p-2"/>
                                </div>
                                <div className="h-14 my-4">
                                    <label className=" block text-gray-600 text-sm font-normal">Email </label>
                                    <input type="text" name="email" value={user.email}  onChange={(e)=>handleOnChangeValue(e)}  className="h-10 w-96 border mt-2 p-2"/>
                                </div>
                            <div className=" h-14 my-4 space-x-4 pt-4 flex justify-evenly">
                                <button onClick={handleResetUser} className="rounded bg-black text-white font-semibold  py-2 px-8">Close</button>
                                <button onClick={handleSaveUser} className="rounded bg-blue-500 text-white font-semibold hover:bg-blue-800 py-2 px-8">Save</button>
                            </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>
    <UserList user={responseUser} />
    </>
  )
}

export default AddUser