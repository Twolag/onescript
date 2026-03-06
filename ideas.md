# OneScript — Brainstorm Design

## Contexte
OneScript est une plateforme web de services et outils pour optimisation PC et performance gaming. Le site doit refléter la puissance, la vitesse et la technologie avancée. Palette imposée : violet (#7B2EFF), fond sombre (#0B0B0F), typographie futuriste (Orbitron / Exo).

---

<response>
## Idée 1 — "Neon Circuit" (Cyberpunk Industriel)

<probability>0.07</probability>

**Design Movement** : Cyberpunk industriel mélangé à l'esthétique des circuits imprimés. Inspiration directe des interfaces de jeux comme Cyberpunk 2077 et des dashboards de véhicules de course.

**Core Principles** :
1. Lignes de circuit visibles comme éléments décoratifs — des tracés SVG animés qui parcourent la page comme des circuits imprimés
2. Asymétrie contrôlée — les sections ne sont jamais parfaitement centrées, elles glissent vers la gauche ou la droite
3. Densité informationnelle — beaucoup de données visibles, style HUD de jeu vidéo
4. Contraste brutal — le violet néon (#7B2EFF) éclate sur le noir absolu

**Color Philosophy** : Le violet est utilisé exclusivement comme "énergie" — il n'apparaît que sur les éléments actifs, les lignes de circuit et les accents. Le reste est en niveaux de gris très sombres. L'idée est que le violet = courant électrique qui traverse le site.

**Layout Paradigm** : Grille brisée avec des sections qui se chevauchent légèrement. Les cartes produits sont disposées en diagonale. Le hero section utilise un split asymétrique 60/40. Les sections alternent entre pleine largeur et colonnes décalées.

**Signature Elements** :
1. Lignes de circuit animées en SVG qui connectent les sections entre elles
2. Effet "glitch" subtil sur les titres au hover
3. Bordures en dégradé violet qui pulsent doucement

**Interaction Philosophy** : Chaque interaction déclenche un micro-feedback visuel — un flash violet, une ligne qui s'illumine, un élément qui "charge". Le site doit donner l'impression d'être un système vivant.

**Animation** : Animations d'entrée séquentielles (stagger) pour les éléments. Les lignes de circuit se dessinent progressivement au scroll. Les cartes apparaissent avec un effet de "boot" comme un système qui démarre. Transitions de page avec un effet de scan horizontal.

**Typography System** : Orbitron pour les titres (bold, uppercase, letter-spacing élargi). Exo pour le corps de texte et les descriptions. Tailles très contrastées : titres en 4xl-6xl, corps en base-lg.
</response>

---

<response>
## Idée 2 — "Dark Forge" (Brutalisme Tech Épuré)

<probability>0.05</probability>

**Design Movement** : Brutalisme numérique adouci — des formes géométriques dures et des espaces généreux, mais avec une touche de raffinement via les dégradés et la lumière.

**Core Principles** :
1. Géométrie dure — angles vifs, pas de border-radius sauf exception volontaire
2. Hiérarchie par la taille — les éléments importants sont massivement plus grands
3. Espace négatif comme respiration — grandes zones vides entre les sections
4. Monochrome + une couleur — le violet est la seule couleur, tout le reste est noir/blanc/gris

**Color Philosophy** : Approche quasi-monochrome. Le fond est un noir profond (#0B0B0F) avec des variations subtiles de gris très sombres pour créer de la profondeur. Le violet (#7B2EFF) est utilisé avec parcimonie comme un marqueur de valeur — prix, CTA, éléments clés. Un dégradé violet-to-transparent crée des halos de lumière derrière les éléments importants.

**Layout Paradigm** : Colonnes massives avec des blocs empilés verticalement. Chaque section occupe au minimum 80vh. Le hero est plein écran avec un titre géant centré. Les produits sont présentés en blocs horizontaux pleine largeur qui alternent texte/visuel gauche-droite. Navigation fixe minimale en haut.

**Signature Elements** :
1. Halos de lumière violette (radial-gradient) derrière les éléments clés
2. Lignes horizontales fines qui séparent les sections comme des "scanlines"
3. Typographie massive — certains mots en 8xl+ comme statement visuel

**Interaction Philosophy** : Minimaliste et précis. Les hover states sont des changements de couleur nets (pas de transition douce). Les boutons ont un effet de "press" avec un léger scale-down. L'idée est la précision mécanique.

**Animation** : Entrées par fade-up lent et majestueux. Parallaxe subtil sur les éléments de fond. Les halos de lumière pulsent très lentement (4-6s). Pas d'animation excessive — chaque mouvement est intentionnel.

**Typography System** : Orbitron en extra-bold pour les titres principaux, tailles extrêmes (6xl-9xl). Exo en light/regular pour tout le reste. Contraste maximal entre titres et corps. Utilisation de letter-spacing négatif sur les gros titres pour un effet compact et puissant.
</response>

---

<response>
## Idée 3 — "Plasma Flow" (Fluide Organique Tech)

<probability>0.06</probability>

**Design Movement** : Design organique-tech — fusion entre les formes fluides et l'esthétique technologique. Inspiré par les visualisations de données en temps réel et les interfaces de sci-fi (Minority Report, Iron Man HUD).

**Core Principles** :
1. Formes fluides — les sections ont des bordures ondulées, les backgrounds utilisent des blobs et des formes organiques
2. Mouvement perpétuel — le site donne l'impression d'être "vivant" avec des animations continues subtiles
3. Profondeur par les couches — plusieurs plans visuels superposés avec des opacités différentes
4. Gradient comme matière — le violet n'est jamais plat, il est toujours en dégradé

**Color Philosophy** : Le violet est traité comme un plasma — il coule, il pulse, il se diffuse. Dégradés multidirectionnels du #7B2EFF au #9B4DFF au #C084FF. Le fond utilise des variations subtiles (#0B0B0F à #12121A) pour créer de la profondeur. Des touches de cyan (#00D4FF) comme couleur complémentaire pour les éléments secondaires.

**Layout Paradigm** : Sections fluides avec des séparateurs en forme de vagues SVG. Le contenu flotte dans des "îlots" (cards avec backdrop-blur) sur un fond animé. Le hero utilise un layout en Z-pattern avec le titre en haut à gauche et le CTA en bas à droite. Les produits sont dans des cards flottantes disposées en grille organique (tailles variables).

**Signature Elements** :
1. Blobs animés en arrière-plan (CSS ou canvas) avec des dégradés violets
2. Cards avec effet glassmorphism (backdrop-blur + bordure semi-transparente)
3. Particules flottantes subtiles dans le hero section

**Interaction Philosophy** : Fluide et réactive. Les éléments suivent légèrement le curseur (parallaxe au hover). Les cards se soulèvent avec une ombre douce au hover. Les transitions sont élastiques (spring physics). Le site doit donner une sensation de "flottement".

**Animation** : Blobs en mouvement perpétuel lent en arrière-plan. Entrées avec spring animations (framer-motion). Scroll-triggered animations avec des courbes ease-out douces. Les particules dérivent lentement. Les dégradés shift doucement leurs couleurs.

**Typography System** : Exo pour les titres (semi-bold, pas uppercase — plus doux que Orbitron). Orbitron réservé aux chiffres et aux données techniques (prix, specs). Inter comme fallback pour le corps. Tailles harmonieuses avec un ratio de 1.333 (perfect fourth).
</response>

---

## Choix retenu : Idée 1 — "Neon Circuit" (Cyberpunk Industriel)

Cette direction est la plus alignée avec l'identité OneScript : puissance, vitesse, technologie. Les lignes de circuit animées et l'asymétrie créent une expérience unique et mémorable qui se démarque des sites SaaS génériques. Le traitement du violet comme "énergie électrique" renforce parfaitement la métaphore de la performance PC.
