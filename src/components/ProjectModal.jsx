import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Check, Image as ImageIcon, Sparkles, Layers, Plus, Trash2 } from 'lucide-react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Helper for instant client-side image reading & canvas compression (<50ms)
const readAndCompressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const maxDim = 1200;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = () => resolve(event.target.result);
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export default function ProjectModal({ initial, onClose, onSave, saving }) {
  const isEdit = Boolean(initial);

  const defaultScreenshots = [
    { label: 'Dashboard Overview', src: '/DASHBOARD.jpeg' },
    { label: 'Billing & Invoicing', src: '/BILLING.jpeg' },
    { label: 'Inventory Management', src: '/INVENTORY.jpeg' },
    { label: 'Accounting Ledger', src: '/ACCOUNTING.jpeg' },
    { label: 'Masters Management', src: '/MASTERS.jpeg' },
    { label: 'Reports & Analytics', src: '/REPORTS.jpeg' },
    { label: 'System Settings', src: '/SETTINGS.jpeg' },
  ];

  const [form, setForm] = useState(
    initial
      ? {
          firestoreId: initial.firestoreId || '',
          id: initial.id || '',
          title: initial.title || '',
          subtitle: initial.subtitle || initial.category || '',
          category: initial.category || initial.subtitle || '',
          image: initial.image || '',
          overview: initial.overview || initial.description || '',
          description: initial.description || initial.overview || '',
          status: initial.status || 'In Development',
          progress: initial.progress || '100%',
          technologiesText: Array.isArray(initial.technologies)
            ? initial.technologies.join(', ')
            : (initial.technologies || ''),
          modulesCount: initial.modulesCount || '7 Modules',
          pagesCount: initial.pagesCount || '40+ Pages',
          apisCount: initial.apisCount || '50+ APIs',
          tablesCount: initial.tablesCount || '20+ Tables',
          client: initial.client || '',
          year: initial.year || '2026',
          liveLink: initial.liveLink || '',
          featuresText: Array.isArray(initial.features)
            ? initial.features.join('\n')
            : (initial.features || ''),
        }
      : {
          title: '',
          subtitle: 'Enterprise ERP · Software Solution',
          category: 'Enterprise Solution',
          image: '/abijoe furniture.png',
          overview: '',
          description: '',
          status: 'In Development',
          progress: '70%',
          technologiesText: 'React.js, Python Flask, MySQL, Tailwind CSS',
          modulesCount: '7 Modules',
          pagesCount: '40+ Pages',
          apisCount: '50+ APIs',
          tablesCount: '20+ Tables',
          client: 'Client Project',
          year: '2026',
          liveLink: '',
          featuresText: '',
        }
  );

  const [screenshots, setScreenshots] = useState(
    initial && Array.isArray(initial.screenshots) && initial.screenshots.length > 0
      ? initial.screenshots
      : defaultScreenshots
  );

  const [uploadingImage, setUploadingImage] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // INSTANT Thumbnail Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // 1. INSTANT client-side preview via Canvas Base64 (<50ms)
      const dataUrl = await readAndCompressImage(file);
      set('image', dataUrl);

      // 2. Background upload to Firebase Storage
      const storageRef = ref(storage, `projects/${Date.now()}_${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((remoteUrl) => {
          set('image', remoteUrl);
        }).catch(() => {});
      }).catch(() => {});
    } catch (err) {
      console.error("Instant image reader error:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  // Screenshot Management Handlers
  const addScreenshot = () => {
    setScreenshots(prev => [...prev, { label: `Screenshot ${prev.length + 1}`, src: '' }]);
  };

  const removeScreenshot = (idx) => {
    setScreenshots(prev => prev.filter((_, i) => i !== idx));
  };

  const handleScreenshotLabelChange = (idx, value) => {
    setScreenshots(prev => prev.map((item, i) => i === idx ? { ...item, label: value } : item));
  };

  const handleScreenshotSrcChange = (idx, value) => {
    setScreenshots(prev => prev.map((item, i) => i === idx ? { ...item, src: value } : item));
  };

  const handleScreenshotUpload = async (idx, file) => {
    if (!file) return;
    try {
      const dataUrl = await readAndCompressImage(file);
      handleScreenshotSrcChange(idx, dataUrl);

      // Background upload to Firebase
      const storageRef = ref(storage, `projects/ss_${Date.now()}_${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((remoteUrl) => {
          handleScreenshotSrcChange(idx, remoteUrl);
        }).catch(() => {});
      }).catch(() => {});
    } catch (err) {
      console.error("Screenshot upload error:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) {
      alert("Please enter a project title");
      return;
    }

    const parsedTechs = form.technologiesText
      ? form.technologiesText.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const parsedFeatures = form.featuresText
      ? form.featuresText.split('\n').map(s => s.trim()).filter(Boolean)
      : [];

    const cleanScreenshots = screenshots.filter(s => s.src || s.label);

    const slug = form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `proj-${Date.now()}`;

    const payload = {
      ...(isEdit && initial.firestoreId ? { firestoreId: initial.firestoreId } : {}),
      id: initial?.id || slug,
      title: form.title,
      subtitle: form.subtitle || form.category,
      category: form.category || form.subtitle,
      image: form.image || '/abijoe furniture.png',
      overview: form.overview || form.description,
      description: form.description || form.overview,
      status: form.status,
      progress: form.progress,
      technologies: parsedTechs,
      modulesCount: form.modulesCount,
      pagesCount: form.pagesCount,
      apisCount: form.apisCount,
      tablesCount: form.tablesCount,
      client: form.client,
      year: form.year,
      liveLink: form.liveLink,
      features: parsedFeatures,
      screenshots: cleanScreenshots,
    };

    onSave(payload, isEdit);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl my-auto max-h-[90vh] overflow-y-auto bg-[#0b0717] border border-purple-500/30 rounded-2xl p-5 sm:p-7 text-white shadow-[0_10px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(157,0,255,0.25)]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Layers size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isEdit ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
              </h3>
              <p className="text-xs text-slate-400">All details entered here will reflect directly on the Portfolio page.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Project Title *
            </label>
            <input
              required
              type="text"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
              placeholder="e.g. ABIJOE FURNITURE ERP PROJECT"
            />
          </div>

          {/* Subtitle / Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Subtitle / Category Tag *
              </label>
              <input
                required
                type="text"
                value={form.subtitle}
                onChange={(e) => set('subtitle', e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                placeholder="e.g. Enterprise ERP · Furniture Industry"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Status *
              </label>
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value)}
                className="w-full bg-[#0d071b] border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
              >
                <option value="In Development">🚧 In Development</option>
                <option value="Completed">🚀 Completed</option>
                <option value="Published">🌟 Published</option>
                <option value="Draft">📝 Draft</option>
              </select>
            </div>
          </div>

          {/* Project Thumbnail Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Project Thumbnail Image
            </label>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => set('image', e.target.value)}
                  className="flex-1 bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                  placeholder="Image URL (e.g. /abijoe furniture.png or https://...)"
                />

                <label className="px-4 py-2.5 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 rounded-xl text-purple-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                  <Upload size={14} />
                  {uploadingImage ? 'Loading...' : 'Upload Image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {form.image && (
                <div className="relative h-28 w-full rounded-xl overflow-hidden border border-white/15 bg-black/40">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover object-top" />
                  <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-[10px] text-purple-300 font-semibold">
                    Preview
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Project Overview / Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Project Overview / Description *
            </label>
            <textarea
              required
              rows={3}
              value={form.overview}
              onChange={(e) => {
                set('overview', e.target.value);
                set('description', e.target.value);
              }}
              className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors resize-none"
              placeholder="Describe what the project does, key operations, and business value..."
            />
          </div>

          {/* Progress & Tech Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Development Progress
              </label>
              <input
                type="text"
                value={form.progress}
                onChange={(e) => set('progress', e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                placeholder="e.g. 70% or 100%"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Technologies Used (comma separated)
              </label>
              <input
                type="text"
                value={form.technologiesText}
                onChange={(e) => set('technologiesText', e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                placeholder="e.g. React.js, Python Flask, MySQL, Tailwind CSS"
              />
            </div>
          </div>

          {/* Key Metrics / Modules Chips */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Project Modules & Scale Counters
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <input
                type="text"
                value={form.modulesCount}
                onChange={(e) => set('modulesCount', e.target.value)}
                className="bg-white/5 border border-white/15 focus:border-purple-500 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                placeholder="e.g. 7 Modules"
              />
              <input
                type="text"
                value={form.pagesCount}
                onChange={(e) => set('pagesCount', e.target.value)}
                className="bg-white/5 border border-white/15 focus:border-purple-500 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                placeholder="e.g. 40+ Pages"
              />
              <input
                type="text"
                value={form.apisCount}
                onChange={(e) => set('apisCount', e.target.value)}
                className="bg-white/5 border border-white/15 focus:border-purple-500 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                placeholder="e.g. 50+ APIs"
              />
              <input
                type="text"
                value={form.tablesCount}
                onChange={(e) => set('tablesCount', e.target.value)}
                className="bg-white/5 border border-white/15 focus:border-purple-500 rounded-lg px-2.5 py-2 text-xs text-white outline-none"
                placeholder="e.g. 20+ Tables"
              />
            </div>
          </div>

          {/* Client, Year & Live Link */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Client Name
              </label>
              <input
                type="text"
                value={form.client}
                onChange={(e) => set('client', e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                placeholder="e.g. AbiJoe Furniture"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Year
              </label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => set('year', e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                placeholder="e.g. 2026"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Live Demo / Case Study Link
              </label>
              <input
                type="text"
                value={form.liveLink}
                onChange={(e) => set('liveLink', e.target.value)}
                className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
                placeholder="/portfolio/abijoefurniture-erp or URL"
              />
            </div>
          </div>

          {/* Key Features (One per line) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Key Features & Highlights (one per line)
            </label>
            <textarea
              rows={3}
              value={form.featuresText}
              onChange={(e) => set('featuresText', e.target.value)}
              className="w-full bg-white/5 border border-white/15 focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none transition-colors resize-y min-h-[80px]"
              placeholder="e.g. Multi-branch Billing & Invoicing Engine&#10;Real-time Inventory & Stock Tracking&#10;Staff Attendance & Payroll Automation"
            />
          </div>

          {/* Project Screenshots Gallery with Editable Titles */}
          <div className="space-y-3 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  UI Screenshots & Case Study Gallery
                </label>
                <p className="text-[11px] text-slate-400">
                  Add screenshots with editable titles (e.g. Dashboard Overview, Billing Engine).
                </p>
              </div>
              <button
                type="button"
                onClick={addScreenshot}
                className="px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 rounded-xl text-purple-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Plus size={14} /> Add Screenshot
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {screenshots.map((ss, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">
                      Screenshot #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeScreenshot(idx)}
                      className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      title="Remove Screenshot"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Screenshot Title</label>
                      <input
                        type="text"
                        value={ss.label || ''}
                        onChange={(e) => handleScreenshotLabelChange(idx, e.target.value)}
                        className="w-full bg-black/40 border border-white/15 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                        placeholder="Title (e.g. Dashboard Overview)"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">Image URL / Upload</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={ss.src || ''}
                          onChange={(e) => handleScreenshotSrcChange(idx, e.target.value)}
                          className="flex-1 bg-black/40 border border-white/15 focus:border-purple-500 rounded-lg px-3 py-2 text-xs text-white outline-none"
                          placeholder="Image URL or upload"
                        />
                        <label className="px-2.5 py-2 bg-purple-500/20 hover:bg-purple-500/40 border border-purple-500/30 rounded-lg text-purple-200 text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0 transition-colors">
                          <Upload size={12} />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleScreenshotUpload(idx, e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {ss.src && (
                    <div className="relative h-20 w-full rounded-lg overflow-hidden border border-white/10 bg-black/60">
                      <img src={ss.src} alt={ss.label || `Screenshot ${idx+1}`} className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-300 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving Project...' : (isEdit ? 'Save Project Changes' : 'Add Project')}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
