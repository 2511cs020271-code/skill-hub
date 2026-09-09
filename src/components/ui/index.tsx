import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs));
}

// ==================== BUTTON ====================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconRight,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-900 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-brand-600 hover:bg-brand-500 text-white focus:ring-brand-500 shadow-glow-brand hover:shadow-glow-brand',
    secondary: 'bg-surface-500 hover:bg-surface-400 text-white focus:ring-surface-400 border border-white/10',
    ghost: 'bg-transparent hover:bg-surface-500 text-gray-300 hover:text-white focus:ring-surface-400',
    danger: 'bg-danger-600 hover:bg-danger-500 text-white focus:ring-danger-500',
    outline: 'bg-transparent border border-brand-500/50 text-brand-400 hover:bg-brand-600/10 hover:border-brand-500 focus:ring-brand-500',
    accent: 'bg-accent-600 hover:bg-accent-500 text-white focus:ring-accent-500 shadow-glow-accent',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}

// ==================== CARD ====================
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, glow = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-surface-700 border border-white/[0.06] rounded-2xl',
        hover && 'transition-all duration-300 hover:border-brand-500/30 hover:shadow-card-hover cursor-pointer',
        glow && 'shadow-glow-brand',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

// ==================== BADGE ====================
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'accent' | 'default';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    brand: 'bg-brand-500/20 text-brand-300',
    success: 'bg-success-500/20 text-success-500',
    warning: 'bg-warning-500/15 text-yellow-400',
    danger: 'bg-danger-500/15 text-danger-500',
    accent: 'bg-accent-500/20 text-accent-400',
    default: 'bg-surface-400 text-gray-300',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  );
}

// ==================== DIFFICULTY BADGE ====================
export function DifficultyBadge({ difficulty, level }: { difficulty?: string; level?: string }) {
  const d = difficulty || level || 'Easy';
  const map: Record<string, string> = {
    Easy: 'bg-success-500/15 text-success-500',
    Beginner: 'bg-success-500/15 text-success-500',
    Medium: 'bg-warning-500/15 text-yellow-400',
    Intermediate: 'bg-warning-500/15 text-yellow-400',
    Hard: 'bg-danger-500/15 text-danger-500',
    Advanced: 'bg-danger-500/15 text-danger-500',
  };
  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', map[d] || 'bg-surface-400 text-gray-300')}>
      {d}
    </span>
  );
}

// ==================== PROGRESS BAR ====================
interface ProgressBarProps {
  value?: number;
  progress?: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, progress, max = 100, color, size = 'md', showLabel = false, className }: ProgressBarProps) {
  const v = value !== undefined ? value : (progress !== undefined ? progress : 0);
  const pct = Math.min(100, Math.max(0, (v / max) * 100));
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };
  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-surface-400 rounded-full overflow-hidden', heights[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', color || 'bg-gradient-to-r from-brand-600 to-brand-400')}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && <div className="text-xs text-gray-400 mt-1 text-right">{Math.round(pct)}%</div>}
    </div>
  );
}

// ==================== INPUT ====================
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export function Input({ label, error, icon, iconRight, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">{icon}</span>}
        <input
          className={cn(
            'w-full bg-surface-600 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all duration-200',
            'focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/50',
            error ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500/30' : undefined,
            icon ? 'pl-11' : undefined,
            iconRight ? 'pr-11' : undefined,
            className
          )}
          {...props}
        />
        {iconRight && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500">{iconRight}</span>}
      </div>
      {error && <p className="text-xs text-danger-500 mt-0.5">{error}</p>}
    </div>
  );
}

// ==================== SKELETON ====================
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('rounded-lg bg-surface-600 animate-pulse', className)}
      style={{ background: 'linear-gradient(90deg, #1c1f35 25%, #232641 50%, #1c1f35 75%)', backgroundSize: '400% 100%' }}
    />
  );
}

// ==================== AVATAR ====================
interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  src?: string;
}

export function Avatar({ name, size = 'md', className, src }: AvatarProps) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg', xl: 'w-20 h-20 text-2xl' };
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const colors = ['from-brand-600 to-brand-400', 'from-accent-600 to-accent-400', 'from-purple-600 to-purple-400', 'from-cyan-600 to-cyan-400'];
  const colorIdx = name.charCodeAt(0) % colors.length;

  if (src) {
    return <img src={src} alt={name} className={cn('rounded-full object-cover ring-2 ring-brand-500/30', sizes[size], className)} />;
  }

  return (
    <div className={cn('rounded-full flex items-center justify-center font-bold bg-gradient-to-br ring-2 ring-brand-500/30', sizes[size], `bg-gradient-to-br ${colors[colorIdx]}`, className)}>
      {initials}
    </div>
  );
}

// ==================== TOOLTIP ====================
interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({ content, children, position = 'right' }: TooltipProps) {
  const posClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  };
  return (
    <div className="relative group inline-flex">
      {children}
      <div className={cn('absolute z-50 px-2.5 py-1.5 bg-surface-300 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl border border-white/10', posClasses[position])}>
        {content}
      </div>
    </div>
  );
}

// ==================== TABS ====================
interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 bg-surface-600 p-1 rounded-xl', className)}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            active === tab.id
              ? 'bg-brand-600 text-white shadow-md'
              : 'text-gray-400 hover:text-white hover:bg-surface-500'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ==================== STAT CARD ====================
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  trend?: number;
}

export function StatCard({ icon, label, value, sub, color, trend }: StatCardProps) {
  return (
    <Card className="p-5 flex flex-col gap-3" hover>
      <div className="flex items-center justify-between">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-xl', color || 'bg-brand-600/20')}>
          {icon}
        </div>
        {trend !== undefined && (
          <span className={cn('text-xs font-medium', trend >= 0 ? 'text-success-500' : 'text-danger-500')}>
            {trend >= 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-gray-400 mt-0.5">{label}</div>
        {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
      </div>
    </Card>
  );
}

// ==================== LOADING SPINNER ====================
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={cn('border-2 border-brand-500 border-t-transparent rounded-full animate-spin', sizes[size])} />
  );
}

// ==================== EMPTY STATE ====================
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-surface-500 flex items-center justify-center text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}

// ==================== MODAL ====================
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg', xl: 'max-w-2xl' };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative w-full bg-surface-700 border border-white/10 rounded-2xl shadow-2xl animate-slide-up', sizes[size])}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-surface-500 transition-colors">
              ✕
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ==================== TOAST ====================
export { default as toast } from 'react-hot-toast';
