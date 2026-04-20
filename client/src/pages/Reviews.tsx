/*
 * Reviews — Neon Circuit Design
 * Customer reviews, video proof, interface screenshots
 */
import { motion } from "framer-motion";
import { Star, Video, Image as ImageIcon, User, Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  product: "FUSION AI" | "Windows Optimization" | "Jitter Script";
  type: "text" | "video" | "screenshot" | "interface";
  mediaUrl?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Raïjan",
    date: "02/27/2026",
    rating: 5,
    title: "Honestly, congratulations, great job",
    content: "You can be proud of yourself. I'll spread the word.",
    product: "FUSION AI",
    type: "text",
  },
  {
    id: "2",
    author: "Apex Player",
    date: "March 2026",
    rating: 5,
    title: "30 kills, 5383 damage - Incredible performance",
    content: "The results speak for themselves. With FUSION AI, I've reached stats never seen before. Precision and responsiveness are exceptional.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/rjKjyrtBmgFNrGGO.png",
  },
  {
    id: "3",
    author: "FUSION AI Interface",
    date: "Dashboard",
    rating: 5,
    title: "Dashboard Interface - Real-time monitoring",
    content: "FPS: 262, Latency: 3.4ms. The interface displays all critical parameters to optimize your gameplay live.",
    product: "FUSION AI",
    type: "interface",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/hIzWjvHxAxYbjVmT.png",
  },
  {
    id: "4",
    author: "FUSION AI Interface",
    date: "AI & Visuals",
    rating: 5,
    title: "AI & Visuals Tab - Advanced settings",
    content: "Control the AI model, video capture, and visuals. Comprehensive options to customize your experience.",
    product: "FUSION AI",
    type: "interface",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/zPMKxwVyhEEnRpVX.png",
  },
  {
    id: "5",
    author: "Demo Video",
    date: "March 2026",
    rating: 5,
    title: "Live Demonstration - Optimized gameplay",
    content: "Watch FUSION AI in action. Precision, responsiveness, and performance combined for the ultimate gaming experience.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/bXUNXdhFynzBMoCS.mov",
  },
  {
    id: "6",
    author: "Demo Video",
    date: "March 2026",
    rating: 5,
    title: "Real Match Gameplay",
    content: "Full video of a match with FUSION AI enabled. See the difference live.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/jXIjJuMPXIFZZfQm.mov",
  },
  {
    id: "7",
    author: "Pro Player",
    date: "February 2026",
    rating: 5,
    title: "Windows Optimization - +60 FPS in gaming",
    content: "Quick and easy installation. Highly recommended for all gamers who want to optimize their PC.",
    product: "Windows Optimization",
    type: "text",
  },
  {
    id: "8",
    author: "CompetitivePlayer",
    date: "January 2026",
    rating: 5,
    title: "Jitter Script - The best on the market",
    content: "I've tested several jitter aims, this one is undoubtedly the best. Very discreet, very powerful, and the interface is simple to use.",
    product: "Jitter Script",
    type: "text",
  },
  {
    id: "9",
    author: "Apex Pro Player",
    date: "February 2026",
    rating: 5,
    title: "40 kills, 7000 damage - Exceptional results",
    content: "Performance with FUSION AI is incredible. 40 kills and 7000 damage in a single match. It's a game-changer for competitive players.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/kwEGlfEOKMBFgRMz.png",
  },
  {
    id: "10",
    author: "Demo Video",
    date: "March 2026",
    rating: 5,
    title: "Demonstration without controller interaction",
    content: "Full video showing FUSION AI in action. Watch closely - no controller movement, just pure AI precision.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/NcnRsNUsFldqktuZ.mp4",
  },
  {
    id: "11",
    author: "Demo Video",
    date: "March 2026",
    rating: 5,
    title: "Full Gameplay with FUSION AI",
    content: "Video of an entire match with FUSION AI enabled. See the difference live and the system's stability.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/UqTqnNMsOONardRt.mov",
  },
  {
    id: "12",
    author: "ZAI FRR",
    date: "03/17/2026",
    rating: 5,
    title: "Magnifiquement magnifique",
    content: "Magnifiquement magnifique — client Discord reaction after installation.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663459803944/cViUnYrywPFPqUxg.PNG",
  },
  {
    id: "13",
    author: "ZAI FRR",
    date: "03/17/2026",
    rating: 5,
    title: "Live gameplay proof — controller in hand",
    content: "ZAI FRR sent this video right after installation. No words needed.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663459803944/SEaBPqtlvkfzJeKr.mov",
  },
  {
    id: "14",
    author: "MrEgooos",
    date: "03/25/2026",
    rating: 5,
    title: "The best!! Always good to work through issues!!",
    content: "The best!! Always good to work through issues!! — verified Discord review.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663459803944/eZqzKUSZvrhYMDOg.PNG",
  },
  {
    id: "15",
    author: "MrEgooos",
    date: "03/25/2026",
    rating: 5,
    title: "Gameplay proof — controller in hand",
    content: "MrEgooos shared this video as proof of FUSION AI performance. Speaks for itself.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663459803944/vZzzCpPwNnlBBGsw.mov",
  },
  {
    id: "16",
    author: "imnotcheatingair",
    date: "March 2026",
    rating: 5,
    title: "Champions #1 — 10/3/17 — 3483 damage",
    content: "Squad Champions #1 in ranked. 10 kills, 3 assists, 17 knockdowns, 3483 damage in 14 minutes. FUSION AI delivers.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663459803944/BgCHAzvhotfDZROW.jpg",
  },
  {
    id: "17",
    author: "Veltouze",
    date: "04/06/2026",
    rating: 5,
    title: "Detailed review — Master rank with optimized setup",
    content: "Comprehensive review from a competitive player. Discusses Pred/Master rank gameplay, hardware optimization, and FUSION AI performance. Detailed analysis of cheating prevention, software stability, and external hardware setup.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "/reviews/r4.PNG",
  },
  {
    id: "18",
    author: "Veltouze",
    date: "04/06/2026",
    rating: 5,
    title: "Master rank achieved — FUSION AI in action",
    content: "Live gameplay proof from Master rank. FUSION AI running with FPS: 369, Latency: 2.1ms. Dashboard shows real-time performance monitoring and profile management.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "/reviews/image.png",
  },
  {
    id: "19",
    author: "NDonFire",
    date: "04/06/2026",
    rating: 5,
    title: "You have to try it, it's crazy",
    content: "Quick testimonial from NDonFire. Verified Discord review expressing enthusiasm about FUSION AI performance.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "/reviews/image_2026-04-06_182659218.png",
  },
  {
    id: "20",
    author: "Etienne ALG",
    date: "17/04/2026",
    rating: 5,
    title: "Very fast and kind people",
    content: "Excellent customer service and support team. OneScript interface is intuitive and responsive. Professional setup and installation process.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "/reviews/R10.PNG",
  },
  {
    id: "21",
    author: "AaE HuslA",
    date: "18/04/2026",
    rating: 5,
    title: "Best services and ai aimbot 100% recommend very professional",
    content: "Outstanding service quality and professional support. FUSION AI performance is incredible with perfect configuration. Highly recommend to everyone looking for premium AI aimbot solution.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "/reviews/husla_review.png",
  },
];

export default function Reviews() {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  return (
    <div>
      {/* Page header */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="absolute inset-0 bg-dark-surface/30" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <span className="font-display text-xs font-semibold tracking-[0.25em] uppercase text-violet-tech mb-3 block">
              Customer Reviews
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              What our <span className="text-violet-tech neon-text">users</span> say
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover testimonials, videos, and proof from our satisfied customers.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* Reviews Grid */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="glass-card rounded-lg overflow-hidden border border-border/30 hover:border-violet-tech/50 transition-all hover:shadow-lg hover:shadow-violet-tech/20"
              >
                {/* Media Preview */}
                {review.mediaUrl && (
                  <div className="relative w-full h-48 bg-dark-elevated/50 overflow-hidden group">
                    {review.type === "video" ? (
                      <>
                        <video
                          src={review.mediaUrl}
                          className="w-full h-full object-cover"
                          muted
                        />
                        <button
                          onClick={() => review.mediaUrl && setSelectedMedia(review.mediaUrl)}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-full bg-violet-tech flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white fill-white" />
                          </div>
                        </button>
                      </>
                    ) : (
                      <>
                        <img
                          src={review.mediaUrl}
                          alt={review.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <button
                          onClick={() => review.mediaUrl && setSelectedMedia(review.mediaUrl)}
                          className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <div className="w-16 h-16 rounded-full bg-violet-tech flex items-center justify-center group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-8 h-8 text-white" />
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-tech to-violet-accent flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{review.author}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {review.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-violet-tech text-violet-tech"
                      />
                    ))}
                  </div>

                  {/* Product Badge */}
                  <div className="inline-block px-2.5 py-1 rounded-md bg-violet-tech/10 border border-violet-tech/20 text-xs font-semibold text-violet-tech mb-3">
                    {review.product}
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-base mb-2 text-foreground">
                    {review.title}
                  </h3>

                  {/* Content */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {review.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-lg shadow-2xl">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <Play className="w-5 h-5 rotate-45" />
            </button>
            {selectedMedia.endsWith('.mov') || selectedMedia.endsWith('.mp4') ? (
              <video
                src={selectedMedia}
                className="w-full h-full max-h-[85vh] object-contain"
                controls
                autoPlay
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Review media"
                className="w-full h-full max-h-[85vh] object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
