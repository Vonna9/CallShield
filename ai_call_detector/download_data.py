from datasets import load_dataset
import soundfile as sf
import numpy as np
import os

os.makedirs("data/human", exist_ok=True)
os.makedirs("data/ai", exist_ok=True)

print("Loading dataset...")
ds = load_dataset("UniDataPro/real-vs-fake-human-voice-deepfake-audio", split="train")

human_count = 0
ai_count = 0

for i in range(len(ds)):
    try:
        sample = ds[i]
        audio = sample["audio"]
        y = np.array(audio["array"], dtype=np.float32)
        sr = audio["sampling_rate"]
        label = sample["label"]  # check what label field is called

        # 0 = real human, 1 = fake AI (adjust if needed)
        if label == 0 and human_count < 200:
            path = f"data/human/human_{human_count:04d}.wav"
            sf.write(path, y, sr)
            print(f"✓ Human {human_count}: saved")
            human_count += 1

        elif label == 1 and ai_count < 200:
            path = f"data/ai/ai_{ai_count:04d}.wav"
            sf.write(path, y, sr)
            print(f"✓ AI {ai_count}: saved")
            ai_count += 1

        if human_count >= 200 and ai_count >= 200:
            break

    except Exception as e:
        print(f"✗ Skipped {i}: {e}")
        continue

print(f"\nDone! {human_count} human + {ai_count} AI samples saved.")