import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BookOpen, Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../../components/ui';
import toast from 'react-hot-toast';

// ==================== LOGIN ====================
export function LoginPage() {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 4) e.password = 'Password too short';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await login(email, password);
      toast.success('Welcome back! 🎉');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid credentials. Try any email/password.');
    }
  };

  return (
    <div className="w-full max-w-md animate-slide-up">
      {/* Logo */}
      <div className="flex items-center gap-2 justify-center mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand">
          <BookOpen size={18} className="text-white" />
        </div>
        <span className="text-2xl font-bold">Skill<span className="text-brand-400">Hub</span></span>
      </div>

      <div className="bg-surface-700 border border-white/[0.06] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 text-sm">Continue your coding journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email address"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            error={errors.email}
            icon={<Mail size={16} />}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"><Lock size={16} /></span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full bg-surface-600 border rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all ${errors.password ? 'border-danger-500' : 'border-white/10'}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-danger-500">{errors.password}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-surface-400 bg-surface-600 text-brand-500 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-400">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" loading={isLoading} iconRight={<ArrowRight size={16} />}>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo credentials hint */}
        <div className="mt-4 px-4 py-3 bg-brand-600/10 border border-brand-500/20 rounded-xl text-center">
          <p className="text-xs text-brand-300">Demo: Use any email & password to login</p>
        </div>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/[0.06]" />
          </div>
          <div className="relative flex justify-center text-xs text-gray-500 uppercase">
            <span className="bg-surface-700 px-3">or continue with</span>
          </div>
        </div>

        <button className="mt-4 w-full flex items-center justify-center gap-3 px-4 py-3 bg-surface-600 border border-white/10 rounded-xl text-sm font-medium text-gray-300 hover:bg-surface-500 hover:text-white transition-all duration-200">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}

// ==================== REGISTER ====================
export function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name || form.name.length < 2) e.name = 'Name must be at least 2 characters';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await register(form.name, form.email, form.password);
    toast.success('Account created! Welcome to Skill Hub 🎉');
    navigate('/dashboard');
  };

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = passwordStrength();
  const strengthColors = ['', 'bg-danger-500', 'bg-warning-500', 'bg-brand-500', 'bg-success-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="w-full max-w-md animate-slide-up">
      <div className="flex items-center gap-2 justify-center mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand">
          <BookOpen size={18} className="text-white" />
        </div>
        <span className="text-2xl font-bold">Skill<span className="text-brand-400">Hub</span></span>
      </div>

      <div className="bg-surface-700 border border-white/[0.06] rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Create your account</h1>
          <p className="text-gray-400 text-sm">Start your coding journey today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            placeholder="Alex Johnson"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            error={errors.name}
            icon={<User size={16} />}
          />
          <Input
            label="Email address"
            type="email"
            placeholder="alex@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            error={errors.email}
            icon={<Mail size={16} />}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-300">Password</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"><Lock size={16} /></span>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Min 6 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className={`w-full bg-surface-600 border rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50 transition-all ${errors.password ? 'border-danger-500' : 'border-white/10'}`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.password && (
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColors[strength] : 'bg-surface-400'}`} />
                ))}
                <span className={`text-xs ml-2 ${strengthColors[strength].replace('bg-', 'text-')}`}>{strengthLabels[strength]}</span>
              </div>
            )}
            {errors.password && <p className="text-xs text-danger-500">{errors.password}</p>}
          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            value={form.confirm}
            onChange={e => setForm({ ...form, confirm: e.target.value })}
            error={errors.confirm}
            icon={form.confirm && form.confirm === form.password ? <CheckCircle size={16} className="text-success-500" /> : <Lock size={16} />}
          />

          <Button type="submit" variant="primary" size="lg" className="w-full" loading={isLoading} iconRight={<ArrowRight size={16} />}>
            Create Account
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          By creating an account, you agree to our{' '}
          <a href="#" className="text-brand-400 hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-brand-400 hover:underline">Privacy Policy</a>.
        </p>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

// ==================== FORGOT PASSWORD ====================
export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="w-full max-w-md animate-slide-up">
      <div className="flex items-center gap-2 justify-center mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-glow-brand">
          <BookOpen size={18} className="text-white" />
        </div>
        <span className="text-2xl font-bold">Skill<span className="text-brand-400">Hub</span></span>
      </div>
      <div className="bg-surface-700 border border-white/[0.06] rounded-2xl p-8">
        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-success-500/20 flex items-center justify-center mx-auto mb-4">
              <Mail size={28} className="text-success-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Check your email</h2>
            <p className="text-gray-400 text-sm mb-6">We sent a password reset link to <strong className="text-white">{email}</strong></p>
            <Link to="/login" className="text-brand-400 hover:text-brand-300 text-sm font-medium">Back to login</Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
              <p className="text-gray-400 text-sm">Enter your email and we'll send you a reset link</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Email address" type="email" placeholder="alex@example.com" value={email} onChange={e => setEmail(e.target.value)} icon={<Mail size={16} />} />
              <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
                Send Reset Link
              </Button>
            </form>
            <p className="text-center text-sm text-gray-400 mt-6">
              <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">← Back to login</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
