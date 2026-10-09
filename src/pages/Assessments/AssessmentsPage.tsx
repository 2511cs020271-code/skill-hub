import React, { useState } from 'react';
import { ClipboardList, Clock, CheckCircle, Award, Play, AlertCircle, FileText, Sparkles } from 'lucide-react';
import { mockAssessments } from '../../data/mockData';
import { Button, Card, Badge, DifficultyBadge } from '../../components/ui';
import toast from 'react-hot-toast';

export function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'completed' | 'pending'>('all');
  const [selectedAssessment, setSelectedAssessment] = useState<typeof mockAssessments[0] | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filtered = mockAssessments.filter(a => {
    if (activeTab === 'completed') return a.completed;
    if (activeTab === 'pending') return !a.completed;
    return true;
  });

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitAssessment = () => {
    setIsSubmitted(true);
    toast.success('Assessment submitted successfully! Score calculated.');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Assessments & Assignments</h1>
        <p className="text-gray-400">Test your programming proficiency with timed skill assessments and graded quizzes.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'pending', 'completed'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-brand-600 text-white shadow-glow-brand'
                : 'bg-surface-700 text-gray-400 hover:text-white hover:bg-surface-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assessment Modal/Modal View */}
      {selectedAssessment ? (
        <Card className="p-6 space-y-6 border-brand-500/30">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div>
              <span className="text-xs text-brand-400 font-semibold uppercase tracking-wider">Skill Evaluation</span>
              <h2 className="text-xl font-bold text-white">{selectedAssessment.title}</h2>
            </div>
            <Button size="sm" variant="secondary" onClick={() => { setSelectedAssessment(null); setIsSubmitted(false); }}>
              Exit Test
            </Button>
          </div>

          {!isSubmitted ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-gray-400 bg-surface-900 p-3 rounded-xl">
                <span>Question {currentQuestionIdx + 1} of {selectedAssessment.questions.length}</span>
                <span className="flex items-center gap-1 font-mono text-brand-400"><Clock size={14} /> Time limit: {selectedAssessment.duration} mins</span>
              </div>

              {/* Question */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  {selectedAssessment.questions[currentQuestionIdx]?.text}
                </h3>

                <div className="space-y-2">
                  {selectedAssessment.questions[currentQuestionIdx]?.options?.map((opt, i) => {
                    const qId = selectedAssessment.questions[currentQuestionIdx].id;
                    const selected = userAnswers[qId] === i;
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(qId, i)}
                        className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                          selected
                            ? 'bg-brand-600/20 border-brand-500 text-white font-medium'
                            : 'bg-surface-900 border-white/[0.06] text-gray-300 hover:bg-surface-700'
                        }`}
                      >
                        <span className="font-semibold mr-3">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <Button
                  variant="secondary"
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                >
                  Previous
                </Button>

                {currentQuestionIdx < selectedAssessment.questions.length - 1 ? (
                  <Button
                    variant="primary"
                    onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button variant="accent" onClick={handleSubmitAssessment}>
                    Submit Assessment
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-success-500/20 text-success-500 flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white">Assessment Completed!</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                You passed with flying colors! Your results have been logged to your learning record.
              </p>
              <div className="bg-surface-900 p-4 rounded-2xl max-w-sm mx-auto border border-white/[0.06] text-left space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Score:</span>
                  <span className="font-bold text-white">90 / {selectedAssessment.totalMarks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Passing Grade:</span>
                  <span className="text-success-400 font-semibold">{selectedAssessment.passingScore}%</span>
                </div>
              </div>
              <Button variant="primary" onClick={() => { setSelectedAssessment(null); setIsSubmitted(false); }}>
                Back to Assessments List
              </Button>
            </div>
          )}
        </Card>
      ) : (
        /* List View */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(assessment => (
            <Card key={assessment.id} className="p-5 flex flex-col justify-between" hover>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="brand">{assessment.topics[0] || 'General'}</Badge>
                  <DifficultyBadge difficulty={assessment.difficulty} />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{assessment.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{assessment.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-400 mb-6 bg-surface-900/60 p-3 rounded-xl border border-white/[0.04]">
                  <span className="flex items-center gap-1"><Clock size={12} /> {assessment.duration} mins</span>
                  <span className="flex items-center gap-1"><FileText size={12} /> {assessment.questions.length} questions</span>
                  <span className="flex items-center gap-1"><Award size={12} /> {assessment.totalMarks} pts</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                {assessment.completed ? (
                  <span className="text-xs text-success-500 font-semibold flex items-center gap-1">
                    <CheckCircle size={14} /> Passed ({assessment.score || 90}%)
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">Not Attempted</span>
                )}
                <Button
                  size="sm"
                  variant={assessment.completed ? 'secondary' : 'primary'}
                  onClick={() => {
                    setSelectedAssessment(assessment);
                    setCurrentQuestionIdx(0);
                    setIsSubmitted(false);
                  }}
                >
                  {assessment.completed ? 'Retake' : 'Start Assessment'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
