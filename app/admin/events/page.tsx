"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, Star, Image as ImageIcon } from "lucide-react";

interface EventData {
  _id?: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  category: string;
  images: string[];
  featured: boolean;
}

const emptyEvent: EventData = {
  title: "",
  description: "",
  date: "",
  venue: "",
  category: "Drama",
  images: [],
  featured: false,
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventData>(emptyEvent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (e) {
      console.error("Failed to fetch events:", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      const url = editingEvent._id
        ? `/api/events/${editingEvent._id}`
        : "/api/events";
      const method = editingEvent._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEvent),
      });

      if (res.ok) {
        await fetchEvents();
        setIsEditing(false);
        setEditingEvent(emptyEvent);
      }
    } catch (e) {
      console.error("Save failed:", e);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      const res = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchEvents();
      }
    } catch (e) {
      console.error("Delete failed:", e);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setEditingEvent({
          ...editingEvent,
          images: [...editingEvent.images, data.url],
        });
      }
    } catch (e) {
      console.error("Upload failed:", e);
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Events
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Manage drama festivals, workshops, and competitions
          </p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            setEditingEvent(emptyEvent);
            setIsEditing(true);
          }}
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="admin-card space-y-4" style={{ border: "1px solid var(--accent-purple)" }}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ color: "var(--text-primary)" }}>
              {editingEvent._id ? "Edit Event" : "New Event"}
            </h3>
            <button onClick={() => setIsEditing(false)} className="p-1 rounded" style={{ color: "var(--text-muted)" }}>
              <X size={18} />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Title</label>
              <input
                className="admin-input"
                value={editingEvent.title}
                onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                placeholder="Event title"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Date</label>
              <input
                className="admin-input"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                placeholder="e.g. March 15-17, 2025"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Venue</label>
              <input
                className="admin-input"
                value={editingEvent.venue}
                onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                placeholder="Event venue"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Category</label>
              <select
                className="admin-input"
                value={editingEvent.category}
                onChange={(e) => setEditingEvent({ ...editingEvent, category: e.target.value })}
              >
                <option value="Drama">Drama</option>
                <option value="Film">Film</option>
                <option value="Workshop">Workshop</option>
                <option value="Competition">Competition</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-muted)" }}>Description</label>
            <textarea
              className="admin-input"
              rows={4}
              value={editingEvent.description}
              onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
              placeholder="Event description..."
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={editingEvent.featured}
                onChange={(e) => setEditingEvent({ ...editingEvent, featured: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>Featured Event</span>
            </label>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Images</label>
            <div className="flex flex-wrap gap-2">
              {editingEvent.images.map((img, i) => (
                <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs"
                    onClick={() => setEditingEvent({
                      ...editingEvent,
                      images: editingEvent.images.filter((_, idx) => idx !== i),
                    })}
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-[var(--accent-purple)]" style={{ border: "2px dashed var(--border-color)", color: "var(--text-muted)" }}>
                <ImageIcon size={20} />
                <span className="text-[10px] mt-1">Upload</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button className="admin-btn admin-btn-ghost" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
            <button className="admin-btn admin-btn-primary" onClick={handleSave}>
              <Save size={14} /> Save
            </button>
          </div>
        </div>
      )}

      {/* Events List */}
      {loading ? (
        <div className="text-center py-12" style={{ color: "var(--text-muted)" }}>Loading events...</div>
      ) : events.length === 0 ? (
        <div className="admin-card text-center py-12">
          <p style={{ color: "var(--text-muted)" }}>No events yet. Add your first event!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div key={event._id} className="admin-card flex items-center gap-4">
              {event.images[0] ? (
                <img src={event.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "var(--bg-glass)", border: "1px solid var(--border-color)" }}>
                  <ImageIcon size={20} style={{ color: "var(--text-muted)" }} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                    {event.title}
                  </h4>
                  {event.featured && <Star size={14} fill="var(--accent-pink)" style={{ color: "var(--accent-pink)" }} />}
                </div>
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
                  {event.date} · {event.venue}
                </p>
              </div>
              <span
                className="px-2 py-1 rounded-full text-xs shrink-0"
                style={{ background: "var(--bg-glass)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}
              >
                {event.category}
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  className="p-2 rounded-lg hover:bg-[var(--bg-glass)] transition-colors"
                  style={{ color: "var(--text-muted)" }}
                  onClick={() => { setEditingEvent(event); setIsEditing(true); }}
                >
                  <Pencil size={14} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-red-400"
                  onClick={() => event._id && handleDelete(event._id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
