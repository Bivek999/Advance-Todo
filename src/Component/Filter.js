import React, { useRef } from 'react'

const Filter = (props) => {
    const fltRef=useRef();
    function submitHanler(e){
        e.preventDefault();
        // console.log(fltRef.current.value);
        props.onFilter(fltRef.current.value);
    }
  return (
    <div>
        <form onSubmit={submitHanler}>
        <select ref={fltRef}>
            <option value='all'>Month</option>
            <option value='0'>January</option>
            <option value='1'>February</option>
            <option value='2'>March</option>
            <option value='3'>April</option>
            <option value='4'>May</option>
            <option value='5'>June</option>
            <option value='6'>July</option>
            <option value='7'>August</option>
            <option value='8'>September</option>
            <option value='9'>October</option>
            <option value='10'>November</option>
            <option value={11}>December</option>
        </select>
        <button>Filter</button>
        </form>
    </div>
  )
}

export default Filter