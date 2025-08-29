import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Passwords.css';

const Passwords = () => {
  const [passdata, setPassdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const backendURL = localStorage.getItem("backendURL") || "https://passfgt.onrender.com";

  useEffect(() => {
    fetchPasswords();
  }, [backendURL]);

  const fetchPasswords = async () => {
    try {
      const response = await fetch(`${backendURL}/api/passwords`);
      const data = await response.json();
      setPassdata(data);
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to Clipboard!", {
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

  const filteredData = passdata.filter(
    (item) =>
      item.url.toLowerCase().includes(searchQuery) ||
      item.username.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="text-white p-4">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by website or username"
          className="px-4 py-2 w-[80%] sm:w-[50%] border-1 border-gray-500 hover:border-gray-400 delay-15 duration-50 ease-in-out rounded-md text-white"
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item) => {
          const safeUrl = item.url.startsWith("http://") || item.url.startsWith("https://") 
            ? item.url 
            : `https://${item.url}`;
          return (
            <div
              key={item.id}
              className="bg-neutral-700 border-1 border-neutral-500 rounded-xl p-5 hover:scale-[1.01] duration-200 overflow-auto max-h-[200px]"
            >
              <h3 className="text-xl font-bold text-emerald-500 mb-2 break-words">
                <a
                  href={safeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.url}
                </a>
              </h3>

              <div className="flex justify-between items-center mb-1">
                <p className="break-words">
                  <span className="text-gray-400">Username:</span> {item.username}
                </p>
                <button onClick={() => handleCopy(item.username)} className="h-[23px]">
                  <lord-icon
                    src="https://cdn.lordicon.com/hnqamtrw.json"
                    trigger="hover"
                    colors="primary:#d1f3fa,secondary:#00000"
                    style={{ width: "20px", height: "20px" }}
                  ></lord-icon>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <p className="break-words">
                  <span className="text-gray-400">Password:</span> {'*'.repeat(item.password.length)}
                </p>
                <button onClick={() => handleCopy(item.password)} className="h-[23px]">
                  <lord-icon
                    src="https://cdn.lordicon.com/hnqamtrw.json"
                    trigger="hover"
                    colors="primary:#d1f3fa,secondary:#00000"
                    style={{ width: "20px", height: "20px" }}
                  ></lord-icon>
                </button>
              </div>
            </div>
          );
        })}
        {filteredData.length === 0 && (
          <div className="text-gray-400 text-center col-span-full">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default Passwords;
