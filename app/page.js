"use client";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const voiceRef = useRef();
  const textRef = useRef();

  const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);

  // handler functions
  const handleGenerateTTS = async () => {
    const selectedVoice = voiceRef.current.value;
    const text = textRef.current.value;

    setLoading(true);
    try {
      if (!text || text.trim() === "") {
        alert("Enter some text");
        return;
      }

      const response = await fetch("/api/elevenlabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          voice: selectedVoice,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      //..
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      throw new Error("Failed to fetch api");
      //..
    } finally {
      setLoading(false);
    }
  };
      
  
  useEffect(() => {
    async function getVoices() {
      try {
        const response = await fetch("https://api.elevenlabs.io/v1/voices");

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const data = await response.json();

        setVoices(data.voices);
      } catch (error) {
        console.log(error.message);
      }
    }

    getVoices();
  }, []);

  return (
    <main>
      <div className="bg-white py-4 px-4 rounded-md">
        
     <h2 className="relative text-2xl font-semibold tracking-tight border-b sm:text-3xl scroll-m-20 first:mt-0">
        <span className="text-3xl font-extrabold text-primary">AI</span> Voice
        Generator
        <BotMessageSquare className="absolute w-6 h-6 -top-4 -right-6 text-primary" />
      </h2>
   

        <div className="my-6 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <label>Select a Voice:</label>
            <select ref={voiceRef} className="bg-blue-100 py-2 px-4 rounded-lg">
              {voices.map((voice) => (
                <option key={voice.voice_id} value={voice.voice_id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            className="p-4 border border-blue-100 rounded-lg outline-none placeholder-gray-400 focus-within:drop-shadow-md"
            placeholder="I've given up on you."
            cols={50}
            rows={10}
            ref={textRef}
          />

          <button
            disabled={loading}
            onClick={handleGenerateTTS}
            className="py-2 px-4 bg-blue-800 text-white rounded-lg hover:opacity-80"
          >
            {loading ? "Generating, please wait" : "Generate TTS"}
          </button>

          {audioURL &&  (<audio controls autoPlay>
          <source src={audioURL} type="audio/mpeg" />
        </audio>)}
        </div>
      </div>
    </main>
  );
}
