"use client"

import { Github, Linkedin, Instagram, ArrowRight } from "lucide-react"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

function splitHeadline(headline) {
  const words = (headline || "Building digital products that matter")
    .trim()
    .split(/\s+/)
  const cut = Math.ceil(words.length / 2)
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")]
}

export default function Banner({
  profile,
  topTech = [],
  projects = [],
  techStacksByCategory = {},
}) {
  const ref = useScrollAnimation()
  const [lineOne, lineTwo] = splitHeadline(profile?.headline)
  const roles = (profile?.titles || []).slice(0, 3)

  const allTech = Object.values(techStacksByCategory).flat()
  // Prefer the years stated in the bio so the numbers never contradict each other.
  const bioYears = Number(profile?.about_long?.match(/(\d+)\+?\s*years/i)?.[1]) || 0
  const years = bioYears || Math.max(0, ...allTech.map((t) => Number(t.years) || 0))
  const stats = [
    { value: projects.length, label: "Projects shipped" },
    {
      value: projects.filter((p) => p.is_live).length,
      label: "Live in production",
    },
    { value: allTech.length, label: "Technologies used" },
    { value: years ? `${years}+` : "—", label: "Years building" },
  ]

  const socials = [
    { href: profile?.github_url, label: "GitHub", Icon: Github },
    { href: profile?.linkedin_url, label: "LinkedIn", Icon: Linkedin },
    { href: profile?.instagram_url, label: "Instagram", Icon: Instagram },
  ].filter((s) => s.href)

  return (
    <section
      id="banner"
      ref={ref}
      className="relative overflow-hidden pt-[72px]"
    >
      <div className="mx-auto grid max-w-site items-center gap-14 px-6 pb-20 pt-14 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        <div>
          {roles.length > 0 && (
            <p className="reveal eyebrow mb-6">{roles.join(" / ")}</p>
          )}

          <h1
            className="reveal heading text-[44px] sm:text-6xl lg:text-[68px] lg:leading-[0.98]"
            style={{ letterSpacing: "-0.055em" }}
            data-delay="1"
          >
            <span className="block text-ink">{lineOne}</span>
            {lineTwo && <span className="block text-accent">{lineTwo}</span>}
          </h1>

          <p
            className="reveal mt-7 max-w-xl text-lg leading-relaxed text-ink/60 md:text-xl md:leading-relaxed"
            data-delay="2"
          >
            {profile?.about_short}
          </p>

          <div
            className="reveal mt-10 flex flex-wrap items-center gap-3"
            data-delay="3"
          >
            <a href="#portfolio" className="btn-primary">
              View my work <ArrowRight size={17} />
            </a>
            <a href="#contact" className="btn-secondary">
              Get in touch
            </a>
          </div>

          {socials.length > 0 && (
            <div
              className="reveal mt-10 flex items-center gap-5"
              data-delay="4"
            >
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-ink/45 transition-colors hover:text-ink"
                >
                  <Icon size={20} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div
          className="reveal relative mx-auto w-full max-w-[460px] lg:mr-0"
          data-delay="2"
        >
          <div
            className="absolute -inset-4 -z-10 rounded-[48%_52%_44%_56%/55%_45%_55%_45%] bg-surface"
            aria-hidden="true"
          />
          <div className="aspect-[4/5] overflow-hidden rounded-[44%_56%_48%_52%/52%_46%_54%_48%] bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile?.avatar_url || "/images/ahmad.jpg"}
              alt={profile?.full_name || "Ahmad Gozali"}
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      {topTech.length > 0 && (
        <div className="mx-auto max-w-site px-6 pb-16 md:px-8">
          <div className="reveal flex flex-col gap-6 md:flex-row md:items-center md:gap-12">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-ink/40">
              Daily stack
            </p>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {topTech.map((t) => (
                <li
                  key={t.id ?? t.name}
                  className="flex items-center gap-2.5 text-ink/50"
                >
                  {t.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.image_url}
                      alt=""
                      className="h-6 w-6 object-contain grayscale opacity-70"
                    />
                  )}
                  <span className="text-base font-semibold tracking-tight">
                    {t.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="rounded-t-3xl bg-night text-on-night">
        <dl className="mx-auto grid max-w-site grid-cols-2 px-6 py-14 md:px-8 lg:grid-cols-4 lg:py-16">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 py-5 lg:px-8 lg:py-2 ${i > 0 ? "lg:border-l lg:border-on-night/15" : ""} ${
                i % 2 === 1 ? "border-l border-on-night/15 pl-6 lg:pl-8" : ""
              }`}
            >
              <dd className="text-5xl font-medium tracking-tight text-accent">
                {s.value}
              </dd>
              <dt className="mt-2 text-[15px] text-on-night/70">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
