import os
from google import genai
from transformers import AutoProcessor, AutoModelForMultimodalLM
import torch
import torchaudio

api_key = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=api_key)

MODEL_ID = "google/gemma-4-E2B-it"  

processor = AutoProcessor.from_pretrained("google/gemma-4-E2B-it")
model = AutoModelForMultimodalLM.from_pretrained("google/gemma-4-E2B-it")


def transcribe_audio(audio_path):
    waveform, sample_rate = torchaudio.load(audio_path)
    
   
