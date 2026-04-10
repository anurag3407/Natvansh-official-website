"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Globe } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/ui/SocialIcons";

interface DevData {
  _id?: string;
  name: string;
  role: string;
  image: string;
  github: string;
  linkedin: string;
  portfolio: string;
  order: number;
}

const emptyDev: DevData = {
  name: "",
  role: "",
  image: "",
  github: "",
  linkedin: "",
  portfolio: "",
  order: 0,
};

export default function AdminDevelopersPage() {
  const [devs, setDevs] = useState<DevData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingDev, setEditingDev] = useState<DevData>(emptyDev);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchDevs(); }, []);

  async function fetchDevs() {
    try {
      const res = await fetch("/api/developers");
      if (res.ok) setDevs(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleSave() {
    try {
      const url = editingDev._id ? `/api/developers/${editingDev._id}` : "/api/developers";
      const method = editingDev._id ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingDev) });
      if (res.ok) { await fetchDevs(); setIsEditing(false); setEditingDev(emptyDev); }
    } catch (e) { console.error(e); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this developer?")) return;
    try {
      const res = await fetch(`/api/developers/${id}`, { method: "DELETE" });
      if (res.ok) await fetchDevs();
    } catch (e) { console.error(e); }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Developers</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage developer profiles</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEditingDev(emptyDev); setIsEditing(true); }}>
          <Plus size={16} /> Add Developer
        </button>
      </div>

      {isEditing && (
        <div className="admin-card space-y-4" style={{ border: "1px solid var(--accent-purple)" }}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
              {editingDev._id ? "Edit Developer" : "New Developer"}
            </h3>
            <button onClick={() => setIsEditing(false)} style={{ color: "var(--text-muted)" }}><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Name</label>
              <input className="admin-input" value={editingDev.name} onChange={(e) => setEditingDev({ ...editingDev, name: e.target.value })} placeholder="Full name" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Role</label>
              <input className="admin-input" value={editingDev.role} onChange={(e) => setEditingDev({ ...editingDev, role: e.target.value })} placeholder="e.g. Full-Stack Developer" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>GitHub</label>
              <input className="admin-input" value={editingDev.github} onChange={(e) => setEditingDev({ ...editingDev, github: e.target.value })} placeholder="GitHub URL" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>LinkedIn</label>
              <input className="admin-input" value={editingDev.linkedin} onChange={(e) => setEditingDev({ ...editingDev, linkedin: e.target.value })} placeholder="LinkedIn URL" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Portfolio</label>
              <input className="admin-input" value={editingDev.portfolio} onChange={(e) => setEditingDev({ ...editingDev, portfolio: e.target.value })} placeholder="Portfolio URL" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Order</label>
              <input className="admin-input" type="number" value={editingDev.order} onChange={(e) => setEditingDev({ ...editingDev, order: parseInt(e.target.value) || 0 })} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="admin-btn admin-btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>Loading...</div>
      ) : devs.length === 0 ? (
        <div className="admin-card text-center py-12"><p style={{ color: "var(--text-muted)" }}>No developers yet.</p></div>
      ) : (
        <div className="space-y-3">
          {devs.map((dev) => (
            <div key={dev._id} className="admin-card flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: "var(--accent-gradient)" }}>
                {dev.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>{dev.name}</h4>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{dev.role}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {dev.github && <a href={dev.github} target="_blank" rel="noopener noreferrer" className="p-1" style={{ color: "var(--text-muted)" }}><IconGithub size={14} /></a>}
                {dev.linkedin && <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="p-1" style={{ color: "var(--text-muted)" }}><IconLinkedin size={14} /></a>}
                {dev.portfolio && <a href={dev.portfolio} target="_blank" rel="noopener noreferrer" className="p-1" style={{ color: "var(--text-muted)" }}><Globe size={14} /></a>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="p-2 rounded-lg hover:bg-[var(--bg-glass)]" style={{ color: "var(--text-muted)" }} onClick={() => { setEditingDev(dev); setIsEditing(true); }}><Pencil size={14} /></button>
                <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-400" onClick={() => dev._id && handleDelete(dev._id)}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
