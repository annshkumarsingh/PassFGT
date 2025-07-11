import React from 'react'
import "./Tablerow.css"

const Tablerow = (props) => {
  const { url, username, password, notify, handleEdit, handleDelete } = props;

  const handleCopy = (e) => {
    navigator.clipboard.writeText(e);
    notify("Copied to Clipboard!");
  }

  return (
    <tr className='h-[100%] bg-teal-700'>

      <td className=''>
        <div className='flex flex-row justify-center items-center relative px-[70px]'>
          <div className=''>{url}</div>
          <button onClick={() => {handleCopy(url)}} className='cpybtn'>
            <lord-icon className="h-[100%]"
              src="https://cdn.lordicon.com/hnqamtrw.json"
              trigger="hover"
              colors="primary:#d1f3fa,secondary:#00000">
            </lord-icon>
          </button>
          <div className='w-10 h-[100%] absolute right-0 bg-gradient-to-r from-transparent to-teal-700'></div>
        </div>
      </td>

      <td className=''>
        <div className='flex flex-row justify-center items-center relative'>
          <div className=''>{username}</div>
          <button onClick={() => {handleCopy(username)}} className='cpybtn'>
            <lord-icon className="h-[100%]"
              src="https://cdn.lordicon.com/hnqamtrw.json"
              trigger="hover"
              colors="primary:#d1f3fa,secondary:#00000">
            </lord-icon>
          </button>
        </div>
      </td>

      <td className='h-[100%]'>
        <div className='flex flex-row justify-center items-center relative'>
          <div className=''>{password}</div>
          <button onClick={() => {handleCopy(password)}} className='cpybtn'>
            <lord-icon className="h-[100%]"
              src="https://cdn.lordicon.com/hnqamtrw.json"
              trigger="hover"
              colors="primary:#d1f3fa,secondary:#00000">
            </lord-icon>
          </button>
        </div>
      </td>

      <td >
        <div className='flex flex-row justify-center items-center'>

          <button className='editButton' onClick={()=>handleEdit()}>
            <lord-icon className="h-[23px]"
              src="https://cdn.lordicon.com/tobsqthh.json"
              trigger="hover"
              colors="primary:#ebe6ef,secondary:#000000,tertiary:#3a3347">
            </lord-icon>
          </button>

          <button className='deleteButton' onClick={handleDelete}>
            <lord-icon className="h-[23px]"
              src="https://cdn.lordicon.com/xyfswyxf.json"
              colors="primary:#ffffff"
              trigger="hover">
            </lord-icon>
          </button>

        </div>
      </td>

    </tr>
  )
}

export default Tablerow
