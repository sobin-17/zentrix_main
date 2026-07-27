import React, { useMemo, useState } from "react";
import {
  Search,
  Mail,
  Phone,
  User,
  Calendar,
  Trash2,
  MessageSquare,
  Eye,
  X,
} from "lucide-react";

const ContactMessagesManager = ({ messages = [], onDelete }) => {
  const [search, setSearch] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  const getTimestamp = (msg) => {
    const raw = msg.createdAt || msg.submittedAt || msg.date || msg.timestamp;
    if (!raw) return 0;
    if (typeof raw === 'object' && raw.seconds) {
      return raw.seconds * 1000;
    }
    const parsed = new Date(raw).getTime();
    return isNaN(parsed) ? 0 : parsed;
  };

  const filteredMessages = useMemo(() => {
    const filtered = messages.filter((msg) => {
      const value = search.toLowerCase();

      return (
        (msg.name || "").toLowerCase().includes(value) ||
        (msg.email || "").toLowerCase().includes(value) ||
        (msg.phone || "").toLowerCase().includes(value) ||
        (msg.message || "").toLowerCase().includes(value)
      );
    });

    return filtered.sort((a, b) => getTimestamp(b) - getTimestamp(a));
  }, [messages, search]);

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      if (typeof date === 'object' && date.seconds) {
        return new Date(date.seconds * 1000).toLocaleString();
      }
      const d = new Date(date);
      if (isNaN(d.getTime())) return String(date);
      return d.toLocaleString();
    } catch {
      return String(date);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Contact Messages
          </h2>

          <p className="text-gray-400 mt-1">
            Total Messages : {messages.length}
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="min-w-full text-sm">
          <thead className="bg-zinc-900">
            <tr className="text-left text-gray-300">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredMessages.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-10 text-center text-gray-500"
                >
                  No Contact Messages Found
                </td>
              </tr>
            ) : (
              filteredMessages.map((msg) => (
                <tr
                  key={msg.firestoreId}
                  className="border-t border-zinc-800 hover:bg-zinc-900/40 transition"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-purple-400 shrink-0" />
                      <span className="text-white">
                        {msg.name || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-400 shrink-0" />
                      <span className="text-gray-300">
                        {msg.email || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-green-400 shrink-0" />
                      <span className="text-gray-300">
                        {msg.phone || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 max-w-[220px]">
                    <div className="flex items-start gap-2">
                      <MessageSquare
                        size={16}
                        className="text-yellow-400 mt-0.5 shrink-0"
                      />
                      <p className="text-gray-300 text-xs break-all line-clamp-2">
                        {msg.message || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        msg.status === "New"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-zinc-700 text-gray-300"
                      }`}
                    >
                      {msg.status || "New"}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-gray-300 text-xs">
                      <Calendar size={16} className="shrink-0" />
                      {formatDate(
                        msg.createdAt ||
                          msg.submittedAt ||
                          msg.date ||
                          msg.timestamp
                      )}
                    </div>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedMessage(msg)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-medium transition"
                        title="View Full Message Details"
                      >
                        <Eye size={14} />
                        View
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Delete this contact message?"
                            )
                          ) {
                            onDelete(msg.firestoreId);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white text-xs font-medium transition"
                        title="Delete Message"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for View Details */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <h3 className="text-lg font-semibold">Contact Message Details</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Name</p>
                  <p className="font-medium text-white mt-1">{selectedMessage.name || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Phone</p>
                  <p className="font-medium text-purple-300 mt-1">{selectedMessage.phone || "-"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Email</p>
                  <p className="font-medium text-blue-400 mt-1">{selectedMessage.email || "-"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Submitted Date</p>
                  <p className="text-gray-300 text-xs mt-1">
                    {formatDate(
                      selectedMessage.createdAt ||
                        selectedMessage.submittedAt ||
                        selectedMessage.date ||
                        selectedMessage.timestamp
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider">Status</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-600/20 text-green-400">
                    {selectedMessage.status || "New"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 font-semibold">
                  Full Message
                </p>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 max-h-60 overflow-y-auto text-gray-200 text-sm whitespace-pre-wrap break-all leading-relaxed">
                  {selectedMessage.message || "No message content provided."}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => {
                  if (window.confirm("Delete this contact message?")) {
                    onDelete(selectedMessage.firestoreId);
                    setSelectedMessage(null);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Trash2 size={14} />
                Delete
              </button>
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessagesManager;