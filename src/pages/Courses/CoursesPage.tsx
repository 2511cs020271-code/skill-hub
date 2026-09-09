import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Check, BookOpen, Code2,
  Clock, Award, Users, Star, Lock, Play, CheckCircle,
  ChevronDown, ChevronUp, BarChart2
} from 'lucide-react';
import { mockCourses, mockUserProgress } from '../../data/mockData';
import { Button, Badge, ProgressBar, Card, DifficultyBadge } from '../../components/ui';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';

// ==================== COURSES LIST ====================
export function CoursesPage() {
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();
  const filters = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = filter === 'All' ? mockCourses : mockCourses.filter(c => c.difficulty === filter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Courses</h1>
        <p className="text-gray-400">Master programming with structured, interactive courses</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              filter === f ? 'bg-brand-600 text-white' : 'bg-surface-600 text-gray-400 hover:text-white hover:bg-surface-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(course => {
          const progress = mockUserProgress.find(p => p.courseId === course.id);
          const enrolled = progress !== undefined;
          return (
            <Card
              key={course.id}
              className="overflow-hidden cursor-pointer"
              hover
              onClick={() => navigate(`/courses/${course.id}`)}
            >
              {/* Header */}
              <div className="h-40 flex items-center justify-center relative" style={{ backgroundColor: `${course.color}15` }}>
                <div className="absolute inset-0 flex items-center justify-center text-[80px] opacity-20">{course.icon}</div>
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl" style={{ backgroundColor: `${course.color}25` }}>
                  {course.icon}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-white text-lg leading-tight">{course.title}</h3>
                  <DifficultyBadge difficulty={course.difficulty} />
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{course.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><BookOpen size={12} />{course.totalLessons} lessons</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{course.estimatedHours}h</span>
                  <span className="flex items-center gap-1"><Users size={12} />{(course.enrolledCount / 1000).toFixed(1)}k</span>
                  <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400" />{course.rating}</span>
                </div>

                {/* Progress */}
                {enrolled && progress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                      <span>Progress</span>
                      <span className="text-white font-medium">{progress.progressPercent}%</span>
                    </div>
                    <ProgressBar value={progress.progressPercent} />
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-surface-400 text-gray-400">{tag}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button size="sm" variant={enrolled ? 'secondary' : 'primary'} onClick={() => navigate(`/courses/${course.id}`)}>
                    {enrolled ? 'Continue' : 'Start Course'}
                  </Button>
                  {course.certificate && (
                    <span className="flex items-center gap-1 text-xs text-gray-500">
                      <Award size={12} /> Certificate
                    </span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ==================== COURSE DETAIL ====================
export function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { addXP } = useAuth();
  const { showXPGain } = useApp();

  const course = mockCourses.find(c => c.id === courseId);
  const progress = mockUserProgress.find(p => p.courseId === courseId);

  const [activeLesson, setActiveLesson] = useState(
    progress?.currentLesson || course?.modules?.[0]?.lessons?.[0]?.id || ''
  );
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set(progress?.completedLessons || [])
  );
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['m1', 'm2']));
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [codeTab, setCodeTab] = useState<'code' | 'output'>('code');

  if (!course) return (
    <div className="p-8 text-center">
      <h2 className="text-xl text-white mb-4">Course not found</h2>
      <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
    </div>
  );

  const allLessons = course.modules.flatMap(m => m.lessons);
  const activeL = allLessons.find(l => l.id === activeLesson);
  const activeModule = course.modules.find(m => m.lessons.some(l => l.id === activeLesson));

  const handleRunCode = async () => {
    setRunning(true);
    setCodeTab('output');
    await new Promise(r => setTimeout(r, 1500));
    const userCode = code || activeL?.content.starterCode || '';
    if (userCode.toLowerCase().includes('system.out')) {
      setOutput(`> Running Main.java...\n\nHello, Skill Hub!\n\n✓ Execution completed successfully\nRuntime: 142ms`);
    } else {
      setOutput(`> Running program...\n\n[Output will appear here]\n\n✓ Execution completed successfully`);
    }
    setRunning(false);
  };

  const handleCompleteLesson = () => {
    if (!activeL || completedLessons.has(activeL.id)) return;
    const newCompleted = new Set(completedLessons);
    newCompleted.add(activeL.id);
    setCompletedLessons(newCompleted);
    addXP(activeL.xpReward);
    showXPGain(activeL.xpReward);
    toast.success(`Lesson completed! +${activeL.xpReward} XP 🎉`);

    // Go to next lesson
    const idx = allLessons.findIndex(l => l.id === activeL.id);
    if (idx < allLessons.length - 1) {
      setTimeout(() => setActiveLesson(allLessons[idx + 1].id), 800);
    }
  };

  const toggleModule = (mId: string) => {
    const s = new Set(expandedModules);
    s.has(mId) ? s.delete(mId) : s.add(mId);
    setExpandedModules(s);
  };

  const langs: Record<string, any> = { java, python, javascript };
  const editorLang = langs[activeL?.content.language || 'java'] || java;

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-surface-800 border-r border-white/[0.06] overflow-y-auto no-scrollbar flex flex-col">
        <div className="p-4 border-b border-white/[0.06]">
          <button onClick={() => navigate('/courses')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
            <ChevronLeft size={16} />Back to Courses
          </button>
          <h2 className="font-semibold text-white text-sm line-clamp-2">{course.title}</h2>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round((completedLessons.size / allLessons.length) * 100)}%</span>
            </div>
            <ProgressBar value={completedLessons.size} max={allLessons.length} size="sm" />
          </div>
        </div>

        <nav className="flex-1 p-3">
          {course.modules.map(m => (
            <div key={m.id} className="mb-1">
              <button
                onClick={() => toggleModule(m.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-gray-300 hover:bg-surface-600 transition-all"
              >
                <span className="truncate">{m.title}</span>
                {expandedModules.has(m.id) ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {expandedModules.has(m.id) && (
                <div className="ml-2 mt-1 space-y-0.5">
                  {m.lessons.map(lesson => {
                    const done = completedLessons.has(lesson.id);
                    const active = lesson.id === activeLesson;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all ${
                          active ? 'bg-brand-600/20 text-white border border-brand-500/30' :
                          done ? 'text-gray-400 hover:bg-surface-600' :
                          'text-gray-500 hover:text-gray-300 hover:bg-surface-600'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center ${done ? 'bg-success-500/20' : active ? 'bg-brand-500/20 border border-brand-500' : 'border border-surface-400'}`}>
                          {done ? <Check size={10} className="text-success-500" /> : active ? <Play size={8} className="text-brand-400" /> : null}
                        </div>
                        <span className="truncate">{lesson.title}</span>
                        {lesson.type === 'coding' && <Code2 size={12} className="ml-auto flex-shrink-0 text-gray-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {activeL ? (
          <div className="max-w-4xl mx-auto p-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <span>{activeModule?.title}</span>
              <ChevronRight size={14} />
              <span className="text-white">{activeL.title}</span>
              {activeL.type === 'coding' && <Badge variant="brand" className="ml-2">Coding</Badge>}
            </div>

            <h1 className="text-2xl font-bold text-white mb-6">{activeL.title}</h1>

            {/* Explanation */}
            <div className="prose max-w-none mb-8">
              {activeL.content.explanation.split('\n').map((para, i) => {
                if (para.startsWith('**') && para.endsWith('**')) {
                  return <h3 key={i} className="text-lg font-semibold text-white mt-6 mb-2">{para.slice(2, -2)}</h3>;
                }
                if (para.startsWith('- ')) {
                  return <div key={i} className="flex items-start gap-2 text-gray-300 py-0.5"><span className="text-brand-400 mt-1">•</span><span>{para.slice(2)}</span></div>;
                }
                if (para.startsWith('`') && para.endsWith('`')) {
                  return <code key={i} className="block bg-surface-600 text-green-400 font-mono text-sm px-3 py-1 rounded-lg my-1">{para.slice(1, -1)}</code>;
                }
                return para.trim() ? <p key={i} className="text-gray-300 leading-relaxed py-1">{para}</p> : <div key={i} className="h-2" />;
              })}
            </div>

            {/* Code example */}
            {activeL.content.codeExample && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Example</h3>
                <div className="bg-surface-800 rounded-xl overflow-hidden border border-white/[0.06]">
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-700 border-b border-white/[0.06]">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500 opacity-60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60" />
                      <div className="w-3 h-3 rounded-full bg-green-500 opacity-60" />
                    </div>
                    <span className="text-xs text-gray-400 font-mono ml-2">Example.java</span>
                  </div>
                  <pre className="p-5 text-sm font-mono overflow-x-auto">
                    {activeL.content.codeExample.split('\n').map((line, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-gray-600 select-none w-6 text-right flex-shrink-0">{i + 1}</span>
                        <span className="text-gray-200" dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/(public|class|static|void|int|new|for|if|return|double|boolean|String|char|long)/g, '<span style="color:#c084fc">$1</span>')
                            .replace(/(".*?")/g, '<span style="color:#4ade80">$1</span>')
                            .replace(/(\/\/.*)/g, '<span style="color:#6b7280">$1</span>')
                            .replace(/(\b\d+\b)/g, '<span style="color:#fb923c">$1</span>') || '&nbsp;'
                        }} />
                      </div>
                    ))}
                  </pre>
                </div>
              </div>
            )}

            {/* Practice Editor */}
            {activeL.content.starterCode && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
                  Try It Yourself
                </h3>
                {activeL.content.practicePrompt && (
                  <div className="bg-brand-600/10 border border-brand-500/20 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-300"><strong className="text-brand-400">Exercise: </strong>{activeL.content.practicePrompt}</p>
                  </div>
                )}

                <div className="bg-surface-800 rounded-xl overflow-hidden border border-white/[0.06]">
                  {/* Editor toolbar */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-surface-700 border-b border-white/[0.06]">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setCodeTab('code')} className={`text-xs font-medium pb-0.5 transition-colors ${codeTab === 'code' ? 'text-white border-b border-brand-400' : 'text-gray-400 hover:text-gray-200'}`}>Code</button>
                      <button onClick={() => setCodeTab('output')} className={`text-xs font-medium pb-0.5 transition-colors ${codeTab === 'output' ? 'text-white border-b border-brand-400' : 'text-gray-400 hover:text-gray-200'}`}>Output</button>
                    </div>
                    <Button size="sm" variant="primary" onClick={handleRunCode} loading={running} icon={<Play size={12} />}>
                      {running ? 'Running...' : 'Run Code'}
                    </Button>
                  </div>

                  {codeTab === 'code' ? (
                    <CodeMirror
                      value={code || activeL.content.starterCode}
                      onChange={setCode}
                      extensions={[editorLang()]}
                      theme={oneDark}
                      height="250px"
                      style={{ fontSize: '13px' }}
                    />
                  ) : (
                    <div className="bg-surface-900 p-4 min-h-[250px] font-mono text-sm">
                      {output ? (
                        <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
                      ) : (
                        <div className="text-gray-500 text-center mt-8">
                          <Code2 size={24} className="mx-auto mb-2 opacity-30" />
                          <p>Click "Run Code" to see output</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
              <Button
                variant="secondary"
                icon={<ChevronLeft size={16} />}
                onClick={() => {
                  const idx = allLessons.findIndex(l => l.id === activeLesson);
                  if (idx > 0) setActiveLesson(allLessons[idx - 1].id);
                }}
                disabled={allLessons.findIndex(l => l.id === activeLesson) === 0}
              >
                Previous
              </Button>

              <Button
                variant={completedLessons.has(activeL.id) ? 'secondary' : 'primary'}
                onClick={handleCompleteLesson}
                icon={completedLessons.has(activeL.id) ? <CheckCircle size={16} className="text-success-500" /> : undefined}
              >
                {completedLessons.has(activeL.id) ? 'Completed' : `Mark Complete (+${activeL.xpReward} XP)`}
              </Button>

              <Button
                variant="secondary"
                iconRight={<ChevronRight size={16} />}
                onClick={() => {
                  const idx = allLessons.findIndex(l => l.id === activeLesson);
                  if (idx < allLessons.length - 1) setActiveLesson(allLessons[idx + 1].id);
                }}
                disabled={allLessons.findIndex(l => l.id === activeLesson) === allLessons.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">Select a lesson to begin</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
