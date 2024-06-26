import React from "react";
export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMeme, setAllMeme] = React.useState([]);


      /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */


  // React.useEffect(async () => {
  //   const res = await fetch("https://api.imgflip.com/get_memes")
  //   const data = await res.json()
  //   setAllMeme(data.data.memes)
  // }, [])

  React.useEffect(() => {
    async function getMemes() {
        const res = await fetch("https://api.imgflip.com/get_memes")
        const data = await res.json()
        setAllMeme(data.data.memes)
    }
    getMemes()
}, [])

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url,
    }))
  }

  function handleChange(event){
    const {name, value} = event.target
    setMeme(prevMeme=>({
        ...prevMeme,
        [name]: value
    }))
  }
  return (
    <main>
      <div className="form">
        <input 
            type="text" 
            className="form--input" 
            placeholder="Top text" 
            name="topText"
            value={meme.topText}
            onChange={handleChange}
        />
        <input 
            type="text" 
            className="form--input" 
            placeholder="Bottom text" 
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
        />
        <button 
            className="form--button" 
            onClick={getMemeImage}
        >
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
