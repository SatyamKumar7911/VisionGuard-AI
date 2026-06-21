<div align="center">
  <img src="https://via.placeholder.com/150x150.png?text=VG+Logo" alt="VisionGuard AI Logo" width="150"/>
  
  # VisionGuard AI
  ### Smart Enforcement Suite for Automated Traffic Violation Detection Using Computer Vision

  **"Seeing Violations. Enforcing Safety. Transforming Traffic Management."**

  <p align="center">
    <img src="https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java 21" />
    <img src="https://img.shields.io/badge/Spring_Boot-3-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot 3" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <br/>
    <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV" />
    <img src="https://img.shields.io/badge/YOLO-00FFFF?style=for-the-badge&logo=yolo&logoColor=black" alt="YOLO" />
    <img src="https://img.shields.io/badge/H2-Database-003545?style=for-the-badge&logo=sqlite&logoColor=white" alt="H2 Database" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
  </p>
  
  <img src="https://via.placeholder.com/1000x400.png?text=VisionGuard+AI+Dashboard+Banner" alt="Project Banner" width="100%"/>
</div>

---

## 📖 About the Project

Traffic departments generate millions of surveillance images daily. Manual inspection of traffic violations is not only time-consuming but also highly error-prone. 

**VisionGuard AI** is a state-of-the-art Computer Vision pipeline and comprehensive dashboard designed to automate traffic law enforcement. By processing real-time feeds and uploaded images, it instantly identifies infractions and extracts vehicle details to assist traffic authorities.

**VisionGuard AI automates:**
- 🚘 Vehicle Detection & Classification
- 🚨 Traffic Violation Detection
- 🔢 Automatic Number Plate Recognition (ANPR)
- 📸 Evidence Generation & Storage
- 📊 Real-Time Analytics Dashboard
- 🔴 Live Camera Monitoring

---

## ✨ Key Features

### AI Modules & Capabilities

- [x] **Image Preprocessing:** Enhancement of low-light and blurry images.
- [x] **Vehicle Detection:** Accurately bounds cars, trucks, motorcycles, and buses.
- [x] **Helmet Detection:** Identifies two-wheeler riders without helmets.
- [x] **Seatbelt Detection:** Detects four-wheeler occupants not wearing seatbelts.
- [x] **Triple Riding Detection:** Flags motorcycles carrying more than two passengers.
- [x] **Wrong-Side Driving Detection:** Tracks vehicle trajectories against lane flow.
- [x] **Red-Light Violation Detection:** Syncs with traffic light states to catch runners.
- [x] **Stop-Line Violation Detection:** Identifies vehicles crossing zebra crossings on red.
- [x] **Illegal Parking Detection:** Monitors no-parking zones for stationary vehicles.
- [x] **License Plate Recognition (OCR):** High-accuracy text extraction from plates.
- [x] **Evidence Generation:** Crops and saves evidence frames with bounding boxes.
- [x] **Real-Time Dashboard:** A WebSocket-powered UI for live metrics and alerts.
- [x] **Analytics and Reporting:** Exportable statistics on violation hotspots and trends.

---

## 🏗 System Architecture & Design Principles

VisionGuard AI follows a **Microservices-inspired modular architecture**. 
- The **AI Engine** runs asynchronously, heavy-lifting the inference.
- The **Spring Boot Backend** acts as a robust orchestrator, managing data persistence and WebSocket streams.
- The **React Frontend** is a decoupled client rendering a highly responsive, cyber-themed real-time dashboard.

### Architecture Flow

```text
[ Traffic Cameras / Image Uploads ]
               |
               v
      [ Preprocessing Engine ]
               |
               v
    +------------------------+
    | YOLO Detection Engine  |
    +------------------------+
         |              |
 (Bounding Boxes)   (Cropped Plates)
         |              |
         v              v
[ Violation Logic ]  [ ANPR / OCR ]
         |              |
         +------+-------+
                |
                v
      [ Evidence Generator ]
                |
            (REST API)
                |
                v
    +------------------------+
    |  Spring Boot Backend   | <-----> [ H2 Database ]
    +------------------------+
                |
       (WebSocket Streams)
                |
                v
     [ React Web Dashboard ]
                |
       (Analytics & Reports)
```

---

## 💻 Technology Stack

<details>
<summary><b>Frontend</b></summary>

- React
- TypeScript
- Tailwind CSS
- ShadCN UI
- Recharts
- Framer Motion
- STOMP / SockJS
</details>

<details>
<summary><b>Backend</b></summary>

- Spring Boot 3
- Java 21
- Spring Security
- Spring Data JPA
- Spring WebSockets
- REST APIs
</details>

<details>
<summary><b>AI / ML Engine</b></summary>

- Python 3.10+
- OpenCV
- YOLO (Ultralytics)
- EasyOCR / PaddleOCR
- NumPy
- Pandas
</details>

<details>
<summary><b>Database & DevOps</b></summary>

- H2 Database (Embedded)
- Docker & Docker Compose
- Render (Deployment)
</details>

---

## 📂 Project Structure

```text
VisionGuard-AI/
├── ai-engine/               # Python inference API & YOLO models
│   ├── main.py              # FastAPI application server
│   ├── requirements.txt     # Python dependencies
│   ├── Dockerfile           # Docker configuration for AI Engine
│   └── venv/                # Virtual environment (ignored in git)
├── backend/                 # Spring Boot Java Application
│   ├── src/main/java/...    # Application source code
│   ├── pom.xml              # Maven dependencies
│   ├── Dockerfile           # Docker configuration for Backend
│   └── data/                # H2 Database files (auto-generated)
├── frontend/                # React / Vite Dashboard UI
│   ├── src/                 # React components and pages
│   ├── package.json         # Node dependencies
│   ├── tailwind.config.js   # Tailwind CSS configuration
│   └── Dockerfile           # Docker configuration for Frontend
└── docker-compose.yml       # Multi-container orchestration
```

---

## 🚀 Installation & Running on Localhost

### 1. Clone Repository

```bash
git clone https://github.com/SatyamKumar7911/VisionGuard-AI.git
cd VisionGuard-AI
```

### 2. Start the AI Engine
Open a terminal and start the Python inference server:

```bash
cd ai-engine
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
*Runs on `http://localhost:8000`*

### 3. Start the Backend
Open a second terminal and start the Spring Boot server:

```bash
cd backend
./mvnw clean spring-boot:run
```
*Runs on `http://localhost:8080`*

### 4. Start the Frontend
Open a third terminal and start the React dashboard:

```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

---

## 🔐 Environment Variables

Before deploying, ensure the following environment variables are set.

### Backend (`application.properties` / Env Vars)
```env
SPRING_PROFILES_ACTIVE=dev
PORT=8080
FRONTEND_URL=http://localhost:5173
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

---

## 🐳 Running with Docker

To spin up the entire suite (Frontend, Backend, and AI Engine) with a single command:

```bash
docker-compose up --build
```

---

## ☁️ Deployment on Render

### Backend Service (Web Service)
1. **Environment:** Java / Maven
2. **Build Command:** `./mvnw clean package -DskipTests`
3. **Start Command:** `java -jar target/backend-0.0.1-SNAPSHOT.jar`
4. **Env Vars:** Set `FRONTEND_URL` to your deployed React URL.

### Frontend Service (Static Site)
1. **Environment:** Node
2. **Build Command:** `npm install && npm run build`
3. **Publish Directory:** `dist`
4. **Env Vars:** Set `VITE_API_URL` and `VITE_WS_URL` to your Render Backend URL.

---

## 📈 Performance Metrics

| Metric             | Target |
| ------------------ | ------ |
| Detection Accuracy | >95%   |
| ANPR Accuracy      | >93%   |
| Precision          | >94%   |
| Recall             | >93%   |
| Response Time      | <2 sec |

---

## 🔮 Future Enhancements

- [ ] **E-Challan Generation:** Automatic PDF creation and email dispatch to violators.
- [ ] **Edge AI Deployment:** Running inference directly on NVIDIA Jetson modules at the camera edge.
- [ ] **Predictive Analytics:** Forecasting violation hotspots using historical data.
- [ ] **Smart City Integration:** Syncing with centralized municipal dashboards.
- [ ] **Repeat Offender Tracking:** Flagging licenses with multiple recent violations.
- [ ] **Mobile Application:** A companion app for traffic officers on the ground.
- [ ] **Live CCTV Stream Processing:** RTSP stream ingestion for real-time video analysis.

---

## 🤝 Contributing

We welcome contributions to make VisionGuard AI even better! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📫 Contact & Support

📧 **Email:** [satyam.kumar1183@gmail.com](mailto:satyam.kumar1183@gmail.com)  
📖 **Documentation:** [Read the Docs](https://github.com/SatyamKumar7911/VisionGuard-AI#readme)  
🐛 **Bug Reports:** [Report an Issue](https://github.com/SatyamKumar7911/VisionGuard-AI/issues)  
⭐ **GitHub Repository:** [VisionGuard-AI](https://github.com/SatyamKumar7911/VisionGuard-AI)  
👤 **Developer Profile:** [SatyamKumar7911](https://github.com/SatyamKumar7911)  

---

<div align="center">
  <b>Designed & Developed by Satyam Kumar</b>
</div>
