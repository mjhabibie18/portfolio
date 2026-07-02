import React from 'react';
import ContactForm from '@/components/ContactForm';
import Typewriter from '@/components/Typewriter';
import { getDictionary, Locale } from '@/dictionaries';

export const dynamic = 'force-dynamic';

// --- Interfaces Data ---
interface Profile {
  name: string;
  title: string;
  email: string;
  location: string;
  aboutSummary?: string;
  aboutSummaryEn?: string;
  tagline?: string;
  taglineEn?: string;
  cvUrl?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  photoUrl?: string;
}

interface Project {
  id: number;
  title: string;
  titleEn?: string;
  slug: string;
  description: string;
  descriptionEn?: string;
  technology: string;
  imageUrl: string;
  githubUrl: string;
  demoUrl: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  positionEn?: string;
  description: string;
  descriptionEn?: string;
  achievements: string;
  achievementsEn?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
}

interface Skill {
  id: number;
  category: string;
  name: string;
  sortOrder: number;
}

// --- Fetch Functions ---
async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch("http://localhost:5131/api/portfolio/profile", { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
}

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch("http://localhost:5131/api/portfolio/projects", { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

async function getExperiences(): Promise<Experience[]> {
  try {
    const res = await fetch("http://localhost:5131/api/portfolio/experiences", { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

async function getSkills(): Promise<Skill[]> {
  try {
    const res = await fetch("http://localhost:5131/api/portfolio/skills", { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    return [];
  }
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  const [profileData, projects, experiences, skills] = await Promise.all([
    getProfile(),
    getProjects(),
    getExperiences(),
    getSkills(),
  ]);

  const profile: Profile = profileData || {
    name: "M.J. Habibie",
    title: "Technical Consultant Analyst",
    email: "mjhabibie598@gmail.com",
    location: "Jakarta, Indonesia",
    githubUrl: "https://github.com/mjhabibie18"
  };

  // Kalkulasi dinamis tahun pengalaman
  let yearsExp = 4;
  if (experiences && experiences.length > 0) {
    const earliestDate = new Date(Math.min(...experiences.map(e => new Date(e.startDate).getTime())));
    yearsExp = Math.max(1, new Date().getFullYear() - earliestDate.getFullYear());
  }

  return (
    <>
      {/* ═══════════════════════════════════════════════════════ HERO ═══ */}
      <section id="hero" aria-label="Introduction">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="section-inner">
              <div className="hero-grid">

                  {/* Left: Content */}
                  <div>
                      <div className="hero-badge fade-in-up">
                          <span className="hero-badge-dot" aria-hidden="true"></span>
                          {dict.Hero_Available}
                      </div>

                      <h1 className="hero-name fade-in-up delay-1">
                          {dict.Hero_Greeting} <span className="gradient-text">{profile.name}</span>
                      </h1>

                      <p className="hero-title fade-in-up delay-2">{profile.title}</p>

                      <p className="hero-description fade-in-up delay-3" id="hero-tagline">
                          <Typewriter text={lang === 'en' && profile.taglineEn ? profile.taglineEn : (profile.tagline || dict.Hero_Tagline)} />
                      </p>

                      <div className="hero-stats fade-in-up delay-3">
                          <div>
                              <div className="hero-stat-value">{yearsExp}+</div>
                              <div className="hero-stat-label">{dict.Hero_StatExperienceLabel}</div>
                          </div>
                          <div>
                              <div className="hero-stat-value">{projects.length}+</div>
                              <div className="hero-stat-label">{dict.Hero_StatProjectsLabel}</div>
                          </div>
                      </div>

                      <div className="hero-cta fade-in-up delay-4">
                          <a href="#projects-preview" className="btn-primary" id="cta-view-projects">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                              </svg>
                              {dict.Hero_ViewProjects}
                          </a>

                          {profile.cvUrl && (
                              <a href={profile.cvUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer" id="cta-download-cv">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                      <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                  </svg>
                                  {dict.Hero_DownloadCV}
                              </a>
                          )}

                          {profile.githubUrl && (
                              <a href={profile.githubUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer" id="cta-github">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                  </svg>
                                  {dict.Hero_GitHub}
                              </a>
                          )}

                          {profile.linkedInUrl && (
                              <a href={profile.linkedInUrl} className="btn-secondary" target="_blank" rel="noopener noreferrer" id="cta-linkedin">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                      <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM20.45 20.45h-3.56v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.15 1.46-2.15 2.96v5.7H9.31V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
                                  </svg>
                                  LinkedIn
                              </a>
                          )}
                      </div>
                  </div>

                  {/* Right: Photo */}
                  <div className="hero-photo-wrapper fade-in-up delay-2">
                      <div className="hero-photo-ring">
                          {profile.photoUrl ? (
                              <img src={profile.photoUrl} alt="Photo" className="hero-photo" width="254" height="254" />
                          ) : (
                              <div className="hero-photo" style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', fontWeight: 800, color: 'var(--color-primary-light)', background: 'var(--color-bg-card)' }}>
                                  MH
                              </div>
                          )}
                      </div>
                  </div>

              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ ABOUT ═══ */}
      <section id="about" className="section" aria-label="About">
          <div className="section-inner">
              <div className="section-label fade-in-up">{dict.About_Label}</div>
              <h2 className="section-title fade-in-up delay-1">
                  {dict.About_Title} <span className="gradient-text">{dict.About_TitleHighlight}</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'center' }} className="fade-in-up delay-2">
                  <div>
                      <div style={{ color: 'var(--color-text-secondary)', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1rem' }}>
                          {(lang === 'en' && profile.aboutSummaryEn ? profile.aboutSummaryEn : profile.aboutSummary) ? (
                              (lang === 'en' && profile.aboutSummaryEn ? profile.aboutSummaryEn : profile.aboutSummary)!.split('\n').map((line, i) => (
                                  <React.Fragment key={i}>
                                      {line}
                                      <br />
                                  </React.Fragment>
                              ))
                          ) : (
                              <>
                                  <p style={{ marginBottom: '1.25rem' }}>{dict.About_Paragraph1}</p>
                                  <p>{dict.About_Paragraph2}</p>
                              </>
                          )}
                      </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🎓</span>
                          <div>
                              <div style={{ fontSize: '.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{dict.About_EducationLabel}</div>
                              <div style={{ fontSize: '.9rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{dict.About_EducationValue}</div>
                          </div>
                      </div>
                      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🏢</span>
                          <div>
                              <div style={{ fontSize: '.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>{dict.About_RoleLabel}</div>
                              <div style={{ fontSize: '.9rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>{dict.About_RoleValue}</div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ EXPERIENCE ═══ */}
      <section id="experience" className="section" style={{ background: 'var(--color-bg-surface)' }} aria-label="Work Experience">
          <div className="section-inner">
              <div className="section-label fade-in-up">{dict.Exp_Label}</div>
              <h2 className="section-title fade-in-up delay-1">
                  {dict.Exp_Title} <span className="gradient-text">{dict.Exp_TitleHighlight}</span>
              </h2>
              <p className="section-subtitle fade-in-up delay-2">{dict.Exp_Subtitle}</p>

              <div className="timeline" role="list">
                  {experiences.length > 0 ? experiences.map((exp) => {
                      const title = (lang === 'en' && exp.positionEn) ? exp.positionEn : exp.position;
                      const description = (lang === 'en' && exp.descriptionEn) ? exp.descriptionEn : exp.description;
                      const rawAchievements = (lang === 'en' && exp.achievementsEn) ? exp.achievementsEn : exp.achievements;
                      const achievementsList = rawAchievements ? rawAchievements.split('|').map(a => a.trim()).filter(a => a) : [];

                      return (
                        <article key={exp.id} className="timeline-item glass-card fade-in-up" style={{ padding: '1.5rem' }} role="listitem">
                            <div className="timeline-period">
                              {new Date(exp.startDate).getFullYear()} - {exp.isCurrent ? dict.Exp_Present : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
                            </div>
                            <div className="timeline-company">{exp.company}</div>
                            <div className="timeline-position">{title}</div>
                            
                            {description && (
                                <p style={{ fontSize: '.875rem', color: 'var(--color-text-secondary)', margin: '.5rem 0 .75rem' }}>
                                    {description}
                                </p>
                            )}
                            
                            {achievementsList.length > 0 && (
                                <ul className="timeline-achievements">
                                    {achievementsList.map((achievement, idx) => (
                                        <li key={idx}>{achievement.replace('-', '').trim()}</li>
                                    ))}
                                </ul>
                            )}
                        </article>
                      );
                  }) : (
                      <p style={{ color: 'var(--color-text-secondary)' }}>Belum ada data pengalaman kerja.</p>
                  )}
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ SKILLS ═══ */}
      <section id="skills" className="section" aria-label="Skills">
          <div className="section-inner">
              <div className="section-label fade-in-up">{dict.Skills_Label}</div>
              <h2 className="section-title fade-in-up delay-1">
                  {dict.Skills_Title} <span className="gradient-text">{dict.Skills_TitleHighlight}</span>
              </h2>
              <p className="section-subtitle fade-in-up delay-2">{dict.Skills_Subtitle}</p>

              <div className="skills-grid">
                  {skills.length > 0 ? (
                      Object.entries(
                          skills.reduce((acc, skill) => {
                              acc[skill.category] = acc[skill.category] || [];
                              acc[skill.category].push(skill);
                              return acc;
                          }, {} as Record<string, Skill[]>)
                      ).map(([category, categorySkills], index) => {
                          let icon = "💡";
                          if (category.toLowerCase().includes("backend")) icon = "⚙️";
                          if (category.toLowerCase().includes("database")) icon = "🗄️";
                          if (category.toLowerCase().includes("mobile")) icon = "📱";
                          if (category.toLowerCase().includes("tools")) icon = "🛠️";
                          if (category.toLowerCase().includes("programming") || category.toLowerCase().includes("frontend")) icon = "💻";
                          if (category.toLowerCase().includes("soft")) icon = "🤝";

                          return (
                              <div key={category} className="glass-card fade-in-up" style={{ padding: '1.5rem', transitionDelay: `${index * 0.05}s` }}>
                                  <div className="skill-category-title">
                                      <span aria-hidden="true">{icon}</span> {category}
                                  </div>
                                  <div className="skill-tags" role="list">
                                      {categorySkills.map(skill => (
                                          <span key={skill.id} className="skill-tag">{skill.name}</span>
                                      ))}
                                  </div>
                              </div>
                          );
                      })
                  ) : (
                      <p style={{ color: 'var(--color-text-secondary)' }}>Belum ada data keahlian.</p>
                  )}
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ PROJECTS ═══ */}
      <section id="projects-preview" className="section" style={{ background: 'var(--color-bg-surface)' }} aria-label="Featured Projects">
          <div className="section-inner">
              <div className="section-label fade-in-up">{dict.Projects_Label}</div>
              <h2 className="section-title fade-in-up delay-1">
                  {dict.Projects_FeaturedTitle} <span className="gradient-text">{dict.Projects_FeaturedHighlight}</span>
              </h2>
              <p className="section-subtitle fade-in-up delay-2">{dict.Projects_FeaturedSubtitle}</p>

              <div className="projects-grid">
                  {projects.map((project, index) => {
                      const title = (lang === 'en' && project.titleEn) ? project.titleEn : project.title;
                      const description = (lang === 'en' && project.descriptionEn) ? project.descriptionEn : project.description;

                      return (
                        <div key={project.id} className="project-card fade-in-up" style={{ transitionDelay: `${index * 0.1}s` }}>
                            
                            {project.imageUrl ? (
                                <img src={project.imageUrl} alt={title} className="project-card-image" loading="lazy" />
                            ) : (
                                <div className="project-card-image-placeholder" aria-hidden="true"><span>🌱</span></div>
                            )}

                            <div className="project-card-body">
                                <h3 className="project-title">{title}</h3>
                                <p className="project-description">{description}</p>

                                <div className="project-tech-stack">
                                    {project.technology?.split(',').slice(0, 4).map((tech, i) => (
                                        <span key={i} className="tech-badge">{tech.trim()}</span>
                                    ))}
                                </div>

                                <div className="project-links">
                                    {project.githubUrl && (
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                            {dict.Projects_GitHub}
                                        </a>
                                    )}
                                    {project.demoUrl && (
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                                            {dict.Projects_Demo}
                                        </a>
                                    )}
                                    <span className="project-link" style={{ marginLeft: 'auto' }}>{dict.Projects_Details} &rarr;</span>
                                </div>
                            </div>
                        </div>
                      );
                  })}
              </div>
          </div>
      </section>

      {/* ═══════════════════════════════════════════════════════ CONTACT ═══ */}
      <section id="contact" className="section" aria-label="Contact">
          <div className="section-inner">
              <div className="section-label fade-in-up">{dict.Contact_Label}</div>
              <h2 className="section-title fade-in-up delay-1">
                  {dict.Contact_Title} <span className="gradient-text">{dict.Contact_TitleHighlight}</span>
              </h2>
              <p className="section-subtitle fade-in-up delay-2">{dict.Contact_Subtitle}</p>

              <div className="contact-grid">
                  {/* Info */}
                  <div className="fade-in-up delay-2">
                      <div className="contact-info-item">
                          <div className="contact-icon" aria-hidden="true">📧</div>
                          <div>
                              <div style={{ fontSize: '.8rem', color: 'var(--color-text-muted)' }}>Email</div>
                              {profile.email ? (
                                  <a href={`mailto:${profile.email}`} style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{profile.email}</a>
                              ) : (
                                  <span style={{ color: 'var(--color-text-secondary)' }}>Tersedia via Form</span>
                              )}
                          </div>
                      </div>

                      <div className="contact-info-item">
                          <div className="contact-icon" aria-hidden="true">📍</div>
                          <div>
                              <div style={{ fontSize: '.8rem', color: 'var(--color-text-muted)' }}>Lokasi</div>
                              <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{profile.location || "Jakarta, Indonesia"}</span>
                          </div>
                      </div>

                      {profile.githubUrl && (
                          <div className="contact-info-item">
                              <div className="contact-icon" aria-hidden="true">💻</div>
                              <div>
                                  <div style={{ fontSize: '.8rem', color: 'var(--color-text-muted)' }}>GitHub</div>
                                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"
                                     style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>{profile.githubUrl.replace(/^https?:\/\/(www\.)?/, '')}</a>
                              </div>
                          </div>
                      )}

                      {profile.linkedInUrl && (
                          <div className="contact-info-item">
                              <div className="contact-icon" aria-hidden="true">💼</div>
                              <div>
                                  <div style={{ fontSize: '.8rem', color: 'var(--color-text-muted)' }}>LinkedIn</div>
                                  <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer"
                                     style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>{profile.linkedInUrl.replace(/^https?:\/\/(www\.)?/, '')}</a>
                              </div>
                          </div>
                      )}

                      {profile.cvUrl && (
                          <div style={{ marginTop: '2rem' }}>
                              <a href={profile.cvUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                      <polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
                                  </svg>
                                  {dict.Hero_DownloadCV}
                              </a>
                          </div>
                      )}
                  </div>

                  {/* Form Component (pass translations) */}
                  <ContactForm dict={dict} lang={lang} />
              </div>
          </div>
      </section>
      
    </>
  );
}
