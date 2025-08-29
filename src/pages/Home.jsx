import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Tablerow from '../components/Tablerow'
import './Home.css'
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {

    const [url, setUrl] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passdata, setPassdata] = useState([]);
    const [editId, setEditId] = useState();

    const getPassdata = async () => {
        let req = await fetch(`${backendURL}`);
        let data = await req.json();
        setPassdata(data);
    }

    const [backendURL, setBackendURL] = useState(
        localStorage.getItem("backendURL") || "https://passfgt.onrender.com/"
    );

    const handleBackendChange = (e) => {
        setBackendURL(e.target.value);
        localStorage.setItem("backendURL", e.target.value);
    };



    useEffect(() => {
        getPassdata();
    }, [])

    const resetFields = () => {
        setUrl("");
        setUsername("");
        setPassword("");
    }


    const notify = (text) => {
        toast.success(text, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };


    const handleAdd = async () => {
        if (!url || username.length <= 3 || password.length <= 3) {
            toast.error("Please fill all fields (Minimum 4 characters)", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark"
            });
            return;
        }
        if (url && username.length > 3 && password.length > 3) {
            const newEntry = {
                id: uuidv4(),
                url: url,
                username: username,
                password: password
            }
            try {
                const req = await fetch(`${backendURL}/api/passwords`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newEntry)
                });

                if (req.ok) {
                    notify("Password Added!");
                    getPassdata();
                    resetFields();
                }
            } catch (error) {
                console.error("Error adding password: ", error);
            }
        }
    }


    const handleUpdate = async () => {
        if (!url || username.length <= 3 || password.length <= 3) {
            toast.error("Please fill all fields (Minimum 4 characters)", {
                position: "top-right",
                autoClose: 2000,
                theme: "dark"
            });
            return;
        }

        try {
            const res = await fetch(`${backendURL}/api/passwords/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url,
                    username,
                    password
                })
            });

            if (res.ok) {
                notify("Password Updated!");
                getPassdata();
                resetFields();
                setEditId(null);
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };


    const handleEdit = (id) => {
        const entry = passdata.find(item => item.id === id);
        if (entry) {
            setUrl(entry.url);
            setUsername(entry.username);
            setPassword(entry.password);
            setEditId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }


    const handleDelete = async (id, isdelete) => {
        try {
            const req = await fetch(`${backendURL}/api/passwords/${id}`, {
                method: "DELETE"
            });

            if (req.ok) {
                if (isdelete) notify("Password Deleted!");
                getPassdata();
                resetFields();
            }
        } catch (error) {
            console.error("Error deleting password: ", error);
        }
    };


    const handleurlChange = (e) => {
        setUrl(e.target.value);
    }

    const handleuserChange = (e) => {
        setUsername(e.target.value);
    }

    const handlepassChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <ToastContainer position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark" />

            <div className='h-[54vh] sm:h-[49vh] flex flex-col justify-center items-center gap-3'>
                <div className="logo text-white text-2xl sm:text-4xl"><h1>Pass<span className='font-extrabold text-emerald-700'>FGT</span></h1></div>
                <div className="logo text-gray-400 sm:text-xl lg:mb-[20px]">Your personal Password manager</div>
                <div className="flex flex-col lg:flex-row justify-center items-center w-[100%]">
                    <input onChange={handleurlChange} value={url} type="text" className='inputbox w-[80%]' placeholder="Website URL" />
                </div>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-[4%] w-[100%]'>
                    <input onChange={handleuserChange} value={username} type="text" className='inputbox w-[80%] lg:w-[47.5%]' placeholder='Username' />
                    <input onChange={handlepassChange} value={password} type="password" className='inputbox w-[80%] lg:w-[27.5%]' placeholder='Password' />
                </div>

                <button onClick={editId ? handleUpdate : handleAdd} className="flex justify-center items-center group border-1 border-black sm:text-lg lg:mt-[20px] text-bold bg-emerald-500 hover:bg-emerald-400 hover:scale-[1.02] duration-100 delay-25 cursor-pointer px-4 sm:px-[15px] py-1 sm:py-[5px] rounded-2xl">
                    <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover" />
                    <span className='ml-[7px] text-gray-100'>
                        {editId ? "Update" : "Save"}
                    </span>
                </button>

            </div>

            <div className='py-[2.5vh] w-[90vw] mx-auto flex justify-center text-white'>
                <div className='min-h-[35vh] sm:min-h-[40vh] w-[100%] border-emerald-900 border-1 rounded-lg bg-neutral-800 hover:scale-[1.02] hover: delay-25 duration-250 overflow-x-auto'>
                    <div className="w-full min-w-[600px]">
                        <table className='w-full'>
                            <thead>
                                <tr className='bg-emerald-900'>
                                    <th className='w-[30%] py-[10px]'>URL</th>
                                    <th className='w-[27.5%] py-[10px]'>Username</th>
                                    <th className='w-[22.5%] py-[10px]'>Password</th>
                                    <th className='w-[20%] py-[10px]'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='overflow-x-auto'>
                                {passdata.length === 0 ? (
                                    <></>
                                ) : (
                                    passdata.map(item => (
                                        <Tablerow
                                            key={item.id}
                                            id={item.id}
                                            url={item.url}
                                            username={item.username}
                                            password={item.password}
                                            notify={notify}
                                            handleEdit={() => handleEdit(item.id)}
                                            handleDelete={() => handleDelete(item.id, true)}
                                            editId={editId}
                                            className="h-[15%]"
                                        />
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="mb-5 text-center">
                <p className='text-emerald-500'>Connected to :</p>
                <input
                    type="text"
                    value={backendURL}
                    onChange={handleBackendChange}
                    placeholder="Enter your backend URL (Leave blank for demo)"
                    className="px-4 py-2 rounded-md text-gray-200 w-[80%] text-center sm:w-[50%]"
                />
            </div>

        </>
    )
}

export default Home;



