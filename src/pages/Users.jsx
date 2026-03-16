import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, UserPlus, Mail, Shield, CheckCircle, XCircle } from 'lucide-react';
import Skeleton from '../components/common/Skeleton';

// Mock User Data
const initialUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Administrator', status: 'Active', joined: '2024-01-15' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'Inactive', joined: '2024-02-10' },
  { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Active', joined: '2024-03-05' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Manager', status: 'Active', joined: '2024-03-12' },
  { id: 5, name: 'Edward Norton', email: 'edward@example.com', role: 'User', status: 'Banned', joined: '2024-03-16' },
];

/**
 * User Management Page
 * Implements a professional data table with filtering and actions
 */
const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-page">
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '8px' }}>User Directory</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your team members and their account permissions.</p>
        </div>
        <button style={{
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 600,
          cursor: 'pointer'
        }}>
          <UserPlus size={18} />
          Add New User
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Active accounts', value: '362', tint: 'rgba(34,211,238,0.15)' },
          { label: 'Invites pending', value: '18', tint: 'rgba(251,191,36,0.15)' },
          { label: 'At risk', value: '5', tint: 'rgba(239,68,68,0.12)' },
        ].map((item) => (
          <div key={item.label} className="glass-card" style={{ padding: '1rem 1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.4px' }}>{item.label}</p>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: '6px' }}>{item.value}</h3>
            <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border)', borderRadius: '6px', overflow: 'hidden', marginTop: '8px' }}>
              <div style={{ width: '70%', height: '100%', background: item.tint }} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search Bar */}
      <div className="glass-card subtle-grid" style={{ marginBottom: '1.5rem', padding: '1rem', background: 'linear-gradient(120deg, rgba(34,211,238,0.08), rgba(168,85,247,0.06))' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-dark)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '10px 10px 10px 40px',
                color: 'var(--text-main)',
                outline: 'none'
              }}
            />
          </div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            color: 'var(--text-main)',
            cursor: 'pointer'
          }}>
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      {/* Professional Data Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="table-sticky" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>USER</th>
              <th style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>ROLE</th>
              <th style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>STATUS</th>
              <th style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>JOINED</th>
              <th style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '12px', fontWeight: 700, letterSpacing: '1px' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '1.5rem' }}>
                  <div className="glass-card" style={{ margin: '0.5rem 0', background: 'var(--bg-card-soft)' }}>
                    <p style={{ fontWeight: 700, marginBottom: '6px' }}>No users found</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Try adjusting your search or invite someone new.</p>
                  </div>
                </td>
              </tr>
            )}
            {filteredUsers.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(34,211,238,0.04)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--border)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700 }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{user.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                    <Shield size={14} color="var(--primary)" />
                    {user.role}
                  </div>
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <StatusBadge status={user.status} />
                </td>
                <td style={{ padding: '1.25rem', color: 'var(--text-muted)', fontSize: '14px' }}>
                  {user.joined}
                </td>
                <td style={{ padding: '1.25rem' }}>
                  <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Subcomponent: Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    Active: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
    Inactive: { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
    Banned: { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' },
  };

  const current = styles[status] || styles.Active;

  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
      backgroundColor: current.bg,
      color: current.color
    }}>
      {status}
    </span>
  );
};

export default Users;
