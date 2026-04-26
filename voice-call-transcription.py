import whisper
from flask import Flask, request, jsonify
import os
model = whisper.load_model("base", device = "cpu")
app = Flask(__name__)
UPLOAD_AUDIO = '/path/to/uploads/audio'
app.config['UPLOAD_AUDIO'] = UPLOAD_AUDIO
ALLOWED_EXTENSIONS = {'amr', 'wav', 'mp3'}
@app.route("/transcribe", methods=["POST"])
def upload_transcribe_audio_input():
    audio_upload = request.files["audio"]
    result = model.transcribe(audio_upload)
    print("Transcription:", result["text"])

