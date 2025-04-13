import cv2
from flask import Flask, Response

app = Flask(__name__)

# 🔹 Replace with your laptop's actual IP address
LAPTOP_STREAM_URL = "http://192.168.1.102:5001/video_feed"

def generate_frames():
    cap = cv2.VideoCapture(LAPTOP_STREAM_URL)  # Get video from the laptop

    while True:
        success, frame = cap.read()
        if not success:
            continue
        _, buffer = cv2.imencode(".jpg", frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
