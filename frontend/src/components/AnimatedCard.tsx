import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  trend?: "up" | "down" | "neutral";
}

export default function AnimatedCard({ title, value, subtitle, icon, trend }: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass rounded-2xl p-6 relative overflow-hidden group hover:neon-border transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="flex flex-row items-center justify-between pb-2 relative z-10">
        <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-lg bg-secondary/50 border border-border/50">
          {icon}
        </div>
      </div>
      
      <div className="pt-2 relative z-10">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm dark:drop-shadow-md"
        >
          {value}
        </motion.div>
        
        <p className={`text-xs mt-1 ${trend === 'up' ? 'text-destructive' : trend === 'down' ? 'text-success' : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}
