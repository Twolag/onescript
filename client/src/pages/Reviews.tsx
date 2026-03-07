/*
 * Reviews — Neon Circuit Design
 * Avis clients, preuves vidéos, captures d'écran de l'interface
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
    date: "27/02/2026",
    rating: 5,
    title: "Franchement félicitation bon boulot",
    content: "Tu peux être fier de toi. Je vais parler autour de moi.",
    product: "FUSION AI",
    type: "text",
  },
  {
    id: "2",
    author: "Joueur Apex",
    date: "Mars 2026",
    rating: 5,
    title: "30 frags, 5383 dégâts - Performance incroyable",
    content: "Les résultats parlent d'eux-mêmes. Avec FUSION AI, j'ai atteint des statistiques jamais vues auparavant. La précision et la réactivité sont exceptionnelles.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/rjKjyrtBmgFNrGGO.png",
  },
  {
    id: "3",
    author: "Interface FUSION AI",
    date: "Dashboard",
    rating: 5,
    title: "Interface Dashboard - Monitoring en temps réel",
    content: "FPS: 262, Latence: 3.4ms. L'interface affiche tous les paramètres critiques pour optimiser votre gameplay en direct.",
    product: "FUSION AI",
    type: "interface",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/hIzWjvHxAxYbjVmT.png",
  },
  {
    id: "4",
    author: "Interface FUSION AI",
    date: "AI & Visuals",
    rating: 5,
    title: "Onglet AI & Visuals - Réglages avancés",
    content: "Contrôlez le modèle IA, la capture vidéo et les visuels. Options complètes pour personnaliser votre expérience.",
    product: "FUSION AI",
    type: "interface",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/zPMKxwVyhEEnRpVX.png",
  },
  {
    id: "5",
    author: "Vidéo de démonstration",
    date: "Mars 2026",
    rating: 5,
    title: "Démonstration en direct - Gameplay optimisé",
    content: "Regardez FUSION AI en action. Précision, réactivité et performance combinées pour une expérience gaming ultime.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/bXUNXdhFynzBMoCS.mov",
  },
  {
    id: "6",
    author: "Vidéo de démonstration",
    date: "Mars 2026",
    rating: 5,
    title: "Gameplay en partie réelle",
    content: "Vidéo complète d'une partie avec FUSION AI activé. Voyez la différence en direct.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/jXIjJuMPXIFZZfQm.mov",
  },
  {
    id: "7",
    author: "Joueur Pro",
    date: "Février 2026",
    rating: 5,
    title: "Windows Optimization - +60 FPS en gaming",
    content: "Installation simple et rapide. Vraiment recommandé pour tous les gamers qui veulent optimiser leur PC.",
    product: "Windows Optimization",
    type: "text",
  },
  {
    id: "8",
    author: "CompetitivePlayer",
    date: "Janvier 2026",
    rating: 5,
    title: "Jitter Script - Le meilleur du marché",
    content: "J'ai testé plusieurs jitter aim, celui-ci est sans doute le meilleur. Très discret, très puissant, et l'interface est simple à utiliser.",
    product: "Jitter Script",
    type: "text",
  },
  {
    id: "9",
    author: "Joueur Apex Pro",
    date: "Février 2026",
    rating: 5,
    title: "40 frags, 7000 dégâts - Résultats exceptionnels",
    content: "Les performances avec FUSION AI sont incroyables. 40 frags et 7000 dégâts en une seule partie. C'est un game-changer pour les joueurs compétitifs.",
    product: "FUSION AI",
    type: "screenshot",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/kwEGlfEOKMBFgRMz.png",
  },
  {
    id: "10",
    author: "Vidéo de démonstration",
    date: "Mars 2026",
    rating: 5,
    title: "Démonstration sans interaction manette",
    content: "Vidéo complète montrant FUSION AI en action. Regardez bien - pas de mouvement de manette, juste la précision IA pure.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/NcnRsNUsFldqktuZ.mp4",
  },
  {
    id: "11",
    author: "Vidéo de démonstration",
    date: "Mars 2026",
    rating: 5,
    title: "Gameplay complet avec FUSION AI",
    content: "Vidéo d'une partie entière avec FUSION AI activé. Voyez la différence en direct et la stabilité du système.",
    product: "FUSION AI",
    type: "video",
    mediaUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663409660372/UqTqnNMsOONardRt.mov",
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

                  {/* Media Type Badge */}
                  {review.mediaUrl && (
                    <div className="flex items-center gap-2 mt-4 p-2 rounded-md bg-dark-elevated/50 border border-border/30">
                      {review.type === "video" && (
                        <>
                          <Video className="w-4 h-4 text-violet-tech flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            Vidéo de preuve
                          </span>
                        </>
                      )}
                      {(review.type === "screenshot" || review.type === "interface") && (
                        <>
                          <ImageIcon className="w-4 h-4 text-violet-tech flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            {review.type === "interface" ? "Capture d'interface" : "Capture d'écran"}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-sm h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-10 right-0 text-white hover:text-violet-tech transition-colors"
            >
              ✕ Fermer
            </button>
            {selectedMedia.endsWith('.mp4') || selectedMedia.endsWith('.mov') ? (
              <video
                src={selectedMedia}
                controls
                autoPlay
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <img
                src={selectedMedia}
                alt="Media preview"
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />
            )}
          </motion.div>
        </div>
      )}

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
