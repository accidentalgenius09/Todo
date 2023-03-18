import React from 'react';

function Box() {
  return (
    <div className="flex text-white justify-center items-center">
      <div className="w-full rounded-t-xl sm:w-4/5 md:w-96 h-14 text-center mt-14 grid grid-cols-3 gap-2 sm:gap-2 bg-gray-800 text-lg sm:text-base xs:text-sm">
        <div className='flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:border hover:rounded-t-xl border-gray-400 px-2 sm:px-3'>All</div>
        <div className='flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:border hover:rounded-t-xl border-gray-400 px-2 sm:px-3'>Active</div>
        <div className='flex items-center justify-center hover:bg-white hover:bg-opacity-25 hover:border hover:rounded-t-xl border-gray-400 px-2 sm:px-3'>Completed</div>
      </div>
    </div>
  );
}

export default Box;
