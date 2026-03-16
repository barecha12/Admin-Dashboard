import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Skeleton from '../components/common/Skeleton';

const data = [
  { name: 'Jan', orders: 400, revenue: 2400 },
  { name: 'Feb', orders: 300, revenue: 1398 },
  { name: 'Mar', orders: 200, revenue: 9800 },
  { name: 'Apr', orders: 278, revenue: 3908 },
  { name: 'May', orders: 189, revenue: 4800 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

/**
 * Analytics Page
 * Demonstrates deep data visualization
 */
const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const kpis = [
    { label: 'Conversion', value: '4.8%', hint: '+0.3%', color: 'var(--primary)' },
    { label: 'ARPU', value: '$182', hint: '+$6', color: 'var(--secondary)' },
    { label: 'NPS', value: '62', hint: '+2', color: '#10b981' },
    { label: 'Churn', value: '2.1%', hint: '-0.2%', color: '#ef4444' },
  ];

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="analytics-page">
      <div className="glass-card subtle-grid" style={{ marginBottom: '1.5rem', background: 'linear-gradient(145deg, rgba(34,211,238,0.08), rgba(168,85,247,0.05))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <span className="pill" style={{ marginBottom: '10px', display: 'inline-flex' }}>Insights</span>
            <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '6px' }}>Business Intelligence</h1>
            <p style={{ color: 'var(--text-muted)' }}>Granular analysis of operational performance and demand signals.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(140px, 1fr))', gap: '0.75rem', minWidth: '280px' }}>
            {kpis.map((item) => (
              <div key={item.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '10px 12px' }}>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.4px' }}>{item.label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem', color: item.color }}>{item.value}</p>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.hint}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        
        {/* Performance Comparison */}
        <div className="glass-card" style={{ height: '400px', background: 'var(--bg-card)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 600 }}>Performance Analysis</h3>
          {loading ? (
            <Skeleton height="80%" />
          ) : (
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--chart-text)" fontSize={12} />
                <YAxis stroke="var(--chart-text)" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--chart-surface)', borderColor: 'var(--border)' }} />
                <Legend />
                <Bar dataKey="revenue" fill="var(--primary)" fillOpacity={0.9} radius={[4, 4, 0, 0]} />
                <Bar dataKey="orders" fill="var(--secondary)" fillOpacity={0.9} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Traffic Source Pie Chart */}
        <div className="glass-card" style={{ height: '400px', background: 'var(--bg-card)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: 600 }}>Traffic Attribution</h3>
          {loading ? (
            <Skeleton height="80%" />
          ) : (
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={[{ name: 'Direct', value: 400 }, { name: 'Social', value: 300 }, { name: 'Search', value: 300 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.9} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--chart-surface)', borderColor: 'var(--border)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
};

export default Analytics;
