'use client';
import { useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { FontFamily, FontSize, TextStyle } from '@tiptap/extension-text-style';

type Props = {
  value: string;
  onChange: (html: string) => void;
  onError: (message: string) => void;
};

// These must stay in step with the styles the server allows in lib/blog/sanitize.ts.
const FONTS = [
  { label: 'Default', value: '' },
  { label: 'Serif', value: 'Georgia, serif' },
  { label: 'Sans-serif', value: 'Arial, Helvetica, sans-serif' },
  { label: 'Typewriter', value: 'Courier New, monospace' },
];

const SIZES = [
  { label: 'Normal', value: '' },
  { label: 'Small', value: '14px' },
  { label: 'Large', value: '20px' },
  { label: 'Larger', value: '24px' },
  { label: 'Largest', value: '32px' },
];

const ALIGNMENTS = [
  { label: 'Align left', value: 'left', lines: [3, 15, 3, 11] },
  { label: 'Align center', value: 'center', lines: [3, 15, 6, 12] },
  { label: 'Align right', value: 'right', lines: [3, 15, 7, 15] },
  { label: 'Justify', value: 'justify', lines: [3, 15, 3, 15] },
] as const;

function AlignIcon({ lines }: { lines: readonly number[] }) {
  // Four horizontal bars; `lines` holds the start and end x of the long and short bars.
  const [a1, a2, b1, b2] = lines;
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d={`M${a1} 4h${a2 - a1}M${b1} 8h${b2 - b1}M${a1} 12h${a2 - a1}M${b1} 16h${b2 - b1}`} />
    </svg>
  );
}

function ToolbarButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`h-9 min-w-9 px-2 inline-flex items-center justify-center rounded-md text-sm font-bold transition-colors ${active ? 'bg-[#0D47A1] text-white' : 'text-[#334155] hover:bg-[#e2e8f0]'}`}
    >
      {children}
    </button>
  );
}

const Divider = () => <span className="mx-1 h-5 w-px bg-[#cbd5e1]" />;

const selectClass = 'h-9 rounded-md border border-[#cbd5e1] bg-white px-2 text-sm font-semibold text-[#334155] focus:border-[#0D47A1] focus:outline-none';

function Toolbar({ editor, onError }: { editor: Editor; onError: (m: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      const textStyle = e.getAttributes('textStyle') as { fontFamily?: string; fontSize?: string };
      return {
        bold: e.isActive('bold'),
        italic: e.isActive('italic'),
        underline: e.isActive('underline'),
        strike: e.isActive('strike'),
        h2: e.isActive('heading', { level: 2 }),
        h3: e.isActive('heading', { level: 3 }),
        bullet: e.isActive('bulletList'),
        ordered: e.isActive('orderedList'),
        quote: e.isActive('blockquote'),
        link: e.isActive('link'),
        align: ALIGNMENTS.find((a) => e.isActive({ textAlign: a.value }))?.value ?? 'left',
        fontFamily: FONTS.find((f) => f.value && f.value === textStyle.fontFamily)?.value ?? '',
        fontSize: SIZES.find((s) => s.value && s.value === textStyle.fontSize)?.value ?? '',
      };
    },
  });

  function setLink() {
    const previous = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Link address (starts with https://)', previous ?? 'https://');
    if (url === null) return;
    if (url.trim() === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    if (!/^(https?:\/\/|mailto:)/i.test(url.trim())) {
      onError('Links must start with https://');
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run();
  }

  function setFont(value: string) {
    const chain = editor.chain().focus();
    (value ? chain.setFontFamily(value) : chain.unsetFontFamily()).run();
  }

  function setSize(value: string) {
    const chain = editor.chain().focus();
    (value ? chain.setFontSize(value) : chain.unsetFontSize()).run();
  }

  async function upload(file: File) {
    setUploading(true);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Upload failed.');
      const alt = window.prompt('Describe this image for people using screen readers (optional)', '') ?? '';
      editor.chain().focus().setImage({ src: data.url, alt }).run();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-[#e2e8f0] bg-[#f8fafc] px-2 py-1.5 rounded-t-lg">
      <select aria-label="Font style" className={selectClass} value={state.fontFamily} onChange={(e) => setFont(e.target.value)}>
        {FONTS.map((f) => <option key={f.label} value={f.value}>{f.label}</option>)}
      </select>
      <select aria-label="Font size" className={selectClass} value={state.fontSize} onChange={(e) => setSize(e.target.value)}>
        {SIZES.map((s) => <option key={s.label} value={s.value}>{s.label}</option>)}
      </select>
      <Divider />
      <ToolbarButton label="Bold" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
      <ToolbarButton label="Italic" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}><span className="italic">I</span></ToolbarButton>
      <ToolbarButton label="Underline" active={state.underline} onClick={() => editor.chain().focus().toggleUnderline().run()}><span className="underline">U</span></ToolbarButton>
      <ToolbarButton label="Strikethrough" active={state.strike} onClick={() => editor.chain().focus().toggleStrike().run()}><span className="line-through">S</span></ToolbarButton>
      <Divider />
      {ALIGNMENTS.map((a) => (
        <ToolbarButton key={a.value} label={a.label} active={state.align === a.value} onClick={() => editor.chain().focus().setTextAlign(a.value).run()}>
          <AlignIcon lines={a.lines} />
        </ToolbarButton>
      ))}
      <Divider />
      <ToolbarButton label="Heading" active={state.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
      <ToolbarButton label="Sub-heading" active={state.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
      <Divider />
      <ToolbarButton label="Bulleted list" active={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
      <ToolbarButton label="Numbered list" active={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
      <ToolbarButton label="Quote" active={state.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>“ ”</ToolbarButton>
      <Divider />
      <ToolbarButton label="Add or edit link" active={state.link} onClick={setLink}>Link</ToolbarButton>
      <ToolbarButton label="Insert image" onClick={() => fileRef.current?.click()}>{uploading ? 'Uploading…' : 'Image'}</ToolbarButton>
      <Divider />
      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>↶</ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>↷</ToolbarButton>
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />
    </div>
  );
}

export default function RichTextEditor({ value, onChange, onError }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: { openOnClick: false, autolink: true } }),
      Image,
      TextStyle,
      FontFamily,
      FontSize,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'blog-content min-h-[380px] px-5 py-4 outline-none', 'aria-label': 'Post body' },
    },
    onUpdate: ({ editor: e }) => onChange(e.getHTML()),
  });

  if (!editor) return <div className="min-h-[430px] rounded-lg border border-[#cbd5e1] bg-white" />;

  return (
    <div className="rounded-lg border border-[#cbd5e1] bg-white focus-within:border-[#0D47A1] focus-within:ring-2 focus-within:ring-[#0D47A1]/15">
      <Toolbar editor={editor} onError={onError} />
      <EditorContent editor={editor} />
    </div>
  );
}
