import fs from "fs";
import path from "path";

export async function POST(request) {
  const { message, voice } = await request.json();

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      {
        method: "POST",
        headers: {
          accept: "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: message,
          voice_settings: {
            stability: 0,
            similarity_boost: 0,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }


    
    
    const arrayBuffer = await response.arrayBuffer();

    return new Response(arrayBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
      status: 200,
    });

    //...
  } catch (error) {
    console.log({ Error: error });
    throw new Error("Failed to fetch api: generate");
  }

}
