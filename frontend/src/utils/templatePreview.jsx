export const templatePreviewStyles = {
  atlas: {
    accent: 'bg-teal-700',
    layout: 'grid-cols-[0.35fr_1fr]',
    rows: [9, 13],
    label: 'Two-column technical',
  },
  signal: {
    accent: 'bg-sky-700',
    layout: 'grid-cols-1',
    rows: [15],
    label: 'Single-column signal',
  },
  executive: {
    accent: 'bg-zinc-900',
    layout: 'grid-cols-[1fr_0.32fr]',
    rows: [12, 8],
    label: 'Executive sidebar',
  },
  compact: {
    accent: 'bg-amber-700',
    layout: 'grid-cols-1',
    rows: [20],
    label: 'Compact ATS',
  },
};

export function TemplateMiniature({ templateId, compact = false }) {
  const preview = templatePreviewStyles[templateId] || templatePreviewStyles.atlas;
  return (
    <div className={`${compact ? 'h-40' : 'h-72'} rounded-md bg-white p-5`}>
      <div className={`h-6 w-3/4 rounded-sm ${preview.accent}`} />
      <div className="mt-2 h-3 w-1/2 rounded-sm bg-slate-300" />
      <div className={`mt-6 grid ${preview.layout} gap-4`}>
        {preview.rows.map((count, column) => (
          <div key={column} className="space-y-2">
            {Array.from({ length: compact ? Math.min(count, 7) : count }).map((_, index) => (
              <div key={index} className={`h-2 rounded-sm ${index % 4 === 0 ? preview.accent : 'bg-slate-300'}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
