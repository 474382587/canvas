import { BrowserRouter, Route, Routes } from "react-router-dom";
import DrawBoard from "./DrawBoard";
import Home from "./Home";


import "./styles.css";



export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/draw" element={<DrawBoard />} />
      <Route path="/draw/:id" element={<DrawBoard />} />

    </Routes>
  </BrowserRouter>
}
