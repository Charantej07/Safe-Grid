import os
import uuid
import cv2
import numpy as np
import time
import subprocess
from dotenv import load_dotenv
from tensorflow import keras
import requests
from collections import deque
import threading

load_dotenv()

YOUTUBE_URL = os.getenv("YOUTUBE_URL")
MODEL_PATH = os.getenv("MODEL_PATH")
CAMERA_ID = os.getenv("CAMERA_ID")
FPS = int(os.getenv("FPS", 10))
CLIP_SECONDS = 30
INCIDENT_UPLOAD_URL = os.getenv("INCIDENT_UPLOAD_URL")
FRAME_WIDTH, FRAME_HEIGHT = 224, 224

print("[INFO] Loading model...")
model = keras.models.load_model(MODEL_PATH)

def get_best_stream_url(url):
    import yt_dlp as ytdl
    ydl_opts = {'format': 'best[ext=mp4][vcodec^=avc1]/best', 'quiet': True}
    with ytdl.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=False)
        return info_dict.get("url", None)

stream_url = get_best_stream_url(YOUTUBE_URL)
if not stream_url:
    print("[ERROR] Could not get stream URL")
    exit()

def predict_violence(video_path):
    cap = cv2.VideoCapture(video_path)
    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (224, 224))
        frames.append(frame)
    cap.release()

    frames = np.array(frames).astype("float32") / 255.0
    preds = model.predict(frames, verbose=0)
    return np.mean(preds)

def upload_incident(video_path, score):
    with open(video_path, "rb") as f:
        files = {"file": (os.path.basename(video_path), f, "video/mp4")}
        data = {"camera_id": CAMERA_ID, "confidence_score": score}
        try:
            r = requests.post(INCIDENT_UPLOAD_URL, files=files, data=data)
            print("✅ Uploaded" if r.status_code == 200 else "❌ Upload failed:", r.text)
        except Exception as e:
            print("❌ Upload error:", e)

def record_clip():
    incident_id = uuid.uuid4().hex
    tmp_filename = f"videos/before_model_{incident_id}.mp4"
    cmd = [
        "ffmpeg", "-y", "-i", stream_url,
        "-t", str(CLIP_SECONDS),
        "-vf", f"scale={FRAME_WIDTH}:{FRAME_HEIGHT}",
        "-r", str(FPS),
        "-an",
        tmp_filename
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return tmp_filename

print("[INFO] Monitoring started...")
os.makedirs("videos", exist_ok=True)

while True:
    clip_path = record_clip()
    score = predict_violence(clip_path)
    print(f"🔍 Score: {score:.2f}")
    if score > 0.5:
        new_path = clip_path.replace("before_model", "violence_detected")
        os.rename(clip_path, new_path)
        upload_incident(new_path, score)
    else:
        print("🟢 No violence detected")
