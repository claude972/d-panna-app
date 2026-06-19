'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Newspaper } from 'lucide-react';

import type { BlogPost } from '@/types/lead';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        'glass-card group relative flex h-full flex-col overflow-hidden',
        'transition-all duration-500 ease-out',
        'hover:border-orange-500/40 hover:shadow-[0_0_40px_-12px_rgba(249,115,22,0.35)]',
        featured && 'md:col-span-2',
      )}
    >
      {/* Image / placeholder */}
      <div className="relative aspect-video w-full overflow-hidden">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={featured ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500/20 to-amber-500/10 transition-transform duration-700 ease-out group-hover:scale-105">
            <Newspaper
              className="h-12 w-12 text-orange-400/70"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        )}

        {/* Catégorie */}
        <span className="glass-card absolute left-4 top-4 px-3 py-1 text-xs uppercase tracking-widest text-orange-400">
          {post.category}
        </span>
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className={cn(
            'mb-3 font-bold text-white/90 line-clamp-2',
            featured ? 'text-2xl md:text-3xl' : 'text-xl',
          )}
        >
          {post.title}
        </h3>

        <p className="mb-6 text-sm text-stone-400 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <time
            dateTime={post.date}
            className="text-xs uppercase tracking-widest text-stone-500"
          >
            {formatDate(post.date)}
          </time>
          <ArrowUpRight
            className="h-5 w-5 text-orange-400 transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
