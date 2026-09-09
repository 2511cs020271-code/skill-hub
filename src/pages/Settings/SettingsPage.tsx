import React, { useState } from 'react';
import {
  Settings, User, Bell, Lock, Code2, Save
} from 'lucide-react';
import { Card, Input, Button } from '../../components/ui';
import { mockUser } from '../../data/mockData';
import toast from 'react-hot-toast';

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'code' | 'notifications' | 'security'>('profile');
  
  const [name, setName] = useState(mockUser.name);
  const [username, setUsername] = useState(mockUser.username);
  const [email, setEmail] = useState(mockUser.email);
  const [prefLang, setPrefLang] = useState('java');
  const [editorTheme, setEditorTheme] = useState('one-dark');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);

  const handleSave = () => {
    toast.success('Settings saved successfully! ⚙️');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-6">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
          <Settings size={24} />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Settings & Preferences</h1>
          <p className="text-gray-400 text-sm">Manage your profile, code editor preferences, and account security</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="space-y-1">
          {[
            { id: 'profile', label: 'Profile Info', icon: <User size={16} /> },
            { id: 'code', label: 'Editor & Code', icon: <Code2 size={16} /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
            { id: 'security', label: 'Security & Auth', icon: <Lock size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-glow-brand'
                  : 'text-gray-400 hover:text-white hover:bg-surface-700'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Form */}
        <div className="md:col-span-3">
          <Card className="p-6 sm:p-8 bg-surface-800 border-white/[0.08] space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-white border-b border-white/[0.06] pb-3">Profile Details</h3>
                <Input
                  label="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Input
                  label="Username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-white/[0.06] pb-3">Code Environment Preferences</h3>
                
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300">Default Programming Language</label>
                  <select
                    value={prefLang}
                    onChange={e => setPrefLang(e.target.value)}
                    className="w-full bg-surface-700 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="java">Java (Standard JDK 17+)</option>
                    <option value="python">Python 3.11</option>
                    <option value="javascript">JavaScript / TypeScript</option>
                    <option value="cpp">C++ 20</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-300">Editor Color Theme</label>
                  <select
                    value={editorTheme}
                    onChange={e => setEditorTheme(e.target.value)}
                    className="w-full bg-surface-700 border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                  >
                    <option value="one-dark">One Dark (Recommended)</option>
                    <option value="dracula">Dracula Dark</option>
                    <option value="github-dark">GitHub Dark High Contrast</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white border-b border-white/[0.06] pb-3">Notification Settings</h3>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="font-semibold text-white text-sm">Email Weekly Digests</h4>
                    <p className="text-xs text-gray-400">Receive summary of your learning progress and new courses</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailNotifs}
                    onChange={e => setEmailNotifs(e.target.checked)}
                    className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-t border-white/[0.04]">
                  <div>
                    <h4 className="font-semibold text-white text-sm">Daily Streak Reminders</h4>
                    <p className="text-xs text-gray-400">Get notified if your streak is about to expire</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={streakReminders}
                    onChange={e => setStreakReminders(e.target.checked)}
                    className="w-5 h-5 accent-brand-500 rounded cursor-pointer"
                  />
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-white border-b border-white/[0.06] pb-3">Password & Security</h3>
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
                <Input label="Confirm New Password" type="password" placeholder="••••••••" />
              </div>
            )}

            <div className="pt-4 border-t border-white/[0.06] flex justify-end">
              <Button
                variant="primary"
                icon={<Save size={16} />}
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
