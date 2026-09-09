import React, { useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Card, Button } from '../../components/ui';
import { mockNotifications } from '../../data/mockData';
import toast from 'react-hot-toast';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('Notifications cleared');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Notifications</h1>
            <p className="text-gray-400 text-sm">Stay updated on your streak, achievements, and announcements</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" icon={<CheckCheck size={14} />} onClick={markAllAsRead}>
            Mark All Read
          </Button>
          <Button variant="ghost" size="sm" icon={<Trash2 size={14} />} onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card className="p-12 text-center text-gray-400 bg-surface-800 space-y-3">
            <Bell size={40} className="mx-auto text-gray-600" />
            <p className="font-semibold text-lg text-white">No notifications yet!</p>
            <p className="text-xs">You're all caught up. Keep coding!</p>
          </Card>
        ) : (
          notifications.map(n => (
            <Card
              key={n.id}
              className={`p-4 sm:p-5 transition-all flex items-start gap-4 ${
                n.read ? 'bg-surface-800/80 border-white/[0.04]' : 'bg-surface-750 border-brand-500/30 ring-1 ring-brand-500/20'
              }`}
            >
              <div className="text-2xl p-2.5 rounded-2xl bg-surface-600 border border-white/[0.06] flex-shrink-0">
                {n.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-base">{n.title}</h4>
                  <span className="text-xs text-gray-500 font-mono">{n.createdAt}</span>
                </div>
                <p className="text-sm text-gray-300">{n.message}</p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
