'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

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
        'card-bold group relative flex h-full flex-col overflow-hidden rounded-2xl',
        'transition-transform duration-300 ease-out hover:-translate-y-0.5',
        featured && 'md:col-span-2',
      )}
    >
      {/* Image / placeholder */}
      <div className="relative w-full overflow-hidden h-[90px] bg-blue-tint flex items-center justify-center">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes={featured ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'}
            className="object-cover"
          />
        ) : (
          <ImageIcon
            className="h-8 w-8 text-blue"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-1 flex-col p-5">
        {/* Badge catégorie */}
        <span className="mb-3 self-start font-display font-extrabold text-[11px] rounded-lg px-2.5 py-1 bg-blue-tint text-blue-dark uppercase tracking-[0.14em]">
          {post.category}
        </span>

        <h3
          className={cn(
            'mb-3 font-display font-extrabold text-ink line-clamp-2',
            featured ? 'text-2xl md:text-3xl' : 'text-lg',
          )}
        >
          {post.title}
        </h3>

        <p className="mb-6 text-sm text-muted line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <time
            dateTime={post.date}
            className="text-xs text-muted"
          >
            {formatDate(post.date)}
          </time>
        </div>
      </div>
    </Link>
  );
}
