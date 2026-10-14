'use client';
import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import PostPreview from './PostPreview';
import { dangerButton, inputClass, Notice, primaryButton, secondaryButton } from './FormBits';
import { deletePost, previewContent, savePost, submitForReview } from '@/app/admin/actions';

type Props = {
  post?: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    cover_image: string | null;
    content: string;
    status: string;
    review_note: string | null;
  };
  /** True when the signed-in person wrote this post (or is starting a new one). */
  isAuthor: boolean;
  /** Shown as the author in the preview. */
  authorName: string;
};

const CATEGORIES = ['Practice', 'AI & Automation', 'Omnichannel', 'Analytics', 'Product', 'Company News'];

export default function PostEditor({ post, isAuthor, authorName }: Props) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? '');
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? '');
  const [category, setCategory] = useState(post?.category ?? '');
  const [cover, setCover] = useState(post?.cover_image ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const [error, setError] = useState('');
  const [saved, setSaved] = useState('');
  const [coverBusy, setCoverBusy] = useState(false);
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewing, setPreviewing] = useState(false);
  const [pending, startTransition] = useTransition();
  const coverRef = useRef<HTMLInputElement>(null);

  const published = post?.status === 'published';

  async function persist(): Promise<number | null> {
    const result = await savePost({ id: post?.id, title, excerpt, category, coverImage: cover, content });
    if (!result.ok) {
      setError(result.error);
      return null;
    }
    return result.id ?? post?.id ?? null;
  }

  function onSave() {
    setError('');
    setSaved('');
    startTransition(async () => {
      const id = await persist();
      if (id === null) return;
      setSaved('Saved.');
      if (!post) router.replace(`/admin/posts/${id}`);
      else router.refresh();
    });
  }

  function onSubmit() {
    setError('');
    setSaved('');
    startTransition(async () => {
      const id = await persist();
      if (id === null) return;
      const result = await submitForReview(id);
      if (!result.ok) {
        setError(result.error);
        if (!post) router.replace(`/admin/posts/${id}`);
        return;
      }
      router.push('/admin');
    });
  }

  function onDelete() {
    if (!post || !window.confirm('Delete this post? This cannot be undone.')) return;
    startTransition(async () => {
      const result = await deletePost(post.id);
      if (!result.ok) setError(result.error);
      else router.push('/admin');
    });
  }

  async function showPreview() {
    setError('');
    setPreviewing(true);
    try {
      setPreviewHtml(await previewContent(content));
      setTab('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError('Could not build the preview. Please try again.');
    } finally {
      setPreviewing(false);
    }
  }

  async function uploadCover(file: File) {
    setCoverBusy(true);
    setError('');
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error ?? 'Upload failed.');
      setCover(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.');
    } finally {
      setCoverBusy(false);
      if (coverRef.current) coverRef.current.value = '';
    }
  }

  return (
    <div className="space-y-6">
      {post?.status === 'changes_requested' && post.review_note && (
        <Notice tone="info">
          <strong className="block mb-1">Changes requested by the approver</strong>
          {post.review_note}
        </Notice>
      )}
      {published && <Notice tone="info">This post is live. Saving changes updates it on the website straight away.</Notice>}
      {error && <Notice tone="error">{error}</Notice>}
      {saved && <Notice tone="success">{saved}</Notice>}

      <div role="tablist" aria-label="Editor view" className="inline-flex rounded-lg border border-[#cbd5e1] bg-white p-1">
        <button type="button" role="tab" aria-selected={tab === 'edit'} onClick={() => setTab('edit')}
          className={`rounded-md px-4 py-1.5 text-sm font-bold transition-colors ${tab === 'edit' ? 'bg-[#0D47A1] text-white' : 'text-[#475569] hover:bg-[#f1f5f9]'}`}>
          Edit
        </button>
        <button type="button" role="tab" aria-selected={tab === 'preview'} onClick={showPreview} disabled={previewing}
          className={`rounded-md px-4 py-1.5 text-sm font-bold transition-colors ${tab === 'preview' ? 'bg-[#0D47A1] text-white' : 'text-[#475569] hover:bg-[#f1f5f9]'}`}>
          {previewing ? 'Loading…' : 'Preview'}
        </button>
      </div>

      {tab === 'preview' && (
        <div>
          <p className="text-sm text-[#64748b] mb-5">This is how your post will look on the website. Go back to <strong>Edit</strong> to make changes.</p>
          <PostPreview title={title} excerpt={excerpt} category={category} cover={cover} authorName={authorName} html={previewHtml} />
        </div>
      )}

      {/* The editor stays mounted (just hidden) so nothing is lost when switching tabs. */}
      <div className={`space-y-6 ${tab === 'preview' ? 'hidden' : ''}`}>
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Title</label>
        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} className={`${inputClass} text-[20px]`} placeholder="A clear, specific headline" />
      </div>

      <div className="grid grid-cols-[1fr_260px] gap-6 max-[800px]:grid-cols-1">
        <div>
          <label htmlFor="excerpt" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Short summary</label>
          <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} maxLength={400} rows={3} className={inputClass} placeholder="One or two sentences shown on the blog page and when the post is shared." />
          <div className="mt-1 text-xs text-[#94a3b8]">{excerpt.length}/400</div>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-[#0f172a] mb-1.5">Category</label>
          <input id="category" list="categories" value={category} onChange={(e) => setCategory(e.target.value)} maxLength={60} className={inputClass} placeholder="e.g. Analytics" />
          <datalist id="categories">{CATEGORIES.map((c) => <option key={c} value={c} />)}</datalist>
        </div>
      </div>

      <div>
        <div className="block text-sm font-semibold text-[#0f172a] mb-1.5">Cover image</div>
        {cover ? (
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt="Cover preview" className="h-32 w-56 rounded-lg object-cover border border-[#e2e8f0]" />
            <div className="flex flex-col gap-2">
              <button type="button" className={secondaryButton} onClick={() => coverRef.current?.click()} disabled={coverBusy}>Replace</button>
              <button type="button" className={secondaryButton} onClick={() => setCover('')}>Remove</button>
            </div>
          </div>
        ) : (
          <button type="button" className={secondaryButton} onClick={() => coverRef.current?.click()} disabled={coverBusy}>
            {coverBusy ? 'Uploading…' : 'Upload cover image'}
          </button>
        )}
        <p className="mt-2 text-xs text-[#94a3b8]">JPG, PNG, WebP or GIF, under 4 MB. A wide image works best.</p>
        <input
          ref={coverRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadCover(file);
          }}
        />
      </div>

      <div>
        <div className="block text-sm font-semibold text-[#0f172a] mb-1.5">Post</div>
        <RichTextEditor value={content} onChange={setContent} onError={setError} />
      </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button type="button" onClick={onSave} disabled={pending} className={isAuthor && !published ? secondaryButton : primaryButton}>
          {pending ? 'Working…' : published || !isAuthor ? 'Save changes' : 'Save draft'}
        </button>
        {isAuthor && !published && (
          <button type="button" onClick={onSubmit} disabled={pending} className={primaryButton}>
            Submit for review
          </button>
        )}
        {post && (
          <button type="button" onClick={onDelete} disabled={pending} className={`${dangerButton} ml-auto`}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
