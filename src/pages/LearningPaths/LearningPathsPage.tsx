import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass, Clock, BookOpen, Layers, Play, ChevronRight
} from 'lucide-react';
import { mockLearningPaths, mockCourses } from '../../data/mockData';
import { Card, Button, DifficultyBadge } from '../../components/ui';
import toast from 'react-hot-toast';

export function LearningPathsPage() {
  const [selectedPathId, setSelectedPathId] = useState(mockLearningPaths[0]?.id || 'path-java');
  const navigate = useNavigate();

  const activePath = mockLearningPaths.find(p => p.id === selectedPathId) || mockLearningPaths[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900/60 via-purple-900/30 to-surface-800 border border-brand-500/20 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-400/30 text-brand-300 text-xs font-semibold uppercase tracking-wider">
            <Compass size={14} className="animate-spin-slow text-brand-400" />
            Curated Career Roadmaps
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learning Paths & Roadmaps
          </h1>
          <p className="text-gray-300 text-base leading-relaxed">
            Step-by-step guided pathways engineered to take you from foundational concepts to industry-ready mastery with hands-on coding.
          </p>
        </div>
      </div>

      {/* Grid of Learning Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mockLearningPaths.map((path) => {
          const isSelected = path.id === selectedPathId;
          const courseCount = path.courses?.length || 3;
          const estHours = path.estimatedWeeks ? path.estimatedWeeks * 4 : 16;
          return (
            <Card
              key={path.id}
              onClick={() => setSelectedPathId(path.id)}
              className={`relative cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-brand-500 bg-surface-750 shadow-glow-brand ring-1 ring-brand-500'
                  : 'border-white/[0.08] hover:border-brand-500/40 hover:bg-surface-750'
              }`}
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                    style={{ backgroundColor: `${path.color}20`, border: `1px solid ${path.color}40` }}
                  >
                    {path.icon}
                  </div>
                  <DifficultyBadge difficulty={path.difficulty} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                    {path.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                    {path.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-brand-400" />
                    <span>{courseCount} Courses</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-accent-400" />
                    <span>{estHours} Hours</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Selected Learning Path Roadmap Detail */}
      {activePath && (
        <Card className="p-6 sm:p-8 space-y-8 bg-surface-800 border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-xl flex-shrink-0"
                style={{ backgroundColor: `${activePath.color}25`, border: `1px solid ${activePath.color}50` }}
              >
                {activePath.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-2xl font-bold text-white">{activePath.title}</h2>
                  <DifficultyBadge difficulty={activePath.difficulty} />
                </div>
                <p className="text-gray-300 text-sm mt-1 max-w-2xl">{activePath.description}</p>
                
                {/* Skills tags */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {['Algorithms', 'OOP', 'Data Structures', 'Backend'].map((skill: string, i: number) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-surface-600 border border-white/[0.06] text-brand-300">
                      ✨ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                icon={<Play size={16} />}
                onClick={() => {
                  toast.success(`Enrolled in ${activePath.title}! 🚀`);
                  navigate(`/courses/${activePath.courses[0] || 'course-java'}`);
                }}
              >
                Start Learning Path
              </Button>
            </div>
          </div>

          {/* Roadmap Steps Visualizer */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers size={18} className="text-brand-400" />
                Path Roadmap ({activePath.courses.length} Milestone Courses)
              </h3>
              <span className="text-xs text-gray-400 font-mono">Estimated Completion: ~{activePath.estimatedWeeks * 4} Hours</span>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-brand-500 before:via-purple-500 before:to-surface-600">
              {activePath.courses.map((courseId: string, idx: number) => {
                const course = mockCourses.find(c => c.id === courseId) || {
                  id: courseId,
                  title: `Course ${idx + 1}: Core Fundamentals`,
                  description: 'Deep dive into fundamental algorithms, data structures, and hands-on coding challenges.',
                  difficulty: 'Beginner' as const,
                  totalLessons: 24,
                  estimatedHours: 10,
                  icon: '💻',
                  color: '#6366f1'
                };

                return (
                  <div key={courseId} className="relative group">
                    {/* Node Dot */}
                    <div className="absolute -left-6 sm:-left-8 top-4 w-6 h-6 rounded-full bg-surface-900 border-2 border-brand-500 text-brand-400 flex items-center justify-center text-xs font-bold shadow-glow-brand group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>

                    <Card
                      hover
                      onClick={() => navigate(`/courses/${course.id}`)}
                      className="p-5 border-white/[0.08] group-hover:border-brand-500/50 bg-surface-700/60 hover:bg-surface-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ backgroundColor: `${course.color || '#6366f1'}20` }}
                        >
                          {course.icon || '📘'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Step {idx + 1}</span>
                            <DifficultyBadge difficulty={course.difficulty} />
                          </div>
                          <h4 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors mt-0.5">
                            {course.title}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                            {course.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right hidden sm:block">
                          <div className="text-xs text-gray-300 font-medium">{course.totalLessons} Lessons</div>
                          <div className="text-[11px] text-gray-500">{course.estimatedHours} hrs</div>
                        </div>
                        <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />}>
                          View
                        </Button>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
