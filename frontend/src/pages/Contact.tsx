import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import { Send, Loader2, ArrowRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.')
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const sendMutation = useMutation({
    mutationFn: async (values: ContactFormValues) => {
      const res = await api.post('/contact', values);
      return res.data;
    },
    onSuccess: () => {
      // Trigger canvas-confetti blast
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      setIsSubmitted(true);
      reset();
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to send message.');
    }
  });

  const onSubmit = (data: ContactFormValues) => {
    sendMutation.mutate(data);
  };

  return (
    <PageWrapper>
      {/* 1. Main Get in Touch Header */}
      <div className="flex flex-col mb-10 select-none">
        <h1 className="text-4xl sm:text-5xl font-display font-normal text-text1 leading-tight">
          Get in Touch
        </h1>
        <p className="text-sm text-text3 mt-4 max-w-[620px] leading-relaxed">
          Let’s build something purposeful together. Whether you have a project in
          mind or just want to connect, I’d love to hear from you.
        </p>
      </div>

      {/* 2. Two-Column Contact & Connect Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 items-start mt-4">
        {/* Left Column: Send a Message Form */}
        <div className="w-full bg-surface border border-border rounded-[24px] p-6 shadow-sm flex flex-col select-none">
          <h2 className="text-2xl font-display font-normal text-text1 mb-6">
            Send a Message
          </h2>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-surface2/30 rounded-2xl border border-border/50">
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center text-teal mb-4 border border-teal/20">
                <Check size={20} />
              </div>
              <h3 className="text-base font-semibold text-text1">Message Sent!</h3>
              <p className="text-xs text-text3 mt-1.5 max-w-[200px] leading-normal">
                Thank you for reaching out. I will get back to you shortly.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-5 text-xs font-semibold text-teal hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4.5">
              {/* Name */}
              <div className="flex flex-col">
                <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="John Doe"
                  className="bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-xs text-text2 placeholder-text4 outline-none focus:border-teal focus:bg-surface2/60 transition-all duration-300"
                />
                {errors.name && (
                  <span className="text-[10px] text-rose mt-1 font-mono">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                  className="bg-surface2/40 border border-border/60 rounded-xl px-4 py-2.5 text-xs text-text2 placeholder-text4 outline-none focus:border-teal focus:bg-surface2/60 transition-all duration-300"
                />
                {errors.email && (
                  <span className="text-[10px] text-rose mt-1 font-mono">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1.5">
                  Your Message
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Tell me about your project or just say hello!"
                  className="bg-surface2/40 border border-border/60 rounded-xl p-4 text-xs text-text2 placeholder-text4 outline-none resize-none focus:border-teal focus:bg-surface2/60 transition-all duration-300 leading-relaxed"
                />
                {errors.message && (
                  <span className="text-[10px] text-rose mt-1 font-mono">
                    {errors.message.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={sendMutation.isPending}
                className="mt-2 w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-violet-600/10 disabled:opacity-50 select-none uppercase"
              >
                {sendMutation.isPending ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Send size={12} />
                )}
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Connect Info Panels */}
        <div className="flex flex-col gap-8 select-none">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-display font-normal text-text1">
              Connect
            </h2>
            <p className="text-xs sm:text-sm text-text2 leading-relaxed">
              I’m always open to discussing new projects, creative ideas, or
              opportunities to be part of your vision.
            </p>
            <p className="text-xs sm:text-sm text-text2">
              Based in <span className="font-semibold text-text1">India</span>, but working with clients worldwide.
            </p>
          </div>

          {/* Socials & Scheduling list */}
          <div className="flex flex-col gap-5 pt-2">
            {/* Email Row */}
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-widest text-text4 uppercase mb-1">
                Email
              </span>
              <a
                href="mailto:mishrayashaswikumar@gmail.com"
                className="text-xs sm:text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:underline font-medium break-all"
              >
                mishrayashaswikumar@gmail.com
              </a>
            </div>

            {/* Follow Me Row */}
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-widest text-text4 uppercase mb-2">
                Follow Me
              </span>
              <div className="flex items-center gap-4 text-xs font-medium text-text2">
                <a
                  href="https://github.com/geetikavasistha-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text1 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text1 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://linkedin.com/in/geetikavasisthampy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text1 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Quick Meeting Row */}
            <div className="flex flex-col">
              <span className="text-[9px] font-mono tracking-widest text-text4 uppercase mb-1">
                Quick Meeting
              </span>
              <div className="flex items-center">
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 hover:underline font-medium"
                >
                  Schedule a call
                </a>
                <span className="ml-2.5 text-[8px] font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider select-none animate-pulse">
                  Book now
                </span>
              </div>
            </div>
          </div>

          {/* Quote Card */}
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm mt-2">
            <p className="text-xs text-text3 italic leading-relaxed">
              &ldquo;The best way to predict the future is to invent it.&rdquo;
            </p>
            <p className="text-[10px] font-mono text-text4 mt-2 text-right">
              &mdash; Alan Kay
            </p>
          </div>
        </div>
      </div>

      {/* 3. Substack Newsletter CTA */}
      <div className="mt-16 w-full">
        <div className="relative overflow-hidden rounded-[24px] border border-border/80 bg-surface/50 p-6 md:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Decorative subtle ambient glow inside card */}
          <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-teal/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -bottom-24 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-2 z-10 max-w-lg select-none">
            <h3 className="text-xl sm:text-2xl font-display font-normal text-text1">
              Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-text3 leading-relaxed">
              I share occasional articles on software engineering, AI, web development, and lessons from building real products. Subscribe on Substack to get new posts delivered to your inbox.
            </p>
          </div>

          <div className="z-10 flex flex-col items-center md:items-start flex-shrink-0">
            <a
              href="https://substack.com/@augustine1301"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe to my Substack newsletter"
              className="inline-flex items-center gap-2 bg-text1 hover:bg-text2 text-bg px-5 py-3 rounded-xl text-xs font-semibold transition-all duration-300 shadow-md group"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22.536 9.879H1.464V6.202h21.072v3.677zm0-6.202H1.464V0h21.072v3.677zM1.464 13.555h21.072v10.445L12 18.273 1.464 24V13.555z" />
              </svg>
              <span>Subscribe on Substack</span>
              <ArrowRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
            </a>
            <span className="text-[10px] text-text4 mt-2 select-none">
              Free to subscribe. No spam. Unsubscribe anytime.
            </span>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
