/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Simple robust dictionary for bilingual (English & Filipino/Tagalog) support
export const TRANSLATIONS = {
  en: {
    // Nav & Common Titles
    dashboardUrlName: "Digital Headquarters Dashboard",
    system_access: "SYSTEM_ACCESS: FOUNDER_CREDENTIALS",
    active_dev: "● ACTIVE DEV",
    welcome_title: "Welcome to my Digital Headquarters",
    welcome_desc: "Running live telemetry data, code project workspaces, and deep organizational logs.",
    container_online: "127.0.0.1:3000 // CONTAINER ONLINE",
    view_workspace: "View Portfolio Workspace",
    connect_me: "Connect With Me",
    
    // KPIs
    audience_reach: "Total Audience Reach",
    finished_modules: "Finished Repositories",
    system_status: "System Status",
    platform_ingress: "Platform Ingress",
    vs_last_month: "vs last month",
    this_q: "this Q",

    // Navigation & Main Section Headings
    about_title: "About Romel / Core Credentials",
    about_subtitle: "Bridging mechanical operational efficiency with advanced full-stack systems engineering.",
    experience_title: "Experience Timeline & Logs",
    experience_subtitle: "Tracing professional checkpoints from network administration to live production software releases.",
    portfolio_title: "Engineering Showcase Portfolio",
    portfolio_subtitle: "Detailed sandbox repositories, developer dashboards, and client deliverables.",
    mission_title: "Operational Philosophy & Manifesto",
    mission_subtitle: "Rigorous standards guiding software reliability, diagnostic workflows, and developer craft.",
    career_title: "Career Parameters & Contact Hub",
    career_subtitle: "Let's align. Send an authenticated direct transmission or download licensed product deliverables.",
    
    // Core About Details
    bio_intro: "Romel B. Montiagodo has uniquely merged his experience in hardware layout planning and legacy process engineering with modern full-stack web architectures. Having completed comprehensive certifications in full-stack engineering, he designs fail-safe user paths grounded in strict functional logics.",
    milestones_header: "System Milestones",
    skills_header: "Technological Competencies (Hover for Details)",
    
    // Portfolio Categories
    cat_all: "All Workspace",
    cat_ai: "AI Projects",
    cat_web: "Web Development",
    cat_auto: "Automation Systems",
    cat_cases: "Case Studies",
    filter_tags: "Dynamic Tag Filters",
    
    // Interactive & Audio
    audio_settings: "Ambient Audio & Haptics",
    audio_desc: "Subtle audio click/hover responses",
    muted_false: "MUTED: FALSE",
    muted_true: "MUTED: TRUE",
    lang_switcher: "System Language",
    lang_desc: "Toggle portfolio contents in English/Filipino",
    share_btn: "Share",
    share_templates: "Pre-generated Social Share Templates",
    copy_success: "Copied!",
    copy_clipboard: "Copy Template"
  },
  
  fil: {
    // Nav & Common Titles
    dashboardUrlName: "Dashboard ng Digital na Himpilan",
    system_access: "AKSES_NG_SISTEMA: MGA_KREDENSYAL_NG_NAGTATAG",
    active_dev: "● AKTIBONG DEV",
    welcome_title: "Maligayang Pagdating sa aking Digital na Himpilan",
    welcome_desc: "Nagpapatakbo ng live telemetry data, code project workspaces, at mga deep organizational logs.",
    container_online: "127.0.0.1:3000 // CONTAINER ONLINE",
    view_workspace: "Tingnan ang Portfolio ng Likha",
    connect_me: "Makipag-ugnayan sa Akin",

    // KPIs
    audience_reach: "Kabuuang Abot ng Madla",
    finished_modules: "Tapos na mga Repositori",
    system_status: "Katayuan ng Sistema",
    platform_ingress: "Pasukan ng Plataporma",
    vs_last_month: "kumpara noong nakaraang buwan",
    this_q: "ngayong Quarter",

    // Navigation & Main Section Headings
    about_title: "Tungkol kay Romel / Pangunahing Kredensyal",
    about_subtitle: "Pagtatagpo ng kahusayan sa operasyong mekanikal at makabagong systems engineering.",
    experience_title: "Timeline ng Karanasan at mga Log",
    experience_subtitle: "Pagtunton sa mga propesyonal na tagumpay mula sa pangangasiwa ng network hanggang sa live production releases.",
    portfolio_title: "Engineering Showcase Portfolio",
    portfolio_subtitle: "Mga detalyadong sandbox repository, dashboard ng developer, at mga produkto para sa kliyente.",
    mission_title: "Pilosopiya sa Operasyon at Manifesto",
    mission_subtitle: "Mahigpit na mga pamantayan para sa pagiging maaasahan ng software, diagnostic workflows, at sining ng developer.",
    career_title: "Pamantayan sa Karera at Contact Hub",
    career_subtitle: "Tayo ay magtulungan. Magpadala ng napatunayang e-mail o i-download ang mga produkto.",

    // Core About Details
    bio_intro: "Si Romel B. Montiagodo ay natatanging nag-ugnay ng kanyang karanasan sa pagpaplano ng hardware layout at legacy process engineering patungo sa mga modernong full-stack web architectures. Matapos makumpleto ang komprehensibong sertipikasyon sa full-stack engineering, nagdidisenyo siya ng ligtas at mapagkakatiwalaang user paths batay sa mahigpit na functional logics.",
    milestones_header: "Mga Milestones ng Sistema",
    skills_header: "Mga Teknolohikal na Kakayahan (Itapat ang Mouse)",

    // Portfolio Categories
    cat_all: "Lahat ng Gawa",
    cat_ai: "Mga AI Project",
    cat_web: "Web Development",
    cat_auto: "Sistemang Awtomasyon",
    cat_cases: "Pag-aaral ng Kaso",
    filter_tags: "Dinamikong Filter ng Tag",

    // Interactive & Audio
    audio_settings: "Tunog at Haptics sa Paligid",
    audio_desc: "Banayad na tugon ng tunog sa click/hover",
    muted_false: "HINDI NAKA-MUTE",
    muted_true: "NAKA-MUTE",
    lang_switcher: "Wika ng Sistema",
    lang_desc: "I-toggle ang nilalaman ng portfolio sa Ingles/Filipino",
    share_btn: "Ibahagi",
    share_templates: "Mga Template para sa Pagbabahagi",
    copy_success: "Nakuha na!",
    copy_clipboard: "Kopyahin ang Template"
  }
};

export type LanguageType = 'en' | 'fil';
