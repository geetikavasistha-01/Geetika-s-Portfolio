import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../lib/api';
import PageWrapper from '../components/layout/PageWrapper';
import SectionHeader from '../components/ui/SectionHeader';
import { AMAEntry } from '../types';
import { MessageSquare, HelpCircle, Loader2 } from 'lucide-react';

const defaultAmas: AMAEntry[] = [
  {
    question: "do you actually enjoy working on climate tech, or is it just another way to get funding?",
    askedBy: 'ANONYMOUS',
    answer: "Honestly? A bit of both, but mostly because the engineering problems are incredibly real. In climate tech, if your ML model hallucinated a 10% reduction in emissions, that is not a minor bug — it translates to actual policy failure and wasted resources. It's high-stakes, which keeps the work engaging.",
    pinned: true,
    answered: true,
    date: '2026-07-24T00:00:00.000Z'
  },
  {
    question: "why robots though? that seems like such a random pivot from pure data science.",
    askedBy: 'ANONYMOUS',
    answer: "It was totally organic. We started in the SRM Incubator labs wanting to solve a very dirty, hazardous problem: pipeline inspection. Pure software is nice, but when you have to write low-latency computer vision that runs on an embedded chip on a physical, vibrating robot claw, the constraints force you to be a much better system designer.",
    pinned: true,
    answered: true,
    date: '2026-07-22T00:00:00.000Z'
  },
  {
    question: "do you actually enjoy the AI hype or are you just along for the ride?",
    askedBy: 'ANONYMOUS',
    answer: "The hype is exhausting, to be real. Sorting through a hundred wrapper startups isn't fun. But the core engineering — compiling models to run efficiently on small devices, building deterministic pipelines out of probabilistic LLMs — that stuff is a blast. I ignore the hype cycle and focus on the systems side.",
    pinned: true,
    answered: true,
    date: '2026-07-19T00:00:00.000Z'
  },
  {
    question: "how many hours of sleep did you get while building this portfolio?",
    askedBy: 'ANONYMOUS',
    answer: "Let's just say my Last.fm activity logs are the only things keeping regular hours. Between tweaking custom shaders, writing Go rate limiters, and finding the perfect vintage postcards aesthetic, sleep was definitely secondary. Worth it, though.",
    pinned: true,
    answered: true,
    date: '2026-07-14T00:00:00.000Z'
  },
  {
    question: "what is the most overrated tool in the modern data stack?",
    askedBy: 'ANONYMOUS',
    answer: "Heavyweight orchestrators for simple scripts. I've seen teams spin up complex Kubernetes structures for tasks that could literally be a cron job and a clean Python script. Keep it simple until it actually breaks.",
    pinned: true,
    answered: true,
    date: '2026-07-09T00:00:00.000Z'
  }
];

const askSchema = z.object({
  question: z.string().min(10, 'Question must be at least 10 characters long.').max(500, 'Keep it concise (max 500 characters).'),
  askedBy: z.string().max(50, 'Name too long.').optional()
});

type AskFormValues = z.infer<typeof askSchema>;

export default function AMA() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AskFormValues>({
    resolver: zodResolver(askSchema)
  });

  const { data: amas } = useQuery<AMAEntry[]>({
    queryKey: ['amas-full'],
    queryFn: async () => {
      try {
        const res = await api.get('/ama');
        return res.data;
      } catch {
        return defaultAmas;
      }
    },
    initialData: defaultAmas
  });

  const askMutation = useMutation({
    mutationFn: async (values: AskFormValues) => {
      const res = await api.post('/ama/ask', {
        question: values.question,
        askedBy: values.askedBy || 'ANONYMOUS'
      });
      return res.data;
    },
    onSuccess: () => {
      alert('Question submitted to the admin queue!');
      reset();
      queryClient.invalidateQueries({ queryKey: ['amas-full'] });
    },
    onError: (err: any) => {
      alert(err.response?.data?.message || 'Failed to submit question. Rate limit might be active.');
    }
  });

  const onSubmit = (data: AskFormValues) => {
    askMutation.mutate(data);
  };

  return (
    <PageWrapper>
      {/* Page Header */}
      <div className="flex flex-col mb-12 select-none">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-text3 uppercase">
          <span>QUESTIONS</span>
          <span>{amas.length} answered</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-display font-normal text-text1 mt-6">
          Ask me anything.
        </h1>
        <p className="text-sm italic font-display text-text3 mt-4 max-w-[540px] leading-relaxed">
          Stray queries, engineering details, career routes, or philosophical inquiries. Pinned answers below.
        </p>
      </div>

      {/* Ask Question Form */}
      <SectionHeader label="submit a question" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4 mt-2"
      >
        <div className="flex flex-col">
          <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1">
            Question
          </label>
          <textarea
            {...register('question')}
            rows={3}
            placeholder="Type your question here (minimum 10 characters)..."
            className="w-full bg-surface2 border border-border rounded-lg p-3 text-xs text-text2 placeholder-text4 outline-none resize-none focus:border-text3 transition-colors"
          />
          {errors.question && (
            <span className="text-[10px] text-rose mt-1 font-mono">{errors.question.message}</span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col w-full sm:w-1/2">
            <label className="text-[10px] font-mono tracking-wider text-text3 uppercase mb-1">
              Asked By
            </label>
            <input
              type="text"
              {...register('askedBy')}
              placeholder="ANONYMOUS (optional)"
              className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs text-text2 placeholder-text4 outline-none focus:border-text3 transition-colors"
            />
            {errors.askedBy && (
              <span className="text-[10px] text-rose mt-1 font-mono">{errors.askedBy.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={askMutation.isPending}
            className="self-end inline-flex items-center gap-2 bg-text1 text-bg rounded-full px-5 py-2 text-xs font-semibold tracking-wider hover:bg-text2 transition-all select-none disabled:opacity-50"
          >
            {askMutation.isPending ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <MessageSquare size={12} />
            )}
            SUBMIT QUESTION
          </button>
        </div>
      </form>

      {/* Answered Questions */}
      <SectionHeader label="answered queue" />
      <div className="flex flex-col gap-12 mt-8 w-full">
        {amas.map((item, idx) => (
          <div key={item._id || idx} className="flex flex-col items-start border-l border-border/40 pl-6 w-full">
            <div className="flex items-center gap-2 mb-2 text-[9px] font-mono text-text3 uppercase">
              <HelpCircle size={10} />
              <span>Question Nº{idx + 1}</span>
            </div>
            <h4 className="text-base sm:text-lg italic font-display text-text1 leading-relaxed">
              "{item.question}"
            </h4>
            <span className="text-[9px] tracking-widest text-text3 font-semibold font-mono uppercase mt-2">
              — {item.askedBy || 'ANONYMOUS'}
            </span>
            <p className="text-xs sm:text-sm text-text2 leading-relaxed mt-4">
              {item.answer}
            </p>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
