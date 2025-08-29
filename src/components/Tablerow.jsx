import React from 'react';
import "./Tablerow.css";

const Tablerow = ({ id, url, username, password, notify, handleEdit, handleDelete, editId }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    notify("Copied to Clipboard!");
  };

  const isEditing = id === editId;

  // Ensure url is valid before creating a clickable link
  const safeUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

  return (
    <tr className={`h-[100%] ${isEditing ? 'bg-emerald-600' : 'bg-teal-700'}`}>
      <td>
        <div className='flex justify-center items-center relative'>
          <div className='px-[50px]'>
            <a href={safeUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {url}
            </a>
          </div>
          <button onClick={() => handleCopy(url)} className='cpybtn'>
            <lord-icon className="h-[100%]" src="https://cdn.lordicon.com/hnqamtrw.json" trigger="hover" colors="primary:#d1f3fa,secondary:#00000"></lord-icon>
          </button>
        </div>
      </td>

      <td>
        <div className='flex justify-center items-center relative'>
          <div className='px-[50px]'>{username}</div>
          <button onClick={() => handleCopy(username)} className='cpybtn'>
            <lord-icon className="h-[100%]" src="https://cdn.lordicon.com/hnqamtrw.json" trigger="hover" colors="primary:#d1f3fa,secondary:#00000"></lord-icon>
          </button>
        </div>
      </td>

      <td>
        <div className='flex justify-center items-center relative'>
          <div className='px-[50px]'>{"*".repeat(password.length)}</div>
          <button onClick={() => handleCopy(password)} className='cpybtn'>
            <lord-icon className="h-[100%]" src="https://cdn.lordicon.com/hnqamtrw.json" trigger="hover" colors="primary:#d1f3fa,secondary:#00000"></lord-icon>
          </button>
        </div>
      </td>

      <td>
        <div className='flex justify-center items-center'>
          <button className='editButton' onClick={handleEdit}>
            <lord-icon className="h-[23px]" src="https://cdn.lordicon.com/tobsqthh.json" trigger="hover" colors="primary:#ebe6ef,secondary:#000000,tertiary:#3a3347"></lord-icon>
          </button>

          <button className='deleteButton' onClick={handleDelete}>
            <lord-icon className="h-[23px]" src="https://cdn.lordicon.com/xyfswyxf.json" colors="primary:#ffffff" trigger="hover"></lord-icon>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Tablerow;
