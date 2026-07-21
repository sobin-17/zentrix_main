import "./QuickActions.css";

const actions = [
  { label: "Courses", emoji: "📚" },
  { label: "Services", emoji: "⚡" },
  { label: "Internship", emoji: "🎓" },
  { label: "Careers", emoji: "💼" },
  { label: "Contact", emoji: "📞" },
  { label: "About Us", emoji: "🏢" },
];

const QuickActions = ({ onSelect }) => (
  <div className="zx-quick-actions">
    {actions.map(({ label, emoji }) => (
      <button
        key={label}
        className="zx-quick-btn"
        onClick={() => onSelect(label)}
      >
        <span className="zx-quick-emoji">{emoji}</span>
        {label}
      </button>
    ))}
  </div>
);

export default QuickActions;
