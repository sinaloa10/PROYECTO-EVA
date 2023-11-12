const ElevenLabs = require("elevenlabs-node");
const fs = require("fs-extra");

const voice = new ElevenLabs(
    {
        apiKey:  "0e2c037kl8561005671b1de345s8765c", // Your API key from Elevenlabs
        voiceId: "pNInz6obpgDQGcFmaJgB",             // A Voice ID from Elevenlabs
    }
);

const voiceResponse = voice.textToSpeechStream({
    // Required Parameters
    textInput:       "mozzy is cool",                // The text you wish to convert to speech

    // Optional Parameters
    voiceId:         "21m00Tcm4TlvDq8ikWAM",         // A different Voice ID from the default
    stability:       0.5,                            // The stability for the converted speech
    similarityBoost: 0.5,                            // The similarity boost for the converted speech
    modelId:         "elevenlabs_multilingual_v2",   // The ElevenLabs Model ID
    style:           1,                              // The style exaggeration for the converted speech
    responseType:    "stream",                       // The streaming type (arraybuffer, stream, json)
    speakerBoost:    true                            // The speaker boost for the converted speech
  }).then((res) => {
    res.pipe(fs.createWriteStream(fileName));
});