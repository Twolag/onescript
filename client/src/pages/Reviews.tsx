/*
 * Reviews — Neon Circuit Design
 * Customer reviews
 */
import { motion } from "framer-motion";
import { Star, User, Calendar } from "lucide-react";

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
  },
  {
    id: "2",
    author: "Apex Player",
    date: "March 2026",
    rating: 5,
    title: "30 kills, 5383 damage - Incredible performance",
    content: "The results speak for themselves. With FUSION AI, I've reached stats never seen before. Precision and responsiveness are exceptional.",
    product: "FUSION AI",
  },
  {
    id: "7",
    author: "Pro Player",
    date: "February 2026",
    rating: 5,
    title: "Windows Optimization - +60 FPS in gaming",
    content: "Quick and easy installation. Highly recommended for all gamers who want to optimize their PC.",
    product: "Windows Optimization",
  },
  {
    id: "8",
    author: "CompetitivePlayer",
    date: "January 2026",
    rating: 5,
    title: "Jitter Script - The best on the market",
    content: "I've tested several jitter aims, this one is undoubtedly the best. Very discreet, very powerful, and the interface is simple to use.",
    product: "Jitter Script",
  },
  {
    id: "9",
    author: "Apex Pro Player",
    date: "February 2026",
    rating: 5,
    title: "40 kills, 7000 damage - Exceptional results",
    content: "Performance with FUSION AI is incredible. 40 kills and 7000 damage in a single match. It's a game-changer for competitive players.",
    product: "FUSION AI",
  },
  {
    id: "12",
    author: "ZAI FRR",
    date: "03/17/2026",
    rating: 5,
    title: "Magnifiquement magnifique",
    content: "Magnifiquement magnifique — client Discord reaction after installation.",
    product: "FUSION AI",
  },
  {
    id: "14",
    author: "MrEgooos",
    date: "03/25/2026",
    rating: 5,
    title: "The best!! Always good to work through issues!!",
    content: "The best!! Always good to work through issues!! — verified Discord review.",
    product: "FUSION AI",
  },
  {
    id: "16",
    author: "imnotcheatingair",
    date: "March 2026",
    rating: 5,
    title: "Champions #1 — 10/3/17 — 3483 damage",
    content: "Squad Champions #1 in ranked. 10 kills, 3 assists, 17 knockdowns, 3483 damage in 14 minutes. FUSION AI delivers.",
    product: "FUSION AI",
  },
  {
    id: "17",
    author: "Veltouze",
    date: "04/06/2026",
    rating: 5,
    title: "Detailed review — Master rank with optimized setup",
    content: "Comprehensive review from a competitive player. Discusses Pred/Master rank gameplay, hardware optimization, and FUSION AI performance.",
    product: "FUSION AI",
  },
  {
    id: "19",
    author: "NDonFire",
    date: "04/06/2026",
    rating: 5,
    title: "You have to try it, it's crazy",
    content: "Quick testimonial from NDonFire. Verified Discord review expressing enthusiasm about FUSION AI performance.",
    product: "FUSION AI",
  },
  {
    id: "20",
    author: "Etienne ALG",
    date: "17/04/2026",
    rating: 5,
    title: "Very fast and kind people",
    content: "Excellent customer service and support team. OneScript interface is intuitive and responsive. Professional setup and installation process.",
    product: "FUSION AI",
  },
  {
    id: "21",
    author: "AaE HuslA",
    date: "18/04/2026",
    rating: 5,
    title: "Best services and ai aimbot 100% recommend very professional",
    content: "Outstanding service quality and professional support. FUSION AI performance is incredible with perfect configuration.",
    product: "FUSION AI",
  },
  {
    id: "22",
    author: "whyme5483",
    date: "04/28/2026",
    rating: 5,
    title: "AI Aimbot legit and fast",
    content: "AI Aimbot legit and fast and easy to understand. Dropped this first game 🔥",
    product: "FUSION AI",
  },
  {
    id: "23",
    author: "Zeyrox",
    date: "05/08/2026",
    rating: 5,
    title: "Le jitter marche tellement bien",
    content: "Le jitter marche tellement bien, ça tire droit, ça louche pas, installation 20sec top chrono. Merci @OneLag_ @TwoLag_",
    product: "Jitter Script",
  },
  {
    id: "24",
    author: "Life",
    date: "05/09/2026",
    rating: 5,
    title: "goated the jitter aim script is insane",
    content: "goated the jitter aim script is insane",
    product: "Jitter Script",
  },
  {
    id: "25",
    author: "suarefyx",
    date: "05/10/2026",
    rating: 5,
    title: "Giveaway incroyable",
    content: "Merci pour le script le giveaway étais incroyable merci les gars vous êtes les goat 🫡",
    product: "Jitter Script",
  },
  {
    id: "26",
    author: "Tom",
    date: "05/12/2026",
    rating: 5,
    title: "Best cheese ive ever bought",
    content: "bought a month of FusionAI and i was skeptical at first, but is the best cheese ive ever bought worth every penny get up it",
    product: "FUSION AI",
  },
  {
    id: "27",
    author: "Bxsti03",
    date: "05/12/2026",
    rating: 5,
    title: "Highly recommend AI Fusion",
    content: "I bought AI Fusion today, and while I was unsure at first, after just the first few hours of gameplay, it has already paid for itself. I can highly recommend it to everyone else. 🥳",
    product: "FUSION AI",
  },
  {
    id: "28",
    author: "Azra",
    date: "05/13/2026",
    rating: 5,
    title: "working very fine nice owners",
    content: "working very fine nice owners very very good",
    product: "FUSION AI",
  },
  {
    id: "29",
    author: "Slovi",
    date: "04/20/2026",
    rating: 5,
    title: "Awesome <3",
    content: "Awesome <3 — client showing their OneScript interface configuration.",
    product: "Jitter Script",
  },
  {
    id: "30",
    author: "xswayn",
    date: "04/25/2026",
    rating: 5,
    title: "Works flawlessly ❤️ W sellers too",
    content: "Works flawlessly ❤️ W sellers too — gameplay proof with OneScript interface.",
    product: "FUSION AI",
  },
];

export default function Reviews() {
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
              Discover testimonials and feedback from our satisfied customers.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-tech/20 to-transparent" />
      </section>

      {/* Reviews Grid */}
      <section className="relative py-20 lg:py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...reviews].reverse().map((review, i) => (
              <motion.div
                key={review.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="glass-card rounded-lg overflow-hidden border border-border/30 hover:border-violet-tech/50 transition-all hover:shadow-lg hover:shadow-violet-tech/20"
              >
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
    </div>
  );
}
