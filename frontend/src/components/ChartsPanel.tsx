import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock history data since backend only sends current point-in-time
const mockData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  violations: Math.floor(Math.random() * 100) + 50,
}));

export default function ChartsPanel() {
  return (
    <div className="glass rounded-2xl p-6 mt-8">
      <h2 className="text-lg font-bold mb-6 text-foreground">Violation Trend (24h)</h2>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'white', borderRadius: '0.5rem' }}
              itemStyle={{ color: 'hsl(var(--destructive))' }}
            />
            <Area 
              type="monotone" 
              dataKey="violations" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorViolations)" 
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
