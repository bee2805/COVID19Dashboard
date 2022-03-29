import { Routes } from "react-router-dom";
import { Route } from "react-router-dom"
import Header from "./components/Header";
import ComOne from "./components/ComOne";
import ComTwo from "./components/ComTwo";
import ComThree from "./components/ComThree";

function App() {
  return (

    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element = {<ComOne/>}/>
        <Route path="/ComTwo" element = {<ComTwo/>}/>
        <Route path="/ComThree" element = {<ComThree/>}/>
      </Routes>
    </div>

  );
}

export default App;
