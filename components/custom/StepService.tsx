import { PhoneCall, FileSearch, RocketIcon } from "lucide-react";

interface StepProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const StepServiceStep = ({ title, description, icon }: StepProps) => {
  return (
    <div className='flex flex-col gap-3 justify-start bg-[#f9f9f9] p-6 md:p-10 rounded-lg'>
      <div className='flex items-center gap-2'>{icon}</div>
      <span className='text-xl md:text-2xl font-bold'>{title}</span>
      <p className='text-sm md:text-base opacity-80'>{description}</p>
    </div>
  );
};

const STEPS_DATA = [
  {
    title: 'Free Call',
    description: 'Book a free call with a consultant, choose your convenient time to connect',
    icon: <PhoneCall size={24} />
  },
  {
    title: 'Gather Requirements',
    description: 'We completely understand your business needs and dedicate our experts to your project.',
    icon: <FileSearch size={24} />
  },
  {
    title: 'Execute & Elevate',
    description: 'Our professionals plan and execute suitable strategies for your brand\'s digital growth while keeping you in the loop.',
    icon: <RocketIcon size={24} />
  }
];

const StepService = () => {
  return (
    <div className='container mx-auto flex flex-col gap-24 py-10'>
      <div className='flex flex-col gap-4 text-center'>
        <span className='text-blue-800 text-xl md:text-2xl font-bold'>Proven Framework</span>
        <h2 className='text-3xl sm:text-5xl md:text-7xl font-medium'>Our 3-Step Winning Framework</h2>
        <p className='text-gray-600 max-w-2xl mx-auto'>A Simple 3-Step Process to Get Things Done</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
        {STEPS_DATA.map((step, index) => (
          <StepServiceStep
            key={index}
            icon={step.icon}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </div>
  );
};

export default StepService;
