import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, CheckCircle, ChevronRight, Star,
  BookOpen, Code2, Zap, Bug, TrendingUp, Trophy,
  Flame, Target, Award, Sparkles,
  BarChart2
} from 'lucide-react';
import { PublicNavbar } from '../../components/layout/Navbar';
import { mockLearningPaths } from '../../data/mockData';

// ==================== ANIMATED CODE EDITOR ====================
const javaCode = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Skill Hub!");
        
        // Calculate fibonacci
        int n = 10;
        int[] fib = new int[n];
        fib[0] = 0;
        fib[1] = 1;
        
        for (int i = 2; i < n; i++) {
            fib[i] = fib[i-1] + fib[i-2];
        }
        
        System.out.println("Fibonacci: ");
        for (int num : fib) {
            System.out.print(num + " ");
        }
    }
}`;

function CodeEditorHero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const lines = javaCode.split('\n');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= lines.length) {
        clearInterval(timer);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const syntaxColor = (line: string) => {
    return line
      .replace(/(public|class|static|void|int|new|for|if|return)/g, '<span class="text-purple-400">$1</span>')
      .replace(/(String|System|int\[\])/g, '<span class="text-cyan-400">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="text-gray-500">$1</span>')
      .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
      .replace(/(\b\d+\b)/g, '<span class="text-orange-400">$1</span>');
  };

  return (
    <div className="bg-surface-800 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl">
      {/* Editor header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-700 border-b border-white/[0.06]">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-400 font-mono">Main.java</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-brand-600/30 text-brand-300 px-2 py-0.5 rounded font-mono">Java</span>
        </div>
      </div>

      {/* Code area */}
      <div className="p-4 font-mono text-sm overflow-hidden" style={{ minHeight: '320px' }}>
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex gap-3 leading-6">
            <span className="text-gray-600 select-none w-6 text-right flex-shrink-0 text-xs">{i + 1}</span>
            <span
              className="text-gray-200"
              dangerouslySetInnerHTML={{ __html: syntaxColor(line) || '&nbsp;' }}
            />
          </div>
        ))}
        {visibleLines > 0 && visibleLines < lines.length && (
          <div className="flex gap-3 leading-6">
            <span className="text-gray-600 select-none w-6 text-right flex-shrink-0 text-xs">{visibleLines + 1}</span>
            <span className="w-2 h-5 bg-brand-400 animate-pulse inline-block" />
          </div>
        )}
      </div>

      {/* Output */}
      {showOutput && (
        <div className="border-t border-white/[0.06] bg-surface-900 px-4 py-3 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-success-500" />
            <span className="text-xs text-gray-400 font-mono">Output</span>
          </div>
          <div className="font-mono text-sm text-green-400">
            <div>Hello, Skill Hub!</div>
            <div>Fibonacci: </div>
            <div>0 1 1 2 3 5 8 13 21 34</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== FEATURE CARD ====================
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, color, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className="bg-surface-700 border border-white/[0.06] rounded-2xl p-6 hover:border-brand-500/30 hover:shadow-card-hover transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl`}
        style={{ backgroundColor: `${color}20` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-brand-300 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ==================== STEP ====================
function ProcessStep({ num, title, desc, icon }: { num: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center text-center relative">
      <div className="w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4">
        {icon}
      </div>
      <div className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">{num}</div>
      <h3 className="font-semibold text-white text-base mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-surface-900">
      <PublicNavbar />

      {/* ==================== HERO ==================== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-600/8 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/15 border border-brand-500/30 rounded-full text-sm text-brand-300 font-medium mb-6">
                <Sparkles size={14} />
                Interactive CS Learning Platform
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight mb-6">
                <span className="text-white">Learn to</span>{' '}
                <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">Code.</span>
                <br />
                <span className="text-white">Build Real</span>{' '}
                <span className="bg-gradient-to-r from-accent-400 to-brand-400 bg-clip-text text-transparent">Skills.</span>
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
                Master programming through interactive lessons, browser-based coding, instant feedback, 
                automated assessment, and practical challenges — all in one place.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-glow-brand hover:scale-[1.02] active:scale-[0.98] text-base"
                >
                  Start Learning Free
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/challenges"
                  className="inline-flex items-center gap-2 px-7 py-4 bg-surface-600 hover:bg-surface-500 border border-white/10 text-white font-semibold rounded-xl transition-all duration-200 text-base"
                >
                  <Play size={16} />
                  Explore Challenges
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { val: '25K+', label: 'Students' },
                  { val: '200+', label: 'Challenges' },
                  { val: '6', label: 'Courses' },
                ].map(s => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-white">{s.val}</div>
                    <div className="text-sm text-gray-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Code editor */}
            <div className="hidden lg:block animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CodeEditorHero />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Become a Better Programmer
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stop juggling between YouTube, Stack Overflow, and your IDE. Skill Hub brings everything together.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <BookOpen size={24} />, title: 'Learn', description: 'Structured lessons with interactive explanations and real-world examples that make concepts stick.', color: '#6370f1', delay: 0 },
              { icon: <Target size={24} />, title: 'Practice', description: 'Solve real programming problems with varying difficulty and receive instant automated feedback.', color: '#f97316', delay: 50 },
              { icon: <Code2 size={24} />, title: 'Code', description: 'Write code directly in your browser with syntax highlighting, auto-completion, and error detection.', color: '#22c55e', delay: 100 },
              { icon: <Play size={24} />, title: 'Run', description: 'Execute your programs instantly and see the output in real-time without any local setup.', color: '#3b82f6', delay: 150 },
              { icon: <Bug size={24} />, title: 'Debug', description: 'Understand your errors with clear, beginner-friendly explanations and step-by-step debugging hints.', color: '#ef4444', delay: 200 },
              { icon: <TrendingUp size={24} />, title: 'Improve', description: 'Receive personalized feedback, track weak areas, and get recommendations to boost your skills.', color: '#a855f7', delay: 250 },
            ].map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How Skill Hub Works</h2>
            <p className="text-gray-400 text-lg">A complete learning loop designed for real skill development</p>
          </div>
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-brand-600/0 via-brand-500/50 to-brand-600/0" />
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                { num: '01', title: 'Learn', desc: 'Understand the concept through interactive explanations', icon: <BookOpen size={24} /> },
                { num: '02', title: 'Practice', desc: 'Try examples and guided exercises', icon: <Target size={24} /> },
                { num: '03', title: 'Code', desc: 'Write your own solution in the browser', icon: <Code2 size={24} /> },
                { num: '04', title: 'Test', desc: 'Run code against automated test cases', icon: <Play size={24} /> },
                { num: '05', title: 'Improve', desc: 'Analyze feedback and level up', icon: <TrendingUp size={24} /> },
              ].map(s => <ProcessStep key={s.num} {...s} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LEARNING PATHS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Learning Path</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Structured paths designed to take you from zero to job-ready. Follow the curriculum or mix and match.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLearningPaths.map((path) => (
              <div
                key={path.id}
                className="bg-surface-700 border border-white/[0.06] rounded-2xl p-6 hover:border-white/20 hover:shadow-card-hover transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ backgroundColor: `${path.color}20` }}
                  >
                    {path.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-brand-300 transition-colors">{path.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        path.difficulty === 'Beginner' ? 'bg-success-500/15 text-success-500' :
                        path.difficulty === 'Intermediate' ? 'bg-yellow-500/15 text-yellow-400' :
                        'bg-red-500/15 text-red-400'
                      }`}>{path.difficulty}</span>
                      <span className="text-xs text-gray-500">{path.estimatedWeeks} weeks</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{path.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500">{path.totalModules} modules</span>
                  {path.progressPercent !== undefined && path.progressPercent > 0 && (
                    <span className="text-xs text-brand-400">{path.progressPercent}% complete</span>
                  )}
                </div>
                {path.progressPercent !== undefined && path.progressPercent > 0 && (
                  <div className="h-1.5 bg-surface-500 rounded-full mb-4">
                    <div className="h-full bg-gradient-to-r from-brand-600 to-brand-400 rounded-full" style={{ width: `${path.progressPercent}%` }} />
                  </div>
                )}
                <Link
                  to="/register"
                  className="flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 group-hover:gap-3 transition-all duration-200"
                >
                  Start Learning <ChevronRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== IDE SHOWCASE ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600/15 border border-brand-500/30 rounded-full text-sm text-brand-300 mb-6">
                <Code2 size={14} />
                Browser-Based IDE
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Code Without the Setup.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Learn and practice directly in your browser without spending hours installing compilers or 
                configuring development environments. Write code, run it, and see results instantly.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <CheckCircle size={16} className="text-success-500" />, text: 'No installation required' },
                  { icon: <CheckCircle size={16} className="text-success-500" />, text: 'Multi-language support (Java, Python, JavaScript)' },
                  { icon: <CheckCircle size={16} className="text-success-500" />, text: 'Syntax highlighting & auto-completion' },
                  { icon: <CheckCircle size={16} className="text-success-500" />, text: 'Real-time error detection & helpful hints' },
                  { icon: <CheckCircle size={16} className="text-success-500" />, text: 'Automated test case execution' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-300">
                    {item.icon}
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-glow-brand"
              >
                Try the Editor <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mini IDE */}
            <div className="bg-surface-800 rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-surface-700 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="flex-1 text-center text-xs text-gray-400 font-mono">Skill Hub IDE</span>
                <div className="flex gap-2">
                  <span className="text-xs bg-success-500/20 text-success-500 px-2 py-0.5 rounded">▶ Run</span>
                  <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded">↑ Submit</span>
                </div>
              </div>
              <div className="grid grid-cols-5 h-[360px]">
                {/* File explorer */}
                <div className="col-span-1 bg-surface-900 border-r border-white/[0.06] p-2">
                  <div className="text-xs text-gray-500 mb-2 px-1">EXPLORER</div>
                  {['Main.java', 'Solution.java', 'Test.java'].map((f, i) => (
                    <div key={i} className={`text-xs px-2 py-1.5 rounded cursor-pointer truncate ${i === 0 ? 'bg-brand-600/20 text-brand-300' : 'text-gray-500 hover:text-gray-300'}`}>
                      {f}
                    </div>
                  ))}
                </div>
                {/* Editor */}
                <div className="col-span-4 overflow-hidden">
                  <div className="p-3 font-mono text-xs overflow-hidden h-[240px]">
                    {`public class Solution {
    public int twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map 
            = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{
                    map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`.split('\n').map((line, i) => (
                      <div key={i} className="flex gap-2 leading-5">
                        <span className="text-gray-600 w-4 text-right flex-shrink-0">{i + 1}</span>
                        <span className="text-gray-300" dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/(public|class|int|new|for|if|return)/g, '<span class="text-purple-400">$1</span>')
                            .replace(/(HashMap|String)/g, '<span class="text-cyan-400">$1</span>')
                            .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
                            .replace(/(\b\d+\b)/g, '<span class="text-orange-400">$1</span>') || '&nbsp;'
                        }} />
                      </div>
                    ))}
                  </div>
                  {/* Output panel */}
                  <div className="border-t border-white/[0.06] bg-surface-900 p-3 h-[120px]">
                    <div className="text-xs text-gray-500 mb-1.5">▶ Test Results</div>
                    {[
                      { label: 'Test Case 1', status: 'Passed', color: 'text-success-500' },
                      { label: 'Test Case 2', status: 'Passed', color: 'text-success-500' },
                      { label: 'Test Case 3', status: 'Passed', color: 'text-success-500' },
                    ].map((tc, i) => (
                      <div key={i} className="flex items-center justify-between text-xs py-0.5">
                        <span className="text-gray-400">{tc.label}</span>
                        <span className={`font-semibold ${tc.color}`}>✓ {tc.status}</span>
                      </div>
                    ))}
                    <div className="mt-1.5 text-xs font-semibold text-success-500">✓ All 3 test cases passed · Runtime: 42ms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ASSESSMENT ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Assessment card */}
            <div className="bg-surface-700 border border-white/[0.06] rounded-2xl overflow-hidden shadow-2xl">
              <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
                <h3 className="font-semibold text-white">Submission Result</h3>
                <span className="text-xs bg-success-500/20 text-success-500 px-3 py-1 rounded-full font-semibold">Accepted ✓</span>
              </div>
              <div className="p-6 space-y-5">
                {/* Test cases */}
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Test Cases</div>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-success-500/20 flex items-center justify-center">
                          <CheckCircle size={12} className="text-success-500" />
                        </div>
                        <div className="flex-1 h-1.5 bg-surface-500 rounded-full">
                          <div className="h-full bg-success-500 rounded-full" style={{ width: '100%' }} />
                        </div>
                        <span className="text-xs text-success-500 font-mono">Passed</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-3 text-success-500 font-semibold">5/5 Tests Passed</div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Score', val: '100/100', color: 'text-success-500' },
                    { label: 'Runtime', val: '42 ms', color: 'text-brand-400' },
                    { label: 'Memory', val: '18 MB', color: 'text-accent-400' },
                  ].map(s => (
                    <div key={s.label} className="bg-surface-600 rounded-xl p-3 text-center">
                      <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Feedback */}
                <div className="bg-brand-600/10 border border-brand-500/20 rounded-xl p-4">
                  <div className="text-xs font-semibold text-brand-400 mb-1">💡 AI Feedback</div>
                  <p className="text-sm text-gray-300">Excellent solution! Your HashMap approach achieves O(n) time complexity. Consider edge cases for empty arrays in production code.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success-500/10 border border-success-500/30 rounded-full text-sm text-success-500 mb-6">
                <BarChart2 size={14} />
                Automated Assessment
              </div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Know Exactly Where You Stand.
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Every submission is automatically evaluated against comprehensive test cases. 
                Get instant results, performance metrics, and AI-powered feedback to guide your improvement.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '✓', text: 'Automated test case execution', color: 'bg-success-500/20 text-success-500' },
                  { icon: '⚡', text: 'Runtime and memory analysis', color: 'bg-brand-500/20 text-brand-400' },
                  { icon: '🧠', text: 'AI-powered code feedback', color: 'bg-purple-500/20 text-purple-400' },
                  { icon: '📊', text: 'Skill gap identification', color: 'bg-accent-500/20 text-accent-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold ${item.color}`}>{item.icon}</div>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== GAMIFICATION ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface-800/50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Make Progress Addictive.</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay motivated with XP, levels, streaks, badges, and daily challenges. Learning should feel like leveling up.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Zap size={24} />, title: 'XP & Levels', desc: 'Earn XP for every action and level up your profile', color: '#f97316' },
            { icon: <Flame size={24} />, title: 'Daily Streaks', desc: 'Keep your streak alive for bonus XP rewards', color: '#ef4444' },
            { icon: <Award size={24} />, title: 'Badges', desc: 'Unlock achievement badges for milestones', color: '#a855f7' },
            { icon: <Trophy size={24} />, title: 'Leaderboard', desc: 'Compete globally or with your friends', color: '#eab308' },
          ].map(g => (
            <div key={g.title} className="bg-surface-700 border border-white/[0.06] rounded-2xl p-5 text-center hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${g.color}20`, color: g.color }}>
                {g.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{g.title}</h3>
              <p className="text-gray-400 text-sm">{g.desc}</p>
            </div>
          ))}
        </div>

        {/* Badge showcase */}
        <div className="max-w-2xl mx-auto mt-12 flex flex-wrap justify-center gap-3">
          {[
            { icon: '🏆', label: 'First Code', rarity: 'common' },
            { icon: '🔥', label: '7-Day Streak', rarity: 'rare' },
            { icon: '💻', label: '10 Problems', rarity: 'rare' },
            { icon: '🐛', label: 'Debug Master', rarity: 'epic' },
            { icon: '☕', label: 'Java Pro', rarity: 'common' },
            { icon: '🚀', label: 'Fast Learner', rarity: 'epic' },
            { icon: '👑', label: '30-Day Legend', rarity: 'legendary' },
          ].map(b => (
            <div
              key={b.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium transition-all hover:scale-105 ${
                b.rarity === 'legendary' ? 'bg-yellow-500/15 border-yellow-500/40 text-yellow-400' :
                b.rarity === 'epic' ? 'bg-purple-500/15 border-purple-500/30 text-purple-400' :
                b.rarity === 'rare' ? 'bg-brand-500/15 border-brand-500/30 text-brand-400' :
                'bg-surface-600 border-white/[0.06] text-gray-300'
              }`}
            >
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Loved by Students</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Rahul Sharma', role: 'CSE Student, IIT', text: 'Skill Hub transformed how I practice coding. The instant feedback and structured paths helped me crack my internship interview!', rating: 5 },
              { name: 'Priya Reddy', role: 'AI/ML Student', text: 'No more struggling with environment setup. I can focus 100% on learning. The gamification keeps me coming back every day.', rating: 5 },
              { name: 'Arjun Kumar', role: 'Computer Science, NIT', text: 'The automated assessment with AI feedback is incredible. It identifies exactly where I need to improve and suggests relevant content.', rating: 5 },
            ].map(t => (
              <div key={t.name} className="bg-surface-700 border border-white/[0.06] rounded-2xl p-6 hover:border-brand-500/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-sm font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-900/40 to-surface-700 border border-brand-500/20 rounded-3xl px-8 py-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-brand-600/10 to-transparent pointer-events-none" />
            <h2 className="text-5xl font-black text-white mb-4 relative">
              Your Coding Journey
              <br />
              <span className="bg-gradient-to-r from-brand-400 to-accent-400 bg-clip-text text-transparent">Starts Here.</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 relative">
              Join 25,000+ students already learning on Skill Hub. Free forever, no credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all duration-200 shadow-glow-brand hover:scale-[1.02] text-lg"
              >
                Start Learning Free
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 bg-surface-600 hover:bg-surface-500 border border-white/10 text-white font-bold rounded-xl transition-all duration-200 text-lg"
              >
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                  <BookOpen size={14} className="text-white" />
                </div>
                <span className="font-bold text-white">Skill<span className="text-brand-400">Hub</span></span>
              </div>
              <p className="text-gray-400 text-sm">Learn. Code. Build. Grow.</p>
            </div>
            {[
              { title: 'Platform', links: ['Courses', 'Challenges', 'Learning Paths', 'Leaderboard'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Support', links: ['Documentation', 'FAQ', 'Community', 'Status'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-semibold text-white mb-3 text-sm">{col.title}</h4>
                {col.links.map(l => (
                  <div key={l} className="py-1">
                    <a href="#" className="text-gray-400 text-sm hover:text-white transition-colors">{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2026 Skill Hub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {['Privacy', 'Terms', 'Cookies'].map(l => (
                <a key={l} href="#" className="text-gray-500 text-sm hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
