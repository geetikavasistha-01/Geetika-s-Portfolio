import React, { useState } from 'react';
import { PostEmbedItem } from '../../data/humanData';
import { Heart, MessageCircle, Share, Award } from 'lucide-react';

export default function PostEmbed({ post }: { post: PostEmbedItem }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const toggleLike = () => {
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    setIsLiked(!isLiked);
  };

  const isLong = post.content.split('\n').length > 5 || post.content.length > 200;
  const displayedContent = isLong && !showMore 
    ? post.content.split('\n').slice(0, 4).join('\n') + '...'
    : post.content;

  return (
    <div className="w-full bg-surface border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.avatar}
            alt={post.name}
            className="w-10 h-10 rounded-full object-cover border border-border/60"
            loading="lazy"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xs font-body font-bold text-text1">
                {post.name}
              </span>
              {post.isVerified && (
                <Award size={13} className="text-accent fill-accent" />
              )}
            </div>
            <span className="text-[10px] text-text3 font-body">
              @{post.handle} · Follow
            </span>
          </div>
        </div>
        <span className="text-xs text-text3 uppercase font-mono tracking-widest text-[9px]">
          micro post
        </span>
      </div>

      {/* Content */}
      <div className="text-xs sm:text-sm text-text2 leading-relaxed whitespace-pre-line font-body mb-3 pl-1 select-text">
        {displayedContent}
        {isLong && (
          <button 
            onClick={() => setShowMore(!showMore)} 
            className="text-accent font-semibold hover:underline block mt-1 focus:outline-none"
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Timestamp */}
      <div className="text-[10px] text-text4 font-body mb-3 border-b border-border/30 pb-3 pl-1">
        {post.timestamp}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-xs text-text3 pt-1 select-none">
        <button 
          onClick={toggleLike}
          className={`flex items-center gap-1.5 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500 font-bold' : ''}`}
        >
          <Heart size={14} className={isLiked ? 'fill-red-500' : ''} />
          <span>{likes}</span>
        </button>
        <div className="flex items-center gap-1.5 hover:text-accent cursor-pointer transition-colors">
          <MessageCircle size={14} />
          <span>{post.replies} Reply</span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-accent cursor-pointer transition-colors">
          <Share size={14} />
          <span>Copy link</span>
        </div>
      </div>
    </div>
  );
}
