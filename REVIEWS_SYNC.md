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

La page se re-synchronise aussi en arrière-plan tant qu’elle reste ouverte, et via le bouton **Actualiser**.

## Pourquoi ça pouvait “rester bloqué au 9 août”

Ce n’est **pas** le bot Discord qui retarde l’affichage. C’est le **site** :

1. Au chargement, `/reviews` sert d’abord un snapshot rapide (`data/reviews.json` / cache mémoire).
2. Ensuite une sync Discord tourne en arrière-plan (quelques secondes).
3. Sans `BLOB_READ_WRITE_TOKEN` sur Vercel, la sync **n’est pas persistée** entre cold starts → on retombe sur le snapshot git jusqu’à la prochaine sync réussie.

Le snapshot git a été mis à jour (avis récents inclus). Pour que les **nouveaux** avis restent visibles immédiatement après un cold start, active Blob (voir ci-dessous).

## Configuration Discord (Vercel — obligatoire pour la sync live)

Sur le projet Vercel → Settings → Environment Variables :

- `DISCORD_BOT_TOKEN`
- `DISCORD_GUILD_ID`
- `DISCORD_REVIEWS_CHANNEL_ID`
- `DISCORD_REVIEW_APPROVER_IDS` (IDs Discord des modos, séparés par des virgules)
- `REVIEWS_SYNC_SECRET` (optionnel, pour sync manuelle / cron)
- `BLOB_READ_WRITE_TOKEN` (**fortement recommandé**) pour persister images + JSON entre les requêtes

Sans ces variables Discord sur Vercel, le site ne peut pas lire les nouvelles réactions ✅.

### Activer Vercel Blob (recommandé)

1. Vercel → Storage → Create → Blob
2. Connecte le store au projet (injecte `BLOB_READ_WRITE_TOKEN`)
3. Redeploy

Après ça, chaque sync live / cron écrit le manifeste : le prochain visiteur voit les derniers avis **sans attendre** ~30s.

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

Un cron appelle `/api/reviews?refresh=1` **une fois par jour** (`0 5 * * *`).
Filet de sécurité : la sync live à l’ouverture de la page reste le chemin principal.
