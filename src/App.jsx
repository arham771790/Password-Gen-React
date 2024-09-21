import { useEffect, useState,useRef } from 'react'
import './App.css'
import { useCallback } from 'react';

function App() {
  let [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, Setpassword] = useState("");
//UseCallback ka ye kaam h jis jis variable me wo dependent h uska data memoize krta rhega like dp to optimise the web
  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789"
    if(characterAllowed) str+="~!@#$%^&*()_+{}[]|:;'<>,./?`";
    for(let i=1;i<=length;i++)
    {
      let ch=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(ch);
    }
    Setpassword(pass);

  }, [length, numberAllowed, characterAllowed, Setpassword]);
  //Iska kaam ye h ki agar koi change hoga to function firse re render hoga
  const passValue=useRef(null);
  const copytoClipBoard=useCallback(()=>{
    passValue.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator();

  },[length,characterAllowed,numberAllowed,Setpassword]);
  return (
    <>
      <div  className="w-auto h-screen bg-no-repeat bg-cover bg-fixed  p-0" style={{backgroundImage:`url("https://images.pexels.com/photos/27920274/pexels-photo-27920274/free-photo-of-real-estate-business-finance-background-template-calculator-door-key.jpeg?auto=compress&cs=tinysrgb&w=600")`}}>
      <div className=" flex justify-center flex-col w-full max-w-screen-md  mx-auto shadow-md rounded-lg text-orange-600 bg-gray-700 px-4 my-8  ">
      <h1 className="text-4xl text-center " style={{ color: "white" }}>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="bg-transparent outline-none w-full py-1 px-3 my-2 rounded-lg" placeholder='password' readOnly ref={passValue}/>
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copytoClipBoard}>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label >Length:{length}</label>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={numberAllowed}  id="numberInput" onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}/>
          <label htmlFor="" className>Numbers</label>
          <input type="checkbox" defaultChecked={characterAllowed}  id="characterInput" onChange={()=>{
            setCharacterAllowed((prev)=>!prev);
          }}/>
          <label htmlFor="">Characters</label>
          
        </div>
      </div>
      </div>
      </div>
    </>
  )
}

export default App
