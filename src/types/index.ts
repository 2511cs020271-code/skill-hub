// ==================== USERS ====================
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  problemsSolved: number;
  totalSubmissions: number;
  acceptanceRate: number;
  hoursLearned: number;
  joinedAt: string;
  role: 'student' | 'instructor' | 'admin';
  badges: string[];
  completedCourses: string[];
  enrolledCourses: string[];
}

// ==================== COURSES ====================
export interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
  totalLessons: number;
  totalModules: number;
  estimatedHours: number;
  certificate: boolean;
  icon: string;
  color: string;
  tags: string[];
  enrolledCount: number;
  rating: number;
  instructor: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed?: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'reading' | 'video' | 'coding' | 'quiz';
  content: LessonContent;
  completed?: boolean;
  duration: number; // minutes
  xpReward: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LessonContent {
  explanation: string;
  videoId?: string;
  codeExample?: string;
  language?: string;
  practicePrompt?: string;
  starterCode?: string;
  quiz?: QuizQuestion[];
}

// ==================== CHALLENGES ====================
export interface Challenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  description: string;
  examples: Example[];
  constraints: string[];
  hints: string[];
  starterCode: Record<string, string>;
  testCases: TestCase[];
  xpReward: number;
  solved?: boolean;
  completionRate: number;
  submissions: number;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  hidden?: boolean;
}

// ==================== SUBMISSIONS ====================
export interface Submission {
  id: string;
  challengeId: string;
  userId: string;
  code: string;
  language: string;
  status: 'accepted' | 'wrong_answer' | 'runtime_error' | 'compile_error' | 'time_limit';
  testsPassed: number;
  totalTests: number;
  runtime: number;
  memory: number;
  score: number;
  submittedAt: string;
  feedback?: string;
}

// ==================== ASSESSMENTS ====================
export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  duration: number; // minutes
  passingScore: number;
  totalMarks: number;
  topics: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed?: boolean;
  score?: number;
}

export interface AssessmentQuestion {
  id: string;
  text: string;
  type: 'mcq' | 'code';
  options?: string[];
  correctOption?: number;
  codePrompt?: string;
  starterCode?: string;
  marks: number;
}

// ==================== PROGRESS ====================
export interface UserProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  currentLesson: string;
  progressPercent: number;
}

export interface DailyActivity {
  date: string;
  problemsSolved: number;
  minutesLearned: number;
  xpEarned: number;
}

// ==================== ACHIEVEMENTS ====================
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: string;
  unlocked?: boolean;
  condition: string;
}

// ==================== LEADERBOARD ====================
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  username: string;
  avatar?: string;
  level: number;
  xp: number;
  problemsSolved: number;
  streak: number;
  isCurrentUser?: boolean;
}

// ==================== NOTIFICATIONS ====================
export interface Notification {
  id: string;
  type: 'achievement' | 'streak' | 'challenge' | 'course' | 'system';
  title: string;
  message: string;
  icon: string;
  read: boolean;
  createdAt: string;
}

// ==================== LEARNING PATHS ====================
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  courses: string[];
  courseIds?: string[];
  coursesCount?: number;
  totalModules: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedWeeks: number;
  estimatedHours?: number;
  skillsAcquired?: string[];
  enrolled?: boolean;
  progressPercent?: number;
}

// ==================== APP STATE ====================
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  notifications: Notification[];
  theme: 'dark' | 'light';
  sidebarCollapsed: boolean;
}

// ==================== CODE EXECUTION ====================
export interface ExecutionResult {
  status: 'success' | 'error' | 'timeout';
  output: string;
  errors?: string;
  runtime: number;
  memory: number;
  testResults?: TestResult[];
}

export interface TestResult {
  id: string;
  status: 'passed' | 'failed';
  input: string;
  expectedOutput: string;
  actualOutput: string;
  runtime: number;
}

// ==================== SKILL BREAKDOWN ====================
export interface SkillMetric {
  skill: string;
  score: number;
  color: string;
}
