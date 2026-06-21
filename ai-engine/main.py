from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
import uvicorn

app = FastAPI(title="VisionGuard AI - AI Engine", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "ok", "service": "ai-engine"}

@app.post("/analyze/image")
async def analyze_image(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400, detail="Invalid file type. Only JPEG and PNG are supported.")
    
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # TODO: Implement YOLOv11/12 inference here
        # TODO: Implement EasyOCR here
        
        return {
            "status": "success",
            "filename": file.filename,
            "detections": [
                # Mock detection for now
                {
                    "class": "car",
                    "confidence": 0.95,
                    "bbox": [100, 100, 200, 200],
                    "violation": "None"
                }
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
