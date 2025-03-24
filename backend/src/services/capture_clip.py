import cv2
import time
import requests
import sys
sys.stdout.reconfigure(encoding='utf-8')


# Function to capture a 30-second video clip
def capture_video(stream_url, file_path="temp_clip.mp4", duration=10):
    cap = cv2.VideoCapture(stream_url)  # Open the video stream

    # Get video properties
    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))
    fps = int(cap.get(cv2.CAP_PROP_FPS)) or 30  # Default to 30 FPS if not detected

    # Video Writer to save the clip
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")  # MP4 format
    out = cv2.VideoWriter(file_path, fourcc, fps, (frame_width, frame_height))

    start_time = time.time()

    while int(time.time() - start_time) < duration:
        ret, frame = cap.read()
        if not ret:
            break
        out.write(frame)  # Write frame to video file

    cap.release()
    out.release()
    print(f"🎥 Video captured successfully: {file_path}")

# Function to upload video to Node.js API
def upload_incident_to_server(camera_id, confidence_score, file_path):
    url = "http://localhost:5000/api/incidents/upload"  # Update if needed
    files = {"file": open(file_path, "rb")}
    data = {"camera_id": camera_id, "confidence_score": confidence_score}

    response = requests.post(url, files=files, data=data)
    
    if response.status_code == 200:
        print("✅ Incident video uploaded successfully:", response.json())
    else:
        print("❌ Error uploading incident video:", response.text)

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 4:
        print("Usage: python capture_clip.py <stream_url> <camera_id> <confidence_score>")
        sys.exit(1)

    stream_url = sys.argv[1]
    camera_id = sys.argv[2]
    confidence_score = sys.argv[3]

    capture_video(stream_url)
    upload_incident_to_server(camera_id, confidence_score, "temp_clip.mp4")
