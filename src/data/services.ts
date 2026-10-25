export const services = [
  {
    slug: 'recruitment-staffing',
    icon: 'fa-user-plus',
    title: 'Recruitment & Staffing',
    summary: 'Permanent, temporary and contract recruitment built around role fit, reliability and the realities of the Nigerian labour market.',
    description: 'We help employers define roles, identify qualified candidates and move from shortlist to onboarding with a clear, accountable process.',
    benefits: ['Role and workforce requirement review', 'Candidate sourcing and preliminary screening', 'Interview coordination and selection support', 'Reference and documentation checks where required', 'Permanent, temporary and contract staffing options'],
    industries: ['Manufacturing', 'Hospitality', 'Construction', 'Energy', 'Professional offices', 'Logistics'],
    steps: ['Discuss the role, operating environment and employment terms.', 'Agree the sourcing and assessment criteria.', 'Present suitable candidates and coordinate interviews.', 'Support selection, documentation and onboarding.']
  },
  {
    slug: 'labour-outsourcing',
    icon: 'fa-people-carry-box',
    title: 'Labour Outsourcing',
    summary: 'Managed skilled, semi-skilled and unskilled labour for factories, hotels, sites, warehouses and offices.',
    description: 'Our outsourcing service helps organisations secure and coordinate dependable personnel while maintaining clear supervision, documentation and workforce support.',
    benefits: ['Workforce planning for shifts and operational demand', 'Sourcing and deployment of suitable personnel', 'Attendance and workforce coordination support', 'Supervision and issue escalation', 'Documentation and compliance support'],
    industries: ['Factories', 'Warehouses', 'Hotels', 'Construction sites', 'Facilities', 'Logistics operations'],
    steps: ['Assess headcount, skills, shifts and site requirements.', 'Prepare the workforce deployment plan.', 'Source, screen and brief personnel.', 'Deploy and provide ongoing coordination and reporting.']
  },
  {
    slug: 'hr-consulting',
    icon: 'fa-user-tie',
    title: 'HR Consulting',
    summary: 'Practical HR support for workforce planning, policies, performance and day-to-day people operations.',
    description: 'We work with management teams to strengthen HR processes, clarify responsibilities and build systems suited to the organisation’s size and operating environment.',
    benefits: ['HR policy and process review', 'Workforce and organisation planning', 'Job descriptions and role clarification', 'Performance-management support', 'Employee relations and compliance guidance'],
    industries: ['Growing businesses', 'Manufacturing', 'Hospitality', 'Professional services', 'Facilities', 'Multi-site operations'],
    steps: ['Identify the current HR challenge and desired outcome.', 'Review existing documents, roles and practices.', 'Recommend practical improvements and priorities.', 'Support implementation and management adoption.']
  },
  {
    slug: 'training-capacity-development',
    icon: 'fa-chalkboard-user',
    title: 'Training & Capacity Development',
    summary: 'Focused workplace programmes that strengthen employee performance, leadership and safety awareness.',
    description: 'Training is tailored to the audience, work environment and practical skills the organisation needs employees to apply after the session.',
    benefits: ['Training-needs assessment', 'Customised programme design', 'Leadership and supervisory development', 'Workplace conduct and productivity training', 'Safety briefings and operational awareness'],
    industries: ['Manufacturing', 'Hospitality', 'Construction', 'Offices', 'Facilities', 'Service businesses'],
    steps: ['Define the performance or capability gap.', 'Agree learning objectives and participants.', 'Deliver practical, role-relevant training.', 'Collect feedback and recommend follow-up actions.']
  },
  {
    slug: 'ppe-supply',
    icon: 'fa-hard-hat',
    title: 'Personal Protective Equipment Supply',
    summary: 'Workplace safety equipment sourced for operational requirements, site conditions and workforce needs.',
    description: 'We support organisations with essential PPE such as helmets, gloves, reflective vests, safety boots, masks and coveralls.',
    benefits: ['Requirement and quantity review', 'PPE sourcing for different work environments', 'Bulk and recurring supply coordination', 'Delivery planning for operational sites', 'Support selecting appropriate equipment categories'],
    industries: ['Manufacturing', 'Construction', 'Energy', 'Warehousing', 'Cleaning operations', 'Facility management'],
    steps: ['Share the work environment, specifications and quantities.', 'Confirm available options and delivery requirements.', 'Approve the supply schedule.', 'Coordinate delivery and any recurring requirements.']
  },
  {
    slug: 'cleaning-janitorial-services',
    icon: 'fa-broom',
    title: 'Cleaning & Janitorial Services',
    summary: 'Professional cleaning support for offices, factories, warehouses and residential facilities.',
    description: 'Through our integrated service capability, we provide scheduled cleaning and janitorial support built around the facility’s use, operating hours and hygiene requirements.',
    benefits: ['Facility and cleaning-needs assessment', 'Routine or scheduled cleaning plans', 'Janitorial personnel deployment', 'Cleaning supervision and quality checks', 'Support for offices, industrial and residential environments'],
    industries: ['Offices', 'Factories', 'Warehouses', 'Hotels', 'Residential facilities', 'Commercial properties'],
    steps: ['Inspect or review the facility and service expectations.', 'Define scope, frequency, staffing and materials.', 'Deploy the agreed team and schedule.', 'Monitor delivery and address service issues.']
  },
  {
    slug: 'facility-support',
    icon: 'fa-tools',
    title: 'Facility Support Services',
    summary: 'Reliable operational personnel and maintenance support that help facilities run smoothly.',
    description: 'We provide facility support staff, maintenance workers and logistics personnel based on the practical needs of each site.',
    benefits: ['Facility staffing requirement review', 'Deployment of operational support personnel', 'Maintenance and logistics workforce support', 'Site coordination and supervision', 'Flexible support for single or multiple locations'],
    industries: ['Corporate offices', 'Factories', 'Hotels', 'Commercial properties', 'Residential estates', 'Warehouses'],
    steps: ['Review the facility, roles and service levels required.', 'Agree staffing, schedules and responsibilities.', 'Deploy suitable support personnel.', 'Coordinate performance and ongoing requirements.']
  }
] as const;

export type Service = (typeof services)[number];
