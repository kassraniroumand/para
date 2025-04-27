import React from 'react'
import { Code } from 'lucide-react';
import clsx from 'clsx';

interface ServiceBoxProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({ title, description, icon, badge }) => {
  return (
    <div className='bg-[#0D1517] rounded-lg p-4'>
      <div className='flex flex-col gap-4'>
        <div className='text-white text-2xl font-bold flex flex-row justify-between'>
          <div className='flex items-center gap-2'>{icon}</div>
          <div className='text-sm p-2 bg-[#0D1517] border border-[#222222] rounded-lg'>{badge}</div>
        </div>
        <div className='text-white text-2xl font-bold'>{title}</div>
        <div className='text-white opacity-70 text-xl'>{description}</div>
        <div className='text-white opacity-70 text-xl flex items-center gap-1'>
          Learn More <span className="ml-1">→</span>
        </div>
      </div>
    </div>
  )
}

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  colSpan: {
    mobile: number;
    desktop: number;
  };
}

const SERVICES_DATA: ServiceData[] = [
  {
    id: 'seo-ppc-1',
    title: "SEO & PPC",
    description: "We're the Secret Sauce to Your Digital Success–Let's Spice Up Your Brand dfsafdsaffdsaf sadfsadfsdaf",
    icon: <Code size={24} />,
    badge: "SEO & PPC",
    colSpan: {
      mobile: 12,
      desktop: 7
    }
  },
  {
    id: 'seo-ppc-2',
    title: "SEO & PPC",
    description: "We're the Secret Sauce to Your Digital Success–Let's Spice Up Your Brand",
    icon: "🔍",
    badge: "SEO & PPC",
    colSpan: {
      mobile: 12,
      desktop: 5
    }
  },
  {
    id: 'seo-ppc-3',
    title: "SEO & PPC",
    description: "We're the Secret Sauce to Your Digital Success–Let's Spice Up Your Brand",
    icon: "🔍",
    badge: "SEO & PPC",
    colSpan: {
      mobile: 12,
      desktop: 5
    }
  },
  {
    id: 'seo-ppc-4',
    title: "SEO & PPC",
    description: "We're the Secret Sauce to Your Digital Success–Let's Spice Up Your Brand dfsafdsaffdsaf sadfsadfsdaf",
    icon: "🔍",
    badge: "SEO & PPC",
    colSpan: {
      mobile: 12,
      desktop: 7
    }
  }
];

interface ServicesBannerProps {
  title?: string;
  subtitle?: string;
  services?: ServiceData[];
}

// Map of column span values to Tailwind classes
const colSpanClasses = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
};

const mdColSpanClasses = {
  1: 'md:col-span-1',
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  5: 'md:col-span-5',
  6: 'md:col-span-6',
  7: 'md:col-span-7',
  8: 'md:col-span-8',
  9: 'md:col-span-9',
  10: 'md:col-span-10',
  11: 'md:col-span-11',
  12: 'md:col-span-12',
};

const ServicesBanner: React.FC<ServicesBannerProps> = ({
  title = "Services",
  subtitle = "We're the Secret Sauce to Your Digital\nSuccess–Let's Spice Up Your Brand",
  services = SERVICES_DATA
}) => {
  return (
    <div className="container bg-black mx-auto rounded-lg">
      <div className='px-4 py-8 flex flex-col gap-4 sm:gap-10'>
        <p className='text-white text-2xl font-bold'>
          {title}
        </p>
        <p className='text-white font-bold text-2xl sm:text-4xl mt-4 opacity-70 whitespace-pre-line'>
          {subtitle}
        </p>
        <div className='grid grid-cols-12 gap-4 mt-8'>
          {services.map((service) => (
            <div
              key={service.id}
              className={clsx(
                colSpanClasses[service.colSpan.mobile as keyof typeof colSpanClasses],
                mdColSpanClasses[service.colSpan.desktop as keyof typeof mdColSpanClasses]
              )}
            >
              <ServiceBox
                title={service.title}
                description={service.description}
                icon={service.icon}
                badge={service.badge}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesBanner
