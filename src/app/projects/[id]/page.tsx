import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { getProject, projects } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { ProjectGallery } from "@/components/work/ProjectGallery";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.image, ...project.gallery],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === id);
  const next = projects[(index + 1) % projects.length];

  const meta = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Studio", value: project.studio },
    { label: "Category", value: project.category },
  ];

  const sections = [
    { label: "Overview", body: project.overview },
    { label: "The Challenge", body: project.challenge },
    { label: "The Solution", body: project.solution },
  ];

  return (
    <article className="px-6 pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to work
          </Link>
        </Reveal>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest"
                style={{ color: project.accent, backgroundColor: `${project.accent}18` }}
              >
                {project.category}
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-6xl">
                {project.title}
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 max-w-xl text-lg text-neutral-500">
                {project.summary}
              </p>
            </Reveal>
          </div>

          {/* Action buttons */}
          {(project.liveUrl || project.repoUrl) && (
            <Reveal delay={0.15}>
              <div className="flex shrink-0 flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Lihat Project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-900"
                  >
                    <Github className="h-4 w-4" />
                    Source
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </div>

        {/* Cover */}
        <Reveal delay={0.15}>
          <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-3xl ring-1 ring-neutral-200/70">
            <div
              aria-hidden
              className="absolute inset-0 z-10"
              style={{
                background: `radial-gradient(120% 120% at 50% 0%, ${project.accent}22, transparent 55%)`,
              }}
            />
            <Image
              src={project.image}
              alt={`${project.title} cover`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 64rem"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Body: structured write-up + meta sidebar */}
        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_auto]">
          <div className="max-w-xl space-y-10">
            {sections.map((section, i) => (
              <Reveal key={section.label} delay={i * 0.05}>
                <section>
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                    {section.label}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-neutral-700">
                    {section.body}
                  </p>
                </section>
              </Reveal>
            ))}

            <Reveal>
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                  Highlights
                </h2>
                <ul className="mt-4 space-y-3">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex gap-3 text-neutral-700">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-200 px-4 py-1.5 text-sm font-medium text-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <dl className="grid grid-cols-2 gap-x-10 gap-y-6 md:sticky md:top-28 md:grid-cols-1">
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-semibold text-neutral-950">
                    {item.value}
                  </dd>
                </div>
              ))}
              {project.liveUrl && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                    Live
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                    >
                      Visit
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </Reveal>
        </div>

        {/* Gallery */}
        <div className="mt-20">
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
              Gallery
            </h2>
          </Reveal>
          <ProjectGallery
            images={project.gallery}
            title={project.title}
            accent={project.accent}
          />
        </div>

        {/* Next project */}
        <Reveal>
          <Link
            href={`/projects/${next.id}`}
            className="group mt-24 flex items-center justify-between rounded-3xl bg-neutral-950 px-8 py-10 text-white transition-colors hover:bg-neutral-800"
          >
            <span>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Next project
              </span>
              <span className="mt-2 block text-2xl font-bold sm:text-3xl">
                {next.title}
              </span>
            </span>
            <ArrowUpRight className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
