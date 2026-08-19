# Avis Discord → Site

Les avis sur `/reviews` viennent du **salon Discord**. Chaque avis affiche :

- la **photo de profil Discord**
- le **pseudo**
- la **date**
- le **message** (ou la **capture** si le message contient une image)
- un lien **Voir sur Discord**

## Validation (obligatoire)

1. Un client laisse son avis dans le salon reviews Discord.
2. Un modo réagit avec **✅** sur le message.
3. Ouvre (ou rafraîchis) **https://onescript.fr/reviews** → le site **synchronise automatiquement** depuis Discord.

Sans ✅, l’avis **n’apparaît pas** sur le site.

La page se re-synchronise aussi toutes les ~45 secondes tant qu’elle reste ouverte, et via le bouton **Actualiser**.

## Configuration Discord (Vercel — obligatoire pour la sync live)

Sur le projet Vercel → Settings → Environment Variables :

- `DISCORD_BOT_TOKEN`
- `DISCORD_GUILD_ID`
- `DISCORD_REVIEWS_CHANNEL_ID`
- `DISCORD_REVIEW_APPROVER_IDS` (IDs Discord des modos, séparés par des virgules)
- `REVIEWS_SYNC_SECRET` (optionnel, pour sync manuelle / cron)
- `BLOB_READ_WRITE_TOKEN` (**recommandé**) pour persister images + JSON entre les requêtes

Sans ces variables Discord sur Vercel, le site ne peut pas lire les nouvelles réactions ✅.

## Sync manuelle (optionnel)

```bash
# Local
pnpm sync-reviews
git add client/public/data/reviews.json client/public/reviews/
git commit -m "Sync validated Discord reviews"
git push

# Ou via API (secret requis)
curl -X POST https://onescript.fr/api/reviews \
  -H "Authorization: Bearer VOTRE_REVIEWS_SYNC_SECRET"
```

## Cron (Hobby)

Un cron appelle `/api/reviews` **une fois par jour** (`0 5 * * *`). Ce n’est qu’un filet de sécurité : la sync live à l’ouverture de la page est le chemin principal.
