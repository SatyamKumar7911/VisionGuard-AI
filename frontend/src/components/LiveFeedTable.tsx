import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ShieldAlert } from "lucide-react";

export interface FeedItem {
  id: number;
  vehicleNumber: string;
  type: string;
  location: string;
  time: number;
  status: string;
}

export default function LiveFeedTable({ items }: { items: FeedItem[] }) {
  return (
    <div className="glass rounded-2xl overflow-hidden mt-8">
      <div className="p-6 border-b border-border flex items-center justify-between bg-secondary/30">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-destructive" />
          Live Violation Feed
        </h2>
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          STREAM ACTIVE
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-secondary/50 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">Vehicle Number</th>
              <th className="px-6 py-4 font-medium">Violation</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            <AnimatePresence initial={false}>
              {items.length === 0 && (
                <tr className="bg-background/30">
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Listening for new violations...
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
                  animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="hover:bg-secondary/40 transition-colors"
                >
                  <td className="px-6 py-4 font-mono font-bold text-foreground">{item.vehicleNumber}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-destructive">
                      <AlertCircle className="w-4 h-4" />
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.location}</td>
                  <td className="px-6 py-4 text-muted-foreground font-mono">
                    {new Date(item.time).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2.5 py-1 bg-warning/10 text-warning border border-warning/20 rounded-full text-xs font-medium">
                      {item.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
