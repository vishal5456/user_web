import {Route, Routes} from 'react-router-dom'
import Home from "./components/Pages/Home";
import View from "./components/Pages/View";

function App() {
  return (
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path = "/view/:id" element={<View/>}></Route>
   </Routes>
  );
}

export default App;
