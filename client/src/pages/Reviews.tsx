/*
 * Reviews — Neon Circuit Design
 * Avis clients, preuves vidéos, captures d'écran de l'interface
 */
import { motion } from "framer-motion";
import { Star, Video, Image as ImageIcon, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  type: "text" | "video" | "screenshot";
  mediaUrl?: string;
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Joueur Pro",
    date: "Mars 2026",
    rating: 5,
    title: "Incroyable ! +60 FPS en gaming",
    content: "Windows Optimization m'a permis de gagner 60 FPS supplémentaires sur Valorant. Installation simple et rapide. Vraiment recommandé !",
    product: "Windows Optimization",
    type: "text",
  },
  {
    id: "2",
    author: "StreamerGamer",
    date: "Février 2026",
    rating: 5,
    title: "FUSION AI change la donne",
    content: "Après 2 semaines d'utilisation, mon gameplay s'est complètement transformé. La précision est incroyable et c'est totalement indétectable.",
    product: "FUSION AI",
    type: "text",
  },
  {
    id: "3",
    author: "CompetitivePlayer",
    date: "Janvier 2026",
    rating: 5,
    title: "Jitter Script le meilleur du marché",
    content: "J'ai testé plusieurs jitter aim, celui-ci est sans doute le meilleur. Très discret, très puissant, et l'interface est simple à utiliser.",
    product: "Jitter Script",
    type: "text",
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
              Avis Clients
            </span>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-4">
              Ce que disent nos <span className="text-violet-tech neon-text">utilisateurs</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Découvrez les témoignages, vidéos et preuves de nos clients satisfaits.
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
                className="glass-card rounded-lg p-6 border border-border/30 hover:border-violet-tech/50 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-tech to-violet-accent flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{review.author}</p>
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
                <h3 className="font-display font-bold text-lg mb-2 text-foreground">
                  {review.title}
                </h3>

                {/* Content */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {review.content}
                </p>

                {/* Media Indicator */}
                {review.mediaUrl && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-dark-elevated/50 border border-border/30">
                    {review.type === "video" && (
                      <>
                        <Video className="w-4 h-4 text-violet-tech" />
                        <span className="text-xs text-muted-foreground">
                          Vidéo de preuve
                        </span>
                      </>
                    )}
                    {review.type === "screenshot" && (
                      <>
                        <ImageIcon className="w-4 h-4 text-violet-tech" />
                        <span className="text-xs text-muted-foreground">
                          Capture d'écran
                        </span>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 border-t border-border/30">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-tech/5 to-transparent" />
        <div className="relative container">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-4">
              Prêt à rejoindre nos <span className="text-violet-tech neon-text">utilisateurs satisfaits</span> ?
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Testez nos produits dès maintenant et découvrez la différence par vous-même.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/products">
                <Button
                  size="lg"
                  className="bg-violet-tech hover:bg-violet-secondary text-primary-foreground font-display font-semibold tracking-wider neon-glow"
                >
                  Découvrir nos produits
                </Button>
              </a>
              <a href="/trial">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-violet-tech/30 text-foreground hover:bg-violet-tech/10 hover:border-violet-tech/50 font-display tracking-wider"
                >
                  Réserver un essai gratuit
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
