// Inline error message used by forms (login, GPT search)
const Alert = ({ children, className = "" }) => (
  <div
    role="alert"
    className={`flex items-start gap-2 rounded-md border border-primary/40 bg-primary/10 px-3.5 py-2.5 text-left text-sm text-red-200 ${className}`}
  >
    <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
    </svg>
    <span>{children}</span>
  </div>
);

export default Alert;
