import React, { useEffect, useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Users, DollarSign, ShoppingBag, TrendingUp, ArrowUpRight, ArrowDownRight, Headphones, ShieldCheck, Clock3 } from 'lucide-react';
import Skeleton from '../components/common/Skeleton';

// Mock Data for Charts
const revenueData = [
  { name: 'Mon', income: 4000, expenses: 2400 },
  { name: 'Tue', income: 3000, expenses: 1398 },
  { name: 'Wed', income: 2000, expenses: 9800 },
  { name: 'Thu', income: 2780, expenses: 3908 },
  { name: 'Fri', income: 1890, expenses: 4800 },
  { name: 'Sat', income: 2390, expenses: 3800 },
  { name: 'Sun', income: 3490, expenses: 4300 },
];

const customerGrowth = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 800 },
  { name: 'Mar', users: 600 },
  { name: 'Apr', users: 1200 },
  { name: 'May', users: 1500 },
  { name: 'Jun', users: 2100 },
];

// Quick toggles to prune sections for a leaner dashboard
const dashboardConfig = {
  showHero: true,
  showSupport: false,
  showActionCenter: false,
};

/**
 * Dashboard Overview Page
 * Showcases statistics, trends, and business metrics
 */
const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="dashboard-page">
      {/* Hero */}
      {dashboardConfig.showHero && (
        <div className="glass-card subtle-grid" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', gap: '1.5rem', alignItems: 'center', background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(168,85,247,0.06))' }}>
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' }}>
              <span className="pill">Live sync</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Status: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Operational</span></span>
            </div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '6px' }}>Executive Overview</h1>
            <p style={{ color: 'var(--text-muted)' }}>Real-time intelligence and growth signals.</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <StatCard title="Total Revenue" value="$128,430.20" change="12.5" trend="up" icon={DollarSign} color="#6366f1" />
        <StatCard title="Active Users" value="24,512" change="8.2" trend="up" icon={Users} color="#10b981" />
        <StatCard title="Net Profit" value="$42,350.00" change="2.4" trend="down" icon={TrendingUp} color="#f59e0b" />
        <StatCard title="Total Orders" value="1,240" change="18.1" trend="up" icon={ShoppingBag} color="#ec4899" />
      </div>

      {/* Main Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Revenue Area Chart */}
        <div className="glass-card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 600 }}>Revenue Flux</h3>
          <div style={{ width: '100%', height: '300px' }}>
            {loading ? (
              <Skeleton height="100%" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--chart-text)" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--chart-text)" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--chart-surface)', borderColor: 'var(--border)', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--text-main)' }}
                  />
                  <Area type="monotone" dataKey="income" stroke="var(--primary)" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* User Growth Bar Chart */}
        <div className="glass-card" style={{ height: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 600 }}>User Acquisition</h3>
          <div style={{ width: '100%', height: '300px' }}>
            {loading ? (
              <Skeleton height="100%" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={customerGrowth}>
                  <XAxis dataKey="name" stroke="var(--chart-text)" fontSize={12} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: 'var(--chart-surface)', borderColor: 'var(--border)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="users" fill="var(--secondary)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

      {/* Optional sections trimmed for lean view */}
      {dashboardConfig.showSupport && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
          <div className="glass-card" style={{ paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div>
                <p className="pill" style={{ background: 'rgba(34,211,238,0.12)' }}>Support pulse</p>
                <h3 style={{ marginTop: '10px', fontSize: '1.125rem', fontWeight: 700 }}>Customer Happiness</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Live view of service desk throughput.</p>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Updated just now</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              {/* support metrics could re-appear here if enabled */}
            </div>
          </div>

          {dashboardConfig.showActionCenter && (
            <div className="glass-card" style={{ background: 'linear-gradient(160deg, rgba(34,211,238,0.12), rgba(168,85,247,0.08))' }}>
              <h3 style={{ marginBottom: '0.75rem', fontSize: '1.05rem', fontWeight: 700 }}>Action Center</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>Escalate VIP ticket</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Customer: Nova Corp — SLA in 12m</p>
                  </div>
                  <span className="pill" style={{ background: 'rgba(251,191,36,0.16)', borderColor: 'rgba(251,191,36,0.3)', color: 'var(--accent)' }}>Priority</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * Reusable Stat Card for the Dashboard
 */
const StatCard = ({ title, value, change, trend, icon: Icon, color }) => (
  <div className="glass-card" style={{ borderColor: 'rgba(34,211,238,0.15)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div style={{
        padding: '10px',
        backgroundColor: `${color}15`,
        borderRadius: '12px',
        color: color
      }}>
        <Icon size={24} />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: trend === 'up' ? 'var(--secondary)' : '#ef4444',
        fontSize: '14px',
        fontWeight: 600
      }}>
        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        {change}%
      </div>
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '4px' }}>{title}</p>
    <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{value}</h3>
  </div>
);

const SupportMetric = ({ title, value, change, trend, icon: Icon, color }) => (
  <div style={{ 
    border: '1px solid var(--border)',
    borderRadius: '14px',
    padding: '14px',
    background: 'rgba(17,25,46,0.75)',
    display: 'grid',
    gap: '8px'
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: `${color}1a`, display: 'grid', placeItems: 'center' }}>
          <Icon size={18} color={color} />
        </div>
        <p style={{ fontWeight: 600 }}>{title}</p>
      </div>
      <span style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        fontWeight: 700,
        color: trend === 'up' ? 'var(--secondary)' : '#ef4444'
      }}>
        {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}%
      </span>
    </div>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{value}</h3>
    <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '6px', overflow: 'hidden' }}>
      <div style={{ width: trend === 'up' ? '82%' : '45%', height: '100%', background: `linear-gradient(90deg, ${color}, var(--primary))` }} />
    </div>
  </div>
);

export default Dashboard;
