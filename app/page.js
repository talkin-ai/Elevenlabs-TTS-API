"use client";

import { useRef, useState, useEffect } from "react";
import Head from 'next/head';

export default function Home() {
  const voiceRef = useRef();

  const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [text, setText] = useState("");
  
  // handler functions
  const handleGenerateTTS = async () => {
    e.preventDefault();
    const selectedVoice = voiceRef.current.value;
  
    setLoading(true);
    try {
      if (!text || text.trim() === "") {
        alert("Enter some text");
        return;
      }
      const textTrim = text.trim();
      const response = await fetch("/api/elevenlabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textTrim,
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
    
    <>
            <Head>
                <title>AIVIDOO AI Voice Generator</title>

                <meta name="description" content="AIVIDOO AI voice generator" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

                <link rel="icon" href="/aividoo_logo.png" />
            </Head>

            
               

            <main className="p-10 mx-auto max-w-4xl">
      

      <div className="relative pt-20 ml-auto">
      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
      <div className="blur-[106px] h-20 bg-gradient-to-r from-yellow-400 to-orange-600 dark:to-indigo-600"></div>
      <div className="blur-[106px] h-30 bg-gradient-to-r from-orange-600 to-red-400 dark:from-red-700"></div>
      </div>
          <div className="lg:w-3/4 text-center mx-auto mb-10">
              <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">AI Voice<span className="text-primary dark:text-white"> Generator.</span></h1>
            
          </div>
      </div>
    
    
    
        <div className="my-6 flex flex-col gap-4">
          <div className="flex text-white gap-4 items-center">
            <label>Select a Voice:</label>
            <select ref={voiceRef} className="bg-[#5BBCFF] text-white py-2 px-4 rounded-lg">
              {voices.map((voice) => (
                <option key={voice.voice_id} value={voice.voice_id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

                      
            <textarea
            className="p-4 border border-blue-100 rounded-lg outline-none placeholder-gray-400 focus-within:drop-shadow-md"
            placeholder="Hello, Welcome to AIVIDOO."
           value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
            cols={50}
            rows={10}
        
          />

          <button
            disabled={loading}
            onClick={handleGenerateTTS}
            className="py-2 px-4 bg-[#5BBCFF] text-white rounded-lg hover:opacity-80"
          >
            {loading ? "Generating, please wait" : "Generate TTS"}
          </button>

          {audioURL &&  (<audio controls autoPlay>
          <source src={audioURL} type="audio/mpeg" />
        </audio>)}
        
      </div>
    </main>
            </>
  );
}
