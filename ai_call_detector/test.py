from analyzer import benchmark_analysis

# Test with any .wav file you have
audio_path = "data/ai/Amelia-2026_04_25.wav"

result = benchmark_analysis(audio_path)
print("===== RESULT =====")
print(f"  Verdict:     {result['Verdict']}")
print(f"  Confidence:  {result['Confidence']}")
print(f"  FFT Score:   {result['FFT_Detection_Strength']}")
print(f"  Fluidity:    {result['Delta_MFCC_Fluidity']}")