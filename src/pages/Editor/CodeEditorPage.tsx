import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { Play, Copy, RotateCcw, Download, Terminal, FileCode, Check, Sparkles, BookOpen } from 'lucide-react';
import { Button, Badge } from '../../components/ui';
import toast from 'react-hot-toast';

const codeTemplates: Record<string, { starter: string; sampleOutput: string }> = {
  java: {
    starter: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, SkillHub Compiler!");
        
        // Calculate sum of numbers
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println("Sum of numbers from 1 to 10: " + sum);
    }
}`,
    sampleOutput: `> Compiling Main.java...\n> Executing...\nHello, SkillHub Compiler!\nSum of numbers from 1 to 10: 55\n\n✓ Program finished with exit code 0\nExecution time: 124ms | Memory: 14.2 MB`
  },
  python: {
    starter: `# Python Interactive Playground
def greet(name):
    return f"Welcome to SkillHub, {name}!"

def calculate_fibonacci(n):
    a, b = 0, 1
    result = []
    for _ in range(n):
        result.append(a)
        a, b = b, a + b
    return result

print(greet("Developer"))
print("Fibonacci sequence (first 10):", calculate_fibonacci(10))
`,
    sampleOutput: `> Running python main.py...\nWelcome to SkillHub, Developer!\nFibonacci sequence (first 10): [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]\n\n✓ Process finished with exit code 0\nExecution time: 42ms | Memory: 8.4 MB`
  },
  javascript: {
    starter: `// JavaScript Playground
const student = {
  name: "Alex",
  skills: ["Java", "Python", "Web Dev"],
  level: 12
};

console.log(\`Student: \${student.name}\`);
console.log("Skills:", student.skills.join(", "));
console.log("Level Up Target:", student.level * 500, "XP");
`,
    sampleOutput: `> Running node index.js...\nStudent: Alex\nSkills: Java, Python, Web Dev\nLevel Up Target: 6000 XP\n\n✓ Execution successful!`
  },
  cpp: {
    starter: `#include <iostream>
#include <vector>

int main() {
    std::cout << "C++ High Performance Code" << std::endl;
    std::vector<int> numbers = {10, 20, 30, 40, 50};
    
    int total = 0;
    for (int num : numbers) {
        total += num;
    }
    
    std::cout << "Vector Sum: " << total << std::endl;
    return 0;
}`,
    sampleOutput: `> g++ -O3 main.cpp -o main && ./main\nC++ High Performance Code\nVector Sum: 150\n\n✓ Execution completed in 18ms`
  },
  sql: {
    starter: `-- SQL Interactive Query Engine
SELECT 
    users.id,
    users.name,
    COUNT(submissions.id) AS total_submissions,
    MAX(submissions.score) AS highest_score
FROM users
JOIN submissions ON users.id = submissions.user_id
GROUP BY users.id, users.name
ORDER BY highest_score DESC;
`,
    sampleOutput: `> Executing SQL Query...\n\n+----+--------------+-------------------+---------------+
| id | name         | total_submissions | highest_score |
+----+--------------+-------------------+---------------+
|  1 | Alex Johnson |                14 |           100 |
|  2 | Priya Sharma |                 9 |            95 |
|  3 | Rahul Verma  |                12 |            90 |
+----+--------------+-------------------+---------------+
3 rows returned in 12ms`
  }
};

export function CodeEditorPage() {
  const [selectedLang, setSelectedLang] = useState<'java' | 'python' | 'javascript' | 'cpp' | 'sql'>('java');
  const [code, setCode] = useState(codeTemplates.java.starter);
  const [output, setOutput] = useState<string | null>(null);
  const [customInput, setCustomInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'output' | 'input' | 'notes'>('output');
  const [copied, setCopied] = useState(false);
  const [notes, setNotes] = useState('');

  const langExtensions: Record<string, any> = {
    java: java,
    python: python,
    javascript: javascript,
    cpp: java,
    sql: javascript
  };

  const handleLanguageChange = (lang: 'java' | 'python' | 'javascript' | 'cpp' | 'sql') => {
    setSelectedLang(lang);
    setCode(codeTemplates[lang].starter);
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setActiveTab('output');
    setOutput('Compiling and running code on remote sandbox...');

    await new Promise(r => setTimeout(r, 1200));

    if (code.trim().length === 0) {
      setOutput('❌ Error: Empty source file.');
    } else {
      setOutput(codeTemplates[selectedLang].sampleOutput);
      toast.success('Code executed successfully! +10 XP');
    }
    setIsRunning(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCode(codeTemplates[selectedLang].starter);
    setOutput(null);
    toast('Code reset to template', { icon: '🔄' });
  };

  const handleDownload = () => {
    const extMap: Record<string, string> = { java: 'java', python: 'py', javascript: 'js', cpp: 'cpp', sql: 'sql' };
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `solution.${extMap[selectedLang]}`;
    link.click();
    toast.success('File downloaded!');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-surface-900 overflow-hidden">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-surface-800 border-b border-white/[0.06] gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FileCode size={20} className="text-brand-400" />
            <h1 className="text-lg font-bold text-white">Interactive Code Playground</h1>
          </div>

          <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-surface-700 p-1 rounded-xl border border-white/[0.06]">
            {(['java', 'python', 'javascript', 'cpp', 'sql'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                  selectedLang === lang
                    ? 'bg-brand-600 text-white shadow-glow-brand'
                    : 'text-gray-400 hover:text-white hover:bg-surface-600'
                }`}
              >
                {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JS' : lang}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={handleReset} icon={<RotateCcw size={14} />}>
            Reset
          </Button>
          <Button size="sm" variant="secondary" onClick={handleCopyCode} icon={copied ? <Check size={14} className="text-success-500" /> : <Copy size={14} />}>
            {copied ? 'Copied' : 'Copy'}
          </Button>
          <Button size="sm" variant="secondary" onClick={handleDownload} icon={<Download size={14} />}>
            Download
          </Button>
          <Button size="sm" variant="primary" loading={isRunning} onClick={handleRunCode} icon={<Play size={14} />}>
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Code Editor */}
        <div className="flex-1 flex flex-col border-r border-white/[0.06] bg-surface-900 overflow-hidden">
          <div className="px-4 py-2 bg-surface-800/60 border-b border-white/[0.06] flex items-center justify-between text-xs text-gray-400">
            <span className="font-mono">main.{selectedLang === 'python' ? 'py' : selectedLang === 'javascript' ? 'js' : selectedLang}</span>
            <Badge variant="brand">Interactive Sandbox</Badge>
          </div>
          <div className="flex-1 overflow-auto">
            <CodeMirror
              value={code}
              onChange={setCode}
              extensions={[langExtensions[selectedLang]()]}
              theme={oneDark}
              height="100%"
              style={{ fontSize: '14px', height: '100%' }}
            />
          </div>
        </div>

        {/* Right Side: Execution Console & Notes */}
        <div className="w-full lg:w-96 bg-surface-800 flex flex-col border-t lg:border-t-0 lg:border-l border-white/[0.06]">
          {/* Tabs */}
          <div className="flex items-center border-b border-white/[0.06] bg-surface-700/50">
            <button
              onClick={() => setActiveTab('output')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all border-b-2 ${
                activeTab === 'output'
                  ? 'border-brand-500 text-white bg-surface-700'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Terminal size={14} /> Console Output
            </button>
            <button
              onClick={() => setActiveTab('input')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all border-b-2 ${
                activeTab === 'input'
                  ? 'border-brand-500 text-white bg-surface-700'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <Sparkles size={14} /> Custom Input
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold transition-all border-b-2 ${
                activeTab === 'notes'
                  ? 'border-brand-500 text-white bg-surface-700'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <BookOpen size={14} /> Scratchpad
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-sm">
            {activeTab === 'output' && (
              <div className="h-full flex flex-col">
                {output ? (
                  <pre className="text-green-400 whitespace-pre-wrap leading-relaxed text-xs sm:text-sm font-mono bg-surface-900 p-4 rounded-xl border border-white/[0.06] h-full overflow-auto">
                    {output}
                  </pre>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-center p-6">
                    <Terminal size={40} className="mb-3 opacity-30 text-brand-400" />
                    <p className="font-sans font-medium text-sm text-gray-400 mb-1">No output yet</p>
                    <p className="font-sans text-xs text-gray-500">Click "Run Code" above to execute your snippet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'input' && (
              <div className="h-full flex flex-col">
                <label className="font-sans text-xs text-gray-400 mb-2 block font-medium">STDIN Input Data:</label>
                <textarea
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Enter inputs here (e.g. 5\n10 20 30)"
                  className="flex-1 w-full bg-surface-900 border border-white/[0.06] rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-brand-500 font-mono resize-none"
                />
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="h-full flex flex-col">
                <label className="font-sans text-xs text-gray-400 mb-2 block font-medium">Quick Notes & Ideas:</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write algorithm steps, logic notes, or test cases here..."
                  className="flex-1 w-full bg-surface-900 border border-white/[0.06] rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-brand-500 font-sans resize-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
