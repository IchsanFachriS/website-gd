// ============================================================
// Reusable UI Components
// ============================================================

import type { WPPost, WPMedia, TribeEvent, WPUser } from "../../types/wordpress";
import { getFeaturedImageUrl, getExcerpt, formatEventDate } from "../../utils/api";

// ---- SKELETON LOADER ----
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white/10 animate-pulse rounded ${className}`}
      role="status"
      aria-label="Memuat..."
    />
  );
}

export function PostCardSkeleton() {
  return (
    <div className="bg-[#111d30] rounded-lg overflow-hidden">
      <Skeleton className="h-48 rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
    </div>
  );
}

// ---- BADGE ----
export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "gold" | "outline";
}) {
  const variants = {
    default: "bg-white/10 text-gray-300",
    gold: "bg-[#c8922a]/20 text-[#c8922a] border border-[#c8922a]/30",
    outline: "border border-white/20 text-gray-300",
  };
  return (
    <span
      className={`inline-block text-xs uppercase tracking-widest px-2.5 py-1 rounded-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}

// ---- POST CARD ----
export function PostCard({ post }: { post: WPPost }) {
  const imageUrl = getFeaturedImageUrl(post, "medium");
  const excerpt = getExcerpt(post, 120);
  const date = new Date(post.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const category = post._embedded?.["wp:term"]?.[0]?.[0];

  return (
    <article className="group bg-[#111d30] rounded-lg overflow-hidden hover:bg-[#162238] transition-colors duration-300 flex flex-col">
      {/* Image */}
      <a href={post.link} target="_blank" rel="noreferrer" className="block overflow-hidden relative">
        <div className="h-48 bg-[#0d1a2d]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.title.rendered}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-12 h-12 text-white/10" fill="none">
                <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" />
                <line x1="20" y1="6" x2="20" y2="34" stroke="currentColor" strokeWidth="1" />
                <line x1="6" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          )}
        </div>
      </a>

      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-2 mb-3">
          {category && <Badge variant="gold">{category.name}</Badge>}
          <span className="text-gray-500 text-xs ml-auto">{date}</span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#c8922a] transition-colors">
          <a
            href={post.link}
            target="_blank"
            rel="noreferrer"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </h3>

        {/* Excerpt */}
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 flex-1">{excerpt}</p>

        {/* Read more */}
        <a
          href={post.link}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-[#c8922a] text-xs font-semibold uppercase tracking-widest hover:gap-3 transition-all"
        >
          Baca Selengkapnya
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </article>
  );
}

// ---- EVENT CARD ----
export function EventCard({ event }: { event: TribeEvent }) {
  const startDate = new Date(event.start_date);
  const day = startDate.getDate();
  const month = startDate.toLocaleDateString("id-ID", { month: "short" });
  const formatted = formatEventDate(event);

  return (
    <article className="group flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0">
      {/* Date block */}
      <div className="flex-shrink-0 w-14 h-14 bg-[#c8922a]/10 border border-[#c8922a]/20 rounded flex flex-col items-center justify-center">
        <span className="text-[#c8922a] text-xl font-bold leading-none">{day}</span>
        <span className="text-[#c8922a] text-xs uppercase tracking-widest">{month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#c8922a] transition-colors mb-1">
          <a href={event.url} target="_blank" rel="noreferrer">
            {event.title}
          </a>
        </h3>
        <p className="text-gray-400 text-xs">{formatted}</p>
        {event.venue && typeof event.venue !== "boolean" && (
          <p className="text-gray-500 text-xs mt-0.5 flex items-center gap-1">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.venue.venue}
          </p>
        )}
      </div>
    </article>
  );
}

// ---- MEDIA CARD (Gallery) ----
export function MediaCard({
  media,
  onClick,
}: {
  media: WPMedia;
  onClick?: () => void;
}) {
  const thumbUrl = media.media_details?.sizes?.medium?.source_url || media.source_url;

  return (
    <button
      onClick={onClick}
      className="group block w-full text-left overflow-hidden rounded-lg bg-[#111d30] focus:outline-none focus:ring-2 focus:ring-[#c8922a]"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={thumbUrl}
          alt={media.alt_text || media.title.rendered}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </button>
  );
}

// ---- USER CARD ----
export function UserCard({ user }: { user: WPUser }) {
  return (
    <div className="bg-[#111d30] rounded-lg p-5 flex flex-col items-center text-center group hover:bg-[#162238] transition-colors">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-[#c8922a]/30 group-hover:border-[#c8922a] transition-colors">
        <img
          src={user.avatar_urls["96"]}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-white font-semibold text-sm mb-1">{user.name}</h3>
      {user.description && (
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
          {user.description}
        </p>
      )}
    </div>
  );
}

// ---- ERROR STATE ----
export function ErrorState({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}

// ---- EMPTY STATE ----
export function EmptyState({ message = "Belum ada konten" }: { message?: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  );
}

// ---- SECTION WRAPPER ----
export function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={`py-20 ${dark ? "bg-[#07101f]" : "bg-[#0c1829]"} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {(title || subtitle) && (
          <div className="mb-12">
            {subtitle && (
              <p className="text-[#c8922a] text-xs font-bold uppercase tracking-widest mb-2">
                {subtitle}
              </p>
            )}
            {title && (
              <h2 className="text-white text-3xl font-bold">{title}</h2>
            )}
            <div className="mt-3 w-12 h-0.5 bg-[#c8922a]" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// ---- PAGINATION ----
export function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 rounded hover:border-white/30 transition-colors"
      >
        ‹ Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`w-9 h-9 text-xs rounded transition-colors ${
            p === page
              ? "bg-[#c8922a] text-white font-bold"
              : "text-gray-400 hover:text-white border border-white/10 hover:border-white/30"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 rounded hover:border-white/30 transition-colors"
      >
        Next ›
      </button>
    </div>
  );
}
