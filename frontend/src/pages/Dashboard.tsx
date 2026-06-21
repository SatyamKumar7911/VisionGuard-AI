import { useState, useEffect } from "react";
import { Activity, Camera, Car, ShieldAlert } from "lucide-react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { toast } from "sonner";

import Layout from "../components/Layout";
import AnimatedCard from "../components/AnimatedCard";
import LiveFeedTable, { type FeedItem } from "../components/LiveFeedTable";
import ChartsPanel from "../components/ChartsPanel";

interface DashboardStats {
  totalViolations: number;
  activeCameras: number;
  vehiclesScanned: number;
  detectionAccuracy: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalViolations: 0,
    activeCameras: 0,
    vehiclesScanned: 0,
    detectionAccuracy: 0,
  });
  
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL || "http://localhost:8080/ws";
    
    const client = new Client({
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        setIsConnected(true);
        toast.success("Connected to live data stream");

        client.subscribe("/topic/dashboard/stats", (message) => {
          if (message.body) {
            setStats(JSON.parse(message.body));
          }
        });

        client.subscribe("/topic/dashboard/feed", (message) => {
          if (message.body) {
            const newItem: FeedItem = JSON.parse(message.body);
            setFeed((prev) => [newItem, ...prev].slice(0, 10)); // Keep last 10
          }
        });

        client.subscribe("/topic/dashboard/notifications", (message) => {
          if (message.body) {
            const notif = JSON.parse(message.body);
            toast.error(notif.message, { duration: 4000 });
          }
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
      onWebSocketError: () => {
        setIsConnected(false);
      }
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);

  return (
    <Layout isConnected={isConnected}>
      <div className="mb-8 space-y-2 p-6 bg-slate-900/40 rounded-xl border border-slate-800/80 backdrop-blur-sm shadow-[0_4px_20px_-2px_rgba(0,0,0,0.3)]">
        <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          📹 VisionGuard <span className="text-primary neon-text">AI</span>
        </h2>
        <p className="text-lg font-semibold text-slate-200">
          Autonomous, AI-Powered Traffic Violation Detection Platform
        </p>
        <p className="text-sm text-slate-400">
          Grounding computer vision in real-time traffic intelligence via YOLO, OpenCV & EasyOCR.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnimatedCard 
          title="Total Violations" 
          value={stats.totalViolations.toLocaleString()} 
          subtitle="Real-time count"
          icon={<ShieldAlert className="h-5 w-5 text-destructive" />}
          trend="up"
        />
        <AnimatedCard 
          title="Active Cameras" 
          value={stats.activeCameras.toLocaleString()} 
          subtitle="Operational Nodes"
          icon={<Camera className="h-5 w-5 text-primary" />}
          trend="neutral"
        />
        <AnimatedCard 
          title="Vehicles Scanned" 
          value={stats.vehiclesScanned.toLocaleString()} 
          subtitle="Today's traffic"
          icon={<Car className="h-5 w-5 text-success" />}
          trend="up"
        />
        <AnimatedCard 
          title="Detection Accuracy" 
          value={`${stats.detectionAccuracy}%`} 
          subtitle="Model Confidence"
          icon={<Activity className="h-5 w-5 text-warning" />}
          trend="neutral"
        />
      </div>

      <div className="grid gap-6 mt-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <LiveFeedTable items={feed} />
        </div>
        <div className="lg:col-span-1">
          <ChartsPanel />
        </div>
      </div>
    </Layout>
  );
}
