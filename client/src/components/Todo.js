import React, { useState, useEffect } from "react";
import {
  BsPlusCircle,
  BsFillSunFill,
  BsFillMoonFill,
  BsFillXCircleFill,
} from "react-icons/bs";
import axios from "axios";
import Box from "./Box";

function Todo() {
  useEffect(() => {
    additem();
  }, []);

  const [items, setItems] = useState([]);

  function additem() {
    const localstorageupdate = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      localstorageupdate.push({ key, value, checked: false }); // add "checked" property
    }
    setItems(localstorageupdate);
  }

  function handleCheck(index) {
    // pass index of item to update
    setItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  }
  
  function deltodo(item){
    localStorage.removeItem(item.key);
    setItems((prevItems) => prevItems.filter((prevItem) => prevItem.key !== item.key));
  }



  const [addtodo, setAddTodo] = useState("");
  async function handletodo() {
    if (!addtodo) {
      alert("Please enter a todo item");
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:3001/addtodo", {
        addtodo,
      });
      localStorage.setItem(data.newTodo._id, data.newTodo.addtodo);
      additem();
    } catch (error) {
      console.log(error.response.data);
      alert("Successfully Failed");
    }
    setAddTodo("");
  }

  const [darkmode, setDarkmode] = useState(false);
  function Darkmodefunction() {
    setDarkmode(!darkmode);
  }



  return (
    <div
      className={`pt-20 ${
        darkmode ? "bg-gray-900 text-white" : "text-black bg-white"
      } h-screen`}
    >
      <div className="">
        <div className="pb-16 flex flex-col sm:flex-row sm:gap-14 xs:gap-10 md:gap-20 justify-center lg:gap-80 items-center">
          <div className="text-3xl font-bold">T O D O</div>
          <button className="text-3xl" onClick={Darkmodefunction}>
            {!!darkmode && <BsFillSunFill />}
            {!darkmode && <BsFillMoonFill />}
          </button>
        </div>

        <div className="flex justify-center items-center input-with-icon">
          <input
            type="text"
            className={`p-4 ${
              !darkmode ? "border border-black" : "border-white"
            } w-full sm:w-4/12 text-black h-14 font-medium rounded-md`}
            placeholder="Create a new todo..."
            value={addtodo}
            onChange={(ev) => setAddTodo(ev.target.value)}
          />
          <button className="text-xl text-black -ml-8" onClick={handletodo}>
            <BsPlusCircle />
          </button>
        </div>
      </div>

      {/* tasks*/}
      <div>
        <Box dark={darkmode}/>
      </div>

      {/* added tasks */}
      <>
        <div
          className="flex flex-col items-center justify-center"
        >
          {items.map((item, index) => (
            <div
              className={`flex items-center justify-between w-full max-w-sm bg-gray-500 text-white h-14 border px-4 ${
                !darkmode ? "border border-white" : "border-gray-900"
              }`}
              key={index}
            >
              <label className="flex items-center gap-2 text-lg">
                <input

                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheck(index)} // pass index to handleCheck
                />
                    <span className={item.checked ? "line-through font-small" : "font-small"}>{item.value}</span>
                
              </label>
              <button className="text-xl text-white"  onClick={()=>deltodo(item)}>
                <BsFillXCircleFill />
              </button>
            </div>
          ))}
        </div>
      </>
    </div>
  );
}

export default Todo;
