import React,{useEffect} from "react";
import DefaultPage from "./components/DefaultPage";
import Login from "./components/Login";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./utils/StateProvider";

function App() {
  const [{token}, dispatch] = useStateProvider();
 
  useEffect(()=>{
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({type:reducerCases.SET_TOKEN, token});
    }
  },[token, dispatch])

  return (
    <div className="bg-slate-800 text-white transition-all duration-500">
      {token? <DefaultPage/> : <Login/>}
    </div>
  );
}

export default App;
