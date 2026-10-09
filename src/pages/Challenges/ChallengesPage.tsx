import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Play, Send, RotateCcw, ChevronLeft, Code2,
  CheckCircle, XCircle, AlertCircle, Clock, Cpu,
  Lightbulb, ChevronDown, ChevronUp, FileCode, Terminal
} from 'lucide-react';
import {
  mockChallenges
} from '../../data/mockData';
import { Button, Badge, DifficultyBadge, Card, EmptyState } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

// ==================== CHALLENGES LIST ====================
export function ChallengesPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Arrays', 'Strings', 'Loops', 'Algorithms', 'Data Structures', 'Math', 'Linked Lists', 'Graphs'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filtered = mockChallenges.filter(c => {
    const catMatch = activeFilter === 'All' || c.category.includes(activeFilter);
    const diffMatch = activeDifficulty === 'All' || c.difficulty === activeDifficulty;
    return catMatch && diffMatch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Coding Challenges</h1>
        <p className="text-gray-400">Solve real-world problems and sharpen your skills</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Solved', val: mockChallenges.filter(c => c.solved).length, total: mockChallenges.length, color: 'text-success-500' },
          { label: 'Easy', val: mockChallenges.filter(c => c.difficulty === 'Easy' && c.solved).length, total: mockChallenges.filter(c => c.difficulty === 'Easy').length, color: 'text-success-500' },
          { label: 'Medium', val: mockChallenges.filter(c => c.difficulty === 'Medium' && c.solved).length, total: mockChallenges.filter(c => c.difficulty === 'Medium').length, color: 'text-yellow-400' },
        ].map(s => (
          <Card key={s.label} className="p-4 text-center">
            <div className={`text-2xl font-bold ${s.color}`}>{s.val}<span className="text-gray-500 text-lg">/{s.total}</span></div>
            <div className="text-sm text-gray-400 mt-0.5">{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Difficulty filter */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {difficulties.map(d => (
          <button
            key={d}
            onClick={() => setActiveDifficulty(d)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeDifficulty === d ? (
                d === 'Easy' ? 'bg-success-500/20 text-success-500 border border-success-500/30' :
                d === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                d === 'Hard' ? 'bg-danger-500/20 text-danger-500 border border-danger-500/30' :
                'bg-brand-600 text-white'
              ) : 'bg-surface-600 text-gray-400 hover:text-white hover:bg-surface-500'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activeFilter === cat ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Challenge list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Code2 size={32} />}
          title="No challenges found"
          description="Try adjusting your filters to find challenges."
          action={<Button onClick={() => { setActiveFilter('All'); setActiveDifficulty('All'); }}>Clear Filters</Button>}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((c, idx) => (
            <Card
              key={c.id}
              className="p-4 hover:border-brand-500/30 cursor-pointer group transition-all duration-200"
              hover
              onClick={() => navigate(`/challenges/${c.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="text-gray-500 font-mono text-sm w-8 flex-shrink-0">{String(idx + 1).padStart(2, '0')}</div>

                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  {c.solved ? (
                    <CheckCircle size={20} className="text-success-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-surface-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white group-hover:text-brand-300 transition-colors">{c.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {c.category.slice(0, 2).map(cat => (
                      <span key={cat} className="text-xs text-gray-500 bg-surface-500 px-2 py-0.5 rounded">{cat}</span>
                    ))}
                  </div>
                </div>

                <DifficultyBadge difficulty={c.difficulty} />

                <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400 w-20">
                  <div className="h-1.5 flex-1 bg-surface-400 rounded-full overflow-hidden">
                    <div className="h-full bg-success-500/60 rounded-full" style={{ width: `${c.completionRate}%` }} />
                  </div>
                  <span>{c.completionRate}%</span>
                </div>

                <Badge variant="accent">+{c.xpReward} XP</Badge>

                <Button
                  size="sm"
                  variant="ghost"
                  className="group-hover:bg-brand-600 group-hover:text-white transition-all"
                  onClick={e => { e.stopPropagation(); navigate(`/challenges/${c.id}`); }}
                >
                  Solve
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== CHALLENGE SOLVE PAGE ====================
type SubmissionStatus = 'accepted' | 'wrong' | 'compile' | 'runtime' | 'timeout' | null;

interface TestResultDisplay {
  id: string;
  status: 'passed' | 'failed';
  input: string;
  expected: string;
  actual: string;
  runtime: number;
}

export function ChallengeSolvePage() {
  const { challengeId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useAuth();
  const { showXPGain } = useApp();

  const challenge = mockChallenges.find(c => c.id === challengeId);

  const [language, setLanguage] = useState('java');
  const [code, setCode] = useState('');
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'problem' | 'hints'>('problem');
  const [bottomTab, setBottomTab] = useState<'testcases' | 'output' | 'result'>('testcases');
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>(null);
  const [testResults, setTestResults] = useState<TestResultDisplay[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [hintIdx, setHintIdx] = useState(0);
  const [submissionScore, setSubmissionScore] = useState(0);
  const [execTimeMs, setExecTimeMs] = useState(38);
  const [execMemoryMB, setExecMemoryMB] = useState(16.4);

  if (!challenge) {
    return (
      <div className="p-8">
        <EmptyState
          icon={<Code2 size={32} />}
          title="Challenge not found"
          description="The challenge you're looking for doesn't exist."
          action={<Button onClick={() => navigate('/challenges')}>Back to Challenges</Button>}
        />
      </div>
    );
  }

  const currentCode = code || challenge.starterCode[language] || '';
  const langs = ['java', 'python', 'javascript'];
  const langExtensions: Record<string, any> = { java, python, javascript };

  const simulateRun = async () => {
    setRunning(true);
    setBottomTab('output');
    await new Promise(r => setTimeout(r, 1800));
    const visibleTests = challenge.testCases.filter(tc => !tc.hidden);
    const results: TestResultDisplay[] = visibleTests.map(tc => ({
      id: tc.id,
      status: Math.random() > 0.2 ? 'passed' : 'failed',
      input: tc.input,
      expected: tc.expectedOutput,
      actual: tc.expectedOutput,
      runtime: Math.floor(Math.random() * 80) + 20,
    }));
    setTestResults(results);
    setRunning(false);
    setBottomTab('testcases');
  };

  const simulateSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 2500));
    const allPassed = challenge.testCases.length;
    const passed = Math.floor(allPassed * (Math.random() > 0.3 ? 1 : 0.7));
    const status: SubmissionStatus = passed === allPassed ? 'accepted' : (Math.random() > 0.5 ? 'wrong' : 'compile');
    const score = Math.round((passed / allPassed) * 100);

    const runtime = Math.floor(Math.random() * 60) + 20;
    const memory = Math.floor(Math.random() * 8) + 14;
    setExecTimeMs(runtime);
    setExecMemoryMB(memory);
    setSubmissionStatus(status);
    setSubmissionScore(score);
    setBottomTab('result');
    setSubmitting(false);

    if (status === 'accepted') {
      addXP(challenge.xpReward);
      showXPGain(challenge.xpReward);
      toast.success(`Challenge accepted! +${challenge.xpReward} XP 🎉`);
    } else {
      toast.error('Keep trying! Check your logic and test again.');
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left panel — Problem */}
      <div className="w-[420px] flex-shrink-0 flex flex-col border-r border-white/[0.06] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center gap-3 flex-shrink-0">
          <button onClick={() => navigate('/challenges')} className="p-1.5 rounded-lg hover:bg-surface-500 text-gray-400 hover:text-white transition-colors">
            <ChevronLeft size={16} />
          </button>
          <h2 className="font-semibold text-white truncate">{challenge.title}</h2>
          <DifficultyBadge difficulty={challenge.difficulty} />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/[0.06]">
          {(['problem', 'hints'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors ${activeTab === t ? 'text-white border-b-2 border-brand-500' : 'text-gray-400 hover:text-gray-200'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'problem' ? (
            <div className="space-y-6">
              {/* XP reward */}
              <div className="flex items-center gap-2">
                <Badge variant="accent">+{challenge.xpReward} XP</Badge>
                <Badge variant="default">{challenge.completionRate}% solved</Badge>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Description</h3>
                <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{challenge.description}</div>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Examples</h3>
                {challenge.examples.map((ex, i) => (
                  <div key={i} className="bg-surface-600 rounded-xl p-4 mb-3 font-mono text-sm">
                    <div className="mb-2"><span className="text-gray-500">Input: </span><span className="text-green-400">{ex.input}</span></div>
                    <div className="mb-2"><span className="text-gray-500">Output: </span><span className="text-brand-400">{ex.output}</span></div>
                    {ex.explanation && <div className="text-gray-400 text-xs font-sans mt-2 border-t border-white/[0.06] pt-2">Explanation: {ex.explanation}</div>}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Constraints</h3>
                {challenge.constraints.map((c, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400 py-0.5">
                    <span className="text-brand-400 font-mono text-xs">•</span>
                    <code className="font-mono text-xs">{c}</code>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-surface-600 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb size={16} className="text-yellow-400" />
                  <span className="text-sm font-semibold text-white">Hints ({challenge.hints.length})</span>
                </div>
                <p className="text-xs text-gray-400">Hints will consume some XP. Use them wisely!</p>
              </div>
              {challenge.hints.map((hint, i) => (
                <div key={i} className="bg-surface-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => { setShowHint(true); setHintIdx(i); }}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white hover:bg-surface-500 transition-colors"
                  >
                    <span>Hint {i + 1}</span>
                    {showHint && hintIdx >= i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  {showHint && hintIdx >= i && (
                    <div className="px-4 pb-4 text-sm text-gray-300 border-t border-white/[0.06] pt-3">{hint}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel — Editor + Output */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Editor toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-surface-700 border-b border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-3">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-surface-600 text-white text-sm px-3 py-1.5 rounded-lg border border-white/10 focus:outline-none focus:border-brand-500"
            >
              {langs.map(l => (
                <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setCode(challenge.starterCode[language] || '')}
              icon={<RotateCcw size={12} />}
            >
              Reset
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={simulateRun}
              loading={running}
              icon={<Play size={12} />}
            >
              Run Code
            </Button>
            <Button
              size="sm"
              variant="accent"
              onClick={simulateSubmit}
              loading={submitting}
              icon={<Send size={12} />}
            >
              Submit
            </Button>
          </div>
        </div>

        {/* Code editor */}
        <div className="flex-1 overflow-hidden">
          <CodeMirror
            value={currentCode}
            onChange={setCode}
            extensions={[langExtensions[language]()]}
            theme={oneDark}
            height="100%"
            style={{ fontSize: '13px', height: '100%' }}
          />
        </div>

        {/* Bottom panel */}
        <div className="h-52 border-t border-white/[0.06] flex flex-col flex-shrink-0 bg-surface-800">
          <div className="flex border-b border-white/[0.06] flex-shrink-0">
            {([
              { id: 'testcases', label: 'Test Cases', icon: <Terminal size={12} /> },
              { id: 'output', label: 'Output', icon: <Code2 size={12} /> },
              { id: 'result', label: 'Result', icon: <CheckCircle size={12} /> },
            ] as const).map(t => (
              <button
                key={t.id}
                onClick={() => setBottomTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors border-b-2 ${
                  bottomTab === t.id ? 'text-white border-brand-500' : 'text-gray-400 border-transparent hover:text-gray-200'
                }`}
              >
                {t.icon}{t.label}
                {t.id === 'result' && submissionStatus && (
                  <span className={`w-1.5 h-1.5 rounded-full ${submissionStatus === 'accepted' ? 'bg-success-500' : 'bg-danger-500'}`} />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {bottomTab === 'testcases' && (
              <div className="space-y-2">
                {challenge.testCases.filter(tc => !tc.hidden).map((tc, i) => {
                  const result = testResults.find(r => r.id === tc.id);
                  return (
                    <div key={tc.id} className={`bg-surface-700 rounded-lg p-3 border ${result ? (result.status === 'passed' ? 'border-success-500/30' : 'border-danger-500/30') : 'border-white/[0.06]'}`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-gray-300">Test {i + 1}</span>
                        {result && (
                          <span className={`flex items-center gap-1 text-xs font-semibold ${result.status === 'passed' ? 'text-success-500' : 'text-danger-500'}`}>
                            {result.status === 'passed' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                            {result.status === 'passed' ? 'Passed' : 'Failed'}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <div><span className="text-gray-500">In: </span><span className="text-gray-300">{tc.input}</span></div>
                        <div><span className="text-gray-500">Expected: </span><span className="text-green-400">{tc.expectedOutput}</span></div>
                      </div>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span>+{challenge.testCases.filter(tc => tc.hidden).length} hidden test cases</span>
                </div>
              </div>
            )}

            {bottomTab === 'output' && (
              <div className="font-mono text-sm">
                {running ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-3 h-3 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    Running your code...
                  </div>
                ) : testResults.length > 0 ? (
                  <>
                    <div className="text-gray-400 mb-2">{'>'} Running program...</div>
                    {testResults.map((r, i) => (
                      <div key={i} className={`py-0.5 ${r.status === 'passed' ? 'text-success-500' : 'text-danger-500'}`}>
                        {r.status === 'passed' ? '✓' : '✗'} Test Case {i + 1}: {r.status === 'passed' ? 'Passed' : 'Failed'} · {r.runtime}ms
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="text-gray-500">Click "Run Code" to execute</div>
                )}
              </div>
            )}

            {bottomTab === 'result' && submissionStatus && (
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  submissionStatus === 'accepted' ? 'bg-success-500/20' : 'bg-danger-500/20'
                }`}>
                  {submissionStatus === 'accepted' ? (
                    <CheckCircle size={20} className="text-success-500" />
                  ) : (
                    <XCircle size={20} className="text-danger-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className={`font-bold text-lg ${submissionStatus === 'accepted' ? 'text-success-500' : 'text-danger-500'}`}>
                    {submissionStatus === 'accepted' ? 'Accepted ✓' :
                     submissionStatus === 'wrong' ? 'Wrong Answer ✗' :
                     submissionStatus === 'compile' ? 'Compilation Error ✗' :
                     submissionStatus === 'runtime' ? 'Runtime Error ✗' :
                     'Time Limit Exceeded ⏱'}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span><Clock size={12} className="inline mr-1" />{execTimeMs} ms</span>
                    <span><Cpu size={12} className="inline mr-1" />{execMemoryMB} MB</span>
                    <span className={submissionStatus === 'accepted' ? 'text-success-500' : 'text-danger-500'}>
                      Score: {submissionScore}/100
                    </span>
                  </div>
                  {submissionStatus !== 'accepted' && (
                    <div className="mt-2 text-xs text-gray-400 bg-surface-600 rounded-lg p-2">
                      💡 <strong>Hint:</strong> {challenge.hints[0]}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
