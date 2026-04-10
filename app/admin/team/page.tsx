"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Image as ImageIcon } from "lucide-react";

interface MemberData {
  _id?: string;
  name: string;
  role: string;
  position: string;
  image: string;
  socialLinks: { instagram?: string; linkedin?: string; email?: string };
  year: string;
  order: number;
}

const emptyMember: MemberData = {
  name: "",
  role: "",
  position: "Post Bearer",
  image: "",
  socialLinks: { instagram: "", linkedin: "", email: "" },
  year: "",
  order: 0,
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberData>(emptyMember);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/team");
      if (res.ok) setMembers(await res.json());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const url = editingMember._id ? `/api/team/${editingMember._id}` : "/api/team";
      const method = editingMember._id ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingMember),
      });
      if (res.ok) {
        await fetchMembers();
        setIsEditing(false);
        setEditingMember(emptyMember);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      if (res.ok) await fetchMembers();
    } catch (e) {
      console.error(e);
    }
  }

  const grouped = {
    "Post Bearer": members.filter((m) => m.position === "Post Bearer"),
    Creative: members.filter((m) => m.position === "Creative"),
    Technical: members.filter((m) => m.position === "Technical"),
    Management: members.filter((m) => m.position === "Management"),
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Team</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>Manage team members and post bearers</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => { setEditingMember(emptyMember); setIsEditing(true); }}>
          <Plus size={16} /> Add Member
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="admin-card space-y-4" style={{ border: "1px solid var(--accent-purple)" }}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
              {editingMember._id ? "Edit Member" : "New Member"}
            </h3>
            <button onClick={() => setIsEditing(false)} style={{ color: "var(--text-muted)" }}>
              <X size={18} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Name</label>
              <input className="admin-input" value={editingMember.name} onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })} placeholder="Full name" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Role</label>
              <input className="admin-input" value={editingMember.role} onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })} placeholder="e.g. President, Head of Direction" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Position</label>
              <select className="admin-input" value={editingMember.position} onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}>
                <option value="Post Bearer">Post Bearer</option>
                <option value="Creative">Creative</option>
                <option value="Technical">Technical</option>
                <option value="Management">Management</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Year</label>
              <input className="admin-input" value={editingMember.year} onChange={(e) => setEditingMember({ ...editingMember, year: e.target.value })} placeholder="e.g. 2025" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Order</label>
              <input className="admin-input" type="number" value={editingMember.order} onChange={(e) => setEditingMember({ ...editingMember, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Image URL</label>
              <input className="admin-input" value={editingMember.image} onChange={(e) => setEditingMember({ ...editingMember, image: e.target.value })} placeholder="Image URL" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Instagram</label>
              <input className="admin-input" value={editingMember.socialLinks.instagram || ""} onChange={(e) => setEditingMember({ ...editingMember, socialLinks: { ...editingMember.socialLinks, instagram: e.target.value } })} placeholder="@handle" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>LinkedIn</label>
              <input className="admin-input" value={editingMember.socialLinks.linkedin || ""} onChange={(e) => setEditingMember({ ...editingMember, socialLinks: { ...editingMember.socialLinks, linkedin: e.target.value } })} placeholder="LinkedIn URL" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Email</label>
              <input className="admin-input" value={editingMember.socialLinks.email || ""} onChange={(e) => setEditingMember({ ...editingMember, socialLinks: { ...editingMember.socialLinks, email: e.target.value } })} placeholder="email@example.com" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button className="admin-btn admin-btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}><Save size={14} /> Save</button>
          </div>
        </div>
      )}

      {/* Members List by Group */}
      {loading ? (
        <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>Loading...</div>
      ) : members.length === 0 ? (
        <div className="admin-card text-center py-12"><p style={{ color: "var(--text-muted)" }}>No team members yet.</p></div>
      ) : (
        Object.entries(grouped).map(([position, members]) =>
          members.length > 0 ? (
            <div key={position}>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--accent-purple)" }}>{position}</h3>
              <div className="space-y-2">
                {members.map((m) => (
                  <div key={m._id} className="admin-card flex items-center gap-4 py-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: "var(--accent-gradient)" }}>
                      {m.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>{m.name}</h4>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{m.role}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button className="p-2 rounded-lg hover:bg-[var(--bg-glass)]" style={{ color: "var(--text-muted)" }} onClick={() => { setEditingMember(m); setIsEditing(true); }}>
                        <Pencil size={14} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-400" onClick={() => m._id && handleDelete(m._id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        )
      )}
    </div>
  );
}
