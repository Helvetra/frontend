<!--
  News article: Helvetra at Swiss Startup Days 2026.
  Primary source: the fireside chat between Alex and Oleg Lavrovsky on the
  AI Stage in Bern (21 May 2026), recorded on YouTube. Same per-locale
  `content` object pattern as the Uphill article.
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>{{ t.title }}</template>
      <template #subtitle>{{ t.subtitle }}</template>

      <ContentProseSection id="ai-stage" :title="t.s1.heading">
        <figure class="mb-10">
          <img
            :src="`/img/news/swiss-startup-days-2026/helvetra-on-ai-stage.jpg`"
            alt="The Helvetra logo on a large screen at the AI Stage of Swiss Startup Days 2026, Kursaal Bern. Audience seated on yellow lounge chairs; Alex (right of frame) speaks into a microphone next to Oleg Lavrovsky."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2" v-html="t.s1.caption" />
        </figure>
        <p v-html="t.s1.p1" />
        <p v-html="t.s1.p2" />
      </ContentProseSection>

      <ContentProseSection id="why-helvetra-exists" :title="t.s2.heading">
        <p v-html="t.s2.p1" />
        <p>{{ t.s2.p2 }}</p>
        <p v-html="t.s2.p3" />
      </ContentProseSection>

      <ContentProseSection id="open-by-default" :title="t.s3.heading">
        <p>{{ t.s3.p1 }}</p>
        <p v-html="t.s3.p2" />
        <p v-html="t.s3.p3" />
        <p v-html="t.s3.p4" />
      </ContentProseSection>

      <ContentProseSection id="honest-state" :title="t.s4.heading">
        <p>{{ t.s4.p1 }}</p>
        <blockquote class="border-l-4 border-swiss-red pl-4 italic text-neutral-700 my-6">
          {{ t.s4.quote }}
        </blockquote>
        <p v-html="t.s4.p2" />
        <p v-html="t.s4.p3" />
      </ContentProseSection>

      <ContentProseSection id="modest-target" :title="t.s5.heading">
        <p v-html="t.s5.p1" />
        <p>{{ t.s5.p2 }}</p>
      </ContentProseSection>

      <ContentProseSection id="resources" :title="t.resources.heading">
        <ul>
          <li v-for="item in t.resources.items" :key="item" v-html="item" />
        </ul>
      </ContentProseSection>

      <template #cta>
        <ContentArticleCTA :to="localePath('/')">
          <template #text>{{ t.cta.text }}</template>
          <template #button>{{ t.cta.button }}</template>
        </ContentArticleCTA>
      </template>
    </ContentArticleLayout>

    <MarketingNewsletterSection />
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { locale } = useI18n()
const { getArticleSchema, useJsonLd } = useSchemaOrg()

// Per-locale content. EN is the source of truth; DE/FR/IT are AI-produced
// translations awaiting native-speaker review.
const content = {
  en: {
    title: 'Helvetra at Swiss Startup Days 2026: open source as the only strategy',
    subtitle:
      "Notes from the AI-Stage fireside chat in Bern. Why a one-person Swiss translator built on Apertus has open-sourced every line of code, refuses to track anything you type, and is in no rush to grow loudly.",
    s1: {
      heading: 'On the AI Stage in Bern',
      caption:
        'Helvetra on the AI Stage at Swiss Startup Days 2026. Oleg Lavrovsky (foreground, right) and Alex Margot in conversation.',
      p1: 'On 21 May 2026, <a href="https://startupdays.ch/" target="_blank" rel="noopener">Swiss Startup Days</a> took over the Kursaal in Bern: 40-plus sessions, 125-plus speakers, the usual deep-tech, fintech and health-tech tracks, and this year a dedicated AI Stage running the whole day. The slot on that AI Stage belonged to <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Apertus</a>, and <strong><a href="https://www.linkedin.com/in/loleg/" target="_blank" rel="noopener">Oleg Lavrovsky</a></strong> brought Helvetra along as the small-product half of a fireside chat titled <em>"Open Source AI as a Strategic Advantage"</em>.',
      p2: 'Oleg is Data Engineer and Developer Relations Specialist on the Apertus team at the <a href="https://ai.epfl.ch/" target="_blank" rel="noopener">EPFL AI Center</a>, working closely with the <a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a>. He framed where Apertus sits in the global picture; Helvetra was the small product in the room actually shipping on top of it. The full 32-minute recording is on <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">YouTube</a>; this article is what it makes sense to expand on for Helvetra users.',
    },
    s2: {
      heading: 'Why Helvetra exists at all',
      p1: 'Helvetra started as an itch from a different company. Alex also runs <a href="https://peerdom.com/" target="_blank" rel="noopener">Peerdom</a>, where multilingual teams are the norm rather than the exception, and translation is a recurring chore. For Swiss and European organisations, the existing options also come with a quieter friction: where the text actually goes once you press translate, and who gets to keep it.',
      p2: 'When Apertus shipped its first release in September 2025, hosted on Infomaniak, the missing piece appeared on a Swiss server. The decision to build Helvetra was made the same week.',
      p3: 'On stage, Alex described it in the most low-stakes terms possible: a tool built in evenings, on top of a model that already existed, to solve a problem he already had. It happens to also serve anyone else in Switzerland who works across languages.',
    },
    s3: {
      heading: 'Open by default, not by accident',
      p1: 'The opening claim of the session was simple. Open source is not a hobbyist position; for a small Swiss product it is the only credible strategic posture against US-scale incumbents.',
      p2: 'Helvetra puts that into practice. All three of our codebases live on GitHub under the <a href="https://github.com/Helvetra" target="_blank" rel="noopener">Helvetra organisation</a>: the <a href="https://github.com/Helvetra/frontend" target="_blank" rel="noopener">Nuxt frontend</a>, the <a href="https://github.com/Helvetra/backend" target="_blank" rel="noopener">FastAPI backend</a>, and the <a href="https://github.com/Helvetra/ios" target="_blank" rel="noopener">iOS app</a>. Anyone can read what we send to Apertus, how we handle a session, what we store and (more importantly) what we don\'t.',
      p3: 'The privacy piece is structural, not a policy paragraph. The text you type is sent to Apertus, the translation comes back, the page renders it. <strong>No database row is created for that text.</strong> The only optional moment is the thumbs-up / thumbs-down button: when you press it, we ask whether you want to share that one example to help us improve. Otherwise, nothing is kept.',
      p4: 'During the Q&amp;A, Oleg made the obvious open-source invitation explicit: the iOS app is on GitHub, but there is no Android client yet. If you live in the Android world and want one, the code that would help you write it is right there.',
    },
    s4: {
      heading: 'The honest current state',
      p1: 'Alex was upfront on stage about how small Helvetra is: no marketing budget, no growth team, no founder full-time on the product. The framing was deliberate. Helvetra is supposed to be quietly useful, not loudly launched. The shape of the audience right now matches that.',
      quote:
        '"I really didn\'t build that to sustain myself. I rather built it because I thought the product here outside is just awesome, and let\'s just do something."',
      p2: 'The most honest caveat is Swiss German. As Imanol Schlag (Apertus co-lead) said at <a href="/news/apertus-at-uphill-conf-2026">Uphill Conf two weeks earlier</a>, the current Apertus checkpoint only saw Swiss German for a single day of post-training. That shows. The Swiss German that comes out of Helvetra today is fine for a casual chat message, and still rough enough that we\'d want a native speaker to read over anything you actually send to someone.',
      p3: 'Apertus 1.5 is the next checkpoint, and Oleg recapped what it brings: roughly two trillion additional training tokens (with health, education and justice data contributed by partner organisations), image and audio inputs, and an agentic / instruction-following pass via reinforcement learning. After 1.5, Apertus 2 is being designed for release at the end of 2026 with a mixture-of-experts architecture. Each of those release windows is also a release window for Helvetra: when the model gets better at Swiss German, our output does, with no work on our side.',
    },
    s5: {
      heading: 'A modest target',
      p1: 'Asked whether it would be disappointing if Helvetra were used only by, say, twenty Swiss cantons, Alex\'s answer was that it would already be a good outcome. The honesty is the point. Helvetra doesn\'t need to win a category; it needs to be useful to the people who already live with the problem it solves.',
      p2: 'That is the indie-product version of the open-source thesis from the session: a small team can put a real Swiss-built tool in front of users without permission, without a funding round, and without compromising on data residency. The conversation in Bern was a useful reminder that we are not the only people making that bet.',
    },
    resources: {
      heading: 'Resources',
      items: [
        'The talk on YouTube: <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">Open Source AI as a Strategic Advantage</a> (32 min, Swiss Startup Days 2026)',
        'Swiss Startup Days: <a href="https://startupdays.ch/" target="_blank" rel="noopener">startupdays.ch</a>',
        'Helvetra source code: <a href="https://github.com/Helvetra" target="_blank" rel="noopener">github.com/Helvetra</a> (frontend, backend, iOS)',
        'Apertus on Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Previous article on the same model: <a href="/news/apertus-at-uphill-conf-2026">Apertus at Uphill Conf 2026</a>',
      ],
    },
    cta: {
      text: 'Try Helvetra and see what one Swiss model, fully open and Swiss-hosted, can do for your translations.',
      button: 'Open Helvetra',
    },
    meta: {
      description:
        'Helvetra on the AI Stage at Swiss Startup Days 2026 (Bern, 21 May), in conversation with Oleg Lavrovsky from the EPFL AI Center. Why all three Helvetra codebases are on GitHub, why we store nothing you type, and where the product stands today.',
      ogDescription:
        'Notes from the fireside chat on the AI Stage in Bern: open source as the only credible strategy, why we track nothing, and the honest state of Swiss German on Apertus today.',
    },
  },
  de: {
    title: 'Helvetra an den Swiss Startup Days 2026: Open Source als einzige Strategie',
    subtitle:
      'Notizen vom Fireside-Chat auf der AI Stage in Bern. Warum ein Einzelpersonen-Übersetzer aus der Schweiz, gebaut auf Apertus, jede Codezeile offengelegt hat, nichts trackt, was Sie eintippen, und sich nicht beeilt, laut zu wachsen.',
    s1: {
      heading: 'Auf der AI Stage in Bern',
      caption:
        'Helvetra auf der AI Stage an den Swiss Startup Days 2026. Oleg Lavrovsky (vorne rechts) und Alex Margot im Gespräch.',
      p1: 'Am 21. Mai 2026 fanden die <a href="https://startupdays.ch/" target="_blank" rel="noopener">Swiss Startup Days</a> im Kursaal Bern statt: über 40 Sessions, mehr als 125 Speaker, die üblichen Tracks zu Deep Tech, Fintech und Health Tech, und dieses Jahr eine eigene AI Stage, die den ganzen Tag lief. Der Slot auf dieser AI Stage gehörte <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Apertus</a>, und <strong><a href="https://www.linkedin.com/in/loleg/" target="_blank" rel="noopener">Oleg Lavrovsky</a></strong> holte Helvetra dazu, als kleine Produkt-Hälfte eines Fireside-Chats mit dem Titel <em>«Open Source AI as a Strategic Advantage»</em>.',
      p2: 'Oleg ist Data Engineer und Developer Relations Specialist im Apertus-Team am <a href="https://ai.epfl.ch/" target="_blank" rel="noopener">EPFL AI Center</a>, in enger Zusammenarbeit mit dem <a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a>. Er ordnete Apertus im globalen Bild ein; Helvetra war das kleine Produkt im Raum, das tatsächlich darauf aufbaut. Die vollständige 32-minütige Aufzeichnung gibt es auf <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">YouTube</a>; dieser Artikel vertieft, was für Helvetra-Nutzerinnen und -Nutzer naheliegt.',
    },
    s2: {
      heading: 'Warum es Helvetra überhaupt gibt',
      p1: 'Helvetra begann als Pain Point einer anderen Firma. Alex führt auch <a href="https://peerdom.com/" target="_blank" rel="noopener">Peerdom</a>, wo mehrsprachige Teams die Regel und nicht die Ausnahme sind und Übersetzen eine wiederkehrende Pflicht ist. Für Schweizer und europäische Organisationen kommen die bestehenden Optionen mit einer leiseren Reibung: wohin der Text eigentlich geht, sobald man auf Übersetzen drückt, und wer ihn behält.',
      p2: 'Als Apertus im September 2025 sein erstes Release veröffentlichte, gehostet bei Infomaniak, erschien das fehlende Stück auf einem Schweizer Server. Die Entscheidung, Helvetra zu bauen, fiel in derselben Woche.',
      p3: 'Auf der Bühne hat Alex es so unaufgeregt wie möglich beschrieben: ein Werkzeug, das abends gebaut wurde, auf einem Modell, das bereits existierte, um ein Problem zu lösen, das er ohnehin hatte. Dass es auch allen anderen in der Schweiz dient, die zwischen Sprachen arbeiten, ist ein angenehmer Nebeneffekt.',
    },
    s3: {
      heading: 'Open by default, nicht zufällig',
      p1: 'Die Eröffnungsthese der Session war einfach. Open Source ist keine Hobby-Position; für ein kleines Schweizer Produkt ist es die einzige glaubwürdige strategische Haltung gegenüber den US-Grosskonzernen.',
      p2: 'Helvetra setzt das in die Tat um. Alle drei Codebasen liegen auf GitHub in der <a href="https://github.com/Helvetra" target="_blank" rel="noopener">Helvetra-Organisation</a>: das <a href="https://github.com/Helvetra/frontend" target="_blank" rel="noopener">Nuxt-Frontend</a>, das <a href="https://github.com/Helvetra/backend" target="_blank" rel="noopener">FastAPI-Backend</a> und die <a href="https://github.com/Helvetra/ios" target="_blank" rel="noopener">iOS-App</a>. Jede Person kann nachlesen, was wir an Apertus schicken, wie wir eine Session behandeln, was wir speichern und (wichtiger) was wir nicht speichern.',
      p3: 'Der Datenschutz ist strukturell, nicht ein Absatz in den Richtlinien. Der Text, den Sie eintippen, wird an Apertus geschickt, die Übersetzung kommt zurück, die Seite rendert sie. <strong>Für diesen Text wird kein Datenbank-Eintrag erzeugt.</strong> Der einzige optionale Moment ist der Daumen-hoch / Daumen-runter-Button: Wenn Sie ihn drücken, fragen wir, ob Sie dieses eine Beispiel teilen möchten, damit wir uns verbessern können. Sonst wird nichts behalten.',
      p4: 'Während der Fragerunde hat Oleg die offensichtliche Open-Source-Einladung explizit gemacht: Die iOS-App ist auf GitHub, einen Android-Client gibt es noch nicht. Wer im Android-Universum lebt und einen will, findet den Code, der beim Schreiben hilft, dort.',
    },
    s4: {
      heading: 'Der ehrliche aktuelle Stand',
      p1: 'Alex war auf der Bühne offen darüber, wie klein Helvetra ist: kein Marketingbudget, kein Growth-Team, kein Gründer in Vollzeit auf dem Produkt. Die Rahmung war Absicht. Helvetra soll still nützlich sein, nicht laut gelauncht. Die Form des Publikums passt im Moment dazu.',
      quote:
        '«Ich habe das wirklich nicht gebaut, um davon zu leben. Ich habe es gebaut, weil ich dachte, das Produkt dort draussen ist einfach grossartig, also machen wir es einfach.»',
      p2: 'Der ehrlichste Vorbehalt betrifft das Schweizerdeutsch. Wie Imanol Schlag (Apertus Co-Lead) zwei Wochen vorher an der <a href="/de/news/apertus-at-uphill-conf-2026">Uphill Conf</a> sagte, hat der aktuelle Apertus-Checkpoint Schweizerdeutsch nur an einem einzigen Tag Post-Training gesehen. Das merkt man. Das Schweizerdeutsch, das Helvetra heute ausgibt, taugt für eine lockere Chat-Nachricht und ist noch holprig genug, dass wir empfehlen würden, alles, was Sie tatsächlich jemandem schicken, von einer Person mit Erstsprache Schweizerdeutsch gegenlesen zu lassen.',
      p3: 'Apertus 1.5 ist der nächste Checkpoint, und Oleg hat zusammengefasst, was er bringt: rund zwei Billionen zusätzliche Trainings-Tokens (mit Daten zu Gesundheit, Bildung und Justiz, die Partnerorganisationen beisteuern), Bild- und Audio-Inputs sowie einen agentischen / Instruction-Following-Schritt via Reinforcement Learning. Nach 1.5 wird Apertus 2 für ein Release Ende 2026 entworfen, mit einer Mixture-of-Experts-Architektur. Jedes dieser Release-Fenster ist auch ein Release-Fenster für Helvetra: Wenn das Modell besser im Schweizerdeutschen wird, wird unser Output besser, ohne Aufwand auf unserer Seite.',
    },
    s5: {
      heading: 'Ein bescheidenes Ziel',
      p1: 'Auf die Frage, ob es enttäuschend wäre, wenn Helvetra nur von, sagen wir, zwanzig Schweizer Kantonen genutzt würde, antwortete Alex, dass das bereits ein gutes Ergebnis wäre. Die Ehrlichkeit ist der Punkt. Helvetra muss keine Kategorie gewinnen; es muss für die Menschen nützlich sein, die mit dem Problem leben, das es löst.',
      p2: 'Das ist die Indie-Produkt-Version der Open-Source-These der Session: Ein kleines Team kann ein echtes, in der Schweiz gebautes Werkzeug vor Nutzerinnen und Nutzer stellen, ohne Erlaubnis, ohne Finanzierungsrunde und ohne Kompromisse bei der Datenresidenz. Das Gespräch in Bern war eine nützliche Erinnerung daran, dass wir mit dieser Wette nicht allein sind.',
    },
    resources: {
      heading: 'Ressourcen',
      items: [
        'Der Talk auf YouTube: <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">Open Source AI as a Strategic Advantage</a> (32 Min., Swiss Startup Days 2026)',
        'Swiss Startup Days: <a href="https://startupdays.ch/" target="_blank" rel="noopener">startupdays.ch</a>',
        'Helvetra-Quellcode: <a href="https://github.com/Helvetra" target="_blank" rel="noopener">github.com/Helvetra</a> (Frontend, Backend, iOS)',
        'Apertus auf Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Vorheriger Artikel zum selben Modell: <a href="/de/news/apertus-at-uphill-conf-2026">Apertus an der Uphill Conf 2026</a>',
      ],
    },
    cta: {
      text: 'Probieren Sie Helvetra aus und sehen Sie, was ein einzelnes Schweizer Modell, vollständig offen und in der Schweiz gehostet, für Ihre Übersetzungen leisten kann.',
      button: 'Helvetra öffnen',
    },
    meta: {
      description:
        'Helvetra auf der AI Stage an den Swiss Startup Days 2026 (Bern, 21. Mai), im Gespräch mit Oleg Lavrovsky vom EPFL AI Center. Warum alle drei Helvetra-Codebasen auf GitHub liegen, warum wir nichts speichern, was Sie eintippen, und wo das Produkt heute steht.',
      ogDescription:
        'Notizen aus dem Fireside-Chat auf der AI Stage in Bern: Open Source als einzige glaubwürdige Strategie, warum wir nichts tracken und der ehrliche Stand des Schweizerdeutschen auf Apertus heute.',
    },
  },
  fr: {
    title: 'Helvetra aux Swiss Startup Days 2026: l\'open source comme seule stratégie',
    subtitle:
      "Notes du fireside chat sur l'AI Stage à Berne. Pourquoi un traducteur suisse fait par une seule personne, construit sur Apertus, a ouvert chaque ligne de code, ne suit rien de ce que vous tapez, et n'est pas pressé de grandir bruyamment.",
    s1: {
      heading: 'Sur l\'AI Stage à Berne',
      caption:
        'Helvetra sur l\'AI Stage aux Swiss Startup Days 2026. Oleg Lavrovsky (au premier plan, à droite) et Alex Margot en discussion.',
      p1: 'Le 21 mai 2026, les <a href="https://startupdays.ch/" target="_blank" rel="noopener">Swiss Startup Days</a> ont investi le Kursaal de Berne: plus de 40 sessions, plus de 125 intervenants, les tracks habituels en deep tech, fintech et health tech, et cette année une AI Stage dédiée qui a tourné toute la journée. Le créneau sur cette AI Stage revenait à <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Apertus</a>, et <strong><a href="https://www.linkedin.com/in/loleg/" target="_blank" rel="noopener">Oleg Lavrovsky</a></strong> a embarqué Helvetra comme la moitié petit produit d\'un fireside chat intitulé <em>«Open Source AI as a Strategic Advantage»</em>.',
      p2: 'Oleg est Data Engineer et Developer Relations Specialist au sein de l\'équipe Apertus du <a href="https://ai.epfl.ch/" target="_blank" rel="noopener">EPFL AI Center</a>, en collaboration étroite avec l\'<a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a>. Il a situé Apertus dans le paysage global; Helvetra était le petit produit présent dans la salle qui s\'appuie effectivement dessus. L\'enregistrement complet de 32 minutes est sur <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">YouTube</a>; cet article approfondit ce qui a du sens pour les utilisateurs de Helvetra.',
    },
    s2: {
      heading: 'Pourquoi Helvetra existe',
      p1: 'Helvetra est née d\'un irritant d\'une autre entreprise. Alex dirige aussi <a href="https://peerdom.com/" target="_blank" rel="noopener">Peerdom</a>, où les équipes multilingues sont la norme plutôt que l\'exception, et la traduction une corvée récurrente. Pour les organisations suisses et européennes, les options existantes viennent aussi avec une friction plus discrète: où va vraiment le texte une fois qu\'on a appuyé sur traduire, et qui finit par le garder.',
      p2: 'Quand Apertus a publié sa première version en septembre 2025, hébergée chez Infomaniak, la pièce manquante est apparue sur un serveur suisse. La décision de construire Helvetra a été prise la même semaine.',
      p3: 'Sur scène, Alex l\'a décrite avec le moins d\'enjeu possible: un outil construit en soirée, sur un modèle qui existait déjà, pour résoudre un problème qu\'il avait déjà. Le fait que cela serve aussi toute autre personne en Suisse qui travaille entre les langues est un effet de bord agréable.',
    },
    s3: {
      heading: 'Open par défaut, pas par hasard',
      p1: 'La thèse d\'ouverture de la session était simple. L\'open source n\'est pas une posture amateur; pour un petit produit suisse, c\'est la seule position stratégique crédible face aux mastodontes américains.',
      p2: 'Helvetra met cela en pratique. Nos trois bases de code vivent sur GitHub sous l\'<a href="https://github.com/Helvetra" target="_blank" rel="noopener">organisation Helvetra</a>: le <a href="https://github.com/Helvetra/frontend" target="_blank" rel="noopener">frontend Nuxt</a>, le <a href="https://github.com/Helvetra/backend" target="_blank" rel="noopener">backend FastAPI</a> et l\'<a href="https://github.com/Helvetra/ios" target="_blank" rel="noopener">application iOS</a>. N\'importe qui peut lire ce que nous envoyons à Apertus, comment nous traitons une session, ce que nous stockons et (plus important) ce que nous ne stockons pas.',
      p3: 'La partie vie privée est structurelle, pas un paragraphe de politique. Le texte que vous tapez est envoyé à Apertus, la traduction revient, la page la rend. <strong>Aucune ligne de base de données n\'est créée pour ce texte.</strong> Le seul moment optionnel, c\'est le bouton pouce en haut / pouce en bas: si vous le pressez, nous vous demandons si vous voulez partager cet exemple précis pour nous aider à nous améliorer. Sinon, rien n\'est conservé.',
      p4: 'Pendant la séance de questions, Oleg a rendu l\'invitation open source évidente: l\'app iOS est sur GitHub, mais il n\'y a pas encore de client Android. Si vous vivez dans le monde Android et en voulez un, le code qui aide à l\'écrire est déjà là.',
    },
    s4: {
      heading: 'L\'état honnête actuel',
      p1: 'Alex a été direct sur scène sur la taille de Helvetra: pas de budget marketing, pas d\'équipe growth, pas de fondateur à plein temps sur le produit. Le cadrage était volontaire. Helvetra doit être discrètement utile, pas lancé bruyamment. La forme du public en ce moment correspond.',
      quote:
        '«Je ne l\'ai vraiment pas construit pour en vivre. Je l\'ai construit parce que je trouvais que le produit dehors était simplement génial, alors faisons-le.»',
      p2: 'L\'avertissement le plus honnête concerne le suisse allemand. Comme l\'a dit Imanol Schlag (co-lead d\'Apertus) deux semaines plus tôt à la <a href="/fr/news/apertus-at-uphill-conf-2026">Uphill Conf</a>, le checkpoint Apertus actuel n\'a vu du suisse allemand qu\'une seule journée de post-training. Cela se voit. Le suisse allemand qui sort de Helvetra aujourd\'hui convient pour un message de chat informel et reste assez rugueux pour qu\'on recommande de faire relire par un locuteur natif tout ce que vous envoyez réellement à quelqu\'un.',
      p3: 'Apertus 1.5 est le prochain checkpoint, et Oleg a rappelé ce qu\'il apporte: environ deux mille milliards de tokens d\'entraînement supplémentaires (avec des données santé, éducation et justice fournies par des organisations partenaires), des entrées image et audio, et une passe agentique / suivi d\'instructions via du reinforcement learning. Après 1.5, Apertus 2 est conçu pour une sortie fin 2026 avec une architecture mixture-of-experts. Chacune de ces fenêtres de sortie est aussi une fenêtre de sortie pour Helvetra: quand le modèle s\'améliore en suisse allemand, notre sortie s\'améliore aussi, sans travail de notre côté.',
    },
    s5: {
      heading: 'Un objectif modeste',
      p1: 'Sur la question de savoir s\'il serait décevant que Helvetra ne soit utilisée que par, disons, vingt cantons suisses, Alex a répondu que ce serait déjà un bon résultat. L\'honnêteté est le point. Helvetra n\'a pas besoin de gagner une catégorie; elle doit être utile aux personnes qui vivent déjà avec le problème qu\'elle résout.',
      p2: 'C\'est la version produit indé de la thèse open source de la session: une petite équipe peut mettre un véritable outil construit en Suisse devant des utilisateurs sans permission, sans tour de financement, et sans compromettre la résidence des données. La conversation à Berne était un rappel utile que nous ne sommes pas les seuls à faire ce pari.',
    },
    resources: {
      heading: 'Ressources',
      items: [
        'Le talk sur YouTube: <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">Open Source AI as a Strategic Advantage</a> (32 min, Swiss Startup Days 2026)',
        'Swiss Startup Days: <a href="https://startupdays.ch/" target="_blank" rel="noopener">startupdays.ch</a>',
        'Code source de Helvetra: <a href="https://github.com/Helvetra" target="_blank" rel="noopener">github.com/Helvetra</a> (frontend, backend, iOS)',
        'Apertus sur Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Article précédent sur le même modèle: <a href="/fr/news/apertus-at-uphill-conf-2026">Apertus à la Uphill Conf 2026</a>',
      ],
    },
    cta: {
      text: 'Essayez Helvetra et voyez ce qu\'un seul modèle suisse, entièrement ouvert et hébergé en Suisse, peut faire pour vos traductions.',
      button: 'Ouvrir Helvetra',
    },
    meta: {
      description:
        'Helvetra sur l\'AI Stage aux Swiss Startup Days 2026 (Berne, 21 mai), en conversation avec Oleg Lavrovsky du EPFL AI Center. Pourquoi les trois bases de code de Helvetra sont sur GitHub, pourquoi nous ne stockons rien de ce que vous tapez, et où en est le produit aujourd\'hui.',
      ogDescription:
        'Notes du fireside chat sur l\'AI Stage à Berne: l\'open source comme seule stratégie crédible, pourquoi nous ne suivons rien, et l\'état honnête du suisse allemand sur Apertus aujourd\'hui.',
    },
  },
  it: {
    title: 'Helvetra agli Swiss Startup Days 2026: l\'open source come unica strategia',
    subtitle:
      "Note dal fireside chat sull'AI Stage a Berna. Perché un traduttore svizzero fatto da una sola persona, costruito su Apertus, ha aperto ogni riga di codice, non traccia nulla di ciò che digiti e non ha fretta di crescere rumorosamente.",
    s1: {
      heading: 'Sull\'AI Stage a Berna',
      caption:
        'Helvetra sull\'AI Stage agli Swiss Startup Days 2026. Oleg Lavrovsky (in primo piano, a destra) e Alex Margot in conversazione.',
      p1: 'Il 21 maggio 2026, gli <a href="https://startupdays.ch/" target="_blank" rel="noopener">Swiss Startup Days</a> hanno occupato il Kursaal di Berna: più di 40 sessioni, oltre 125 relatori, i soliti track di deep tech, fintech e health tech, e quest\'anno un\'AI Stage dedicata che ha girato tutto il giorno. Lo slot su quell\'AI Stage spettava ad <a href="https://www.swiss-ai.org/" target="_blank" rel="noopener">Apertus</a>, e <strong><a href="https://www.linkedin.com/in/loleg/" target="_blank" rel="noopener">Oleg Lavrovsky</a></strong> ha portato Helvetra come la metà piccolo prodotto di un fireside chat intitolato <em>«Open Source AI as a Strategic Advantage»</em>.',
      p2: 'Oleg è Data Engineer e Developer Relations Specialist nel team Apertus al <a href="https://ai.epfl.ch/" target="_blank" rel="noopener">EPFL AI Center</a>, in stretta collaborazione con l\'<a href="https://ai.ethz.ch/" target="_blank" rel="noopener">ETH AI Center</a>. Ha collocato Apertus nel quadro globale; Helvetra era il piccolo prodotto in sala che ci sta sopra davvero. La registrazione completa di 32 minuti è su <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">YouTube</a>; questo articolo approfondisce ciò che ha senso espandere per gli utenti di Helvetra.',
    },
    s2: {
      heading: 'Perché Helvetra esiste',
      p1: 'Helvetra è nata come fastidio di un\'altra azienda. Alex dirige anche <a href="https://peerdom.com/" target="_blank" rel="noopener">Peerdom</a>, dove i team multilingua sono la norma più che l\'eccezione, e la traduzione è una scocciatura ricorrente. Per le organizzazioni svizzere ed europee, le opzioni esistenti arrivano anche con un attrito più silenzioso: dove finisce davvero il testo una volta premuto traduci, e chi se lo tiene.',
      p2: 'Quando Apertus ha pubblicato la sua prima release a settembre 2025, ospitata da Infomaniak, il pezzo mancante è apparso su un server svizzero. La decisione di costruire Helvetra è stata presa nella stessa settimana.',
      p3: 'Sul palco, Alex l\'ha descritta nel modo più tranquillo possibile: uno strumento costruito di sera, su un modello che esisteva già, per risolvere un problema che aveva già. Il fatto che serva anche a chiunque altro in Svizzera lavori tra le lingue è un piacevole effetto collaterale.',
    },
    s3: {
      heading: 'Open per default, non per caso',
      p1: 'La tesi di apertura della sessione era semplice. L\'open source non è una posizione amatoriale; per un piccolo prodotto svizzero è l\'unica postura strategica credibile contro i giganti americani.',
      p2: 'Helvetra lo mette in pratica. Tutti e tre i nostri codebase vivono su GitHub sotto l\'<a href="https://github.com/Helvetra" target="_blank" rel="noopener">organizzazione Helvetra</a>: il <a href="https://github.com/Helvetra/frontend" target="_blank" rel="noopener">frontend Nuxt</a>, il <a href="https://github.com/Helvetra/backend" target="_blank" rel="noopener">backend FastAPI</a> e l\'<a href="https://github.com/Helvetra/ios" target="_blank" rel="noopener">app iOS</a>. Chiunque può leggere cosa inviamo ad Apertus, come gestiamo una sessione, cosa memorizziamo e (più importante) cosa non memorizziamo.',
      p3: 'La parte privacy è strutturale, non un paragrafo nelle policy. Il testo che digiti viene inviato ad Apertus, la traduzione torna indietro, la pagina la mostra. <strong>Per quel testo non viene creata alcuna riga di database.</strong> L\'unico momento opzionale è il pulsante pollice in su / pollice in giù: se lo premi, ti chiediamo se vuoi condividere quel singolo esempio per aiutarci a migliorare. Altrimenti non viene trattenuto nulla.',
      p4: 'Durante le domande, Oleg ha reso esplicito l\'invito open source ovvio: l\'app iOS è su GitHub, ma non c\'è ancora un client Android. Se vivi nel mondo Android e ne vuoi uno, il codice che aiuta a scriverlo è già lì.',
    },
    s4: {
      heading: 'Lo stato attuale onesto',
      p1: 'Alex è stato schietto sul palco su quanto è piccola Helvetra: nessun budget di marketing, nessun team growth, nessun fondatore a tempo pieno sul prodotto. L\'inquadramento era voluto. Helvetra deve essere silenziosamente utile, non lanciata rumorosamente. La forma del pubblico in questo momento corrisponde.',
      quote:
        '«Non l\'ho davvero costruito per viverci. L\'ho costruito perché pensavo che il prodotto là fuori fosse semplicemente straordinario, quindi facciamolo.»',
      p2: 'L\'avvertenza più onesta riguarda il tedesco svizzero. Come ha detto Imanol Schlag (co-lead di Apertus) due settimane prima alla <a href="/it/news/apertus-at-uphill-conf-2026">Uphill Conf</a>, l\'attuale checkpoint Apertus ha visto il tedesco svizzero per una sola giornata di post-training. Si nota. Il tedesco svizzero che esce oggi da Helvetra va bene per un messaggio di chat informale ed è ancora abbastanza approssimativo da consigliare di farlo rileggere a un madrelingua per qualsiasi cosa tu mandi davvero a qualcuno.',
      p3: 'Apertus 1.5 è il prossimo checkpoint, e Oleg ha riepilogato cosa porta: circa due trilioni di token di training aggiuntivi (con dati di sanità, istruzione e giustizia forniti da organizzazioni partner), input immagine e audio, e una passata agentica / instruction-following tramite reinforcement learning. Dopo 1.5, Apertus 2 viene progettato per una release a fine 2026 con un\'architettura mixture-of-experts. Ognuna di queste finestre di release è anche una finestra di release per Helvetra: quando il modello migliora in tedesco svizzero, migliora anche il nostro output, senza lavoro dalla nostra parte.',
    },
    s5: {
      heading: 'Un obiettivo modesto',
      p1: 'Alla domanda se sarebbe stato deludente che Helvetra venisse usata solo da, diciamo, venti cantoni svizzeri, Alex ha risposto che sarebbe già un buon risultato. L\'onestà è il punto. Helvetra non deve vincere una categoria; deve essere utile alle persone che già vivono con il problema che risolve.',
      p2: 'È la versione prodotto indie della tesi open source della sessione: un piccolo team può mettere uno strumento davvero svizzero davanti agli utenti senza permesso, senza un round di finanziamento e senza compromessi sulla residenza dei dati. La conversazione a Berna è stata un utile promemoria che non siamo gli unici a fare questa scommessa.',
    },
    resources: {
      heading: 'Risorse',
      items: [
        'Il talk su YouTube: <a href="https://www.youtube.com/watch?v=ZUOW4ePXqF4" target="_blank" rel="noopener">Open Source AI as a Strategic Advantage</a> (32 min, Swiss Startup Days 2026)',
        'Swiss Startup Days: <a href="https://startupdays.ch/" target="_blank" rel="noopener">startupdays.ch</a>',
        'Codice sorgente di Helvetra: <a href="https://github.com/Helvetra" target="_blank" rel="noopener">github.com/Helvetra</a> (frontend, backend, iOS)',
        'Apertus su Hugging Face: <a href="https://huggingface.co/swiss-ai" target="_blank" rel="noopener">huggingface.co/swiss-ai</a>',
        'Articolo precedente sullo stesso modello: <a href="/it/news/apertus-at-uphill-conf-2026">Apertus alla Uphill Conf 2026</a>',
      ],
    },
    cta: {
      text: 'Prova Helvetra e scopri cosa può fare per le tue traduzioni un singolo modello svizzero, completamente aperto e ospitato in Svizzera.',
      button: 'Apri Helvetra',
    },
    meta: {
      description:
        'Helvetra sull\'AI Stage agli Swiss Startup Days 2026 (Berna, 21 maggio), in conversazione con Oleg Lavrovsky dell\'EPFL AI Center. Perché tutti e tre i codebase di Helvetra sono su GitHub, perché non memorizziamo nulla di ciò che digiti e dove si trova il prodotto oggi.',
      ogDescription:
        'Note dal fireside chat sull\'AI Stage a Berna: open source come unica strategia credibile, perché non tracciamo nulla e lo stato onesto del tedesco svizzero su Apertus oggi.',
    },
  },
} as const

const t = computed(() => content[locale.value as keyof typeof content] || content.en)

const canonical = computed(() => {
  const path = '/news/swiss-startup-days-2026'
  return locale.value === 'en'
    ? `https://helvetra.ch${path}`
    : `https://helvetra.ch/${locale.value}${path}`
})

// Per-article 1200×630 Open Graph image, manually composed by
// scripts/make-og-image.sh from the hero photo of the panel. Used for
// both the social-card meta tags and the Article JSON-LD `image` field
// (so AI/GEO crawlers see the per-article visual, not the site default).
const ogImageUrl = 'https://helvetra.ch/img/news/swiss-startup-days-2026/og.jpg'

useJsonLd(getArticleSchema({
  headline: t.value.title,
  description: t.value.subtitle,
  datePublished: '2026-06-07',
  dateModified: '2026-06-07',
  image: ogImageUrl,
}))

useHead(() => ({
  title: t.value.title,
  link: [{ rel: 'canonical', href: canonical.value }],
  meta: [
    { name: 'description', content: t.value.meta.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: t.value.title },
    { property: 'og:url', content: canonical.value },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: t.value.title },
    { property: 'article:published_time', content: '2026-06-07' },
    { property: 'article:section', content: 'News' },
    { property: 'article:tag', content: 'Open Source' },
    { property: 'article:tag', content: 'Apertus' },
    { property: 'article:tag', content: 'Swiss Startup Days' },
    { property: 'og:description', content: t.value.meta.ogDescription },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t.value.title },
    { name: 'twitter:image', content: ogImageUrl },
  ],
}))
</script>
