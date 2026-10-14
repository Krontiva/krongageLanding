'use client';
import { useRef, useState } from 'react';
import { EditorContent, useEditor, useEditorState, type Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

type Props = {
  value: string;
  onChange: (html: string) => void;
  onError: (message: string) => void;
};

function ToolbarButton({ label, active, onClick, children }: { label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`h-9 min-w-9 px-2 rounded-md text-sm font-bold transition-colors ${active ? 'bg-[#0D47A1] text-white' : 'text-[#334155] hover:bg-[#e2e8f0]'}`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor, onError }: { editor: Editor; onError: (m: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
      link: e.isActive('link'),
    }),
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
      <ToolbarButton label="Bold" active={state.bold} onClick={() => editor.chain().focus().toggleBold().run()}>B</ToolbarButton>
      <ToolbarButton label="Italic" active={state.italic} onClick={() => editor.chain().focus().toggleItalic().run()}><span className="italic">I</span></ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[#cbd5e1]" />
      <ToolbarButton label="Heading" active={state.h2} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</ToolbarButton>
      <ToolbarButton label="Sub-heading" active={state.h3} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[#cbd5e1]" />
      <ToolbarButton label="Bulleted list" active={state.bullet} onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</ToolbarButton>
      <ToolbarButton label="Numbered list" active={state.ordered} onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</ToolbarButton>
      <ToolbarButton label="Quote" active={state.quote} onClick={() => editor.chain().focus().toggleBlockquote().run()}>“ ”</ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[#cbd5e1]" />
      <ToolbarButton label="Add or edit link" active={state.link} onClick={setLink}>Link</ToolbarButton>
      <ToolbarButton label="Insert image" onClick={() => fileRef.current?.click()}>{uploading ? 'Uploading…' : 'Image'}</ToolbarButton>
      <span className="mx-1 h-5 w-px bg-[#cbd5e1]" />
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
