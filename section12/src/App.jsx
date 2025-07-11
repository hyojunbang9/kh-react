import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import NotFound from "./pages/NotFound";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import emotion1 from "./assets/emotion1.png";
import emotion2 from "./assets/emotion2.png";
import emotion3 from "./assets/emotion3.png";
import emotion4 from "./assets/emotion4.png";
import emotion5 from "./assets/emotion5.png";
import { getEmotionImages } from "./util/getEmotionImages";

function App() {
  const nav = useNavigate();
  const onClickHome = () => {
    nav("/");
  };

  return (
    <>
      <div className="App">
        <Link to={"/"}>HOME</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary/3"}>Diary</Link>
        <Link to={"/edit/3"}>Edit</Link>
      </div>
      <div className="App">
        <button onClick={onClickHome}>HOME</button>
        <button
          onClick={() => {
            nav("/new");
          }}
        >
          NEW
        </button>
        <button
          onClick={() => {
            nav("/diary/2");
          }}
        >
          DIARY
        </button>
        <button
          onClick={() => {
            nav("/edit/2");
          }}
        >
          EDIT
        </button>
      </div>
      <div className="App">
        <img src="/emotion11.png" alt="" />
        <img src="/emotion12.png" alt="" />
        <img src="/emotion13.png" alt="" />
        <img src="/emotion14.png" alt="" />
        <img src="/emotion15.png" alt="" />
      </div>
      <div className="App">
        <img src={emotion1} alt="" />
        <img src={emotion2} alt="" />
        <img src={emotion3} alt="" />
        <img src={emotion4} alt="" />
        <img src={emotion5} alt="" />
      </div>
      <div className="App">
        <img src={getEmotionImages(1)} alt="" />
        <img src={getEmotionImages(2)} alt="" />
        <img src={getEmotionImages(3)} alt="" />
        <img src={getEmotionImages(4)} alt="" />
        <img src={getEmotionImages(5)} alt="" />
      </div>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new/*" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <hr />
      <div>
        <h1>Footer</h1>
      </div>
    </>
  );
}

export default App;
