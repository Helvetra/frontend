<!--
  News article: Helvetra moves to Apertus 1.5.
  Peg: Apertus 1.5 released 24 July 2026 (ETH Zurich / EPFL / CSCS);
  Infomaniak adds it to their AI API in early August 2026 and Helvetra
  switches over. Same per-locale `content` object pattern as the other
  news articles. EN is the source of truth; DE/FR/IT follow the same
  per-locale structure. Swiss German notes in s4 are first-hand
  observations from testing 1.5 against Helvetra's prompts on 2026-08-04,
  not benchmark results (those are still to be published by the team).
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>{{ t.title }}</template>
      <template #subtitle>{{ t.subtitle }}</template>

      <ContentProseSection id="moved-forward" :title="t.s1.heading">
        <figure class="mb-10">
          <img
            :src="`/img/news/apertus-1-5-what-it-means-for-helvetra/apertus-1-5.jpg`"
            alt="The Apertus wordmark over the tagline 'Fully Open Foundation Model for Sovereign AI'."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2" v-html="t.s1.caption" />
        </figure>
        <p>{{ t.s1.p1 }}</p>
        <p>{{ t.s1.p2 }}</p>
      </ContentProseSection>

      <ContentProseSection id="what-changed" :title="t.s2.heading">
        <p>{{ t.s2.intro }}</p>
        <ul>
          <li v-for="item in t.s2.items" :key="item" v-html="item" />
        </ul>
        <p>{{ t.s2.note }}</p>
      </ContentProseSection>

      <ContentProseSection id="when-you-translate" :title="t.s3.heading">
        <p>{{ t.s3.p1 }}</p>
        <p>{{ t.s3.p2 }}</p>
      </ContentProseSection>

      <ContentProseSection id="swiss-german" :title="t.s4.heading">
        <p>{{ t.s4.p1 }}</p>
        <p>{{ t.s4.p2 }}</p>
        <p v-html="t.s4.p3" />
      </ContentProseSection>

      <ContentProseSection id="how-it-came-together" :title="t.s5.heading">
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

// Per-locale content. EN is the source of truth; DE/FR/IT are added once
// the English copy is approved. Until then every locale falls back to EN.
const content = {
  en: {
    title: 'Helvetra moves to Apertus 1.5: what changes, and what we\'re watching',
    subtitle:
      'The Swiss model behind Helvetra just had a major update, and Infomaniak now serves it. Here is what improves for your translations, and the one thing, Swiss German, that we are honestly not ready to promise yet.',
    s1: {
      heading: 'The model under Helvetra just moved forward',
      caption:
        'Apertus, the fully open Swiss model Helvetra runs on. (Image: Apertus / Swiss AI Initiative)',
      p1: 'On 24 July 2026, the team behind Apertus (ETH Zurich, EPFL and the Swiss National Supercomputing Centre) released Apertus 1.5. It is not a new model built from scratch but a continued training of the one Helvetra already used: the same Swiss, fully open foundation, carried further. For the 70B model that powers our translations, that meant two trillion additional tokens of training on top of version 1.0.',
      p2: 'On 4 August 2026, Infomaniak added Apertus 1.5 to the AI infrastructure we run on, and we pointed Helvetra\'s translation calls at the new version. For us it was a small change: one model name swapped for another, and a restart. For you it was invisible: no downtime, nothing to do, and from that moment the translations simply come from 1.5.',
    },
    s2: {
      heading: 'What changed in 1.5',
      intro: 'The update is about capability and reliability more than raw size. The parts that matter:',
      items: [
        '<strong>A much longer memory.</strong> The context window grows fourfold, from 64k to 262,144 tokens, so the model can hold far more text at once.',
        '<strong>Tighter instruction-following.</strong> The updated post-training makes the model stick more precisely to what it is told, with more predictable output.',
        '<strong>It can now see.</strong> Version 1.5 accepts images alongside text. Audio input exists too, though the team still calls it experimental.',
        '<strong>Better tool use and an optional reasoning mode</strong>, aimed at developers building agents on top of the model.',
      ],
      note: 'A full technical report and benchmark results are due in the coming weeks, so the precise numbers are not public yet. We are not going to quote figures that do not exist.',
    },
    s3: {
      heading: 'What it means when you translate',
      p1: 'Not every headline feature matters for a translation tool, so here is the honest split. The one most likely to help you is the tighter instruction-following. Helvetra asks the model to do exactly one thing, translate, and nothing else. A model that obeys that more reliably means cleaner results and fewer stray, chatty, or off-target answers. The longer context also makes it realistic to translate much longer passages in a single pass than we comfortably handle today.',
      p2: 'Some of the new abilities we will probably leave switched off, and we would rather say so. The reasoning "thinking mode" is built for hard problem-solving, not translation, and turning it on would mostly make you wait longer for the same sentence. Image input is genuinely interesting, translating the text inside a screenshot or a photo is an obvious future feature, but Helvetra is text-only today and we are not going to pretend otherwise.',
    },
    s4: {
      heading: 'Swiss German: what we\'re seeing so far',
      p1: 'This is the one most of you actually care about, and it is where we are most careful. Swiss German is where Apertus has been weakest, and we have said so plainly before. Version 1.5 does not publish a Swiss German number yet, the language-by-language benchmarks are part of a technical report still to come, so we did the next best thing: on the day we switched, we ran Apertus 1.5 through Helvetra\'s own translation prompts and watched how it behaved. What follows is a first look, not a benchmark.',
      p2: 'The encouraging part: it produces Swiss German dialect rather than refusing. Ask for Bernese and "Wie bisch hüt?" comes out as you would hope. Formality holds in the other languages too, du and Sie, tu and vous. And, importantly for a translation tool, it still resists prompt injection: give it a sentence with a hidden instruction and it translates that instruction rather than obeying it. That last point matters more than it sounds, because it is what keeps Helvetra doing only its one job.',
      p3: 'The rough edges are the ones you would expect. It sometimes leaves a set greeting like "Grüezi mitenand" untranslated, and telling Swiss German apart from standard German automatically is still unreliable, a clearly dialectal sentence can be read as plain German. So 1.5 is a step, not a finish line. The real measurement is still you: if you translate into Swiss German, use the thumbs up or thumbs down and tell us. You are better placed to judge your own dialect than any score we could quote.',
    },
    s5: {
      heading: 'How this one came together',
      p1: 'A note on how we got here, because it says something about why we built Helvetra the way we did. Every layer of Helvetra runs on Infomaniak, the Swiss host whose independence we <a href="/news/why-helvetra-runs-on-infomaniak">wrote about last month</a>, and Apertus, the Swiss open model we covered <a href="/news/apertus-at-uphill-conf-2026">after Uphill Conf</a>. When 1.5 came out, we did not just wait and hope. We wrote to Infomaniak directly to ask when it would reach their AI API. The answer came back fast, and the wait turned out to be short.',
      p2: 'That is the quiet advantage of a small, sovereign stack. The people who build the model publish it in the open, the Swiss host we chose puts it on tap, and a one-person tool can pass it on to you within a day of it going live. No layer in that chain answers to anyone outside the country. When the next version lands, we will do the same thing again.',
    },
    resources: {
      heading: 'Resources',
      items: [
        'The announcement: <a href="https://apertus-ai.org/articles/2026-07-apertus-1-5/" target="_blank" rel="noopener">Apertus 1.5</a> (apertus-ai.org)',
        'The model we run: <a href="https://huggingface.co/swiss-ai/Apertus-v1.5-70B" target="_blank" rel="noopener">Apertus v1.5 70B</a> (Hugging Face)',
        'The write-up: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-15-building-the-next-generation-of-open-ai-infrastructure" target="_blank" rel="noopener">Building the next generation of open AI infrastructure</a> (CSCS)',
        'Background on the model: <a href="/news/apertus-at-uphill-conf-2026">Apertus at Uphill Conf 2026</a>',
        'Why we host on Infomaniak: <a href="/news/why-helvetra-runs-on-infomaniak">Infomaniak becomes a foundation</a>',
      ],
    },
    cta: {
      text: 'Try Helvetra on Apertus 1.5, and if you work in Swiss German, tell us honestly how it does.',
      button: 'Open Helvetra',
    },
    meta: {
      description:
        'Apertus 1.5 (released 24 July 2026) is now served by Infomaniak, and Helvetra runs it. What improves for your translations, what we are leaving switched off, and an honest first look at Swiss German on 1.5, dialect output that works, auto-detection that still does not.',
      ogDescription:
        'The Swiss model behind Helvetra just had a major update. What changes for your translations with Apertus 1.5, and the one thing, Swiss German, we are not ready to promise yet.',
    },
  },
  de: {
    title: `Helvetra wechselt zu Apertus 1.5: was sich ändert und worauf wir achten`,
    subtitle:
      `Das Schweizer Modell hinter Helvetra hat ein grosses Update erhalten, und Infomaniak stellt es jetzt bereit. Hier steht, was sich für Ihre Übersetzungen verbessert, und die eine Sache, Schweizerdeutsch, die wir ehrlicherweise noch nicht versprechen können.`,
    s1: {
      heading: `Das Modell unter Helvetra ist einen Schritt weiter`,
      caption:
        `Apertus, das vollständig offene Schweizer Modell, auf dem Helvetra läuft. (Bild: Apertus / Swiss AI Initiative)`,
      p1: `Am 24. Juli 2026 hat das Team hinter Apertus (ETH Zürich, EPFL und das Schweizer Nationale Hochleistungsrechenzentrum CSCS) Apertus 1.5 veröffentlicht. Es ist kein von Grund auf neues Modell, sondern ein weitergeführtes Training desjenigen, das Helvetra bereits nutzte: dasselbe Schweizer, vollständig offene Fundament, weitergedacht. Für das 70B-Modell, das unsere Übersetzungen antreibt, bedeutete das zwei Billionen zusätzliche Trainings-Tokens gegenüber Version 1.0.`,
      p2: `Am 4. August 2026 hat Infomaniak Apertus 1.5 zu der KI-Infrastruktur hinzugefügt, auf der wir laufen, und wir haben Helvetras Übersetzungsaufrufe auf die neue Version umgestellt. Für uns war das eine kleine Änderung: ein Modellname gegen einen anderen getauscht, plus ein Neustart. Für Sie war es unsichtbar: kein Unterbruch, nichts zu tun, und ab diesem Moment kommen die Übersetzungen einfach von 1.5.`,
    },
    s2: {
      heading: `Was sich in 1.5 geändert hat`,
      intro: `Beim Update geht es mehr um Fähigkeiten und Zuverlässigkeit als um schiere Grösse. Die Teile, die zählen:`,
      items: [
        `<strong>Ein viel längeres Gedächtnis.</strong> Das Kontextfenster wächst um das Vierfache, von 64k auf 262 144 Tokens, sodass das Modell viel mehr Text auf einmal halten kann.`,
        `<strong>Genaueres Befolgen von Anweisungen.</strong> Das überarbeitete Post-Training bringt das Modell dazu, sich präziser an das zu halten, was ihm gesagt wird, mit vorhersehbarerem Output.`,
        `<strong>Es kann jetzt sehen.</strong> Version 1.5 nimmt Bilder zusätzlich zu Text an. Audio-Eingabe gibt es ebenfalls, doch das Team nennt sie noch experimentell.`,
        `<strong>Bessere Werkzeugnutzung und ein optionaler Denkmodus</strong>, gedacht für Entwicklerinnen und Entwickler, die Agenten auf dem Modell aufbauen.`,
      ],
      note: `Ein vollständiger technischer Bericht und Benchmark-Ergebnisse folgen in den kommenden Wochen, die genauen Zahlen sind also noch nicht öffentlich. Wir werden keine Zahlen nennen, die es nicht gibt.`,
    },
    s3: {
      heading: `Was das beim Übersetzen bedeutet`,
      p1: `Nicht jede grosse Neuerung ist für ein Übersetzungswerkzeug relevant, hier also die ehrliche Aufteilung. Am ehesten hilft Ihnen das genauere Befolgen von Anweisungen. Helvetra bittet das Modell, genau eine Sache zu tun, zu übersetzen, und sonst nichts. Ein Modell, das dem zuverlässiger folgt, bedeutet sauberere Ergebnisse und weniger abschweifende, geschwätzige oder unpassende Antworten. Das längere Kontextfenster macht es zudem realistisch, viel längere Passagen in einem Durchgang zu übersetzen, als wir das heute bequem tun.`,
      p2: `Einige der neuen Fähigkeiten werden wir wohl ausgeschaltet lassen, und das sagen wir lieber offen. Der «Denkmodus» ist für schwieriges Problemlösen gebaut, nicht fürs Übersetzen, und ihn einzuschalten würde Sie meist nur länger auf denselben Satz warten lassen. Bild-Eingabe ist wirklich interessant, den Text in einem Screenshot oder einem Foto zu übersetzen ist eine naheliegende künftige Funktion, aber Helvetra ist heute reiner Text, und das tun wir nicht so, als wäre es anders.`,
    },
    s4: {
      heading: `Schweizerdeutsch: was wir bisher sehen`,
      p1: `Das ist die Sache, die den meisten von Ihnen wirklich wichtig ist, und hier sind wir am vorsichtigsten. Schweizerdeutsch ist da, wo Apertus am schwächsten war, und das haben wir zuvor klar gesagt. Version 1.5 veröffentlicht noch keine Schweizerdeutsch-Zahl, die sprachweisen Benchmarks sind Teil eines technischen Berichts, der noch aussteht. Also haben wir das Naheliegendste getan: Am Tag der Umstellung haben wir Apertus 1.5 durch Helvetras eigene Übersetzungs-Prompts geschickt und beobachtet, wie es sich verhält. Was folgt, ist ein erster Blick, kein Benchmark.`,
      p2: `Das Ermutigende: Es erzeugt Schweizerdeutsch-Dialekt, statt zu verweigern. Bitten Sie um Berndeutsch, und «Wie bisch hüt?» kommt so heraus, wie man es sich erhofft. Auch die Höflichkeitsform hält in den anderen Sprachen, du und Sie, tu und vous. Und, wichtig für ein Übersetzungswerkzeug, es widersteht weiterhin Prompt Injection: Geben Sie ihm einen Satz mit einer versteckten Anweisung, und es übersetzt diese Anweisung, statt ihr zu gehorchen. Dieser letzte Punkt zählt mehr, als er klingt, denn er ist es, der Helvetra bei seiner einen Aufgabe hält.`,
      p3: `Die rauen Kanten sind die, die man erwartet. Es lässt manchmal einen festen Gruss wie «Grüezi mitenand» unübersetzt, und Schweizerdeutsch automatisch von Hochdeutsch zu unterscheiden ist noch unzuverlässig, ein klar dialektaler Satz kann als reines Deutsch gelesen werden. 1.5 ist also ein Schritt, kein Ziel. Die eigentliche Messung sind weiterhin Sie: Wenn Sie ins Schweizerdeutsche übersetzen, nutzen Sie den Daumen hoch oder runter und sagen Sie es uns. Sie können Ihren eigenen Dialekt besser beurteilen als jede Zahl, die wir nennen könnten.`,
    },
    s5: {
      heading: `Wie dieser Artikel zustande kam`,
      p1: `Eine Anmerkung dazu, wie wir hierher kamen, weil sie etwas darüber sagt, warum wir Helvetra so gebaut haben, wie wir es getan haben. Jede Schicht von Helvetra läuft auf Infomaniak, dem Schweizer Host, über dessen Unabhängigkeit wir <a href="/de/news/why-helvetra-runs-on-infomaniak">letzten Monat geschrieben haben</a>, und auf Apertus, dem offenen Schweizer Modell, das wir <a href="/de/news/apertus-at-uphill-conf-2026">nach der Uphill Conf</a> behandelt haben. Als 1.5 herauskam, mussten wir nicht bloss warten und hoffen. Wir haben Infomaniak direkt gefragt, wann es auf ihre KI-API kommt. Die Antwort kam schnell, und das Warten war kurz.`,
      p2: `Das ist der stille Vorteil eines kleinen, souveränen Stacks. Die Leute, die das Modell bauen, veröffentlichen es offen, der Schweizer Host, den wir gewählt haben, stellt es bereit, und ein Ein-Personen-Werkzeug kann es Ihnen innerhalb eines Tages nach dem Go-live weitergeben. Keine Schicht in dieser Kette ist jemandem ausserhalb des Landes verpflichtet. Wenn die nächste Version kommt, machen wir genau dasselbe wieder.`,
    },
    resources: {
      heading: `Ressourcen`,
      items: [
        `Die Ankündigung: <a href="https://apertus-ai.org/articles/2026-07-apertus-1-5/" target="_blank" rel="noopener">Apertus 1.5</a> (apertus-ai.org)`,
        `Das Modell, das wir betreiben: <a href="https://huggingface.co/swiss-ai/Apertus-v1.5-70B" target="_blank" rel="noopener">Apertus v1.5 70B</a> (Hugging Face)`,
        `Der Bericht: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-15-building-the-next-generation-of-open-ai-infrastructure" target="_blank" rel="noopener">Building the next generation of open AI infrastructure</a> (CSCS)`,
        `Hintergrund zum Modell: <a href="/de/news/apertus-at-uphill-conf-2026">Apertus an der Uphill Conf 2026</a>`,
        `Warum wir bei Infomaniak hosten: <a href="/de/news/why-helvetra-runs-on-infomaniak">Infomaniak wird zur Stiftung</a>`,
      ],
    },
    cta: {
      text: `Probieren Sie Helvetra mit Apertus 1.5 aus, und wenn Sie mit Schweizerdeutsch arbeiten, sagen Sie uns ehrlich, wie es sich schlägt.`,
      button: `Helvetra öffnen`,
    },
    meta: {
      description:
        `Apertus 1.5 (veröffentlicht am 24. Juli 2026) wird jetzt von Infomaniak bereitgestellt, und Helvetra nutzt es. Was sich für Ihre Übersetzungen verbessert, was wir ausgeschaltet lassen, und ein ehrlicher erster Blick auf Schweizerdeutsch mit 1.5: Dialektausgabe, die funktioniert, automatische Erkennung, die es noch nicht tut.`,
      ogDescription:
        `Das Schweizer Modell hinter Helvetra hat ein grosses Update erhalten. Was sich mit Apertus 1.5 für Ihre Übersetzungen ändert, und die eine Sache, Schweizerdeutsch, die wir noch nicht versprechen können.`,
    },
  },
  fr: {
    title: `Helvetra passe à Apertus 1.5 : ce qui change, et ce que nous surveillons`,
    subtitle:
      `Le modèle suisse derrière Helvetra vient de recevoir une mise à jour majeure, et Infomaniak le propose désormais. Voici ce qui s'améliore pour vos traductions, et la seule chose, le suisse allemand, que nous ne pouvons honnêtement pas encore promettre.`,
    s1: {
      heading: `Le modèle sous Helvetra vient d'avancer`,
      caption:
        `Apertus, le modèle suisse entièrement ouvert sur lequel tourne Helvetra. (Image : Apertus / Swiss AI Initiative)`,
      p1: `Le 24 juillet 2026, l'équipe derrière Apertus (l'ETH Zurich, l'EPFL et le Centre suisse de calcul scientifique CSCS) a publié Apertus 1.5. Ce n'est pas un nouveau modèle parti de zéro, mais un entraînement prolongé de celui que Helvetra utilisait déjà : la même base suisse, entièrement ouverte, poussée plus loin. Pour le modèle 70B qui propulse nos traductions, cela représente deux mille milliards de tokens d'entraînement supplémentaires par rapport à la version 1.0.`,
      p2: `Le 4 août 2026, Infomaniak a ajouté Apertus 1.5 à l'infrastructure d'IA sur laquelle nous tournons, et nous avons dirigé les appels de traduction de Helvetra vers la nouvelle version. Pour nous, c'était un petit changement : un nom de modèle remplacé par un autre, et un redémarrage. Pour vous, c'était invisible : aucune interruption, rien à faire, et à partir de ce moment les traductions viennent simplement de 1.5.`,
    },
    s2: {
      heading: `Ce qui a changé dans 1.5`,
      intro: `La mise à jour porte davantage sur les capacités et la fiabilité que sur la taille brute. Les parties qui comptent :`,
      items: [
        `<strong>Une mémoire bien plus longue.</strong> La fenêtre de contexte quadruple, passant de 64k à 262 144 tokens, si bien que le modèle peut garder beaucoup plus de texte à la fois.`,
        `<strong>Un meilleur suivi des instructions.</strong> Le post-entraînement revu amène le modèle à s'en tenir plus précisément à ce qu'on lui dit, avec une sortie plus prévisible.`,
        `<strong>Il peut désormais voir.</strong> La version 1.5 accepte des images en plus du texte. L'entrée audio existe aussi, mais l'équipe la qualifie encore d'expérimentale.`,
        `<strong>Meilleure utilisation d'outils et un mode de raisonnement optionnel</strong>, destinés aux développeurs qui construisent des agents sur le modèle.`,
      ],
      note: `Un rapport technique complet et des résultats de benchmarks suivront dans les prochaines semaines, les chiffres précis ne sont donc pas encore publics. Nous n'allons pas citer des chiffres qui n'existent pas.`,
    },
    s3: {
      heading: `Ce que cela signifie quand vous traduisez`,
      p1: `Toutes les nouveautés phares ne comptent pas pour un outil de traduction, voici donc le partage honnête. Celle qui vous aidera le plus est le meilleur suivi des instructions. Helvetra demande au modèle de faire exactement une chose, traduire, et rien d'autre. Un modèle qui obéit à cela plus fidèlement, ce sont des résultats plus propres et moins de réponses qui divaguent, bavardent ou tombent à côté. La fenêtre de contexte plus longue rend aussi réaliste la traduction de passages bien plus longs en une seule passe qu'aujourd'hui.`,
      p2: `Certaines des nouvelles capacités, nous les laisserons probablement désactivées, et nous préférons le dire. Le « mode de raisonnement » est fait pour résoudre des problèmes difficiles, pas pour traduire, et l'activer ne ferait surtout que vous faire attendre plus longtemps la même phrase. L'entrée image est vraiment intéressante, traduire le texte dans une capture d'écran ou une photo est une fonctionnalité future évidente, mais Helvetra ne traite aujourd'hui que du texte, et nous n'allons pas faire comme si c'était autrement.`,
    },
    s4: {
      heading: `Suisse allemand : ce que nous observons pour l'instant`,
      p1: `C'est la chose qui tient le plus à cœur à la plupart d'entre vous, et c'est là que nous sommes les plus prudents. Le suisse allemand est le point faible d'Apertus, et nous l'avons dit clairement par le passé. La version 1.5 ne publie pas encore de chiffre pour le suisse allemand, les benchmarks langue par langue font partie d'un rapport technique encore à venir. Nous avons donc fait au mieux : le jour de la bascule, nous avons passé Apertus 1.5 à travers les propres prompts de traduction de Helvetra et observé son comportement. Ce qui suit est un premier aperçu, pas un benchmark.`,
      p2: `Le point encourageant : il produit du dialecte suisse allemand au lieu de refuser. Demandez du bernois, et « Wie bisch hüt ? » sort comme on l'espère. La forme de politesse tient aussi dans les autres langues, du et Sie, tu et vous. Et, important pour un outil de traduction, il résiste toujours à l'injection de prompt : donnez-lui une phrase contenant une instruction cachée, et il traduit cette instruction au lieu de lui obéir. Ce dernier point compte plus qu'il n'y paraît, car c'est lui qui maintient Helvetra sur sa seule tâche.`,
      p3: `Les aspérités sont celles auxquelles on s'attend. Il laisse parfois une salutation figée comme « Grüezi mitenand » non traduite, et distinguer automatiquement le suisse allemand de l'allemand standard reste peu fiable, une phrase clairement dialectale peut être lue comme de l'allemand ordinaire. 1.5 est donc une étape, pas une ligne d'arrivée. La vraie mesure, c'est toujours vous : si vous traduisez en suisse allemand, utilisez le pouce en haut ou en bas et dites-le-nous. Vous êtes mieux placés pour juger votre propre dialecte que n'importe quel score que nous pourrions citer.`,
    },
    s5: {
      heading: `Comment cet article a vu le jour`,
      p1: `Un mot sur la manière dont nous en sommes arrivés là, parce qu'elle dit quelque chose sur les raisons pour lesquelles nous avons construit Helvetra ainsi. Chaque couche de Helvetra tourne sur Infomaniak, l'hébergeur suisse dont nous avons <a href="/fr/news/why-helvetra-runs-on-infomaniak">parlé le mois dernier</a> à propos de son indépendance, et sur Apertus, le modèle suisse ouvert que nous avons couvert <a href="/fr/news/apertus-at-uphill-conf-2026">après la Uphill Conf</a>. Quand 1.5 est sorti, nous n'avons pas seulement attendu en espérant. Nous avons écrit directement à Infomaniak pour demander quand il arriverait sur leur API d'IA. La réponse est venue vite, et l'attente a été courte.`,
      p2: `C'est l'avantage discret d'un stack petit et souverain. Ceux qui construisent le modèle le publient ouvertement, l'hébergeur suisse que nous avons choisi le met à disposition, et un outil fait par une seule personne peut vous le transmettre dans la journée suivant sa mise en ligne. Aucune couche de cette chaîne ne répond à quiconque hors du pays. Quand la prochaine version arrivera, nous ferons exactement la même chose.`,
    },
    resources: {
      heading: `Ressources`,
      items: [
        `L'annonce : <a href="https://apertus-ai.org/articles/2026-07-apertus-1-5/" target="_blank" rel="noopener">Apertus 1.5</a> (apertus-ai.org)`,
        `Le modèle que nous utilisons : <a href="https://huggingface.co/swiss-ai/Apertus-v1.5-70B" target="_blank" rel="noopener">Apertus v1.5 70B</a> (Hugging Face)`,
        `Le compte rendu : <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-15-building-the-next-generation-of-open-ai-infrastructure" target="_blank" rel="noopener">Building the next generation of open AI infrastructure</a> (CSCS)`,
        `Contexte sur le modèle : <a href="/fr/news/apertus-at-uphill-conf-2026">Apertus à la Uphill Conf 2026</a>`,
        `Pourquoi nous hébergeons chez Infomaniak : <a href="/fr/news/why-helvetra-runs-on-infomaniak">Infomaniak devient une fondation</a>`,
      ],
    },
    cta: {
      text: `Essayez Helvetra avec Apertus 1.5, et si vous travaillez en suisse allemand, dites-nous honnêtement ce qu'il vaut.`,
      button: `Ouvrir Helvetra`,
    },
    meta: {
      description:
        `Apertus 1.5 (publié le 24 juillet 2026) est désormais servi par Infomaniak, et Helvetra l'utilise. Ce qui s'améliore pour vos traductions, ce que nous laissons désactivé, et un premier aperçu honnête du suisse allemand sur 1.5 : une sortie en dialecte qui fonctionne, une détection automatique qui ne fonctionne pas encore.`,
      ogDescription:
        `Le modèle suisse derrière Helvetra vient de recevoir une mise à jour majeure. Ce qui change pour vos traductions avec Apertus 1.5, et la seule chose, le suisse allemand, que nous ne pouvons pas encore promettre.`,
    },
  },
  it: {
    title: `Helvetra passa ad Apertus 1.5: cosa cambia e cosa stiamo osservando`,
    subtitle:
      `Il modello svizzero dietro Helvetra ha appena ricevuto un aggiornamento importante, e Infomaniak ora lo offre. Ecco cosa migliora per le tue traduzioni, e l'unica cosa, il tedesco svizzero, che onestamente non possiamo ancora promettere.`,
    s1: {
      heading: `Il modello sotto Helvetra ha fatto un passo avanti`,
      caption:
        `Apertus, il modello svizzero completamente aperto su cui gira Helvetra. (Immagine: Apertus / Swiss AI Initiative)`,
      p1: `Il 24 luglio 2026, il team dietro Apertus (ETH Zurigo, EPFL e il Centro svizzero di calcolo scientifico CSCS) ha pubblicato Apertus 1.5. Non è un modello nuovo costruito da zero, ma un addestramento proseguito di quello che Helvetra già usava: la stessa base svizzera, completamente aperta, portata più avanti. Per il modello 70B che alimenta le nostre traduzioni, ciò ha significato duemila miliardi di token di addestramento in più rispetto alla versione 1.0.`,
      p2: `Il 4 agosto 2026, Infomaniak ha aggiunto Apertus 1.5 all'infrastruttura di IA su cui giriamo, e abbiamo indirizzato le chiamate di traduzione di Helvetra alla nuova versione. Per noi è stato un piccolo cambiamento: un nome di modello sostituito con un altro, e un riavvio. Per te è stato invisibile: nessuna interruzione, niente da fare, e da quel momento le traduzioni arrivano semplicemente da 1.5.`,
    },
    s2: {
      heading: `Cosa è cambiato in 1.5`,
      intro: `L'aggiornamento riguarda più le capacità e l'affidabilità che la dimensione pura. Le parti che contano:`,
      items: [
        `<strong>Una memoria molto più lunga.</strong> La finestra di contesto quadruplica, da 64k a 262 144 token, così il modello può tenere molto più testo alla volta.`,
        `<strong>Un rispetto più preciso delle istruzioni.</strong> Il post-addestramento rivisto porta il modello ad attenersi con più precisione a ciò che gli viene detto, con un output più prevedibile.`,
        `<strong>Ora può vedere.</strong> La versione 1.5 accetta immagini oltre al testo. Esiste anche l'input audio, ma il team lo definisce ancora sperimentale.`,
        `<strong>Migliore uso degli strumenti e una modalità di ragionamento opzionale</strong>, pensati per gli sviluppatori che costruiscono agenti sul modello.`,
      ],
      note: `Un rapporto tecnico completo e i risultati dei benchmark seguiranno nelle prossime settimane, quindi i numeri precisi non sono ancora pubblici. Non citeremo cifre che non esistono.`,
    },
    s3: {
      heading: `Cosa significa quando traduci`,
      p1: `Non tutte le novità di punta contano per uno strumento di traduzione, ecco quindi la divisione onesta. Quella che più probabilmente ti aiuterà è il migliore rispetto delle istruzioni. Helvetra chiede al modello di fare esattamente una cosa, tradurre, e nient'altro. Un modello che obbedisce a questo in modo più affidabile significa risultati più puliti e meno risposte divaganti, chiacchierone o fuori bersaglio. La finestra di contesto più lunga rende inoltre realistico tradurre passaggi molto più lunghi in un solo passaggio di quanto facciamo comodamente oggi.`,
      p2: `Alcune delle nuove capacità le lasceremo probabilmente disattivate, e preferiamo dirlo. La «modalità di ragionamento» è fatta per risolvere problemi difficili, non per tradurre, e attivarla ti farebbe soprattutto aspettare più a lungo per la stessa frase. L'input immagine è davvero interessante, tradurre il testo dentro uno screenshot o una foto è un'ovvia funzione futura, ma Helvetra oggi è solo testo, e non faremo finta che sia diverso.`,
    },
    s4: {
      heading: `Tedesco svizzero: cosa stiamo vedendo finora`,
      p1: `Questa è la cosa a cui la maggior parte di voi tiene davvero, ed è qui che siamo più cauti. Il tedesco svizzero è il punto in cui Apertus è stato più debole, e lo abbiamo detto chiaramente in passato. La versione 1.5 non pubblica ancora un dato sul tedesco svizzero, i benchmark lingua per lingua fanno parte di un rapporto tecnico ancora in arrivo. Abbiamo quindi fatto la cosa migliore possibile: il giorno del passaggio, abbiamo fatto passare Apertus 1.5 attraverso i prompt di traduzione di Helvetra e osservato come si comportava. Quello che segue è un primo sguardo, non un benchmark.`,
      p2: `La parte incoraggiante: produce dialetto tedesco svizzero invece di rifiutarsi. Chiedi il bernese, e «Wie bisch hüt?» esce come si spera. Anche la forma di cortesia regge nelle altre lingue, du e Sie, tu e vous. E, cosa importante per uno strumento di traduzione, resiste ancora al prompt injection: dagli una frase con un'istruzione nascosta, e traduce quell'istruzione invece di obbedirle. Quest'ultimo punto conta più di quanto sembri, perché è ciò che tiene Helvetra sul suo unico compito.`,
      p3: `Le imperfezioni sono quelle che ci si aspetta. A volte lascia un saluto fisso come «Grüezi mitenand» non tradotto, e distinguere automaticamente il tedesco svizzero dal tedesco standard è ancora inaffidabile, una frase chiaramente dialettale può essere letta come tedesco comune. 1.5 è quindi un passo, non un traguardo. La vera misura sei sempre tu: se traduci in tedesco svizzero, usa il pollice su o giù e faccelo sapere. Sei in una posizione migliore per giudicare il tuo dialetto di qualsiasi punteggio potremmo citare.`,
    },
    s5: {
      heading: `Come è nato questo articolo`,
      p1: `Una nota su come ci siamo arrivati, perché dice qualcosa sul perché abbiamo costruito Helvetra così. Ogni livello di Helvetra gira su Infomaniak, l'host svizzero della cui indipendenza abbiamo <a href="/it/news/why-helvetra-runs-on-infomaniak">scritto il mese scorso</a>, e su Apertus, il modello svizzero aperto di cui ci siamo occupati <a href="/it/news/apertus-at-uphill-conf-2026">dopo la Uphill Conf</a>. Quando è uscito 1.5, non ci siamo limitati ad aspettare e sperare. Abbiamo scritto direttamente a Infomaniak per chiedere quando sarebbe arrivato sulla loro API di IA. La risposta è arrivata in fretta, e l'attesa è stata breve.`,
      p2: `È il vantaggio silenzioso di uno stack piccolo e sovrano. Chi costruisce il modello lo pubblica apertamente, l'host svizzero che abbiamo scelto lo mette a disposizione, e uno strumento fatto da una sola persona può passartelo entro un giorno dalla messa in linea. Nessun livello di questa catena risponde a qualcuno fuori dal Paese. Quando arriverà la prossima versione, faremo di nuovo esattamente la stessa cosa.`,
    },
    resources: {
      heading: `Risorse`,
      items: [
        `L'annuncio: <a href="https://apertus-ai.org/articles/2026-07-apertus-1-5/" target="_blank" rel="noopener">Apertus 1.5</a> (apertus-ai.org)`,
        `Il modello che usiamo: <a href="https://huggingface.co/swiss-ai/Apertus-v1.5-70B" target="_blank" rel="noopener">Apertus v1.5 70B</a> (Hugging Face)`,
        `Il resoconto: <a href="https://www.cscs.ch/science/computer-science-hpc/2026/apertus-15-building-the-next-generation-of-open-ai-infrastructure" target="_blank" rel="noopener">Building the next generation of open AI infrastructure</a> (CSCS)`,
        `Contesto sul modello: <a href="/it/news/apertus-at-uphill-conf-2026">Apertus alla Uphill Conf 2026</a>`,
        `Perché ospitiamo su Infomaniak: <a href="/it/news/why-helvetra-runs-on-infomaniak">Infomaniak diventa una fondazione</a>`,
      ],
    },
    cta: {
      text: `Prova Helvetra con Apertus 1.5, e se lavori in tedesco svizzero, dicci onestamente come se la cava.`,
      button: `Apri Helvetra`,
    },
    meta: {
      description:
        `Apertus 1.5 (pubblicato il 24 luglio 2026) è ora servito da Infomaniak, e Helvetra lo usa. Cosa migliora per le tue traduzioni, cosa lasciamo disattivato, e uno sguardo onesto al tedesco svizzero su 1.5: output in dialetto che funziona, rilevamento automatico che ancora no.`,
      ogDescription:
        `Il modello svizzero dietro Helvetra ha appena ricevuto un aggiornamento importante. Cosa cambia per le tue traduzioni con Apertus 1.5, e l'unica cosa, il tedesco svizzero, che non possiamo ancora promettere.`,
    },
  },
} as const

const t = computed(() => content[locale.value as keyof typeof content] || content.en)

const canonical = computed(() => {
  const path = '/news/apertus-1-5-what-it-means-for-helvetra'
  return locale.value === 'en'
    ? `https://helvetra.ch${path}`
    : `https://helvetra.ch/${locale.value}${path}`
})

// Per-article 1200x630 Open Graph image. To be generated before publish.
// Missing file does not affect on-page rendering, only the social card.
const ogImageUrl = 'https://helvetra.ch/img/news/apertus-1-5-what-it-means-for-helvetra/og.jpg'

useJsonLd(getArticleSchema({
  headline: t.value.title,
  description: t.value.subtitle,
  datePublished: '2026-08-04',
  dateModified: '2026-08-04',
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
    { property: 'article:published_time', content: '2026-08-04' },
    { property: 'article:section', content: 'News' },
    { property: 'article:tag', content: 'Apertus' },
    { property: 'article:tag', content: 'Apertus 1.5' },
    { property: 'article:tag', content: 'Swiss AI' },
    { property: 'og:description', content: t.value.meta.ogDescription },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t.value.title },
    { name: 'twitter:image', content: ogImageUrl },
  ],
}))
</script>
