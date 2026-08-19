# Avis Discord → Site

Les avis sur `/reviews` viennent du **salon Discord** (pas du texte écrit à la main). Chaque avis affiche :

- la **photo de profil Discord**
- le **pseudo**
- la **date**
- le **message** (ou la **capture** si le message contient une image)
- un lien **Voir sur Discord**

## Validation (obligatoire)

1. Un client laisse son avis dans le salon reviews Discord.
2. Un modo réagit avec **✅** sur le message.
3. Le message est synchronisé sur le site.

Sans ✅, l’avis **n’apparaît pas** sur le site.

## Configuration Discord

1. [Discord Developer Portal](https://discord.com/developers/applications) → créer une application → **Bot**.
2. Activer les **Privileged Gateway Intents** : *Message Content* (si besoin) — pour la sync REST, le bot a surtout besoin de lire l’historique et les réactions.
3. Inviter le bot sur le serveur avec :
   - View Channels
   - Read Message History
   - Read Messages/View Channels
4. Copier dans `.env` :
   - `DISCORD_BOT_TOKEN`
   - `DISCORD_GUILD_ID` (ID du serveur)
   - `DISCORD_REVIEWS_CHANNEL_ID` (ID du salon avis)
   - `DISCORD_REVIEW_APPROVER_IDS` (IDs Discord des modos, séparés par des virgules)

## Synchroniser une première fois (tous les avis déjà ✅)

```bash
cp .env.example .env   # puis remplir les valeurs Discord
pnpm sync-reviews
git add client/public/data/reviews.json client/public/reviews/
git commit -m "Sync validated Discord reviews"
git push
```

Pour publier **tous** les avis déjà présents : ajoute **✅** sur chaque message dans Discord, puis lance `pnpm sync-reviews`.

## Sync automatique sur Vercel (optionnel)

1. Ajouter les variables d’env sur Vercel (mêmes clés Discord + `REVIEWS_SYNC_SECRET` + `CRON_SECRET`).
2. Activer **Vercel Blob** et `BLOB_READ_WRITE_TOKEN` pour stocker images + JSON sans commit Git.
3. Un cron appelle `/api/reviews` **une fois par jour** (Hobby Vercel n’autorise pas plus fréquent ; le cron envoie `Authorization: Bearer CRON_SECRET` pour lancer la sync).

Sync manuelle :

```bash
curl -X POST https://onescript.fr/api/reviews \
  -H "Authorization: Bearer VOTRE_REVIEWS_SYNC_SECRET"
```
