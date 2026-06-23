<!--
  News article: Why Helvetra runs on Infomaniak.
  Peg: Boris Siegenthaler's 20 May 2026 letter to customers announcing
  that Infomaniak's voting control passed to the Infomaniak Foundation
  (13 May 2026). Same per-locale `content` object pattern as the other
  news articles. EN is the source of truth; DE/FR/IT to follow once the
  English is approved.
-->
<template>
  <div>
    <ContentArticleLayout>
      <template #title>{{ t.title }}</template>
      <template #subtitle>{{ t.subtitle }}</template>

      <ContentProseSection id="a-letter" :title="t.s1.heading">
        <figure class="mb-10">
          <img
            :src="`/img/news/why-helvetra-runs-on-infomaniak/infomaniak-foundation.jpg`"
            alt="The Infomaniak Foundation campaign image: the Matterhorn above a still alpine lake, with the 'infomaniak FOUNDATION' wordmark."
            class="rounded-lg shadow my-6"
          >
          <figcaption class="text-sm text-neutral-500 mt-2" v-html="t.s1.caption" />
        </figure>
        <p v-html="t.s1.p1" />
        <p v-html="t.s1.p2" />
      </ContentProseSection>

      <ContentProseSection id="why-it-lands" :title="t.s2.heading">
        <p v-html="t.s2.p1" />
        <p v-html="t.s2.p2" />
      </ContentProseSection>

      <ContentProseSection id="what-we-picked" :title="t.s3.heading">
        <p>{{ t.s3.intro }}</p>
        <ul>
          <li v-for="item in t.s3.items" :key="item" v-html="item" />
        </ul>
      </ContentProseSection>

      <ContentProseSection id="honest-limits" :title="t.s4.heading">
        <p>{{ t.s4.p1 }}</p>
        <p v-html="t.s4.p2" />
      </ContentProseSection>

      <ContentProseSection id="what-changed" :title="t.s5.heading">
        <p v-html="t.s5.p1" />
        <p>{{ t.s5.p2 }}</p>
        <div class="flex items-start gap-4 my-6">
          <img
            :src="`/img/news/why-helvetra-runs-on-infomaniak/boris-siegenthaler.jpg`"
            alt="Boris Siegenthaler, founder and Chief Strategy Officer of Infomaniak."
            class="w-16 h-16 rounded-full object-cover shadow shrink-0"
          >
          <div>
            <blockquote class="border-l-4 border-swiss-red pl-4 italic text-neutral-700">
              {{ t.s5.quote }}
            </blockquote>
            <p class="text-sm text-neutral-500 mt-2 pl-4">{{ t.s5.quoteAttrib }}</p>
          </div>
        </div>
        <p>{{ t.s5.p3 }}</p>
      </ContentProseSection>

      <ContentProseSection id="what-it-means" :title="t.s6.heading">
        <p v-html="t.s6.p1" />
        <p v-html="t.s6.p2" />
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
    title: 'Infomaniak becomes a foundation: what it means for Helvetra',
    subtitle:
      'The company that hosts our website, our backend, and the Apertus model behind every translation just put its independence beyond the reach of any future buyer. A note on why we host where we host.',
    s1: {
      heading: 'A letter from the founder',
      caption:
        'Infomaniak announced its new foundation on 13 May 2026. (Image: Infomaniak Foundation)',
      p1: `On 20 May 2026, an email landed in the inbox we use to run Helvetra. It was from Boris Siegenthaler, founder of <a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, the Swiss company that hosts everything we run. The subject was, in effect, that he no longer controls his own company, and that this was good news.`,
      p2: `A week earlier, on 13 May, he had transferred majority voting rights to a new Swiss public-interest body, the <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation</a>, in the form of special shares that can never be sold or transferred. We are a customer, not an insider, so we read it the way any customer would. The question underneath it is the one that matters to us: does the ground we built on stay the way it is.`,
    },
    s2: {
      heading: 'Why this lands for us in particular',
      p1: `Most companies pick a host for a website and move on. For Helvetra the host is closer to the whole product, because every layer runs on the same Swiss company.`,
      p2: `The website you are reading is served from an Infomaniak server in Switzerland. The backend that handles a translation request, and the database and cache behind it, run on the same infrastructure. And <a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a>, the Swiss open model that does the actual translating, runs on Infomaniak's AI infrastructure. The text you type to translate does not leave the country, and it never passes through a company answerable to a foreign court. That is the entire promise of Helvetra, and it is only true because the layer underneath holds it up.`,
    },
    s3: {
      heading: 'What we picked them for',
      intro: 'We chose Infomaniak for the things that line up with what Helvetra is for:',
      items: [
        `<strong>Swiss law, not just Swiss soil.</strong> A US hyperscaler can put a datacenter in Zurich too, so "the data sits in Switzerland" is the easy part. What a US company cannot change is its own jurisdiction: it stays reachable under the US Cloud Act wherever the servers physically are. Infomaniak answers to Swiss law, full stop. And choosing it means putting money into a Swiss solution, rather than the local outpost of a foreign giant.`,
        `<strong>An environmental record that is measured, not branded.</strong> Infomaniak runs on renewable electricity, keeps servers in service far longer than the industry's usual three to five years, and has offset more carbon than it emits for years. The figures are in a <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">public impact report</a> it commits to publishing annually.`,
        `<strong>Thirty years of local roots</strong> in Geneva, rather than a reseller fronting someone else's cloud.`,
      ],
    },
    s4: {
      heading: 'Two things we won\'t dress up',
      p1: 'Running a language model is energy-hungry by nature, and picking the greenest host in the country does not make AI translation free of impact. It means the power is renewable and the hardware stays in service for years instead of months. That is the honest best case, not a clean conscience.',
      p2: `And on the model itself: we use Apertus as Infomaniak serves it. We cannot currently tune it to translate better, the way the canton of Ticino <a href="/news/apertus-at-uphill-conf-2026">fine-tuned Apertus 8B to 94 percent</a> on its own translation task. When Apertus improves, our translations improve with it. Until then, we ship what the base model gives us.`,
    },
    s5: {
      heading: 'What actually changed',
      p1: `Here is what the letter was really about. Until this month, the commitments above rested on one person's word. Boris owned Infomaniak and could keep it pointed where he wanted. The flip side is that a future owner, or a future Boris under pressure, could point it somewhere else.`,
      p2: 'The foundation removes that. The principles we relied on, sovereignty, privacy, environmental responsibility, local roots, are now written into a notarized charter that the foundation exists to defend, and that can only be strengthened, never weakened. The special shares carry the votes and cannot be sold, so no investor, present or future, can buy Infomaniak and quietly change what it stands for.',
      quote:
        '"No investor, present or future, will be able to alter Infomaniak\'s DNA, mission, or independence."',
      quoteAttrib: 'Boris Siegenthaler, in the letter to customers',
      p3: 'Boris is precise about his own role, and so are we: he has given up voting control, not walked away. He chairs the foundation\'s board, and the team that has run Infomaniak for years still runs it. What changed is not who is in the room, but what can no longer be undone from outside it.',
    },
    s6: {
      heading: 'What it means for you',
      p1: `Nothing about Helvetra changes today. The point is the opposite: nothing about the ground under Helvetra <em>can</em> quietly change tomorrow. The Swiss promise we make to you is now backed, all the way down to the server and the model, by a company whose own Swiss promise is locked into its governance.`,
      p2: `And you do not have to take our word, or Boris's. The charter is a public document, and the impact report is published every year. We think infrastructure should be checkable rather than taken on faith, which is also why all of Helvetra's own code is on <a href="https://github.com/Helvetra" target="_blank" rel="noopener">GitHub</a>. This is the third piece of the same story we have been telling: a Swiss model (<a href="/news/apertus-at-uphill-conf-2026">Apertus</a>), an <a href="/news/swiss-startup-days-2026">open-source product</a> (Helvetra), and now a Swiss host whose independence is structural. Same bet, three layers down.`,
    },
    resources: {
      heading: 'Resources',
      items: [
        'The foundation, in full: <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation and the sovereign cloud</a>',
        'The Shareholding Charter (PDF): <a href="https://fondation-infomaniak.ch/documents/foundation/foundation-infomaniak-board-participation-charter.pdf" target="_blank" rel="noopener">fondation-infomaniak.ch</a>',
        'Infomaniak\'s public impact report: <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">infomaniak.com/en/impact-report</a>',
        'The model we run on it: <a href="/news/apertus-at-uphill-conf-2026">Apertus at Uphill Conf 2026</a>',
        'Why we open-sourced everything: <a href="/news/swiss-startup-days-2026">Helvetra at Swiss Startup Days 2026</a>',
      ],
    },
    cta: {
      text: 'Try Helvetra and see what a fully Swiss stack, model, server, and host, does for your translations.',
      button: 'Open Helvetra',
    },
    meta: {
      description:
        'Why every layer of Helvetra, the website, the backend, and the Apertus translation model, runs on Infomaniak. What changed when Infomaniak passed voting control to a Swiss public-interest foundation in May 2026, and why that makes our Swiss promise structural.',
      ogDescription:
        'Infomaniak handed voting control to a Swiss public-interest foundation. Why that matters for a translation tool whose website, backend, and AI model all run on Infomaniak.',
    },
  },
  de: {
    title: 'Infomaniak wird zur Stiftung: was das für Helvetra bedeutet',
    subtitle:
      'Das Unternehmen, das unsere Website, unser Backend und das Apertus-Modell hinter jeder Übersetzung hostet, hat seine Unabhängigkeit ausser Reichweite jedes künftigen Käufers gebracht. Eine Notiz dazu, warum wir dort hosten, wo wir hosten.',
    s1: {
      heading: 'Ein Brief des Gründers',
      caption:
        'Infomaniak hat seine neue Stiftung am 13. Mai 2026 angekündigt. (Bild: Infomaniak Foundation)',
      p1: `Am 20. Mai 2026 landete eine E-Mail im Postfach, über das wir Helvetra betreiben. Sie stammte von Boris Siegenthaler, dem Gründer von <a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, dem Schweizer Unternehmen, das alles hostet, was wir betreiben. Der Inhalt war im Grunde: dass er sein eigenes Unternehmen nicht mehr kontrolliert, und dass das eine gute Nachricht ist.`,
      p2: `Eine Woche zuvor, am 13. Mai, hatte er die Mehrheit der Stimmrechte an eine neue gemeinnützige Schweizer Institution übertragen, die <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation</a>, in Form von Spezialaktien, die niemals verkauft oder übertragen werden können. Wir sind Kunde, nicht Insider, also haben wir es gelesen, wie es jeder Kunde tun würde. Die Frage darunter ist die, die für uns zählt: Bleibt der Boden, auf dem wir gebaut haben, so, wie er ist?`,
    },
    s2: {
      heading: 'Warum das gerade für uns ins Gewicht fällt',
      p1: `Die meisten Unternehmen wählen einen Host für eine Website und denken nicht weiter darüber nach. Für Helvetra ist der Host näher am gesamten Produkt, weil jede Schicht auf demselben Schweizer Unternehmen läuft.`,
      p2: `Die Website, die Sie gerade lesen, wird von einem Infomaniak-Server in der Schweiz ausgeliefert. Das Backend, das eine Übersetzungsanfrage verarbeitet, sowie die Datenbank und der Cache dahinter laufen auf derselben Infrastruktur. Und <a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a>, das offene Schweizer Modell, das die eigentliche Übersetzung macht, läuft auf der KI-Infrastruktur von Infomaniak. Der Text, den Sie zur Übersetzung eingeben, verlässt das Land nicht, und er passiert nie ein Unternehmen, das einem ausländischen Gericht unterstellt ist. Das ist das ganze Versprechen von Helvetra, und es ist nur wahr, weil die Schicht darunter es trägt.`,
    },
    s3: {
      heading: 'Wofür wir sie gewählt haben',
      intro: 'Wir haben Infomaniak für die Dinge gewählt, die zu dem passen, wofür Helvetra da ist:',
      items: [
        `<strong>Schweizer Recht, nicht nur Schweizer Boden.</strong> Auch ein US-Hyperscaler kann ein Rechenzentrum in Zürich aufstellen, «die Daten liegen in der Schweiz» ist also der einfache Teil. Was ein US-Unternehmen nicht ändern kann, ist die eigene Gerichtsbarkeit: Es bleibt unter dem US Cloud Act erreichbar, egal wo die Server physisch stehen. Infomaniak untersteht Schweizer Recht, Punkt. Und es zu wählen heisst, Geld in eine Schweizer Lösung zu stecken statt in den lokalen Aussenposten eines ausländischen Giganten.`,
        `<strong>Eine Umweltbilanz, die gemessen ist, nicht gebrandet.</strong> Infomaniak läuft auf erneuerbarem Strom, hält Server weit länger im Betrieb als die branchenüblichen drei bis fünf Jahre und hat seit Jahren mehr CO2 kompensiert, als es ausstösst. Die Zahlen stehen in einem <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">öffentlichen Impact-Report</a>, den das Unternehmen jährlich zu veröffentlichen verpflichtet ist.`,
        `<strong>Dreissig Jahre lokale Verwurzelung</strong> in Genf, statt eines Wiederverkäufers, der die Cloud eines anderen vorne anstellt.`,
      ],
    },
    s4: {
      heading: 'Zwei Dinge, die wir nicht schönreden',
      p1: 'Ein Sprachmodell zu betreiben ist von Natur aus energiehungrig, und den grünsten Host des Landes zu wählen macht KI-Übersetzung nicht frei von Auswirkungen. Es bedeutet, dass der Strom erneuerbar ist und die Hardware jahrelang im Einsatz bleibt statt nur monatelang. Das ist der ehrliche Bestfall, kein reines Gewissen.',
      p2: `Und zum Modell selbst: Wir nutzen Apertus so, wie Infomaniak es bereitstellt. Wir können es derzeit nicht so anpassen, dass es besser übersetzt, wie der Kanton Tessin <a href="/de/news/apertus-at-uphill-conf-2026">Apertus 8B auf 94 Prozent feinjustiert hat</a> für seine eigene Übersetzungsaufgabe. Wenn Apertus besser wird, werden unsere Übersetzungen mit ihm besser. Bis dahin liefern wir, was das Basismodell hergibt.`,
    },
    s5: {
      heading: 'Was sich tatsächlich geändert hat',
      p1: `Hier kommt, worum es in dem Brief wirklich ging. Bis zu diesem Monat beruhten die Verpflichtungen oben auf dem Wort einer einzigen Person. Boris besass Infomaniak und konnte es dorthin ausrichten, wohin er wollte. Die Kehrseite ist, dass ein künftiger Eigentümer, oder ein künftiger Boris unter Druck, es woanders hin ausrichten könnte.`,
      p2: 'Die Stiftung beseitigt das. Die Prinzipien, auf die wir uns verlassen haben, Souveränität, Datenschutz, Umweltverantwortung, lokale Verwurzelung, sind nun in einer notariell beglaubigten Charta festgeschrieben, die die Stiftung zu verteidigen da ist und die nur gestärkt, nie geschwächt werden kann. Die Spezialaktien tragen die Stimmen und können nicht verkauft werden, sodass kein Investor, gegenwärtig oder künftig, Infomaniak kaufen und still verändern kann, wofür es steht.',
      quote:
        '«Kein Investor, gegenwärtig oder künftig, wird in der Lage sein, die DNA, die Mission oder die Unabhängigkeit von Infomaniak zu verändern.»',
      quoteAttrib: 'Boris Siegenthaler, im Brief an die Kundinnen und Kunden',
      p3: 'Boris ist präzise, was seine eigene Rolle angeht, und wir sind es auch: Er hat die Stimmkontrolle abgegeben, sich aber nicht zurückgezogen. Er präsidiert den Stiftungsrat, und das Team, das Infomaniak seit Jahren führt, führt es weiter. Was sich geändert hat, ist nicht, wer im Raum ist, sondern was von aussen nicht mehr rückgängig gemacht werden kann.',
    },
    s6: {
      heading: 'Was das für Sie bedeutet',
      p1: `An Helvetra ändert sich heute nichts. Der Punkt ist das Gegenteil: Am Boden unter Helvetra <em>kann</em> sich morgen nichts mehr still ändern. Das Schweizer Versprechen, das wir Ihnen geben, ist nun bis hinunter zum Server und zum Modell von einem Unternehmen abgesichert, dessen eigenes Schweizer Versprechen in seiner Governance verankert ist.`,
      p2: `Und Sie müssen weder uns noch Boris beim Wort nehmen. Die Charta ist ein öffentliches Dokument, und der Impact-Report wird jedes Jahr veröffentlicht. Wir finden, Infrastruktur sollte überprüfbar sein statt auf Treu und Glauben hingenommen, weshalb auch der gesamte Code von Helvetra auf <a href="https://github.com/Helvetra" target="_blank" rel="noopener">GitHub</a> liegt. Das ist das dritte Stück derselben Geschichte, die wir erzählen: ein Schweizer Modell (<a href="/de/news/apertus-at-uphill-conf-2026">Apertus</a>), ein <a href="/de/news/swiss-startup-days-2026">quelloffenes Produkt</a> (Helvetra) und nun ein Schweizer Host, dessen Unabhängigkeit strukturell ist. Dieselbe Wette, drei Schichten tiefer.`,
    },
    resources: {
      heading: 'Ressourcen',
      items: [
        'Die Stiftung im Detail: <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation und die souveräne Cloud</a>',
        'Die Aktionärscharta (PDF): <a href="https://fondation-infomaniak.ch/documents/foundation/foundation-infomaniak-board-participation-charter.pdf" target="_blank" rel="noopener">fondation-infomaniak.ch</a>',
        'Infomaniaks öffentlicher Impact-Report: <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">infomaniak.com/en/impact-report</a>',
        'Das Modell, das wir darauf betreiben: <a href="/de/news/apertus-at-uphill-conf-2026">Apertus an der Uphill Conf 2026</a>',
        'Warum wir alles quelloffen gemacht haben: <a href="/de/news/swiss-startup-days-2026">Helvetra an den Swiss Startup Days 2026</a>',
      ],
    },
    cta: {
      text: 'Probieren Sie Helvetra aus und sehen Sie, was ein vollständig Schweizer Stack, Modell, Server und Host, für Ihre Übersetzungen leisten kann.',
      button: 'Helvetra öffnen',
    },
    meta: {
      description:
        'Warum jede Schicht von Helvetra, die Website, das Backend und das Apertus-Übersetzungsmodell, auf Infomaniak läuft. Was sich änderte, als Infomaniak im Mai 2026 die Stimmkontrolle an eine gemeinnützige Schweizer Stiftung übergab, und warum das unser Schweizer Versprechen strukturell macht.',
      ogDescription:
        'Infomaniak hat die Stimmkontrolle an eine gemeinnützige Schweizer Stiftung übergeben. Warum das für ein Übersetzungstool zählt, dessen Website, Backend und KI-Modell allesamt auf Infomaniak laufen.',
    },
  },
  fr: {
    title: 'Infomaniak devient une fondation: ce que cela signifie pour Helvetra',
    subtitle:
      `L'entreprise qui héberge notre site, notre backend et le modèle Apertus derrière chaque traduction vient de mettre son indépendance hors de portée de tout acheteur futur. Une note sur les raisons pour lesquelles nous hébergeons là où nous hébergeons.`,
    s1: {
      heading: 'Une lettre du fondateur',
      caption:
        'Infomaniak a annoncé sa nouvelle fondation le 13 mai 2026. (Image: Infomaniak Foundation)',
      p1: `Le 20 mai 2026, un e-mail est arrivé dans la boîte que nous utilisons pour faire tourner Helvetra. Il venait de Boris Siegenthaler, fondateur d'<a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, l'entreprise suisse qui héberge tout ce que nous faisons tourner. Le message était, en substance, qu'il ne contrôle plus sa propre entreprise, et que c'était une bonne nouvelle.`,
      p2: `Une semaine plus tôt, le 13 mai, il avait transféré la majorité des droits de vote à un nouvel organe suisse d'intérêt public, la <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation</a>, sous forme d'actions spéciales qui ne peuvent jamais être vendues ni transférées. Nous sommes un client, pas un initié, alors nous l'avons lu comme n'importe quel client. La question en dessous est celle qui compte pour nous: le terrain sur lequel nous avons bâti reste-t-il tel quel?`,
    },
    s2: {
      heading: 'Pourquoi cela pèse particulièrement pour nous',
      p1: `La plupart des entreprises choisissent un hébergeur pour un site et passent à autre chose. Pour Helvetra, l'hébergeur est plus proche du produit entier, parce que chaque couche tourne sur la même entreprise suisse.`,
      p2: `Le site que vous lisez est servi depuis un serveur Infomaniak en Suisse. Le backend qui traite une demande de traduction, ainsi que la base de données et le cache derrière, tournent sur la même infrastructure. Et <a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a>, le modèle ouvert suisse qui fait la traduction proprement dite, tourne sur l'infrastructure d'IA d'Infomaniak. Le texte que vous saisissez pour le traduire ne quitte pas le pays, et il ne passe jamais par une entreprise soumise à un tribunal étranger. C'est toute la promesse de Helvetra, et elle n'est vraie que parce que la couche en dessous la soutient.`,
    },
    s3: {
      heading: 'Ce pour quoi nous les avons choisis',
      intro: `Nous avons choisi Infomaniak pour ce qui s'aligne avec la raison d'être de Helvetra:`,
      items: [
        `<strong>Le droit suisse, pas seulement le sol suisse.</strong> Un hyperscaler américain peut lui aussi installer un datacenter à Zurich, «les données sont en Suisse» est donc la partie facile. Ce qu'une entreprise américaine ne peut pas changer, c'est sa propre juridiction: elle reste atteignable sous le US Cloud Act où que se trouvent physiquement les serveurs. Infomaniak relève du droit suisse, point. Et la choisir, c'est mettre de l'argent dans une solution suisse, plutôt que dans l'antenne locale d'un géant étranger.`,
        `<strong>Un bilan environnemental mesuré, pas estampillé.</strong> Infomaniak fonctionne à l'électricité renouvelable, garde ses serveurs en service bien plus longtemps que les trois à cinq ans habituels du secteur, et compense depuis des années plus de CO2 qu'elle n'en émet. Les chiffres sont dans un <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">rapport d'impact public</a> qu'elle s'engage à publier chaque année.`,
        `<strong>Trente ans d'ancrage local</strong> à Genève, plutôt qu'un revendeur qui met en avant le cloud de quelqu'un d'autre.`,
      ],
    },
    s4: {
      heading: `Deux choses que nous n'enjoliverons pas`,
      p1: `Faire tourner un modèle de langage est par nature gourmand en énergie, et choisir l'hébergeur le plus vert du pays ne rend pas la traduction par IA sans impact. Cela veut dire que l'électricité est renouvelable et que le matériel reste en service des années plutôt que des mois. C'est le meilleur cas honnête, pas une conscience tranquille.`,
      p2: `Et sur le modèle lui-même: nous utilisons Apertus tel qu'Infomaniak le sert. Nous ne pouvons pas actuellement l'ajuster pour mieux traduire, comme le canton du Tessin a <a href="/fr/news/apertus-at-uphill-conf-2026">affiné Apertus 8B à 94 pour cent</a> sur sa propre tâche de traduction. Quand Apertus s'améliore, nos traductions s'améliorent avec lui. En attendant, nous livrons ce que le modèle de base donne.`,
    },
    s5: {
      heading: 'Ce qui a réellement changé',
      p1: `Voici ce dont parlait vraiment la lettre. Jusqu'à ce mois-ci, les engagements ci-dessus reposaient sur la parole d'une seule personne. Boris possédait Infomaniak et pouvait la garder orientée où il voulait. Le revers, c'est qu'un futur propriétaire, ou un futur Boris sous pression, pourrait l'orienter ailleurs.`,
      p2: `La fondation supprime cela. Les principes sur lesquels nous nous appuyions, souveraineté, vie privée, responsabilité environnementale, ancrage local, sont désormais inscrits dans une charte notariée que la fondation a pour mission de défendre, et qui ne peut être que renforcée, jamais affaiblie. Les actions spéciales portent les voix et ne peuvent être vendues, de sorte qu'aucun investisseur, présent ou futur, ne peut acheter Infomaniak et changer en douce ce qu'elle représente.`,
      quote:
        `«Aucun investisseur, présent ou futur, ne pourra altérer l'ADN, la mission ou l'indépendance d'Infomaniak.»`,
      quoteAttrib: 'Boris Siegenthaler, dans la lettre aux clients',
      p3: `Boris est précis sur son propre rôle, et nous le sommes aussi: il a cédé le contrôle des votes, il n'est pas parti. Il préside le conseil de la fondation, et l'équipe qui dirige Infomaniak depuis des années continue de la diriger. Ce qui a changé, ce n'est pas qui est dans la pièce, mais ce qui ne peut plus être défait de l'extérieur.`,
    },
    s6: {
      heading: 'Ce que cela signifie pour vous',
      p1: `Rien ne change pour Helvetra aujourd'hui. Le point est l'inverse: rien dans le terrain sous Helvetra ne <em>peut</em> changer en douce demain. La promesse suisse que nous vous faisons est désormais garantie, jusqu'au serveur et au modèle, par une entreprise dont la propre promesse suisse est verrouillée dans sa gouvernance.`,
      p2: `Et vous n'avez à nous croire sur parole, ni nous ni Boris. La charte est un document public, et le rapport d'impact est publié chaque année. Nous pensons qu'une infrastructure devrait être vérifiable plutôt que prise sur la foi, ce qui est aussi pourquoi tout le code de Helvetra est sur <a href="https://github.com/Helvetra" target="_blank" rel="noopener">GitHub</a>. C'est le troisième volet de la même histoire que nous racontons: un modèle suisse (<a href="/fr/news/apertus-at-uphill-conf-2026">Apertus</a>), un <a href="/fr/news/swiss-startup-days-2026">produit open source</a> (Helvetra), et maintenant un hébergeur suisse dont l'indépendance est structurelle. Le même pari, trois couches plus bas.`,
    },
    resources: {
      heading: 'Ressources',
      items: [
        `La fondation en détail: <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation et le cloud souverain</a>`,
        `La charte d'actionnariat (PDF): <a href="https://fondation-infomaniak.ch/documents/foundation/foundation-infomaniak-board-participation-charter.pdf" target="_blank" rel="noopener">fondation-infomaniak.ch</a>`,
        `Le rapport d'impact public d'Infomaniak: <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">infomaniak.com/en/impact-report</a>`,
        `Le modèle que nous faisons tourner dessus: <a href="/fr/news/apertus-at-uphill-conf-2026">Apertus à la Uphill Conf 2026</a>`,
        `Pourquoi nous avons tout passé en open source: <a href="/fr/news/swiss-startup-days-2026">Helvetra aux Swiss Startup Days 2026</a>`,
      ],
    },
    cta: {
      text: `Essayez Helvetra et voyez ce qu'un stack entièrement suisse, modèle, serveur et hébergeur, peut faire pour vos traductions.`,
      button: 'Ouvrir Helvetra',
    },
    meta: {
      description:
        'Pourquoi chaque couche de Helvetra, le site, le backend et le modèle de traduction Apertus, tourne sur Infomaniak. Ce qui a changé quand Infomaniak a confié le contrôle des votes à une fondation suisse d\'intérêt public en mai 2026, et pourquoi cela rend notre promesse suisse structurelle.',
      ogDescription:
        'Infomaniak a confié le contrôle des votes à une fondation suisse d\'intérêt public. Pourquoi cela compte pour un outil de traduction dont le site, le backend et le modèle d\'IA tournent tous sur Infomaniak.',
    },
  },
  it: {
    title: 'Infomaniak diventa una fondazione: cosa significa per Helvetra',
    subtitle:
      `L'azienda che ospita il nostro sito, il nostro backend e il modello Apertus dietro ogni traduzione ha appena messo la propria indipendenza fuori dalla portata di qualsiasi futuro acquirente. Una nota sul perché ospitiamo dove ospitiamo.`,
    s1: {
      heading: 'Una lettera del fondatore',
      caption:
        'Infomaniak ha annunciato la sua nuova fondazione il 13 maggio 2026. (Immagine: Infomaniak Foundation)',
      p1: `Il 20 maggio 2026, una e-mail è arrivata nella casella che usiamo per gestire Helvetra. Veniva da Boris Siegenthaler, fondatore di <a href="https://www.infomaniak.com/" target="_blank" rel="noopener">Infomaniak</a>, l'azienda svizzera che ospita tutto ciò che gestiamo. Il messaggio era, in sostanza, che non controlla più la propria azienda, e che questa era una buona notizia.`,
      p2: `Una settimana prima, il 13 maggio, aveva trasferito la maggioranza dei diritti di voto a un nuovo ente svizzero di interesse pubblico, la <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation</a>, sotto forma di azioni speciali che non possono mai essere vendute o trasferite. Siamo un cliente, non un insider, quindi l'abbiamo letta come la leggerebbe qualsiasi cliente. La domanda che sta sotto è quella che conta per noi: il terreno su cui abbiamo costruito resta com'è?`,
    },
    s2: {
      heading: 'Perché questo pesa in particolare per noi',
      p1: `La maggior parte delle aziende sceglie un host per un sito e va avanti. Per Helvetra l'host è più vicino all'intero prodotto, perché ogni livello gira sulla stessa azienda svizzera.`,
      p2: `Il sito che stai leggendo è servito da un server Infomaniak in Svizzera. Il backend che gestisce una richiesta di traduzione, e il database e la cache dietro di esso, girano sulla stessa infrastruttura. E <a href="https://apertvs.ai/" target="_blank" rel="noopener">Apertus</a>, il modello svizzero aperto che fa la traduzione vera e propria, gira sull'infrastruttura di IA di Infomaniak. Il testo che digiti per tradurlo non lascia il Paese, e non passa mai per un'azienda soggetta a un tribunale straniero. È l'intera promessa di Helvetra, ed è vera solo perché il livello sottostante la sorregge.`,
    },
    s3: {
      heading: 'Per cosa li abbiamo scelti',
      intro: 'Abbiamo scelto Infomaniak per le cose che si allineano con ciò per cui esiste Helvetra:',
      items: [
        `<strong>Diritto svizzero, non solo suolo svizzero.</strong> Anche un hyperscaler americano può mettere un datacenter a Zurigo, quindi «i dati stanno in Svizzera» è la parte facile. Ciò che un'azienda americana non può cambiare è la propria giurisdizione: resta raggiungibile sotto il US Cloud Act ovunque si trovino fisicamente i server. Infomaniak risponde al diritto svizzero, punto. E sceglierla significa mettere denaro in una soluzione svizzera, anziché nell'avamposto locale di un gigante straniero.`,
        `<strong>Un bilancio ambientale misurato, non di facciata.</strong> Infomaniak funziona con elettricità rinnovabile, tiene i server in servizio molto più a lungo dei soliti tre-cinque anni del settore, e da anni compensa più CO2 di quanta ne emetta. I numeri sono in un <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">rapporto d'impatto pubblico</a> che si impegna a pubblicare ogni anno.`,
        `<strong>Trent'anni di radici locali</strong> a Ginevra, anziché un rivenditore che mette davanti il cloud di qualcun altro.`,
      ],
    },
    s4: {
      heading: 'Due cose che non addolciremo',
      p1: `Far girare un modello linguistico è per natura energivoro, e scegliere l'host più verde del Paese non rende la traduzione con IA priva di impatto. Significa che l'energia è rinnovabile e l'hardware resta in servizio per anni anziché mesi. È il migliore scenario onesto, non una coscienza pulita.`,
      p2: `E sul modello stesso: usiamo Apertus così come Infomaniak lo serve. Al momento non possiamo ottimizzarlo per tradurre meglio, come il Canton Ticino ha <a href="/it/news/apertus-at-uphill-conf-2026">messo a punto Apertus 8B al 94 per cento</a> sul proprio compito di traduzione. Quando Apertus migliora, le nostre traduzioni migliorano con lui. Fino ad allora, consegniamo ciò che dà il modello di base.`,
    },
    s5: {
      heading: 'Cosa è cambiato davvero',
      p1: `Ecco di cosa parlava davvero la lettera. Fino a questo mese, gli impegni qui sopra poggiavano sulla parola di una sola persona. Boris possedeva Infomaniak e poteva tenerla orientata dove voleva. Il rovescio è che un futuro proprietario, o un futuro Boris sotto pressione, potrebbe orientarla altrove.`,
      p2: `La fondazione elimina questo. I principi su cui ci siamo affidati, sovranità, privacy, responsabilità ambientale, radici locali, sono ora scritti in uno statuto notarile che la fondazione esiste per difendere, e che può solo essere rafforzato, mai indebolito. Le azioni speciali portano i voti e non possono essere vendute, così nessun investitore, presente o futuro, può comprare Infomaniak e cambiare in silenzio ciò che rappresenta.`,
      quote:
        '«Nessun investitore, presente o futuro, potrà alterare il DNA, la missione o l\'indipendenza di Infomaniak.»',
      quoteAttrib: 'Boris Siegenthaler, nella lettera ai clienti',
      p3: `Boris è preciso sul proprio ruolo, e lo siamo anche noi: ha ceduto il controllo dei voti, non si è ritirato. Presiede il consiglio della fondazione, e il team che guida Infomaniak da anni continua a guidarla. Ciò che è cambiato non è chi è nella stanza, ma ciò che non può più essere disfatto dall'esterno.`,
    },
    s6: {
      heading: 'Cosa significa per te',
      p1: `Per Helvetra oggi non cambia nulla. Il punto è l'opposto: nel terreno sotto Helvetra nulla <em>può</em> più cambiare in silenzio domani. La promessa svizzera che ti facciamo è ora garantita, fino al server e al modello, da un'azienda la cui stessa promessa svizzera è bloccata nella sua governance.`,
      p2: `E non devi credere sulla parola né a noi né a Boris. Lo statuto è un documento pubblico, e il rapporto d'impatto viene pubblicato ogni anno. Pensiamo che l'infrastruttura debba essere verificabile anziché presa per fede, motivo per cui anche tutto il codice di Helvetra è su <a href="https://github.com/Helvetra" target="_blank" rel="noopener">GitHub</a>. È il terzo tassello della stessa storia che raccontiamo: un modello svizzero (<a href="/it/news/apertus-at-uphill-conf-2026">Apertus</a>), un <a href="/it/news/swiss-startup-days-2026">prodotto open source</a> (Helvetra), e ora un host svizzero la cui indipendenza è strutturale. La stessa scommessa, tre livelli più in basso.`,
    },
    resources: {
      heading: 'Risorse',
      items: [
        `La fondazione, per intero: <a href="https://news.infomaniak.com/en/infomaniak-foundation-sovereign-cloud/" target="_blank" rel="noopener">Infomaniak Foundation e il cloud sovrano</a>`,
        `Lo statuto azionario (PDF): <a href="https://fondation-infomaniak.ch/documents/foundation/foundation-infomaniak-board-participation-charter.pdf" target="_blank" rel="noopener">fondation-infomaniak.ch</a>`,
        `Il rapporto d'impatto pubblico di Infomaniak: <a href="https://www.infomaniak.com/en/impact-report" target="_blank" rel="noopener">infomaniak.com/en/impact-report</a>`,
        `Il modello che ci facciamo girare sopra: <a href="/it/news/apertus-at-uphill-conf-2026">Apertus alla Uphill Conf 2026</a>`,
        `Perché abbiamo reso tutto open source: <a href="/it/news/swiss-startup-days-2026">Helvetra agli Swiss Startup Days 2026</a>`,
      ],
    },
    cta: {
      text: `Prova Helvetra e scopri cosa può fare per le tue traduzioni uno stack interamente svizzero, modello, server e host.`,
      button: 'Apri Helvetra',
    },
    meta: {
      description:
        'Perché ogni livello di Helvetra, il sito, il backend e il modello di traduzione Apertus, gira su Infomaniak. Cosa è cambiato quando Infomaniak ha affidato il controllo dei voti a una fondazione svizzera di interesse pubblico a maggio 2026, e perché questo rende strutturale la nostra promessa svizzera.',
      ogDescription:
        'Infomaniak ha affidato il controllo dei voti a una fondazione svizzera di interesse pubblico. Perché conta per uno strumento di traduzione il cui sito, backend e modello di IA girano tutti su Infomaniak.',
    },
  },
} as const

const t = computed(() => content[locale.value as keyof typeof content] || content.en)

const canonical = computed(() => {
  const path = '/news/why-helvetra-runs-on-infomaniak'
  return locale.value === 'en'
    ? `https://helvetra.ch${path}`
    : `https://helvetra.ch/${locale.value}${path}`
})

// Per-article 1200×630 Open Graph image. To be generated via
// scripts/make-og-image.sh before publish. Missing file does not affect
// on-page rendering, only the social card.
const ogImageUrl = 'https://helvetra.ch/img/news/why-helvetra-runs-on-infomaniak/og.jpg'

useJsonLd(getArticleSchema({
  headline: t.value.title,
  description: t.value.subtitle,
  datePublished: '2026-06-23',
  dateModified: '2026-06-23',
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
    { property: 'article:published_time', content: '2026-06-23' },
    { property: 'article:section', content: 'News' },
    { property: 'article:tag', content: 'Infomaniak' },
    { property: 'article:tag', content: 'Data sovereignty' },
    { property: 'article:tag', content: 'Swiss hosting' },
    { property: 'og:description', content: t.value.meta.ogDescription },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t.value.title },
    { name: 'twitter:image', content: ogImageUrl },
  ],
}))
</script>
