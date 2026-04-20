"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Globe } from "lucide-react";
import { IconGithub, IconLinkedin, IconInstagram, IconWhatsapp } from "@/components/ui/SocialIcons";

interface AlumniData {
  _id?: string;
  name: string;
  role: string;
  company: string;
  batch: string;
  image: string;
  imageTransform: { x: number; y: number; scale: number };
  socialLinks: { instagram?: string; linkedin?: string; email?: string };
  order: number;
}

const emptyAlumni: AlumniData = {
  name: "", role: "", company: "", batch: "", image: "", order: 0,
  imageTransform: { x: 0, y: 0, scale: 1 },
  socialLinks: { instagram: "", linkedin: "", email: "" },
};

export default function AdminAlumniPage() {
  const [alumni, setAlumni] = useState<AlumniData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<AlumniData>(emptyAlumni);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchAlumni(); }, []);

  async function fetchAlumni() {
    try {
      const res = await fetch("/api/alumni");
      if (res.ok) setAlumni(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    try {
      const url = editingAlumni._id ? `/api/alumni/${editingAlumni._id}` : "/api/alumni";
      const method = editingAlumni._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingAlumni) });
      if (res.ok) { await fetchAlumni(); setIsEditing(false); setEditingAlumni(emptyAlumni); }
    } catch (e) { console.error(e); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this alumni?")) return;
    try {
      const res = await fetch(`/api/alumni/${id}`, { method: "DELETE" });
      if (res.ok) await fetchAlumni();
    } catch (e) { console.error(e); }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-anton uppercase tracking-wider text-white">Alumni</h1>
          <p className="text-sm font-inter text-zinc-500">Manage alumni network</p>
        </div>
        <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={() => { setEditingAlumni(emptyAlumni); setIsEditing(true); }}>
          <Plus size={16} /> Add Alumni
        </button>
      </div>

      {isEditing && (
        <div className="bg-zinc-900 border-2 border-[var(--neon-yellow)] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-white uppercase">{editingAlumni._id ? "Edit Alumni" : "New Alumni"}</h3>
            <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Name</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.name} onChange={(e) => setEditingAlumni({ ...editingAlumni, name: e.target.value })} placeholder="Full name" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Batch Year</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.batch} onChange={(e) => setEditingAlumni({ ...editingAlumni, batch: e.target.value })} placeholder="e.g. 2023" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Natvansh Role</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.role} onChange={(e) => setEditingAlumni({ ...editingAlumni, role: e.target.value })} placeholder="e.g. Former President" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Current Company/Status</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.company} onChange={(e) => setEditingAlumni({ ...editingAlumni, company: e.target.value })} placeholder="e.g. SDE at Google" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Instagram URL</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.socialLinks?.instagram || ""} onChange={(e) => setEditingAlumni({ ...editingAlumni, socialLinks: { ...editingAlumni.socialLinks, instagram: e.target.value } })} placeholder="Instagram Link" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">LinkedIn URL</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.socialLinks?.linkedin || ""} onChange={(e) => setEditingAlumni({ ...editingAlumni, socialLinks: { ...editingAlumni.socialLinks, linkedin: e.target.value } })} placeholder="LinkedIn Link" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Email</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.socialLinks?.email || ""} onChange={(e) => setEditingAlumni({ ...editingAlumni, socialLinks: { ...editingAlumni.socialLinks, email: e.target.value } })} placeholder="Email Address" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Order</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" type="number" value={editingAlumni.order} onChange={(e) => setEditingAlumni({ ...editingAlumni, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Image URL (Bg-less)</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingAlumni.image} onChange={(e) => setEditingAlumni({ ...editingAlumni, image: e.target.value })} placeholder="Image URL" />
            </div>
          </div>
          
          {/* Image Transform Controls */}
          {editingAlumni.image && (
            <div className="bg-black border-2 border-zinc-800 p-4">
              <label className="block text-xs font-inter font-bold mb-4 text-[var(--neon-pink)] uppercase tracking-widest">Image Positioning</label>
              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">X Offset</span><span className="text-xs text-white">{editingAlumni.imageTransform?.x || 0}px</span></div>
                    <input type="range" min="-150" max="150" value={editingAlumni.imageTransform?.x || 0} onChange={(e) => setEditingAlumni({ ...editingAlumni, imageTransform: { ...(editingAlumni.imageTransform || {x:0, y:0, scale:1}), x: parseInt(e.target.value) } })} className="w-full accent-[var(--neon-yellow)]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">Y Offset</span><span className="text-xs text-white">{editingAlumni.imageTransform?.y || 0}px</span></div>
                    <input type="range" min="-150" max="150" value={editingAlumni.imageTransform?.y || 0} onChange={(e) => setEditingAlumni({ ...editingAlumni, imageTransform: { ...(editingAlumni.imageTransform || {x:0, y:0, scale:1}), y: parseInt(e.target.value) } })} className="w-full accent-[var(--neon-green)]" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1"><span className="text-xs font-inter font-bold text-zinc-500 uppercase">Zoom (Scale)</span><span className="text-xs text-white">{editingAlumni.imageTransform?.scale || 1}</span></div>
                    <input type="range" min="0.5" max="2" step="0.05" value={editingAlumni.imageTransform?.scale || 1} onChange={(e) => setEditingAlumni({ ...editingAlumni, imageTransform: { ...(editingAlumni.imageTransform || {x:0, y:0, scale:1}), scale: parseFloat(e.target.value) } })} className="w-full accent-[var(--neon-pink)]" />
                  </div>
                </div>
                
                {/* Preview Box */}
                <div className="relative h-48 w-48 mx-auto bg-zinc-900 border-2 border-zinc-700 overflow-hidden flex items-end justify-center rounded-[1rem]">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent z-20"></div>
                  <img 
                    src={editingAlumni.image} 
                    alt="Preview" 
                    className="relative z-10 w-full h-[90%] object-cover object-top drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]"
                    style={{ transform: `translate(${editingAlumni.imageTransform?.x || 0}px, ${editingAlumni.imageTransform?.y || 0}px) scale(${editingAlumni.imageTransform?.scale || 1})` }}
                  />
                  <div className="absolute bottom-2 left-0 right-0 text-center z-30">
                    <span className="text-xs font-anton text-white uppercase tracking-widest bg-black/50 px-2 py-1">Preview</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 font-anton text-sm uppercase text-zinc-400 border-2 border-zinc-700 hover:bg-zinc-800 transition-colors" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-inter">Loading...</div>
      ) : alumni.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 text-center py-12"><p className="text-zinc-500 font-inter">No alumni yet.</p></div>
      ) : (
        <div className="space-y-3">
          {alumni.map((alum) => (
            <div key={alum._id} className="bg-zinc-900 border-2 border-zinc-800 flex items-center gap-4 py-3 px-4 hover:border-[var(--neon-yellow)] transition-colors">
              {alum.image ? (
                <img src={alum.image} alt="" className="w-10 h-10 object-cover shrink-0 border border-zinc-700 filter grayscale" />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center text-sm font-bold text-black shrink-0 bg-[var(--neon-pink)] border-2 border-black">
                  {alum.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-inter font-bold text-sm text-white truncate">{alum.name} <span className="text-[10px] text-zinc-500 ml-2 border border-zinc-700 px-1">{alum.batch}</span></h4>
                <p className="text-xs text-zinc-500">{alum.role} {alum.company && <span className="text-[var(--neon-green)] px-1">|</span>} {alum.company}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {alum.socialLinks?.instagram && <a href={alum.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-1 text-zinc-500 hover:text-[var(--neon-pink)]"><IconInstagram size={14} /></a>}
                {alum.socialLinks?.linkedin && <a href={alum.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-1 text-zinc-500 hover:text-[var(--neon-cyan)]"><IconLinkedin size={14} /></a>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-zinc-500 hover:text-white transition-colors" onClick={() => { setEditingAlumni(alum); setIsEditing(true); }}><Pencil size={14} /></button>
                <button className="p-2 text-red-400 hover:text-red-300 transition-colors" onClick={() => alum._id && handleDelete(alum._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
