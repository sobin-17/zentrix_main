import React, { useMemo, useState } from "react";
import {
  Search,
  Mail,
  Phone,
  User,
  Calendar,
  Trash2,
  MessageSquare,
} from "lucide-react";

const ContactMessagesManager = ({ messages = [], onDelete }) => {
  const [search, setSearch] = useState("");

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const value = search.toLowerCase();

      return (
        (msg.name || "").toLowerCase().includes(value) ||
        (msg.email || "").toLowerCase().includes(value) ||
        (msg.phone || "").toLowerCase().includes(value) ||
        (msg.message || "").toLowerCase().includes(value)
      );
    });
  }, [messages, search]);

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleString();
    } catch {
      return date;
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
                      <User size={16} className="text-purple-400" />
                      <span className="text-white">
                        {msg.name || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-blue-400" />
                      <span className="text-gray-300">
                        {msg.email || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-green-400" />
                      <span className="text-gray-300">
                        {msg.phone || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 max-w-sm">
                    <div className="flex gap-2">
                      <MessageSquare
                        size={16}
                        className="text-yellow-400 mt-1"
                      />

                      <p className="text-gray-300 whitespace-pre-wrap break-words">
                        {msg.message || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${msg.status === "New"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-zinc-700 text-gray-300"
                        }`}
                    >
                      {msg.status || "New"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={16} />
                      {formatDate(msg.createdAt)}
                    </div>
                  </td>

                  <td className="p-4 text-center">
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
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactMessagesManager;