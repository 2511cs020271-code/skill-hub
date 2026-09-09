import {
  User, Course, Challenge, Achievement, LeaderboardEntry,
  Notification, LearningPath, Assessment, DailyActivity,
  UserProgress, Submission
} from '../types';

// ==================== MOCK USER ====================
export const mockUser: User = {
  id: 'user-1',
  name: 'Alex Johnson',
  username: 'alexj',
  email: 'alex@example.com',
  avatar: undefined,
  level: 12,
  xp: 4820,
  xpToNextLevel: 5000,
  streak: 7,
  longestStreak: 21,
  problemsSolved: 87,
  totalSubmissions: 134,
  acceptanceRate: 72,
  hoursLearned: 48,
  joinedAt: '2026-01-15',
  role: 'student',
  badges: ['first-code', 'seven-streak', 'ten-problems', 'java-beginner', 'debugging-master'],
  completedCourses: ['course-python-basics'],
  enrolledCourses: ['course-java', 'course-dsa', 'course-python-basics'],
};

// ==================== MOCK COURSES ====================
export const mockCourses: Course[] = [
  {
    id: 'course-java',
    title: 'Java Programming',
    description: 'From zero to advanced Java developer. Learn OOP, data structures, and real-world Java applications.',
    language: 'Java',
    difficulty: 'Beginner',
    totalLessons: 42,
    totalModules: 12,
    estimatedHours: 18,
    certificate: true,
    icon: '☕',
    color: '#f97316',
    tags: ['Java', 'OOP', 'Backend'],
    enrolledCount: 12400,
    rating: 4.8,
    instructor: 'Dr. Priya Reddy',
    modules: [
      {
        id: 'm1', title: 'MODULE 1 — Java Basics',
        lessons: [
          { id: 'l1', title: 'Introduction to Java', type: 'reading', duration: 10, xpReward: 20,
            content: {
              explanation: `Java is one of the world's most popular programming languages. Created by James Gosling at Sun Microsystems in 1995, Java follows the principle of "Write Once, Run Anywhere" (WORA).

**Why Java?**
- Platform independent (JVM)
- Object-Oriented
- Strongly typed
- Large ecosystem
- Used in Android, Enterprise, Backend systems

Java programs are compiled to bytecode that runs on the Java Virtual Machine (JVM). This means Java code can run on any device that has a JVM installed, regardless of the underlying operating system.`,
              codeExample: `public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n        System.out.println("Welcome to Skill Hub!");\n    }\n}`,
              language: 'java',
              practicePrompt: 'Write a Java program that prints your name and your city.',
              starterCode: `public class Main {\n    public static void main(String[] args) {\n        // Write your code here\n        \n    }\n}`
            }
          },
          { id: 'l2', title: 'Variables & Data Types', type: 'coding', duration: 15, xpReward: 30,
            content: {
              explanation: `Variables are containers for storing data. In Java, every variable must have a declared type.

**Primitive Types:**
- \`int\` — Integer numbers (-2B to 2B)
- \`long\` — Large integers
- \`double\` — Decimal numbers
- \`float\` — Single precision decimal
- \`boolean\` — true or false
- \`char\` — Single character
- \`byte\` / \`short\` — Small integers

**Reference Types:**
- \`String\` — Text
- Arrays, Objects, etc.`,
              codeExample: `public class Variables {\n    public static void main(String[] args) {\n        int age = 20;\n        double gpa = 9.5;\n        boolean isStudent = true;\n        String name = "Alex";\n        char grade = 'A';\n        \n        System.out.println("Name: " + name);\n        System.out.println("Age: " + age);\n        System.out.println("GPA: " + gpa);\n        System.out.println("Grade: " + grade);\n    }\n}`,
              language: 'java',
              practicePrompt: 'Declare variables for a student record: name, age, GPA, and whether they are enrolled.',
              starterCode: `public class StudentRecord {\n    public static void main(String[] args) {\n        // Declare your variables here\n        \n        // Print the values\n        \n    }\n}`
            }
          },
          { id: 'l3', title: 'Operators', type: 'reading', duration: 12, xpReward: 25, content: { explanation: 'Java supports arithmetic, relational, logical, assignment, and bitwise operators.', codeExample: '' } },
          { id: 'l4', title: 'Input & Output', type: 'coding', duration: 18, xpReward: 35, content: { explanation: 'Use Scanner for input and System.out for output.', codeExample: '' } },
        ]
      },
      {
        id: 'm2', title: 'MODULE 2 — Control Flow',
        lessons: [
          { id: 'l5', title: 'If / Else Statements', type: 'reading', duration: 10, xpReward: 20, content: { explanation: 'Conditional logic in Java.', codeExample: '' } },
          { id: 'l6', title: 'Switch Statements', type: 'coding', duration: 12, xpReward: 25, content: { explanation: 'Switch-case control flow.', codeExample: '' } },
          { id: 'l7', title: 'For & While Loops', type: 'coding', duration: 20, xpReward: 40, content: { explanation: 'Repetition structures in Java.', codeExample: '' } },
          { id: 'l8', title: 'Nested Loops', type: 'coding', duration: 15, xpReward: 30, content: { explanation: 'Using loops inside loops.', codeExample: '' } },
        ]
      },
      {
        id: 'm3', title: 'MODULE 3 — Methods',
        lessons: [
          { id: 'l9', title: 'Defining Methods', type: 'reading', duration: 12, xpReward: 25, content: { explanation: 'How to create reusable method blocks.', codeExample: '' } },
          { id: 'l10', title: 'Parameters & Arguments', type: 'coding', duration: 15, xpReward: 30, content: { explanation: 'Passing data to methods.', codeExample: '' } },
          { id: 'l11', title: 'Return Values', type: 'coding', duration: 14, xpReward: 30, content: { explanation: 'Methods that return data.', codeExample: '' } },
        ]
      },
      {
        id: 'm4', title: 'MODULE 4 — OOP',
        lessons: [
          { id: 'l12', title: 'Classes & Objects', type: 'reading', duration: 20, xpReward: 40, content: { explanation: 'The building blocks of OOP.', codeExample: '' } },
          { id: 'l13', title: 'Inheritance', type: 'coding', duration: 25, xpReward: 50, content: { explanation: 'Extending classes in Java.', codeExample: '' } },
          { id: 'l14', title: 'Polymorphism', type: 'coding', duration: 22, xpReward: 45, content: { explanation: 'Method overriding and overloading.', codeExample: '' } },
          { id: 'l15', title: 'Encapsulation', type: 'reading', duration: 15, xpReward: 30, content: { explanation: 'Data hiding with access modifiers.', codeExample: '' } },
        ]
      },
    ]
  },
  {
    id: 'course-python-basics',
    title: 'Python Programming',
    description: 'Learn Python from scratch. Master the most beginner-friendly language used in AI/ML, automation, and web dev.',
    language: 'Python',
    difficulty: 'Beginner',
    totalLessons: 35,
    totalModules: 10,
    estimatedHours: 15,
    certificate: true,
    icon: '🐍',
    color: '#22c55e',
    tags: ['Python', 'AI/ML', 'Automation'],
    enrolledCount: 18700,
    rating: 4.9,
    instructor: 'Rahul Sharma',
    modules: []
  },
  {
    id: 'course-dsa',
    title: 'Data Structures & Algorithms',
    description: 'Master arrays, linked lists, trees, graphs, sorting and searching algorithms. Ace your technical interviews.',
    language: 'Java',
    difficulty: 'Intermediate',
    totalLessons: 58,
    totalModules: 14,
    estimatedHours: 30,
    certificate: true,
    icon: '🧠',
    color: '#6370f1',
    tags: ['DSA', 'Algorithms', 'Interview Prep'],
    enrolledCount: 9800,
    rating: 4.7,
    instructor: 'Arjun Kumar',
    modules: []
  },
  {
    id: 'course-web',
    title: 'Web Development',
    description: 'Build modern web apps with HTML, CSS, JavaScript, and React. From static pages to dynamic applications.',
    language: 'JavaScript',
    difficulty: 'Beginner',
    totalLessons: 48,
    totalModules: 12,
    estimatedHours: 24,
    certificate: true,
    icon: '🌐',
    color: '#3b82f6',
    tags: ['HTML', 'CSS', 'JavaScript', 'React'],
    enrolledCount: 22100,
    rating: 4.8,
    instructor: 'Sneha Rao',
    modules: []
  },
  {
    id: 'course-aiml',
    title: 'AI & Machine Learning',
    description: 'Dive into machine learning algorithms, neural networks, and AI applications using Python and popular frameworks.',
    language: 'Python',
    difficulty: 'Advanced',
    totalLessons: 62,
    totalModules: 16,
    estimatedHours: 40,
    certificate: true,
    icon: '🤖',
    color: '#a855f7',
    tags: ['AI', 'ML', 'Deep Learning', 'Python'],
    enrolledCount: 7600,
    rating: 4.9,
    instructor: 'Dr. Priya Reddy',
    modules: []
  },
  {
    id: 'course-sql',
    title: 'SQL & Databases',
    description: 'Master relational databases, SQL queries, joins, indexing, and database design principles.',
    language: 'SQL',
    difficulty: 'Beginner',
    totalLessons: 30,
    totalModules: 8,
    estimatedHours: 12,
    certificate: true,
    icon: '🗄️',
    color: '#06b6d4',
    tags: ['SQL', 'MySQL', 'Database Design'],
    enrolledCount: 11200,
    rating: 4.6,
    instructor: 'Arjun Kumar',
    modules: []
  },
];

// ==================== MOCK CHALLENGES ====================
export const mockChallenges: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Reverse a String',
    difficulty: 'Easy',
    category: ['Strings', 'Arrays'],
    xpReward: 25,
    solved: true,
    completionRate: 78,
    submissions: 4521,
    description: `Given a string \`s\`, return the string reversed.

Write a function that takes a string as input and returns the string with all characters in reverse order.`,
    examples: [
      { input: 's = "hello"', output: '"olleh"', explanation: 'Reverse the characters of "hello".' },
      { input: 's = "Java"', output: '"avaJ"', explanation: 'Reverse the characters of "Java".' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of printable ASCII characters'],
    hints: ['Try using a StringBuilder', 'You can also use a two-pointer approach'],
    starterCode: {
      java: `class Solution {\n    public String reverseString(String s) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def reverse_string(self, s: str) -> str:\n        # Write your solution here\n        pass`,
      javascript: `/**\n * @param {string} s\n * @return {string}\n */\nvar reverseString = function(s) {\n    // Write your solution here\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: 'hello', expectedOutput: 'olleh' },
      { id: 'tc-2', input: 'Java', expectedOutput: 'avaJ' },
      { id: 'tc-3', input: 'a', expectedOutput: 'a' },
      { id: 'tc-4', input: 'abcdefghij', expectedOutput: 'jihgfedcba', hidden: true },
      { id: 'tc-5', input: 'SkillHub', expectedOutput: 'buHllikS', hidden: true },
    ]
  },
  {
    id: 'ch-2',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: ['Arrays', 'Hash Table'],
    xpReward: 50,
    solved: false,
    completionRate: 61,
    submissions: 8934,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', 'Only one valid answer exists.'],
    hints: ['Use a HashMap to store visited numbers', 'For each number, check if (target - number) exists in the map'],
    starterCode: {
      java: `class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def two_sum(self, nums: List[int], target: int) -> List[int]:\n        # Write your solution here\n        pass`,
      javascript: `var twoSum = function(nums, target) {\n    // Write your solution here\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { id: 'tc-2', input: '[3,2,4], 6', expectedOutput: '[1,2]' },
      { id: 'tc-3', input: '[3,3], 6', expectedOutput: '[0,1]' },
      { id: 'tc-4', input: '[1,2,3,4,5], 9', expectedOutput: '[3,4]', hidden: true },
    ]
  },
  {
    id: 'ch-3',
    title: 'FizzBuzz',
    difficulty: 'Easy',
    category: ['Loops', 'Math'],
    xpReward: 20,
    solved: true,
    completionRate: 91,
    submissions: 12034,
    description: `Print numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz".`,
    examples: [
      { input: 'n = 15', output: '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz' },
    ],
    constraints: ['1 ≤ n ≤ 10⁴'],
    hints: ['Use the modulo operator %', 'Check for divisibility by 15 first'],
    starterCode: {
      java: `class Solution {\n    public List<String> fizzBuzz(int n) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def fizz_buzz(self, n: int) -> List[str]:\n        pass`,
      javascript: `var fizzBuzz = function(n) {\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: '3', expectedOutput: '1 2 Fizz' },
      { id: 'tc-2', input: '5', expectedOutput: '1 2 Fizz 4 Buzz' },
      { id: 'tc-3', input: '15', expectedOutput: '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz' },
    ]
  },
  {
    id: 'ch-4',
    title: 'Palindrome Check',
    difficulty: 'Easy',
    category: ['Strings'],
    xpReward: 30,
    solved: false,
    completionRate: 82,
    submissions: 6721,
    description: 'Given a string, determine if it reads the same forward and backward (ignoring case and non-alphanumeric characters).',
    examples: [
      { input: 's = "racecar"', output: 'true' },
      { input: 's = "hello"', output: 'false' },
    ],
    constraints: ['1 ≤ s.length ≤ 2 × 10⁵'],
    hints: ['Two pointer approach works well here', 'Consider cleaning the string first'],
    starterCode: {
      java: `class Solution {\n    public boolean isPalindrome(String s) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def is_palindrome(self, s: str) -> bool:\n        pass`,
      javascript: `var isPalindrome = function(s) {\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: 'racecar', expectedOutput: 'true' },
      { id: 'tc-2', input: 'hello', expectedOutput: 'false' },
      { id: 'tc-3', input: 'A man a plan a canal Panama', expectedOutput: 'true', hidden: true },
    ]
  },
  {
    id: 'ch-5',
    title: 'Binary Search',
    difficulty: 'Medium',
    category: ['Algorithms', 'Arrays'],
    xpReward: 75,
    solved: false,
    completionRate: 55,
    submissions: 5432,
    description: 'Given a sorted array and a target, implement binary search and return the index of target, or -1 if not found.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁴', 'All values in nums are unique', 'nums is sorted in ascending order'],
    hints: ['Use two pointers: left and right', 'Calculate mid = (left + right) / 2'],
    starterCode: {
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
      javascript: `var search = function(nums, target) {\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: '[-1,0,3,5,9,12], 9', expectedOutput: '4' },
      { id: 'tc-2', input: '[-1,0,3,5,9,12], 2', expectedOutput: '-1' },
    ]
  },
  {
    id: 'ch-6',
    title: 'Linked List Cycle',
    difficulty: 'Medium',
    category: ['Linked Lists', 'Data Structures'],
    xpReward: 80,
    solved: false,
    completionRate: 48,
    submissions: 3876,
    description: 'Determine if a linked list has a cycle in it. Use Floyd\'s Tortoise and Hare algorithm for O(1) space.',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'Tail connects to node at index 1.' },
    ],
    constraints: ['0 ≤ number of nodes ≤ 10⁴', '-10⁵ ≤ Node.val ≤ 10⁵'],
    hints: ['Use slow and fast pointers', 'If they meet, there is a cycle'],
    starterCode: {
      java: `public class Solution {\n    public boolean hasCycle(ListNode head) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def has_cycle(self, head: Optional[ListNode]) -> bool:\n        pass`,
      javascript: `var hasCycle = function(head) {\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: '[3,2,0,-4], pos=1', expectedOutput: 'true' },
      { id: 'tc-2', input: '[1,2], pos=0', expectedOutput: 'true' },
      { id: 'tc-3', input: '[1], pos=-1', expectedOutput: 'false' },
    ]
  },
  {
    id: 'ch-7',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    category: ['Dynamic Programming', 'Arrays'],
    xpReward: 100,
    solved: false,
    completionRate: 43,
    submissions: 7234,
    description: 'Find the contiguous subarray with the largest sum (Kadane\'s Algorithm).',
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has the largest sum = 6.' },
    ],
    constraints: ['1 ≤ nums.length ≤ 10⁵', '-10⁴ ≤ nums[i] ≤ 10⁴'],
    hints: ['Track current and maximum sum', 'Reset current sum if it goes negative'],
    starterCode: {
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def max_sub_array(self, nums: List[int]) -> int:\n        pass`,
      javascript: `var maxSubArray = function(nums) {\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
      { id: 'tc-2', input: '[1]', expectedOutput: '1' },
      { id: 'tc-3', input: '[5,4,-1,7,8]', expectedOutput: '23' },
    ]
  },
  {
    id: 'ch-8',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    category: ['Linked Lists'],
    xpReward: 40,
    solved: false,
    completionRate: 69,
    submissions: 5612,
    description: 'Merge two sorted linked lists and return the head of the merged list.',
    examples: [
      { input: 'l1 = [1,2,4], l2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
    ],
    constraints: ['0 ≤ number of nodes ≤ 50', '-100 ≤ Node.val ≤ 100'],
    hints: ['Use a dummy head node', 'Compare nodes from each list one by one'],
    starterCode: {
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def merge_two_lists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
      javascript: `var mergeTwoLists = function(list1, list2) {\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: '[1,2,4], [1,3,4]', expectedOutput: '[1,1,2,3,4,4]' },
      { id: 'tc-2', input: '[], []', expectedOutput: '[]' },
    ]
  },
  {
    id: 'ch-9',
    title: 'Number of Islands',
    difficulty: 'Hard',
    category: ['Graphs', 'BFS/DFS'],
    xpReward: 150,
    solved: false,
    completionRate: 31,
    submissions: 2891,
    description: 'Count the number of islands in a 2D grid. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      { input: 'grid = [["1","1","0"],["0","1","0"],["0","0","1"]]', output: '2' },
    ],
    constraints: ['1 ≤ grid.length, grid[i].length ≤ 300', 'grid[i][j] is "0" or "1"'],
    hints: ['Use DFS or BFS to explore each island', 'Mark visited cells to avoid counting twice'],
    starterCode: {
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        // Write your solution here\n        \n    }\n}`,
      python: `class Solution:\n    def num_islands(self, grid: List[List[str]]) -> int:\n        pass`,
      javascript: `var numIslands = function(grid) {\n    \n};`,
    },
    testCases: [
      { id: 'tc-1', input: '[["1","1","0"],["0","1","0"],["0","0","1"]]', expectedOutput: '2' },
      { id: 'tc-2', input: '[["1","1","1"],["0","1","0"],["1","1","1"]]', expectedOutput: '1' },
    ]
  },
];

// ==================== MOCK ACHIEVEMENTS ====================
export const mockAchievements: Achievement[] = [
  { id: 'first-code', title: 'First Code', description: 'Run your very first program', icon: '🏆', xpReward: 50, rarity: 'common', unlocked: true, unlockedAt: '2026-01-15', condition: 'Run first program' },
  { id: 'seven-streak', title: '7-Day Streak', description: 'Maintain a 7-day learning streak', icon: '🔥', xpReward: 100, rarity: 'rare', unlocked: true, unlockedAt: '2026-01-22', condition: '7 consecutive days' },
  { id: 'ten-problems', title: '10 Problems Solved', description: 'Solve 10 coding challenges', icon: '💻', xpReward: 150, rarity: 'rare', unlocked: true, unlockedAt: '2026-02-01', condition: 'Solve 10 challenges' },
  { id: 'debugging-master', title: 'Debugging Master', description: 'Fix 20 compilation errors', icon: '🐛', xpReward: 200, rarity: 'epic', unlocked: true, unlockedAt: '2026-02-15', condition: 'Fix 20 errors' },
  { id: 'java-beginner', title: 'Java Beginner', description: 'Complete the Java Basics module', icon: '☕', xpReward: 100, rarity: 'common', unlocked: true, unlockedAt: '2026-02-20', condition: 'Complete Java module 1' },
  { id: 'problem-solver', title: 'Problem Solver', description: 'Solve 50 coding challenges', icon: '🧠', xpReward: 300, rarity: 'epic', unlocked: false, condition: 'Solve 50 challenges' },
  { id: 'fast-learner', title: 'Fast Learner', description: 'Complete 5 lessons in one day', icon: '🚀', xpReward: 200, rarity: 'rare', unlocked: false, condition: '5 lessons in a day' },
  { id: 'perfect-score', title: '100% Challenge', description: 'Get a perfect score on any challenge', icon: '🎯', xpReward: 250, rarity: 'epic', unlocked: false, condition: '100% on a challenge' },
  { id: 'month-streak', title: '30-Day Legend', description: 'Maintain a 30-day learning streak', icon: '👑', xpReward: 500, rarity: 'legendary', unlocked: false, condition: '30 consecutive days' },
  { id: 'speed-coder', title: 'Speed Coder', description: 'Submit an accepted solution in under 60 seconds', icon: '⚡', xpReward: 300, rarity: 'epic', unlocked: false, condition: 'Solve in < 60 seconds' },
  { id: 'dsa-master', title: 'DSA Master', description: 'Complete the Data Structures course', icon: '🌳', xpReward: 500, rarity: 'legendary', unlocked: false, condition: 'Complete DSA course' },
  { id: 'night-owl', title: 'Night Owl', description: 'Submit a solution after midnight', icon: '🦉', xpReward: 100, rarity: 'common', unlocked: false, condition: 'Submit after midnight' },
];

// ==================== MOCK LEADERBOARD ====================
export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: 'u1', name: 'Rahul Sharma', username: 'rahuls', level: 24, xp: 18450, problemsSolved: 312, streak: 45 },
  { rank: 2, userId: 'u2', name: 'Priya Reddy', username: 'priyar', level: 22, xp: 16200, problemsSolved: 287, streak: 38 },
  { rank: 3, userId: 'u3', name: 'Arjun Kumar', username: 'arjunk', level: 21, xp: 15800, problemsSolved: 264, streak: 29 },
  { rank: 4, userId: 'u4', name: 'Sneha Rao', username: 'snehar', level: 20, xp: 14900, problemsSolved: 241, streak: 22 },
  { rank: 5, userId: 'u5', name: 'Vikram Singh', username: 'vikrams', level: 19, xp: 13600, problemsSolved: 218, streak: 18 },
  { rank: 6, userId: 'u6', name: 'Anika Patel', username: 'anikap', level: 18, xp: 12400, problemsSolved: 196, streak: 15 },
  { rank: 7, userId: 'u7', name: 'Dev Mehta', username: 'devm', level: 17, xp: 11200, problemsSolved: 178, streak: 12 },
  { rank: 8, userId: 'u8', name: 'Kavya Nair', username: 'kavyan', level: 16, xp: 10800, problemsSolved: 165, streak: 21 },
  { rank: 9, userId: 'u9', name: 'Ravi Krishnan', username: 'ravikr', level: 15, xp: 9600, problemsSolved: 147, streak: 8 },
  { rank: 10, userId: 'u10', name: 'Meera Joshi', username: 'meeraj', level: 14, xp: 8900, problemsSolved: 134, streak: 11 },
  { rank: 11, userId: 'u11', name: 'Aditya Gupta', username: 'adityag', level: 13, xp: 7800, problemsSolved: 121, streak: 7 },
  { rank: 12, userId: 'u12', name: 'Shreya Iyer', username: 'shreyai', level: 13, xp: 7200, problemsSolved: 115, streak: 14 },
  { rank: 127, userId: 'user-1', name: 'Alex Johnson', username: 'alexj', level: 12, xp: 4820, problemsSolved: 87, streak: 7, isCurrentUser: true },
];

// ==================== MOCK NOTIFICATIONS ====================
export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'streak', title: '🔥 Streak Active!', message: 'Your 7-day learning streak is active. Keep it going!', icon: '🔥', read: false, createdAt: '2026-09-09T08:00:00Z' },
  { id: 'n2', type: 'challenge', title: 'New Challenge Available', message: 'A new Hard challenge "Graph Traversal" is now available. +150 XP', icon: '⚡', read: false, createdAt: '2026-09-09T06:30:00Z' },
  { id: 'n3', type: 'course', title: 'Module Completed!', message: 'You completed Module 2 — Control Flow in Java Programming.', icon: '✅', read: true, createdAt: '2026-09-08T20:15:00Z' },
  { id: 'n4', type: 'achievement', title: 'Badge Unlocked!', message: 'You earned the "Debugging Master" badge! +200 XP', icon: '🏆', read: true, createdAt: '2026-09-08T18:45:00Z' },
  { id: 'n5', type: 'system', title: 'Weekly Progress Report', message: 'You solved 12 problems this week. Your rank improved by 8 positions!', icon: '📊', read: true, createdAt: '2026-09-07T09:00:00Z' },
];

// ==================== MOCK LEARNING PATHS ====================
export const mockLearningPaths: LearningPath[] = [
  { id: 'lp-java', title: 'Java Programming', description: 'Master Java from basics to advanced OOP, collections, and multithreading.', icon: '☕', color: '#f97316', courses: ['course-java', 'course-dsa'], totalModules: 26, difficulty: 'Beginner', estimatedWeeks: 8, enrolled: true, progressPercent: 42 },
  { id: 'lp-python', title: 'Python Programming', description: 'Learn Python for scripting, automation, data science, and AI development.', icon: '🐍', color: '#22c55e', courses: ['course-python-basics', 'course-aiml'], totalModules: 26, difficulty: 'Beginner', estimatedWeeks: 10, enrolled: false, progressPercent: 0 },
  { id: 'lp-dsa', title: 'Data Structures & Algorithms', description: 'From arrays to graphs. Prepare for coding interviews at top companies.', icon: '🧠', color: '#6370f1', courses: ['course-dsa'], totalModules: 14, difficulty: 'Intermediate', estimatedWeeks: 12, enrolled: true, progressPercent: 18 },
  { id: 'lp-web', title: 'Web Development', description: 'Build full-stack web applications from HTML basics to React and Node.js.', icon: '🌐', color: '#3b82f6', courses: ['course-web'], totalModules: 12, difficulty: 'Beginner', estimatedWeeks: 10, enrolled: false, progressPercent: 0 },
  { id: 'lp-aiml', title: 'AI & Machine Learning', description: 'Dive into ML algorithms, neural networks, and deploy real AI models.', icon: '🤖', color: '#a855f7', courses: ['course-python-basics', 'course-aiml'], totalModules: 26, difficulty: 'Advanced', estimatedWeeks: 16, enrolled: false, progressPercent: 0 },
  { id: 'lp-sql', title: 'SQL & Databases', description: 'Master SQL queries, database design, indexing, and optimization.', icon: '🗄️', color: '#06b6d4', courses: ['course-sql'], totalModules: 8, difficulty: 'Beginner', estimatedWeeks: 6, enrolled: false, progressPercent: 0 },
];

// ==================== MOCK ASSESSMENTS ====================
export const mockAssessments: Assessment[] = [
  {
    id: 'assess-java-basics',
    title: 'Java Fundamentals Assessment',
    description: 'Test your understanding of Java basics: variables, operators, control flow, and methods.',
    duration: 45,
    passingScore: 70,
    totalMarks: 100,
    topics: ['Variables', 'Operators', 'Control Flow', 'Methods'],
    difficulty: 'Easy',
    completed: true,
    score: 86,
    questions: [
      { id: 'q1', text: 'Which of the following is a primitive data type in Java?', type: 'mcq', options: ['String', 'int', 'ArrayList', 'Object'], correctOption: 1, marks: 2 },
      { id: 'q2', text: 'What is the output of: System.out.println(10 % 3)?', type: 'mcq', options: ['3', '1', '0', '2'], correctOption: 1, marks: 2 },
      { id: 'q3', text: 'Which keyword is used to define a constant in Java?', type: 'mcq', options: ['const', 'final', 'static', 'immutable'], correctOption: 1, marks: 2 },
      { id: 'q4', text: 'Write a method that returns the factorial of a given number n.', type: 'code', starterCode: 'public int factorial(int n) {\n    // Write here\n}', marks: 10 },
    ]
  },
  {
    id: 'assess-oop',
    title: 'OOP Concepts Assessment',
    description: 'Evaluate your knowledge of Object-Oriented Programming: classes, inheritance, polymorphism, and encapsulation.',
    duration: 60,
    passingScore: 70,
    totalMarks: 100,
    topics: ['Classes', 'Inheritance', 'Polymorphism', 'Encapsulation'],
    difficulty: 'Medium',
    completed: false,
    questions: [
      { id: 'q1', text: 'What is inheritance in OOP?', type: 'mcq', options: ['Hiding implementation details', 'A class acquiring properties of another class', 'Multiple methods with same name', 'Creating objects from a class'], correctOption: 1, marks: 2 },
      { id: 'q2', text: 'Which access modifier makes a field accessible only within its class?', type: 'mcq', options: ['public', 'protected', 'private', 'default'], correctOption: 2, marks: 2 },
      { id: 'q3', text: 'Create a class Animal with a method sound(). Extend it with Dog that overrides sound().', type: 'code', starterCode: 'class Animal {\n    // Write here\n}\n\nclass Dog extends Animal {\n    // Override sound()\n}', marks: 15 },
    ]
  },
  {
    id: 'assess-dsa',
    title: 'Data Structures Assessment',
    description: 'Test your knowledge of arrays, linked lists, stacks, queues, and trees.',
    duration: 90,
    passingScore: 65,
    totalMarks: 100,
    topics: ['Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees'],
    difficulty: 'Hard',
    completed: false,
    questions: []
  },
];

// ==================== MOCK DAILY ACTIVITY ====================
export const mockDailyActivity: DailyActivity[] = [
  { date: '2026-09-01', problemsSolved: 2, minutesLearned: 45, xpEarned: 120 },
  { date: '2026-09-02', problemsSolved: 1, minutesLearned: 30, xpEarned: 80 },
  { date: '2026-09-03', problemsSolved: 3, minutesLearned: 90, xpEarned: 200 },
  { date: '2026-09-04', problemsSolved: 0, minutesLearned: 20, xpEarned: 40 },
  { date: '2026-09-05', problemsSolved: 2, minutesLearned: 60, xpEarned: 150 },
  { date: '2026-09-06', problemsSolved: 4, minutesLearned: 120, xpEarned: 280 },
  { date: '2026-09-07', problemsSolved: 1, minutesLearned: 35, xpEarned: 90 },
  { date: '2026-09-08', problemsSolved: 3, minutesLearned: 80, xpEarned: 180 },
  { date: '2026-09-09', problemsSolved: 2, minutesLearned: 55, xpEarned: 130 },
];

// ==================== MOCK USER PROGRESS ====================
export const mockUserProgress: UserProgress[] = [
  { userId: 'user-1', courseId: 'course-java', completedLessons: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6', 'l7', 'l8', 'l9'], currentLesson: 'l10', progressPercent: 68 },
  { userId: 'user-1', courseId: 'course-dsa', completedLessons: ['l1'], currentLesson: 'l2', progressPercent: 12 },
  { userId: 'user-1', courseId: 'course-python-basics', completedLessons: [], currentLesson: 'l1', progressPercent: 100 },
];

// ==================== WEEKLY CHART DATA ====================
export const weeklyChartData = [
  { day: 'Mon', problems: 2, minutes: 45 },
  { day: 'Tue', problems: 1, minutes: 30 },
  { day: 'Wed', problems: 4, minutes: 95 },
  { day: 'Thu', problems: 0, minutes: 20 },
  { day: 'Fri', problems: 3, minutes: 75 },
  { day: 'Sat', problems: 5, minutes: 140 },
  { day: 'Sun', problems: 2, minutes: 55 },
];

// ==================== SKILL METRICS ====================
export const skillMetrics = [
  { skill: 'Java', score: 82, color: '#f97316' },
  { skill: 'Problem Solving', score: 74, color: '#6370f1' },
  { skill: 'Data Structures', score: 61, color: '#22c55e' },
  { skill: 'Algorithms', score: 58, color: '#a855f7' },
  { skill: 'OOP', score: 70, color: '#3b82f6' },
  { skill: 'SQL', score: 45, color: '#06b6d4' },
];

// ==================== CONTRIBUTION GRID ====================
export function generateContributionGrid() {
  const grid: { date: string; count: number; level: number }[] = [];
  const now = new Date('2026-09-09');
  for (let i = 180; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const count = Math.random() < 0.6 ? Math.floor(Math.random() * 6) : 0;
    const level = count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 4 ? 3 : 4;
    grid.push({ date: d.toISOString().split('T')[0], count, level });
  }
  return grid;
}
