import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, CheckCircle, Clock, Award, Star, ArrowRight } from 'lucide-react';
import { mockCourses, mockUserProgress } from '../../data/mockData';
import { Button, Card, ProgressBar, Badge } from '../../components/ui';

export function MyLearningPage() {
  const navigate = useNavigate();

  const enrolledCourses = mockCourses.filter(c =>
    mockUserProgress.some(p => p.courseId === c.id)
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Learning</h1>
        <p className="text-gray-400">Track your active courses, continue lessons, and view earned certificates.</p>
      </div>

      {/* Enrolled Courses Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="text-brand-400" size={20} /> In-Progress Courses
        </h2>

        {enrolledCourses.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map(course => {
              const progress = mockUserProgress.find(p => p.courseId === course.id);
              const percent = progress ? progress.progressPercent : 0;
              return (
                <Card key={course.id} className="p-5 flex flex-col justify-between" hover>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ backgroundColor: `${course.color}25` }}>
                        {course.icon}
                      </div>
                      <Badge variant="brand">{course.difficulty}</Badge>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-4">{course.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Course Progress</span>
                        <span className="text-white font-medium">{percent}%</span>
                      </div>
                      <ProgressBar value={percent} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} /> {course.estimatedHours}h total
                    </span>
                    <Button
                      size="sm"
                      variant="primary"
                      icon={<Play size={12} />}
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      {percent > 0 ? 'Continue' : 'Start'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="p-8 text-center space-y-4">
            <BookOpen size={48} className="mx-auto text-gray-600" />
            <h3 className="text-lg font-bold text-white">No courses started yet</h3>
            <p className="text-sm text-gray-400">Browse our course catalog and start learning today!</p>
            <Button variant="primary" onClick={() => navigate('/courses')}>Explore Courses</Button>
          </Card>
        )}
      </div>

      {/* Completed Certificates Section */}
      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Award className="text-accent-400" size={20} /> Certificates & Completed
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-5 flex items-center gap-4 bg-surface-800 border-white/[0.08]" hover>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-3xl flex-shrink-0">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-success-500 font-semibold mb-1">
                <CheckCircle size={12} /> Completed
              </div>
              <h4 className="font-bold text-white text-sm">Python Basics</h4>
              <p className="text-xs text-gray-400 mt-0.5">Certificate Issued · Jan 2026</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
