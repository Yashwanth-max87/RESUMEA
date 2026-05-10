import { DndContext, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ImagePlus, Plus, Trash2 } from 'lucide-react';

function SortableSection({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition }} className="flex items-center gap-2 rounded-md border border-line bg-ink/50 px-3 py-2 text-sm text-slate-200">
      <button className="text-slate-500" {...attributes} {...listeners} title="Drag section"><GripVertical size={16} /></button>
      {id}
    </div>
  );
}

function TextListEditor({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="section-title">{label}</span>
      <textarea className="field mt-2 min-h-24" value={value.join('\n')} onChange={(event) => onChange(event.target.value.split('\n').filter(Boolean))} />
    </label>
  );
}

export default function BuilderSidebar({ resume, setResume }) {
  const sensors = useSensors(useSensor(PointerSensor));
  const updateBasics = (key, value) => setResume((current) => ({ ...current, basics: { ...current.basics, [key]: value } }));
  const updateTheme = (key, value) => setResume((current) => ({ ...current, theme: { ...current.theme, [key]: value } }));

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setResume((current) => {
      const oldIndex = current.sectionsOrder.indexOf(active.id);
      const newIndex = current.sectionsOrder.indexOf(over.id);
      return { ...current, sectionsOrder: arrayMove(current.sectionsOrder, oldIndex, newIndex) };
    });
  };

  const addSkill = () => setResume((current) => ({ ...current, skills: [...current.skills, 'New Skill'] }));

  return (
    <aside className="no-print h-[calc(100vh-65px)] overflow-y-auto border-r border-line bg-panel/90 p-4 scrollbar-thin lg:w-[390px]">
      <div className="mb-5">
        <p className="section-title">Editor</p>
        <h2 className="mt-1 text-xl font-bold">Resume workspace</h2>
      </div>
      <div className="space-y-4">
        <section className="rounded-md border border-line bg-panel2 p-4">
          <h3 className="mb-3 font-semibold">Basics</h3>
          <div className="grid gap-3">
            {['name', 'headline', 'email', 'phone', 'location', 'website'].map((field) => (
              <label key={field} className="block">
                <span className="section-title">{field}</span>
                <input className="field mt-1" value={resume.basics[field]} onChange={(event) => updateBasics(field, event.target.value)} />
              </label>
            ))}
            <label className="btn-secondary cursor-pointer">
              <ImagePlus size={16} /> Upload profile image
              <input className="hidden" type="file" accept="image/*" onChange={(event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => updateBasics('image', reader.result);
                reader.readAsDataURL(file);
              }} />
            </label>
          </div>
        </section>

        <section className="rounded-md border border-line bg-panel2 p-4">
          <h3 className="mb-3 font-semibold">Summary</h3>
          <textarea className="field min-h-28" value={resume.summary} onChange={(event) => setResume((current) => ({ ...current, summary: event.target.value }))} />
        </section>

        <section className="rounded-md border border-line bg-panel2 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">Skills</h3>
            <button className="icon-btn" title="Add skill" onClick={addSkill}><Plus size={16} /></button>
          </div>
          <div className="space-y-2">
            {resume.skills.map((skill, index) => (
              <div className="flex gap-2" key={`${skill}-${index}`}>
                <input className="field" value={skill} onChange={(event) => setResume((current) => ({ ...current, skills: current.skills.map((item, skillIndex) => skillIndex === index ? event.target.value : item) }))} />
                <button className="icon-btn" title="Remove skill" onClick={() => setResume((current) => ({ ...current, skills: current.skills.filter((_, skillIndex) => skillIndex !== index) }))}><Trash2 size={15} /></button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-line bg-panel2 p-4">
          <h3 className="mb-3 font-semibold">Content lists</h3>
          <div className="space-y-3">
            <TextListEditor label="Languages" value={resume.languages} onChange={(value) => setResume((current) => ({ ...current, languages: value }))} />
            <TextListEditor label="Certifications" value={resume.certifications} onChange={(value) => setResume((current) => ({ ...current, certifications: value }))} />
            <TextListEditor label="Interests" value={resume.interests} onChange={(value) => setResume((current) => ({ ...current, interests: value }))} />
            <TextListEditor label="Awards" value={resume.awards} onChange={(value) => setResume((current) => ({ ...current, awards: value }))} />
            <TextListEditor label="Publications" value={resume.publications} onChange={(value) => setResume((current) => ({ ...current, publications: value }))} />
            <TextListEditor label="Volunteer" value={resume.volunteer} onChange={(value) => setResume((current) => ({ ...current, volunteer: value }))} />
          </div>
        </section>

        <section className="rounded-md border border-line bg-panel2 p-4">
          <h3 className="mb-3 font-semibold">Template customization</h3>
          <div className="grid gap-3">
            <label>
              <span className="section-title">Accent color</span>
              <input className="mt-2 h-10 w-full rounded-md border border-line bg-panel p-1" type="color" value={resume.theme.color} onChange={(event) => updateTheme('color', event.target.value)} />
            </label>
            <label>
              <span className="section-title">Font</span>
              <select className="field mt-2" value={resume.theme.font} onChange={(event) => updateTheme('font', event.target.value)}>
                <option>Inter</option>
                <option>Georgia</option>
                <option>Arial</option>
              </select>
            </label>
            <label className="flex items-center justify-between rounded-md border border-line bg-ink/50 px-3 py-2">
              <span className="text-sm text-slate-200">ATS-friendly density</span>
              <input type="checkbox" checked={resume.theme.density === 'ats'} onChange={(event) => updateTheme('density', event.target.checked ? 'ats' : 'visual')} />
            </label>
          </div>
        </section>

        <section className="rounded-md border border-line bg-panel2 p-4">
          <h3 className="mb-3 font-semibold">Drag section order</h3>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={resume.sectionsOrder} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {resume.sectionsOrder.map((section) => <SortableSection key={section} id={section} />)}
              </div>
            </SortableContext>
          </DndContext>
        </section>
      </div>
    </aside>
  );
}

