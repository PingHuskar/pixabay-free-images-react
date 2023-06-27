import { useState } from "react";
import "./App.css";
import axios from "axios";


function App() {
  const [key, setKey] = useState(localStorage.getItem(`key`) || ``)
  const [hits, setHits] = useState([]);
  const [q, setQ] = useState(localStorage.getItem(`q`) || ``);

  function getImages() {
    axios
      .get(`https://pixabay.com/api/?key=${key}&q=${q}&image_type=photo`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        return data.hits;
      })
      .then((hits) => {
        setHits(hits);
      });
  }

  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <label htmlFor="key">KEY</label>
            <input
              type="password"
              id="key"
              value={key}
              placeholder={`enter you api key`}
              onChange={(e) => {
                e.preventDefault();
                localStorage.setItem(`key`, e.target.value);
                setKey(e.target.value);
              }}
              />
            </div>
            <div className="">
            <label htmlFor="search">Search For</label>
          <input
            type="text"
            id="search"
            value={q}
            placeholder={`enter something`}
            onChange={(e) => {
              e.preventDefault();
              localStorage.setItem(`q`, e.target.value);
              setQ(e.target.value);
            }}
            />
            </div>
          <button onClick={getImages}>Get Images</button>
        </div>
        <br />
        <div className="">
          {hits &&
            hits.map((hit: any, index: number) => {
              return (
                <div key={index} className="hit">
                  <img src={hit.webformatURL} alt={hit.id} />
                  <p className="download">{hit.downloads}</p>
                  <p className="tags">{hit.tags}</p>
                  <div className="user">
                    {/* <img src={hit.userImageURL} alt="" /> */}
                    <p>{hit.user}</p>
                  </div>
                  <hr />
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
