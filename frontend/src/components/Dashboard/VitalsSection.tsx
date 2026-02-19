import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { Activity, Thermometer, Droplet, Brain } from 'lucide-react';

const data = [
  { name: '10:00', value: 82 },
  { name: '10:15', value: 85 },
  { name: '10:30', value: 78 },
  { name: '10:45', value: 90 },
  { name: '11:00', value: 86 },
  { name: '11:15', value: 88 },
  { name: '11:30', value: 84 },
];

const VitalCard = ({ title, value, unit, icon: Icon, color, chartColor }: any) => {
  return (
    <div className="card" style={{ padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            backgroundColor: `${color}15`, // very light bg
            padding: '0.625rem', 
            borderRadius: '12px',
            color: color 
          }}>
            <Icon size={20} />
          </div>
          <span style={{ fontWeight: 600, color: '#334155' }}>{title}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{value}</span>
        <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{unit}</span>
      </div>

      <div style={{ height: '60px', marginTop: '0.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip cursor={false} content={<></>} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={chartColor} 
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#gradient-${title})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const VitalsSection = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
       <VitalCard 
         title="Heart Rate" 
         value="80-90" 
         unit="bpm" 
         icon={Activity} 
         color="#ef4444" 
         chartColor="#ef4444" 
       />
       <VitalCard 
         title="Brain Activity" 
         value="90-150" 
         unit="Hz" 
         icon={Brain} 
         color="#f59e0b" 
         chartColor="#f59e0b" 
       />
       <VitalCard 
         title="SpO2 Level" 
         value="97-99" 
         unit="%" 
         icon={Droplet} 
         color="#0ea5e9" 
         chartColor="#0ea5e9" 
       />
       <VitalCard 
         title="Temperature" 
         value="36.5" 
         unit="°C" 
         icon={Thermometer} 
         color="#22c55e" 
         chartColor="#22c55e" 
       />
    </div>
  );
};
