// Article content for the blog.
//
// These are DRAFTS written from the material already published on this site
// (the connector framework, the IGA platform, the MCP server, and the Bugcrowd
// submission). Review and edit the prose before deploying - it is written in
// first person on Siva's behalf.
//
// Section shapes supported by BlogPost.jsx:
//   { heading, body: [paragraph, ...] }
//   { heading, body: [...], list: [item, ...] }
//   { heading, body: [...], code: { lang, content } }

export const articles = [
  {
    slug: 'building-enterprise-connectors',
    title: 'Building Enterprise Connectors in Django',
    description:
      'Every identity system speaks a different dialect. Here is how I collapsed Active Directory, Microsoft Graph, AWS Identity Center, and CyberArk behind a single Django interface.',
    date: '2026-02-14',
    readingTime: '8 min read',
    tags: ['Django', 'Python', 'Integrations', 'IAM'],
    sections: [
      {
        heading: 'The problem with one-off integrations',
        body: [
          'The first connector you write is easy. You read the vendor docs, call their API, map their fields onto your models, and ship it. The second one is easy too. By the fourth, you notice that provisioning logic in your core application has quietly filled up with conditionals about which target system you are talking to.',
          'That is the real cost of one-off integrations. It is not the API calls — those are mechanical. It is that every provider\'s quirks leak upward into business logic that should not know or care where an account physically lives. Active Directory thinks in distinguished names and nested groups. Microsoft Graph thinks in object IDs and delta tokens. AWS Identity Center thinks in permission sets. CyberArk thinks in safes. If your lifecycle code has to reason about all four, it becomes untestable.',
        ],
      },
      {
        heading: 'One contract, many adapters',
        body: [
          'The fix is unglamorous: define what the platform needs, once, and make every target system implement it. The platform asks for users, groups, and entitlements; it asks to create, update, disable, and delete an account; it asks what access a given identity currently holds. Nothing in that vocabulary mentions LDAP or REST.',
          'In Django this lands naturally as an abstract base class with concrete subclasses per system. The important discipline is that the return types are yours, not the vendor\'s — each adapter normalises into your own entitlement model before handing anything back.',
        ],
        code: {
          lang: 'python',
          content: `class BaseConnector(ABC):
    """Every target system implements this and nothing more."""

    @abstractmethod
    def fetch_users(self) -> Iterable[NormalisedUser]:
        ...

    @abstractmethod
    def fetch_entitlements(self, user_id: str) -> Iterable[Entitlement]:
        ...

    @abstractmethod
    def provision(self, request: ProvisionRequest) -> ProvisionResult:
        ...

    @abstractmethod
    def deprovision(self, account_ref: str) -> ProvisionResult:
        ...


class MicrosoftGraphConnector(BaseConnector):
    def fetch_users(self):
        for page in self._paged("/users"):
            for obj in page["value"]:
                yield NormalisedUser(
                    external_id=obj["id"],
                    email=obj.get("mail") or obj.get("userPrincipalName"),
                    display_name=obj.get("displayName"),
                    active=obj.get("accountEnabled", True),
                )`,
        },
      },
      {
        heading: 'Upstreams fail, and that is normal',
        body: [
          'A connector framework is really a distributed systems problem wearing a CRUD costume. Directory APIs rate-limit you, time out, return partial pages, and occasionally disagree with themselves between calls. If a synchronisation run treats any of that as fatal, it will fail constantly. If it swallows errors, it will silently drift — which is worse, because governance data that is quietly wrong is more dangerous than data that is obviously missing.',
          'So every connector call is wrapped in retry with backoff, and every failure is logged with enough structure to answer "which system, which object, which operation, which attempt" without reading a stack trace. Partial failure is a first-class outcome: a run can succeed for 4,000 accounts and report 12 specific failures rather than rolling back the lot.',
        ],
        list: [
          'Retry with exponential backoff for transient failures and rate limits',
          'Structured logs keyed by system, object, and operation',
          'Partial success as a real result type, not an exception',
          'Scheduled incremental sync so full reconciliation is rare, not constant',
        ],
      },
      {
        heading: 'Keeping it fast as directories grow',
        body: [
          'Synchronisation performance is where naive designs fall over. Fetching every account on every run is fine at 500 users and untenable at scale. Two things did most of the work: moving synchronisation off the request path into scheduled jobs, and doing set-based database writes instead of per-object saves. Bulk operations turned thousands of individual statements into a handful.',
          'The query side needed the same attention. Reporting on "who has access to what" is a join across identities, roles, groups, and entitlements, and it is the query reviewers hit most often. Getting the relational model and its indexes right mattered far more than any application-level caching.',
        ],
      },
      {
        heading: 'What this bought',
        body: [
          'The framework now carries more than seven production connectors on the same interface. Provisioning and de-provisioning are automated, entitlement discovery behaves consistently across systems, and — the part I care about most — adding a new target system means writing one adapter, not touching core business logic.',
          'If you are building something similar, the advice I would give is to write the second connector before you finalise the interface, and the third before you trust it. The abstraction that survives contact with three genuinely different providers is usually the right one.',
        ],
      },
    ],
  },

  {
    slug: 'identity-governance-explained',
    title: 'Understanding Identity Governance',
    description:
      'IAM asks whether you can log in. Identity governance asks whether you should still have that access at all — and can you prove it to an auditor.',
    date: '2026-01-22',
    readingTime: '7 min read',
    tags: ['IAM', 'IGA', 'Security', 'Compliance'],
    sections: [
      {
        heading: 'Authentication is the easy half',
        body: [
          'Most engineers meet identity through authentication: passwords, SSO, MFA, tokens. That machinery answers a narrow question — is this person who they claim to be, right now? Identity Governance & Administration answers a much harder one: of everything this person can reach, how much of it do they still legitimately need?',
          'The gap between those two questions is where most real-world access problems live. Nobody breaks in. Someone changes teams, keeps their old permissions, adds new ones, and eighteen months later holds a combination nobody would have approved deliberately.',
        ],
      },
      {
        heading: 'The four nouns',
        body: [
          'Almost every governance platform models the same small vocabulary. Getting these relationships right in the database is most of the work, because every feature above them is a query over this graph.',
        ],
        list: [
          'Identity — a person or service, independent of any one system\'s account',
          'Account — that identity\'s presence in a specific target system',
          'Group / Role — a bundle of access that can be granted as a unit',
          'Entitlement — one concrete permission, the atom everything else composes from',
        ],
      },
      {
        heading: 'Joiner, Mover, Leaver',
        body: [
          'Lifecycle is the backbone. A joiner needs a baseline of access on day one. A mover needs their old access removed as deliberately as their new access is added — the step almost everyone skips. A leaver needs everything revoked promptly and provably.',
          'Mover is where governance earns its keep. Adding access is visible and someone always asks for it; removing it is invisible and nobody does. Automating the transition as an event-driven workflow, rather than a ticket someone remembers to file, is what stops permission accumulation.',
          'Leaver is where the risk concentrates. An account that outlives its owner is the cleanest possible attack path, and reliable de-provisioning across every connected system is the only real answer.',
        ],
      },
      {
        heading: 'Certification: asking the question on a schedule',
        body: [
          'Lifecycle handles known events. Certification campaigns handle drift. On a schedule, the platform routes each reviewer the access their people currently hold and asks them to confirm or revoke it. Approvals and revocations flow straight back into provisioning, so a decision is an action rather than a note.',
          'The practical design problem is reviewer fatigue. A campaign that shows someone 900 entitlements gets rubber-stamped, which is worse than not running it — you have manufactured evidence of a review that did not happen. Scoping campaigns tightly beats running them broadly.',
        ],
      },
      {
        heading: 'Role mining, or where do roles come from',
        body: [
          'Role-based access control assumes you have roles. Most organisations do not — they have years of individually granted permissions. Role mining works backwards from that reality, looking for entitlement combinations that recur across many identities and are therefore probably a real job function.',
          'This is a frequent-itemset problem, which is why FP-Growth suits it: find the sets of entitlements that co-occur often enough to be worth naming. The output is never the finished answer. It is a strong first draft that a human then names, trims, and approves.',
        ],
      },
      {
        heading: 'Why audit logging is a feature, not plumbing',
        body: [
          'Every governance capability above is only as credible as the trail underneath it. When an auditor asks why a particular person had a particular permission last March, the platform must answer with who requested it, who approved it, when it was provisioned, and which review confirmed it.',
          'That requirement has a design consequence worth stating plainly: audit logging cannot be added afterwards. It has to sit in the service layer that performs access decisions, capturing them as they happen. Retrofitting it onto an existing platform means reconstructing history you never recorded.',
        ],
      },
    ],
  },

  {
    slug: 'jwt-vs-httponly-cookies',
    title: 'JWT vs HttpOnly Cookies',
    description:
      'Where you put the token decides which attack you are exposed to. A practical comparison for people building APIs, not a verdict.',
    date: '2025-12-08',
    readingTime: '6 min read',
    tags: ['Security', 'Authentication', 'REST APIs', 'JWT'],
    sections: [
      {
        heading: 'The question is storage, not format',
        body: [
          '"JWT or cookies?" is the wrong framing, and it causes a lot of confused arguments. A JWT is a token format. A cookie is a transport and storage mechanism. You can put a JWT in a cookie. The decision that actually matters is where the browser keeps the credential and who can read it.',
          'Reframed properly, there are two realistic options: a token the JavaScript can read, or a cookie the JavaScript cannot. Each trades one attack class for another.',
        ],
      },
      {
        heading: 'Token in localStorage: exposed to XSS',
        body: [
          'Storing a JWT in localStorage or sessionStorage is convenient. Your client reads it, attaches an Authorization header, and the API stays stateless and easy to reason about — which is genuinely valuable when the same API serves a web front end, mobile clients, and server-to-server callers.',
          'The cost is that any script running on your origin can read it. One successful cross-site scripting flaw — in your code or in any dependency you shipped — and the attacker exfiltrates a bearer token that works from anywhere until it expires. No CSRF exposure, but a single XSS becomes full account takeover.',
        ],
      },
      {
        heading: 'HttpOnly cookie: exposed to CSRF',
        body: [
          'An HttpOnly cookie cannot be read by JavaScript at all, which removes token theft via XSS from the table. The browser attaches it automatically.',
          'That automatic attachment is precisely the new problem. If the browser sends the cookie on any request to your origin, a different site can cause the browser to make a state-changing request that carries it. That is CSRF, and it is why cookie auth needs SameSite plus an anti-CSRF token for unsafe methods.',
        ],
        code: {
          lang: 'python',
          content: `# Cookie-based session: the flags are the security
response.set_cookie(
    "session",
    value=token,
    httponly=True,   # JavaScript cannot read it
    secure=True,     # HTTPS only
    samesite="Lax",  # not sent on cross-site POSTs
    max_age=3600,
)`,
        },
      },
      {
        heading: 'How to actually choose',
        body: [
          'The honest answer depends on what your API serves. A single first-party web application, same site, browser-only: HttpOnly cookies with SameSite and CSRF protection are the stronger default, because XSS is the more commonly exploited of the two and cookies take token theft off the table.',
          'An API with multiple non-browser consumers — mobile apps, CLIs, service-to-service integrations — pushes toward bearer tokens, because cookies are a browser mechanism and forcing every client through them is awkward. This is the situation on the platform I work on: the API is consumed by more than just a browser front end, so endpoints are secured with JWT bearer tokens and role-based access control.',
        ],
        list: [
          'Keep access-token lifetimes short so a stolen token has a small window',
          'Never treat client-side claims as authorisation — verify on the server, every request',
          'Scope tokens to what the caller needs, not to everything the user can do',
          'Have a revocation story; "it expires eventually" is not one',
        ],
      },
      {
        heading: 'The part people skip',
        body: [
          'Whichever you choose, the token is not your authorisation model. A signed token proves identity and carries claims; it does not decide whether this caller may perform this operation on this object. That check belongs on the server, on every request, against your own role and entitlement model.',
          'Storage choice mitigates credential theft. It does nothing about a valid credential being used for something it should not reach — which, in my experience, is where the more interesting access control bugs actually live.',
        ],
      },
    ],
  },

  {
    slug: 'okta-security-research',
    title: 'How I Found an Okta Security Issue',
    description:
      'Okta blocks the dashboard when a trial expires. It does not block the API. Here is the finding, the reasoning behind it, and how it was classified.',
    date: '2025-11-28',
    readingTime: '6 min read',
    tags: ['Security Research', 'Bug Bounty', 'Access Control', 'Okta'],
    links: [
      {
        label: 'Bugcrowd profile',
        href: 'https://bugcrowd.com/h/sivak08557e93-5289-47fa-bf58-a4d0f066d6d4',
      },
    ],
    sections: [
      {
        heading: 'The question behind it',
        body: [
          'Most access control bugs come from the same shape of mistake: a rule enforced in one layer and assumed in the others. So when I looked at a product with a time-limited free trial, the question I wanted to answer was narrow — where does trial enforcement actually live? Is it a property of the tenant, checked on every request, or is it something the user interface does?',
          'That distinction matters because the UI and the API are usually built by different people at different times, and subscription state is business logic that tends to be bolted on late.',
        ],
      },
      {
        heading: 'What I tested',
        body: [
          'Okta offers a 30-day trial tenant. The straightforward experiment was to take a trial tenant past its expiry date and then compare what the two surfaces do.',
          'The dashboard behaves correctly. Once the trial expires, UI and dashboard access is blocked as you would expect — from the browser, the tenant looks shut down.',
          'The API does not. Authenticated calls against the tenant\'s API continued to function normally after expiry, including reading tenant data through standard endpoints such as the users API. I kept checking, and access persisted well beyond the trial window — over a year in my testing.',
        ],
      },
      {
        heading: 'Why this is a security finding and not just a billing bug',
        body: [
          'It is tempting to file this under revenue leakage. But the underlying defect is an authorisation one: the subscription limitation is a control that is enforced on one interface and not on another. A user retains a level of access their tenant\'s state should no longer permit, which is exactly the pattern of a broken access control issue rather than a pricing oversight.',
          'The practical impact is that a trial tenant can keep using the APIs indefinitely without ever upgrading, and retains persistent programmatic access to tenant data long after the entitlement to it lapsed. Bugcrowd classified it under Broken Access Control leading to Privilege Escalation, at P4 severity — the low end, which fits: it affects your own tenant, not someone else\'s data.',
        ],
      },
      {
        heading: 'The disclosure',
        body: [
          'I reported it through Okta\'s Bugcrowd programme in November 2025. It was triaged, accepted as a valid issue, and rewarded with a $200 bounty and 5 points.',
          'I want to be straightforward about severity here, because inflating a finding is worse than reporting a small one. This is a P4. It is not a data breach and it does not cross a tenant boundary. What made it worth reporting is that it is a clean, reproducible example of enforcement asymmetry in a product whose entire business is access control.',
        ],
      },
      {
        heading: 'The lesson I took from it',
        body: [
          'If a rule matters, enforce it where authorisation is decided — not where it is displayed. Subscription state, plan limits, and trial expiry are all authorisation inputs. Checking them when rendering a dashboard protects the dashboard. Checking them in the API authorisation layer protects the product.',
          'It is the same instinct I apply to the identity platform I build day to day. Any control that exists only in the front end is a control that exists only for people using the front end.',
        ],
      },
    ],
  },

  {
    slug: 'building-an-mcp-server',
    title: 'Building an MCP Server in Python',
    description:
      'The Model Context Protocol gives language models a standard way to reach your tools and data. Here is what the pieces are and how I structured mine.',
    date: '2026-03-27',
    readingTime: '7 min read',
    tags: ['Python', 'MCP', 'AI', 'Tooling'],
    links: [
      { label: 'AI_MCP_PROJECT on GitHub', href: 'https://github.com/siva-k-dev/AI_MCP_PROJECT' },
    ],
    sections: [
      {
        heading: 'Why a protocol at all',
        body: [
          'Wiring a language model to external capabilities has been solved repeatedly, badly, and privately. Every application invents its own tool-calling glue, and none of it transfers. Change host application and you rewrite the integration.',
          'The Model Context Protocol exists to make that layer standard. A server exposes capabilities; any compliant client can discover and call them. The integration you write once becomes usable from anything that speaks the protocol, which is a much better deal than bespoke glue.',
        ],
      },
      {
        heading: 'Tools and resources are not the same thing',
        body: [
          'The distinction that took me longest to internalise, and the one worth getting right early. A tool is something the model can invoke to do work — it takes arguments, it may have side effects, it is a verb. A resource is something the model can read for context — it is addressable, it is a noun.',
          'Conflating them produces awkward designs where "read the config file" becomes a function call and the model has to be told to invoke it. Modelling that as a resource instead means the context is simply available.',
        ],
        list: [
          'Tool — invocable, takes typed arguments, does something',
          'Resource — addressable, returns content, provides context',
          'Prompt — a reusable templated interaction the server offers',
        ],
      },
      {
        heading: 'Keep registration away from transport',
        body: [
          'The structural decision I would repeat: the code that defines a capability should know nothing about how the server communicates. Registration goes in its own modules; transport is a detail the server owns.',
          'This matters because MCP is still young and its surface is still settling. When a revision changes something about the transport or the handshake, I want that to be a change in one place — not a change that ripples through every tool I have written.',
        ],
        code: {
          lang: 'python',
          content: `# Capabilities are declared in their own module and know
# nothing about how the server talks to a client.

@server.tool()
async def summarise_record(record_id: str) -> str:
    """Summarise a record by id."""
    record = await store.fetch(record_id)
    return render_summary(record)


@server.resource("config://settings")
async def settings() -> str:
    """Expose current settings as readable context."""
    return json.dumps(load_settings(), indent=2)`,
        },
      },
      {
        heading: 'Describe things for a reader who cannot see your code',
        body: [
          'A tool\'s description is not a comment — it is the interface. The model decides whether to call your tool based on the name, the description, and the argument schema, and nothing else. A vague description produces a tool that is either ignored or called wrongly.',
          'Concrete, specific, and honest about limits beats clever. "Fetch a user by their email address; returns nothing if no user exists" is a good description. "User helper" is not.',
        ],
      },
      {
        heading: 'Where I took it',
        body: [
          'My implementation exposes custom tools and resources over the protocol with an architecture deliberately kept open to extension, because the point of the project was to learn the shape of the thing rather than to ship one fixed capability set. The source is public if you want to read it.',
          'What I would tell anyone starting: build two capabilities before you settle your structure. The first one teaches you the protocol. The second one teaches you which parts of your first design were accidental.',
        ],
      },
    ],
  },
]

export const getArticle = (slug) => articles.find((article) => article.slug === slug)

export const sortedArticles = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1))
