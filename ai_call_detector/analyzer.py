# Simple Audio Analysis Engine for AI Detection
import numpy as np
import soundfile as sf
import scipy.fft as fft
import pickle
import os
import pandas as pd

# Load model if it exists, fall back to manual rules if not
MODEL_PATH = "model.pkl"
model = None
if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    print("✓ Loaded trained model")
else:
    print("⚠ No model found — using manual rules")

def benchmark_analysis(audio_path):
    y, sr = sf.read(audio_path, always_2d=False)
    if len(y.shape) > 1:
        y = np.mean(y, axis=1)
    y = y.astype(np.float32)

    # Features
    spectral_data = np.abs(fft.fft(y))
    freqs = fft.fftfreq(len(spectral_data), 1/sr)
    hi_freq = spectral_data[(freqs > 10000) & (freqs < 15000)]
    fft_score = float(np.mean(hi_freq) / np.mean(spectral_data)) if len(hi_freq) > 0 else 0.0

    frame_size = 512
    frames = [y[i:i+frame_size] for i in range(0, len(y)-frame_size, frame_size//2)]
    energies = np.array([np.sum(f**2) for f in frames])
    delta_var = float(np.var(np.diff(energies)))

    zero_crossing = float(np.mean(np.abs(np.diff(np.sign(y)))) / 2)
    spectral_centroid = float(np.sum(freqs[:len(freqs)//2] * spectral_data[:len(spectral_data)//2]) / np.sum(spectral_data[:len(spectral_data)//2]))
    rms_energy = float(np.sqrt(np.mean(y**2)))


    features = pd.DataFrame([[fft_score, delta_var, zero_crossing, spectral_centroid, rms_energy]],
    columns=["fft_score", "delta_var", "zero_crossing", "spectral_centroid", "rms_energy"])

    # Use trained model if available, else fall back to manual rule
    if model:
        prediction = model.predict(features)[0]
        confidence = round(model.predict_proba(features)[0].max() * 100, 1)
        verdict = f"Likely {prediction.upper()} ({confidence}% confidence)"
    else:
        verdict = "Likely AI (Too Smooth)" if delta_var < 25 else "Likely Human"
        confidence = "N/A"

    return {
        "FFT_Detection_Strength": round(fft_score, 4),
        "Delta_MFCC_Fluidity": round(delta_var, 4),
        "Verdict": verdict,
        "Confidence": confidence
    }