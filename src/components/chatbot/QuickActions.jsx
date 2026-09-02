import "./QuickActions.css";
import { useState } from "react";

const actions = [
  { label: "Courses", emoji: "📚" },
  { label: "Services", emoji: "⚡" },
  { label: "Internship", emoji: "🎓" },
  { label: "Careers", emoji: "💼" },
  { label: "Contact", emoji: "📞" },
  { label: "About Us", emoji: "🏢" },
];

const nestedActions = {
  Courses: [
    { label: "Programming", emoji: "💻" },
    { label: "Analytics", emoji: "📊" },
    { label: "AI", emoji: "🤖" },
    { label: "Design", emoji: "🎨" },
    { label: "Marketing", emoji: "📣" },
  ],
  Programming: [
    { label: "Python", emoji: "🐍" },
    { label: "Java", emoji: "☕" },
    { label: "MERN", emoji: "🌐" },
    { label: "React", emoji: "⚛️" },
  ],
};

const QuickActions = ({ onSelect }) => {
  const [path, setPath] = useState([]);
  const currentKey = path[path.length - 1];
  const currentActions = currentKey ? nestedActions[currentKey] : actions;

  const handleAction = (label) => {
    if (nestedActions[label]) {
      setPath((currentPath) => [...currentPath, label]);
      return;
    }

    onSelect(label);
  };

  return (
    <div className="zx-quick-actions">
      {path.length > 0 && (
        <button
          type="button"
          className="zx-quick-btn"
          onClick={() => setPath((currentPath) => currentPath.slice(0, -1))}
        >
          <span className="zx-quick-emoji">⬅️</span>
          Back
        </button>
      )}

      {currentActions.map(({ label, emoji }) => (
        <button
          key={label}
          type="button"
          className="zx-quick-btn"
          onClick={() => handleAction(label)}
        >
          <span className="zx-quick-emoji">{emoji}</span>
          {label}
        </button>
      ))}
    </div>
  );
};

export default QuickActions;
