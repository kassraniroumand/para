export interface HomepageData {
  homepage: {
    hero: {
      header: string;
      subheader: string;
      description: string;
      cta_buttons: string[];
      as_seen_on: {
        title: string;
        brands: string[];
      };
      company_name: string;
    };
    statistics: {
      statistics: Array<{
        value: string;
        label: string;
      }>;
    };
    services: {
      sectionTitle: string;
      sectionSubtitle: string;
      services: Array<{
        icon: string;
        title: string;
        description: string;
        buttonText: string;
        badge: string;
      }>;
    };
    framework: {
      sectionTitle: string;
      sectionSubtitle: string;
      badge: string;
      steps: Array<{
        title?: string;
        description?: string;
        icon?: string;
      }>;
    };
    projects: {
      sectionTitle: string;
      sectionDescription: string;
      featuredProject: {
        title: string;
        image: string;
      };
      projects: Array<{
        title?: string;
        description?: string;
        src?: string;
        image?: string;
        link?: string;
        color?: string;
      }>;
    };
  };
}
