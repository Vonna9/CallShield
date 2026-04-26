import whisper

model = whisper.load_model("base", device = "cpu")
result = model.transcribe("audio.amr")
print("Transcription:", result["text"])