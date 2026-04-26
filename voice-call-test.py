import whisper

model = whisper.load_model("base", device = "cpu")
result = model.transcribe("robocall test.amr")
print("Transcription:", result["text"])