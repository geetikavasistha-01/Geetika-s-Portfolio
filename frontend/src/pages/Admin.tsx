import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import { api } from '../lib/api';
import { Lock, LogOut, Plus, Send, Trash2, CheckCircle, MessageSquare } from 'lucide-react';
import { AMAEntry } from '../types';

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'logs' | 'ama'>('projects');

  // Logs form state
  const [logText, setLogText] = useState('');
  const [logColor, setLogColor] = useState<'amber' | 'teal' | 'rose'>('amber');

  // Projects form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectSlug, setProjectSlug] = useState('');
  const [projectYear, setProjectYear] = useState('2025');
  const [projectLang, setProjectLang] = useState('Python');
  const [projectTags, setProjectTags] = useState('ML / AI, DATA ENGINEERING');
  const [projectDesc, setProjectDesc] = useState('');
  const [projectGithub, setProjectGithub] = useState('');
  const [projectLive, setProjectLive] = useState('');
  const [projectFeatured, setProjectFeatured] = useState(false);

  // Blog form state
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogCategory, setBlogCategory] = useState('RESEARCH');
  const [blogReadTime, setBlogReadTime] = useState('5');
  const [blogTags, setBlogTags] = useState('ML, TRANSFORMERS');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');

  // AMA queue state
  const [amaQueue, setAmaQueue] = useState<AMAEntry[]>([]);
  const [answeringId, setAnsweringId] = useState<string | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [answerPinned, setAnswerPinned] = useState(false);

  useEffect(() => {
    if (token && activeTab === 'ama') {
      fetchAmaQueue();
    }
  }, [token, activeTab]);

  const fetchAmaQueue = async () => {
    try {
      const res = await api.get('/admin/ama/queue');
      setAmaQueue(res.data);
    } catch {
      // Mock fallback queue for offline demo
      setAmaQueue([
        {
          _id: 'ama-mock-1',
          question: 'How do you structure your satellite data ingestion pipeline?',
          askedBy: 'ANONYMOUS',
          answer: '',
          pinned: false,
          answered: false,
          date: new Date().toISOString()
        }
      ]);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/admin/login', { username, password });
      const jwtToken = res.data.token;
      localStorage.setItem('adminToken', jwtToken);
      setToken(jwtToken);
    } catch {
      if (username === 'admin' && password === 'admin') {
        const mockToken = 'mock_jwt_token';
        localStorage.setItem('adminToken', mockToken);
        setToken(mockToken);
      } else {
        alert('Invalid credentials. (Demo login: admin / admin)');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
  };

  const handleCreateLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!logText) return;
    try {
      await api.post('/admin/logs', { content: logText, accentColor: logColor });
      alert('Micro Log entry created successfully!');
      setLogText('');
    } catch {
      alert('Log created (Demo mode).');
      setLogText('');
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: projectTitle,
      slug: projectSlug || projectTitle.toLowerCase().replace(/\s+/g, '-'),
      year: parseInt(projectYear) || 2025,
      language: projectLang,
      tags: projectTags.split(',').map((t) => t.trim()).filter(Boolean),
      description: projectDesc,
      githubUrl: projectGithub,
      liveUrl: projectLive,
      featured: projectFeatured,
      isFeatured: projectFeatured
    };

    try {
      await api.post('/admin/projects', payload);
      alert('Project entry created successfully!');
      setProjectTitle('');
      setProjectSlug('');
      setProjectDesc('');
      setProjectGithub('');
      setProjectLive('');
    } catch {
      alert('Project created (Demo mode).');
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogTitle,
      slug: blogSlug || blogTitle.toLowerCase().replace(/\s+/g, '-'),
      category: blogCategory,
      readTime: parseInt(blogReadTime) || 5,
      tags: blogTags.split(',').map((t) => t.trim()).filter(Boolean),
      excerpt: blogExcerpt,
      content: blogContent,
      published: true
    };

    try {
      await api.post('/admin/blog', payload);
      alert('Blog post published successfully!');
      setBlogTitle('');
      setBlogSlug('');
      setBlogExcerpt('');
      setBlogContent('');
    } catch {
      alert('Blog post created (Demo mode).');
    }
  };

  const handleAnswerAma = async (id: string) => {
    if (!answerText) return;
    try {
      await api.post(`/admin/ama/${id}/answer`, {
        answer: answerText,
        pinned: answerPinned
      });
      alert('Question answered and published!');
      setAnsweringId(null);
      setAnswerText('');
      fetchAmaQueue();
    } catch {
      alert('Question answered (Demo mode).');
      setAmaQueue((prev) => prev.filter((q) => q._id !== id));
      setAnsweringId(null);
      setAnswerText('');
    }
  };

  const handleDeleteAma = async (id: string) => {
    try {
      await api.delete(`/admin/ama/${id}`);
      setAmaQueue((prev) => prev.filter((q) => q._id !== id));
    } catch {
      setAmaQueue((prev) => prev.filter((q) => q._id !== id));
    }
  };

  if (!token) {
    return (
      <PageWrapper>
        <div className="max-w-[400px] mx-auto py-20 flex flex-col items-center select-none">
          <div className="w-12 h-12 rounded-full border border-border bg-surface flex items-center justify-center text-text3 mb-6">
            <Lock size={18} />
          </div>
          <h2 className="text-xl font-semibold text-text1 text-center mb-1">
            Admin Authentication
          </h2>
          <p className="text-xs text-text3 text-center mb-6">
            Protected CMS Access
          </p>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-[9px] font-mono tracking-wider text-text3 uppercase mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (admin)"
                className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text2 outline-none focus:border-text3"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[9px] font-mono tracking-wider text-text3 uppercase mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (admin)"
                className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text2 outline-none focus:border-text3"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-text1 text-bg text-xs font-semibold tracking-wider rounded-full py-2.5 mt-2 hover:bg-text2 transition-all uppercase"
            >
              Sign In
            </button>
          </form>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-border/40 pb-6">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-text3 uppercase">CONTROL CENTER</span>
          <h1 className="text-2xl font-bold text-text1 mt-1">Admin CMS Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 border border-border text-text3 hover:text-text1 hover:bg-surface2 px-3.5 py-1.5 rounded-full text-xs transition-all uppercase"
        >
          <LogOut size={12} /> Sign Out
        </button>
      </div>

      {/* Nav Tabs */}
      <div className="flex border-b border-border/60 pb-3 gap-2">
        {(['projects', 'blog', 'logs', 'ama'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
              activeTab === tab
                ? 'bg-text1 text-bg'
                : 'text-text3 hover:text-text1'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="mt-8 w-full">
        
        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider">Create New Project</h3>
            <form onSubmit={handleCreateProject} className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Project Title</label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. TokenLens"
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={projectSlug}
                    onChange={(e) => setProjectSlug(e.target.value)}
                    placeholder="e.g. tokenlens"
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Year</label>
                  <input
                    type="number"
                    value={projectYear}
                    onChange={(e) => setProjectYear(e.target.value)}
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Language / Tech</label>
                  <input
                    type="text"
                    value={projectLang}
                    onChange={(e) => setProjectLang(e.target.value)}
                    placeholder="Python, TypeScript..."
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={projectTags}
                    onChange={(e) => setProjectTags(e.target.value)}
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-mono text-text3 uppercase mb-1">Short Description</label>
                <textarea
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.target.value)}
                  placeholder="Overview of the system architecture..."
                  rows={3}
                  className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    value={projectGithub}
                    onChange={(e) => setProjectGithub(e.target.value)}
                    placeholder="https://github.com/..."
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Live URL (optional)</label>
                  <input
                    type="url"
                    value={projectLive}
                    onChange={(e) => setProjectLive(e.target.value)}
                    placeholder="https://example.dev"
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <label className="flex items-center gap-2 text-xs text-text2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectFeatured}
                    onChange={(e) => setProjectFeatured(e.target.checked)}
                    className="rounded border-border bg-surface2"
                  />
                  <span>Mark as Featured Project</span>
                </label>

                <button
                  type="submit"
                  className="bg-text1 text-bg text-xs font-semibold tracking-wider px-5 py-2 rounded-full uppercase hover:bg-text2 transition-all flex items-center gap-1.5"
                >
                  <Plus size={12} /> Publish Project
                </button>
              </div>
            </form>
          </div>
        )}

        {/* BLOG TAB */}
        {activeTab === 'blog' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider">Publish Technical Article</h3>
            <form onSubmit={handleCreateBlog} className="bg-surface border border-border rounded-xl p-6 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Article Title</label>
                  <input
                    type="text"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    placeholder="Self-Attention in Sequence Models"
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                    placeholder="self-attention-sequence-models"
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    value={blogCategory}
                    onChange={(e) => setBlogCategory(e.target.value)}
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Read Time (minutes)</label>
                  <input
                    type="number"
                    value={blogReadTime}
                    onChange={(e) => setBlogReadTime(e.target.value)}
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] font-mono text-text3 uppercase mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={blogTags}
                    onChange={(e) => setBlogTags(e.target.value)}
                    className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-mono text-text3 uppercase mb-1">Excerpt</label>
                <textarea
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="Summary for feed cards..."
                  rows={2}
                  className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none resize-none"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-mono text-text3 uppercase mb-1">Markdown Article Content</label>
                <textarea
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="## Section Title&#10;&#10;Write markdown article text here..."
                  rows={8}
                  className="bg-surface2 border border-border rounded-lg p-3 text-xs font-mono text-text2 outline-none resize-y"
                  required
                />
              </div>

              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  className="bg-text1 text-bg text-xs font-semibold tracking-wider px-5 py-2 rounded-full uppercase hover:bg-text2 transition-all flex items-center gap-1.5"
                >
                  <Send size={12} /> Publish Article
                </button>
              </div>
            </form>
          </div>
        )}

        {/* LOGS TAB */}
        {activeTab === 'logs' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider">Create Micro Log</h3>
            <form onSubmit={handleCreateLog} className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1">Content</label>
                <textarea
                  value={logText}
                  onChange={(e) => setLogText(e.target.value)}
                  placeholder="What is the latest update?"
                  rows={3}
                  className="bg-surface2 border border-border rounded-lg p-3 text-xs text-text2 outline-none focus:border-text3 resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-text3 uppercase">Color Accent:</span>
                  <div className="flex gap-2">
                    {(['amber', 'teal', 'rose'] as const).map((color) => (
                      <button
                        type="button"
                        key={color}
                        onClick={() => setLogColor(color)}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          color === 'amber' ? 'bg-amber' : color === 'teal' ? 'bg-teal' : 'bg-rose'
                        } ${logColor === color ? 'border-text1 scale-125' : 'border-transparent'}`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-text1 text-bg text-[10px] font-bold tracking-wider px-5 py-2 rounded-full uppercase hover:bg-text2 transition-all"
                >
                  Create Log Entry
                </button>
              </div>
            </form>
          </div>
        )}

        {/* AMA TAB */}
        {activeTab === 'ama' && (
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-text1 uppercase tracking-wider">Unanswered Question Queue</h3>
            {amaQueue.length === 0 ? (
              <div className="text-xs text-text3 text-center py-10 border border-dashed border-border rounded-xl">
                No pending unanswered questions in the queue.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {amaQueue.map((item) => (
                  <div key={item._id} className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-text3 uppercase">
                      <span>Asked by {item.askedBy || 'ANONYMOUS'}</span>
                      <button
                        onClick={() => handleDeleteAma(item._id!)}
                        className="text-rose hover:underline flex items-center gap-1"
                      >
                        <Trash2 size={10} /> Delete
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm font-medium text-text1">
                      "{item.question}"
                    </p>

                    {answeringId === item._id ? (
                      <div className="flex flex-col gap-3 mt-2 pt-3 border-t border-border/40">
                        <textarea
                          value={answerText}
                          onChange={(e) => setAnswerText(e.target.value)}
                          placeholder="Write your answer..."
                          rows={3}
                          className="bg-surface2 border border-border rounded-lg p-2.5 text-xs text-text2 outline-none resize-none"
                        />
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 text-[10px] text-text3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={answerPinned}
                              onChange={(e) => setAnswerPinned(e.target.checked)}
                              className="rounded border-border"
                            />
                            <span>Pin to top of AMA page</span>
                          </label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setAnsweringId(null)}
                              className="px-3 py-1 text-[10px] text-text3 hover:text-text1 uppercase"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAnswerAma(item._id!)}
                              className="bg-text1 text-bg text-[10px] font-bold px-4 py-1.5 rounded-full uppercase"
                            >
                              Publish Answer
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setAnsweringId(item._id!);
                          setAnswerText('');
                        }}
                        className="self-start inline-flex items-center gap-1 text-[10px] font-semibold text-text2 hover:text-text1 bg-surface2 border border-border px-3 py-1 rounded-full uppercase mt-1"
                      >
                        <MessageSquare size={10} /> Answer Question
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </PageWrapper>
  );
}
