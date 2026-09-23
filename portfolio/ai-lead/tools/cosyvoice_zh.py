"""
Speak Mandarin sentences in the voice of a reference clip (CosyVoice 2, cross-lingual).
Called by narrate.py inside the `cosyvoice` conda environment:

  OMP_NUM_THREADS=1 KMP_DUPLICATE_LIB_OK=TRUE python cosyvoice_zh.py ref16k.wav jobs.json

jobs.json is [[text, out.wav], ...]. The thread settings are not optional: without
them torch and onnxruntime fight over OpenMP and the model segfaults while loading.
"""
import json, os, sys

CV = os.environ.get('COSYVOICE_DIR', '/Users/michailoustamanolakis/canonical/projects/CosyVoice')
sys.path[:0] = [CV, os.path.join(CV, 'third_party', 'Matcha-TTS')]

import torch, torchaudio
from cosyvoice.cli.cosyvoice import AutoModel

model = AutoModel(model_dir=os.path.join(CV, 'pretrained_models', 'CosyVoice2-0.5B'))
ref, jobs = sys.argv[1], json.load(open(sys.argv[2]))
for text, out in jobs:
    chunks = [j['tts_speech'] for j in model.inference_cross_lingual(text, ref, stream=False)]
    torchaudio.save(out, torch.cat(chunks, dim=1), model.sample_rate)
    print('   zh', os.path.basename(out), text[:30], flush=True)
