import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Search, Pencil, Trash2, Eye, ExternalLink,
  FolderGit2, Layers, Code2, Database, Cpu, CheckCircle2, Clock, Sparkles, Share2
} from 'lucide-react';

const ProjectsManager = React.memo(function ProjectsManager({ projects = [], query = '', onAdd, onEdit, onDelete, onShare }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        p.title?.toLowerCase().includes(q) ||
        p.subtitle?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        (Array.isArray(p.technologies) ? p.technologies.join(' ').toLowerCase().includes(q) : String(p.technologies || '').toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'all' || (p.status || '').toLowerCase() === statusFilter.toLowerCase();

      return matchesQuery && matchesStatus;
    });
  }, [projects, query, statusFilter]);

  const { totalCount, inDevCount, publishedCount } = useMemo(() => {
    const total = projects.length;
    const dev = projects.filter(p => (p.status || '').toLowerCase().includes('development')).length;
    const pub = projects.filter(p => (p.status || '').toLowerCase().includes('published') || (p.status || '').toLowerCase().includes('completed')).length;
    return { totalCount: total, inDevCount: dev, publishedCount: pub };
  }, [projects]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900/30 via-purple-950/20 to-black/40 border border-purple-500/20 rounded-2xl p-5 sm:p-6 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderGit2 className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Portfolio Projects</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Manage projects displayed on the public Our Portfolio page. Add new case studies, upload images, update progress, and tech stack details.
          </p>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all cursor-pointer shrink-0"
        >
          <Plus size={16} /> Add Portfolio Project
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
            {totalCount}
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Projects</p>
            <p className="text-sm font-bold text-white">{totalCount} Listed</p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold">
            {inDevCount}
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">In Development</p>
            <p className="text-sm font-bold text-white">{inDevCount} Active</p>
          </div>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
            {publishedCount}
          </div>
          <div>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Published / Done</p>
            <p className="text-sm font-bold text-white">{publishedCount} Completed</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        {[
          { key: 'all', label: 'All Projects' },
          { key: 'in development', label: 'In Development' },
          { key: 'published', label: 'Published / Completed' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              statusFilter === tab.key
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projects List Grid */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-12 text-center">
          <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            No portfolio projects match your search or status filter. Add your first project now.
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
          >
            <Plus size={14} /> Add Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const techList = Array.isArray(project.technologies)
              ? project.technologies
              : (typeof project.technologies === 'string' ? project.technologies.split(',').map(s => s.trim()).filter(Boolean) : []);

            return (
              <motion.div
                key={project.firestoreId || project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0e091c] border border-white/10 hover:border-purple-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Preview & Status Badge */}
                  <div className="relative h-44 sm:h-48 w-full bg-black/60 overflow-hidden">
                    <img
                      src={project.image || '/abijoe furniture.png'}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e091c] via-transparent to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-purple-400/30 backdrop-blur-md text-purple-300 text-[10px] font-bold tracking-wider uppercase">
                        <Sparkles size={11} className="text-amber-400" />
                        {project.status || 'Active'}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => onEdit(project)}
                        className="w-8 h-8 rounded-lg bg-black/70 hover:bg-purple-600 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => onDelete(project)}
                        className="w-8 h-8 rounded-lg bg-black/70 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-5">
                    <p className="text-[11px] font-bold text-purple-400 uppercase tracking-widest mb-1">
                      {project.subtitle || project.category || 'Portfolio Case Study'}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-purple-200 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                      {project.overview || project.description}
                    </p>

                    {/* Tech Chips */}
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {techList.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {techList.length > 4 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-300">
                            +{techList.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="font-bold text-purple-300">{project.progress || '100%'}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                          style={{ width: project.progress || '100%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="px-5 py-3 bg-white/[0.02] border-t border-white/5 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400 font-medium truncate">
                    Client: <span className="text-slate-200">{project.client || 'Zentrix'}</span> ({project.year || '2026'})
                  </div>

                  <div className="flex items-center gap-2">
                    {onShare && (
                      <button
                        onClick={() => onShare(project, 'project')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Share project"
                      >
                        <Share2 size={14} />
                      </button>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 hover:text-purple-200 transition-colors"
                      >
                        Live Link <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default ProjectsManager;
