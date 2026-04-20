"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface ProfessorData {
  _id?: string;
  name: string;
  designation: string;
  department: string;
  message: string;
  image: string;
  isCurrent: boolean;
  order: number;
}

const emptyProf: ProfessorData = {
  name: "", designation: "", department: "", message: "", image: "", isCurrent: true, order: 0,
};

export default function AdminProfessorsPage() {
  const [profs, setProfs] = useState<ProfessorData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProf, setEditingProf] = useState<ProfessorData>(emptyProf);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProfs(); }, []);

  async function fetchProfs() {
    try {
      const res = await fetch("/api/professors");
      if (res.ok) setProfs(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    try {
      const url = editingProf._id ? `/api/professors/${editingProf._id}` : "/api/professors";
      const method = editingProf._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingProf) });
      if (res.ok) { await fetchProfs(); setIsEditing(false); setEditingProf(emptyProf); }
    } catch (e) { console.error(e); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this professor?")) return;
    try {
      const res = await fetch(`/api/professors/${id}`, { method: "DELETE" });
      if (res.ok) await fetchProfs();
    } catch (e) { console.error(e); }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-anton uppercase tracking-wider text-white">Professors</h1>
          <p className="text-sm font-inter text-zinc-500">Manage current and past professor incharges</p>
        </div>
        <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-green)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={() => { setEditingProf(emptyProf); setIsEditing(true); }}>
          <Plus size={16} /> Add Professor
        </button>
      </div>

      {isEditing && (
        <div className="bg-zinc-900 border-2 border-[var(--neon-green)] p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-anton text-lg text-white uppercase">{editingProf._id ? "Edit Professor" : "New Professor"}</h3>
            <button onClick={() => setIsEditing(false)} className="text-zinc-500 hover:text-white"><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Name</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingProf.name} onChange={(e) => setEditingProf({ ...editingProf, name: e.target.value })} placeholder="Prof. Name" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Designation</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingProf.designation} onChange={(e) => setEditingProf({ ...editingProf, designation: e.target.value })} placeholder="e.g. Professor In-Charge, Natvansh" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Department</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingProf.department} onChange={(e) => setEditingProf({ ...editingProf, department: e.target.value })} placeholder="e.g. Dept of Humanities" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Message / Quote</label>
              <textarea rows={3} className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingProf.message} onChange={(e) => setEditingProf({ ...editingProf, message: e.target.value })} placeholder="Quote text..." />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Image URL</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingProf.image} onChange={(e) => setEditingProf({ ...editingProf, image: e.target.value })} placeholder="Image URL" />
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Is Current?</label>
              <select className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" value={editingProf.isCurrent ? "true" : "false"} onChange={(e) => setEditingProf({ ...editingProf, isCurrent: e.target.value === "true" })}>
                <option value="true">Yes</option>
                <option value="false">No (Past Professor)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-inter font-bold mb-1 text-zinc-500 uppercase">Order</label>
              <input className="w-full bg-black border-2 border-zinc-700 text-white px-3 py-2 font-inter focus:border-[var(--neon-yellow)] outline-none" type="number" value={editingProf.order} onChange={(e) => setEditingProf({ ...editingProf, order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button className="px-4 py-2 font-anton text-sm uppercase text-zinc-400 border-2 border-zinc-700 hover:bg-zinc-800 transition-colors" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="px-4 py-2 font-anton text-sm uppercase bg-[var(--neon-yellow)] text-black border-2 border-black shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform flex items-center gap-2" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-zinc-500 font-inter">Loading...</div>
      ) : profs.length === 0 ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 text-center py-12"><p className="text-zinc-500 font-inter">No professors yet.</p></div>
      ) : (
        <div className="space-y-3">
          {profs.map((prof) => (
            <div key={prof._id} className="bg-zinc-900 border-2 border-zinc-800 flex items-center gap-4 py-3 px-4 hover:border-[var(--neon-green)] transition-colors">
              {prof.image ? (
                <img src={prof.image} alt="" className="w-12 h-12 object-cover shrink-0 border border-zinc-700 grayscale" />
              ) : (
                <div className="w-12 h-12 flex items-center justify-center text-sm font-bold text-black shrink-0 bg-[var(--neon-yellow)] border-2 border-black">
                  {prof.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-inter font-bold text-sm text-white flex items-center gap-2">
                  {prof.name} 
                  {prof.isCurrent ? (
                    <span className="text-[8px] bg-[var(--neon-green)] text-black px-1.5 py-0.5 uppercase font-anton tracking-widest">Current</span>
                  ) : (
                    <span className="text-[8px] bg-zinc-600 text-white px-1.5 py-0.5 uppercase font-anton tracking-widest">Past</span>
                  )}
                </h4>
                <p className="text-xs text-zinc-500">{prof.designation}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 text-zinc-500 hover:text-white transition-colors" onClick={() => { setEditingProf(prof); setIsEditing(true); }}><Pencil size={14} /></button>
                <button className="p-2 text-red-400 hover:text-red-300 transition-colors" onClick={() => prof._id && handleDelete(prof._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
