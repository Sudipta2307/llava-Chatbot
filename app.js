import React, { useState } from 'react';

function App() {
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  const [textOutput, setTextOutput] = useState("");
  const [llavaOutput, setLlavaOutput] = useState("");
  const [processedAudio, setProcessedAudio] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('data', JSON.stringify([{
      name: "audio", data: audio
    }, {
      name: "image", data: image
    }]));

    try {
      const response = await fetch('http://localhost:7860/api/predict', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setTextOutput(result.data[0]);
      setLlavaOutput(result.data[1]);
      setProcessedAudio(result.data[2]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Learn From LLava</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Upload Audio:
          <input type="file" accept="audio/*" onChange={e => setAudio(e.target.files[0])} />
        </label>
        <br />
        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Speech to Text Output:</h2>
        <p>{textOutput}</p>
        <h2>Llava Output:</h2>
        <p>{llavaOutput}</p>
        <h2>Processed Audio:</h2>
        {processedAudio && (
          <audio controls src={`data:audio/mp3;base64,${processedAudio}`} />
        )}
      </div>
    </div>
  );
}

export default App;
