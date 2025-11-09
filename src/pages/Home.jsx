import { useState, useEffect } from 'react'
import Tablerow from '../components/Tablerow'
import '../stylesheets/Home.css'
import { ToastContainer, toast } from 'react-toastify';

const Home = () => {

    const [url, setUrl] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passdata, setPassdata] = useState([]);
    const [editId, setEditId] = useState();
    const [backendURL, setBackendURL] = useState(
        localStorage.getItem("backendURL") || "https://passfgt.onrender.com"
    );

    useEffect(() => {
        getPassdata();
    }, [backendURL])

    const handleurlChange = (e) => {
        setUrl(e.target.value);
    }

    const handleuserChange = (e) => {
        setUsername(e.target.value);
    }

    const handlepassChange = (e) => {
        setPassword(e.target.value);
    }

    const handleBackendChange = (e) => {
        setBackendURL(e.target.value);
        localStorage.setItem("backendURL", e.target.value);
    };

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

    const getPassdata = async () => {
        const token = localStorage.getItem("token");
        try {
            const req = await fetch(`${backendURL}/api/passwords`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!req.ok) {
                console.error("Fetch error:", req.status);
                return;
            }

            const data = await req.json();
            if (Array.isArray(data)) {
                setPassdata(data);
            } else {
                console.error("Invalid data received:", data);
                setPassdata([]);
            }
        } catch (err) {
            console.error("Error fetching passwords:", err);
        }
    };


    const handleAdd = async () => {
        if (!url || username.length <= 3 || password.length <= 3) {
            toast.error("Please fill all fields (Minimum 4 characters)", { theme: "dark" });
            return;
        }

        const token = localStorage.getItem("token");

        try {
            const req = await fetch(`${backendURL}/api/passwords`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ url, username, password }),
            });

            if (req.ok) {
                notify("Password Added!");
                getPassdata();
                resetFields();
            } else {
                toast.error("Unauthorized or server error");
            }
        } catch (error) {
            console.error("Error adding password: ", error);
        }
    };


    const handleUpdate = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`${backendURL}/api/passwords/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ url, username, password }),
            });

            if (res.ok) {
                notify("Password Updated!");
                getPassdata();
                resetFields();
                setEditId(null);
            } else {
                toast.error("Unauthorized or server error");
            }
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };


    const handleEdit = (id) => {
        const entry = passdata.find(item => item._id === id);
        if (entry) {
            setUrl(entry.url);
            setUsername(entry.username);
            setPassword(entry.password);
            setEditId(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }


    const handleDelete = async (id, isdelete) => {
        const token = localStorage.getItem("token");

        try {
            const req = await fetch(`${backendURL}/api/passwords/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (req.ok) {
                if (isdelete) notify("Password Deleted!");
                getPassdata();
                resetFields();
            } else {
                toast.error("Unauthorized or server error");
            }
        } catch (error) {
            console.error("Error deleting password: ", error);
        }
    };


    return (
        <>
            {/* Toast Section */}
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

            {/* Hero Section */}
            <div className='h-[54vh] sm:h-[49vh] flex flex-col justify-center items-center gap-3'>
                <div className="text-white text-2xl sm:text-4xl"><h1>Pass<span className='font-extrabold text-emerald-700'>FGT</span></h1></div>
                <div className="text-gray-400 sm:text-xl lg:mb-[20px]">Your personal Password manager</div>

                {/* Input Boxes */}
                <div className="flex flex-col lg:flex-row justify-center items-center w-[100%]">
                    <input onChange={handleurlChange} value={url} type="text" className='inputbox border border-gray-500 hover:border-gray-400 w-[80%]' placeholder="Website URL" />
                </div>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-[4%] w-[100%]'>
                    <input onChange={handleuserChange} value={username} type="text" className='inputbox border border-gray-500 hover:border-gray-400 w-[80%] lg:w-[47.5%]' placeholder='Username' />
                    <input onChange={handlepassChange} value={password} type="password" className='inputbox border border-gray-500 hover:border-gray-400 w-[80%] lg:w-[27.5%]' placeholder='Password' />
                </div>

                {/* Save Password Button */}
                <button onClick={editId ? handleUpdate : handleAdd} className="flex justify-center items-center group border-1 border-black sm:text-lg lg:mt-[20px] text-bold bg-emerald-500 hover:bg-emerald-400 hover:scale-[1.02] duration-100 delay-25 cursor-pointer px-4 sm:px-[15px] py-1 sm:py-[5px] rounded-2xl">
                    <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" className="h-7" trigger="hover" />
                    <span className='ml-[7px] text-gray-100'>
                        {editId ? "Update" : "Save"}
                    </span>
                </button>
            </div>

            {/* Password Table */}
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
                                            key={item._id}
                                            id={item._id}
                                            url={item.url}
                                            username={item.username}
                                            password={item.password}
                                            notify={notify}
                                            handleEdit={() => handleEdit(item._id)}
                                            handleDelete={() => handleDelete(item._id, true)}
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



