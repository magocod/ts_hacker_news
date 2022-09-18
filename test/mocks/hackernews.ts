import { AxiosResponse } from "axios";

import { HackerNewsResponse } from "../../src/interfaces/hackernews";

// FIXME tests - data generation hacker news
export function getNodeJsNews(): AxiosResponse<HackerNewsResponse> {
  const data: HackerNewsResponse = {
    hits: [
      {
        created_at: "2022-09-17T13:59:27.000Z",
        title: "SMIC Mass Produces 14nm Nodes, Advances To 5nm, 7nm",
        url: "https://www.tomshardware.com/news/smic-mass-produces-14nm-nodes-advances-to-5nm-7nm",
        author: "xbmcuser",
        points: 2,
        story_text: null,
        comment_text: null,
        num_comments: 0,
        story_id: null,
        story_title: null,
        story_url: null,
        parent_id: null,
        created_at_i: 1663423167,
        _tags: ["story", "author_xbmcuser", "story_32877585"],
        objectID: "32877585",
        _highlightResult: {
          title: {
            value:
              "SMIC Mass Produces 14nm <em>Nodes</em>, Advances To 5nm, 7nm",
            matchLevel: "full",
            fullyHighlighted: false,
            matchedWords: ["nodejs"],
          },
          url: {
            value:
              "https://www.tomshardware.com/news/smic-mass-produces-14nm-<em>nodes</em>-advances-to-5nm-7nm",
            matchLevel: "full",
            fullyHighlighted: false,
            matchedWords: ["nodejs"],
          },
          author: {
            value: "xbmcuser",
            matchLevel: "none",
            matchedWords: [],
          },
        },
      },
      {
        created_at: "2022-09-17T12:24:00.000Z",
        title: null,
        url: null,
        author: "f-jin",
        points: null,
        story_text: null,
        comment_text:
          "Recently been reading up on model checking, and Kripke structures are mentioned often. They are somewhat similar to Labeled Transition Systems, but then with propositions on the nodes instead of labels on the edges. Turns out they are named after this person, fascinating.",
        num_comments: null,
        story_id: 32876303,
        story_title: "Saul Kripke has died",
        story_url: "https://dailynous.com/2022/09/16/saul-kripke-1940-2022/",
        parent_id: 32876303,
        created_at_i: 1663417440,
        _tags: ["comment", "author_f-jin", "story_32876303"],
        objectID: "32876946",
        _highlightResult: {
          author: {
            value: "f-jin",
            matchLevel: "none",
            matchedWords: [],
          },
          comment_text: {
            value:
              "Recently been reading up on model checking, and Kripke structures are mentioned often. They are somewhat similar to Labeled Transition Systems, but then with propositions on the <em>nodes</em> instead of labels on the edges. Turns out they are named after this person, fascinating.",
            matchLevel: "full",
            fullyHighlighted: false,
            matchedWords: ["nodejs"],
          },
          story_title: {
            value: "Saul Kripke has died",
            matchLevel: "none",
            matchedWords: [],
          },
          story_url: {
            value: "https://dailynous.com/2022/09/16/saul-kripke-1940-2022/",
            matchLevel: "none",
            matchedWords: [],
          },
        },
      },
      {
        created_at: "2022-09-17T08:50:26.000Z",
        title: null,
        url: null,
        author: "pdimitar",
        points: null,
        story_text: null,
        comment_text:
          "I know that OTP is the primitive below but Elixir adds many interesting and useful tools on top e.g. DynamicSupervisor and even a partitioned supervisor (executing tasks among several nodes).<p>It basically makes OTP even better by building several useful and often needed real-world tools on top of it.",
        num_comments: null,
        story_id: 32850016,
        story_title: "Joy of Elixir (2020)",
        story_url: "https://joyofelixir.com/toc.html",
        parent_id: 32875185,
        created_at_i: 1663404626,
        _tags: ["comment", "author_pdimitar", "story_32850016"],
        objectID: "32875898",
        _highlightResult: {
          author: {
            value: "pdimitar",
            matchLevel: "none",
            matchedWords: [],
          },
          comment_text: {
            value:
              "I know that OTP is the primitive below but Elixir adds many interesting and useful tools on top e.g. DynamicSupervisor and even a partitioned supervisor (executing tasks among several <em>nodes</em>).<p>It basically makes OTP even better by building several useful and often needed real-world tools on top of it.",
            matchLevel: "full",
            fullyHighlighted: false,
            matchedWords: ["nodejs"],
          },
          story_title: {
            value: "Joy of Elixir (2020)",
            matchLevel: "none",
            matchedWords: [],
          },
          story_url: {
            value: "https://joyofelixir.com/toc.html",
            matchLevel: "none",
            matchedWords: [],
          },
        },
      },
    ],
    nbHits: 23647,
    page: 0,
    nbPages: 50,
    hitsPerPage: 20,
    exhaustiveNbHits: true,
    exhaustiveTypo: true,
    exhaustive: {
      nbHits: true,
      typo: true,
    },
    query: "nodejs",
    params:
      "advancedSyntax=true&analytics=true&analyticsTags=backend&query=nodejs",
    processingTimeMS: 11,
    processingTimingsMS: {
      afterFetch: {
        format: {
          highlighting: 1,
          total: 1,
        },
        total: 2,
      },
      fetch: {
        scanning: 3,
        total: 9,
      },
      total: 11,
    },
  };

  return {
    config: {},
    data: data,
    headers: {},
    status: 200,
    statusText: "OK",
  };
}
