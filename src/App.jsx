import { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Navbar from "./components/Navbar"
import Tablerow from './components/Tablerow'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  const [url, setUrl] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [passdata, setPassdata] = useState(() => {
    const saved = localStorage.getItem("passdata");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("passdata", JSON.stringify(passdata));
  }, [passdata])

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

  useEffect(() => {
    const pstring = localStorage.getItem("passdata");
    if (pstring) {
      setPassdata(JSON.parse(pstring));
    }
  }, [])

  const handleAdd = () => {
    if (url && username && password) {
      setPassdata([...passdata, { id: uuidv4(), url: url, username: username, password: password }]);
      setUrl("");
      setUsername("");
      setPassword("");
    }
  }

  const handleurlChange = (e) => {
    setUrl(e.target.value);
  }

  const handleuserChange = (e) => {
    setUsername(e.target.value);
  }

  const handlepassChange = (e) => {
    setPassword(e.target.value);
  }

  const handleEdit = (index) => {
    const editdata = passdata.filter(item => item.id===index);
    setUrl(editdata[0].url);
    setUsername(editdata[0].username);
    setPassword(editdata[0].password);
    handleDelete(index);
  }

  const handleDelete = (index) => {
    const newpassdata = passdata.filter(item => item.id !== index);
    setPassdata(newpassdata);
    notify("Password Deleted!");
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

      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      </div>

      <Navbar />

      <div className='h-[54vh] sm:h-[49vh] flex flex-col justify-center items-center gap-3'>
        <div className="logo text-white text-2xl sm:text-4xl"><h1>Pass<span className='font-extrabold text-emerald-700'>FGT</span></h1></div>
        <div className="logo text-gray-400 sm:text-xl lg:mb-[20px]">Your personal Password manager</div>
        <div className="flex flex-col lg:flex-row justify-center items-center w-[100%]">
          <input onChange={handleurlChange} value={url} type="text" className='inputbox w-[80%]' placeholder="Website URL" />
        </div>
        <div className='flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-[4%] w-[100%]'>
          <input onChange={handleuserChange} value={username} type="text" className='inputbox w-[80%] lg:w-[47.5%]' placeholder='Username' />
          <input onChange={handlepassChange} value={password} type="text" className='inputbox w-[80%] lg:w-[27.5%]' placeholder='Password' />
        </div>
        <button onClick={handleAdd} className='flex justify-center items-center group border-1 sm:text-lg lg:mt-[20px] text-bold bg-emerald-500 hover:bg-emerald-400 hover:scale-[1.02] duration-100 delay-25 cursor-pointer px-4 sm:px-[15px] py-1 sm:py-[5px] rounded-2xl'>
          <lord-icon
            src="https://cdn.lordicon.com/efxgwrkc.json"
            trigger="hover">
          </lord-icon>
          <span className='ml-[7px]'>Add Password</span>
        </button>
      </div>

      <div className='py-[2.5vh] w-[90vw] mx-auto flex justify-center text-white'>
        <div className='min-h-[35vh] sm:min-h-[40vh] w-[100%] border-emerald-900 border-1 rounded-lg bg-neutral-800 hover:scale-[1.02] hover: delay-25 duration-250 flex justify-center items-start'>
          <table className='w-[100%]'>
            <thead className=''>
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
                passdata.map(item => {
                  return (
                    <Tablerow key={item.id} url={item.url} username={item.username} password={item.password} notify={notify} handleEdit={() => handleEdit(item.id)} handleDelete={() => handleDelete(item.id)} className="h-[15%]" />
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App
