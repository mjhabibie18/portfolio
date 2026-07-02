import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDictionary, Locale } from '@/dictionaries';
import { Metadata } from 'next';

async function getProject(slug: string) {
  const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5131").replace(/\/$/, "");
  try {
    const res = await fetch(`${apiUrl}/api/portfolio/projects/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch project details:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  
  if (!project) return { title: 'Project Not Found' };
  
  const title = (resolvedParams.lang === 'en' && project.titleEn) ? project.titleEn : project.title;
  const desc = (resolvedParams.lang === 'en' && project.descriptionEn) ? project.descriptionEn : project.description;
  
  return {
    title: `${title} — M.J. Habibie Portfolio`,
    description: desc,
    openGraph: {
      title: `${title} — M.J. Habibie`,
      description: desc,
      images: project.imageUrl ? [{ url: project.imageUrl }] : undefined,
    }
  };
}

export default async function ProjectDetail({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);
  
  const project = await getProject(resolvedParams.slug);
  if (!project) notFound();

  const title = (lang === 'en' && project.titleEn) ? project.titleEn : project.title;
  const description = (lang === 'en' && project.descriptionEn) ? project.descriptionEn : project.description;
  const problem = (lang === 'en' && project.problemEn) ? project.problemEn : project.problem;
  const solution = (lang === 'en' && project.solutionEn) ? project.solutionEn : project.solution;
  const impact = (lang === 'en' && project.impactEn) ? project.impactEn : project.impact;

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="section-inner fade-in-up">
        
        {/* Back Button */}
        <Link href={`/${lang}/#projects-preview`} className="btn-secondary" style={{ marginBottom: '2rem', display: 'inline-flex' }}>
          &larr; {dict.Projects_BackHome}
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          {project.award && (
            <div className="project-award" style={{ marginBottom: '1rem' }}>
              <span>🏆</span> {project.award}
            </div>
          )}
          <h1 className="hero-name" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>{title}</h1>
          <p className="hero-description" style={{ fontSize: '1.1rem', maxWidth: '800px' }}>{description}</p>
          
          <div className="project-tech-stack" style={{ marginTop: '1.5rem' }}>
            {project.technology?.split(',').map((tech: string, i: number) => (
                <span key={i} className="tech-badge" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>{tech.trim()}</span>
            ))}
          </div>
        </div>

        {/* Hero Image */}
        {project.imageUrl && (
          <div className="glass-card fade-in-up delay-1" style={{ marginBottom: '4rem', overflow: 'hidden', padding: '4px' }}>
            <img src={project.imageUrl} alt={title} style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
        )}

        {/* Content Grid */}
        <div className="about-grid fade-in-up delay-2">
          
          {/* Main Context */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {problem && (
              <div>
                <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{dict.Detail_Problem}</h2>
                <div className="section-label" style={{ marginBottom: '1rem' }}>{dict.Detail_ProblemSub}</div>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{problem}</p>
              </div>
            )}
            
            {solution && (
              <div>
                <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{dict.Detail_Solution}</h2>
                <div className="section-label" style={{ marginBottom: '1rem' }}>{dict.Detail_SolutionSub}</div>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{solution}</p>
              </div>
            )}
            
            {impact && (
              <div>
                <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{dict.Detail_Impact}</h2>
                <div className="section-label" style={{ marginBottom: '1rem' }}>{dict.Detail_ImpactSub}</div>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{impact}</p>
              </div>
            )}
          </div>

          {/* Sidebar Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 700 }}>Project Links</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {project.githubUrl ? (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '8px' }}>
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    {dict.Detail_ViewGitHub}
                  </a>
                ) : (
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>Private Repository</div>
                )}
                
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    🌐 {dict.Detail_LiveDemo}
                  </a>
                ) : (
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>No Live Demo</div>
                )}
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
