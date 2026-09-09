import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../lib/auth';
import { getAddresses } from '../lib/addresses';
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Calendar,
  CalendarCheck,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Wrench,
  ThumbsUp,
  MessageSquare,
  ArrowRight,
  X,
  User,
  Heart,
  Share2,
  HelpCircle,
  Check,
  Award,
  Shield,
  Zap,
  RotateCcw,
  CheckCircle,
  Info,
  ChevronDown,
  Building,
  Home as HomeIcon,
  Briefcase,
  CreditCard,
  Banknote,
  Send
} from 'lucide-react';

// Comprehensive catalog of services
const SERVICES_DATA = {
  'sv1': {
    id: 'sv1',
    title: 'Deep Home Sanitization & Full House Cleaning',
    subtitle: 'Hospital-grade sanitization and deep scrubbing for apartments, villas, and independent homes',
    price: 799,
    originalPrice: 1200,
    discount: 33,
    rating: 4.9,
    reviewsCount: 820,
    completedJobs: '2,400+',
    category: 'Home Cleaning',
    location: 'Thrissur Town & surrounding areas',
    coverageRadius: 'Within 25 km radius',
    duration: '2.5 - 3.5 Hours',
    tag: 'VERIFIED PRO',
    warranty: '100% Satisfaction or Free Re-visit Guarantee',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-3',
      name: 'CleanPro Home Hygiene Solutions',
      rating: 4.9,
      reviews: '640+ reviews',
      location: 'Swaraj Round, Thrissur',
      joined: 'Member since 2021',
      badge: 'Certified Clean Partner',
      phone: '+91 98471 22334',
      responseTime: 'Replies in 10 mins',
      onTimeRate: '99.4%'
    },
    packages: [
      { id: 'p1', name: '1 BHK / Studio Deep Cleaning', price: 799, originalPrice: 1200, time: '2 Hours' },
      { id: 'p2', name: '2 BHK Comprehensive Sanitization', price: 1299, originalPrice: 1899, time: '3 Hours', popular: true },
      { id: 'p3', name: '3 BHK Villa / Premium Sanitization', price: 1999, originalPrice: 2899, time: '4.5 Hours' }
    ],
    highlights: [
      'Full house deep vacuuming and high-pressure steam sanitization',
      'Hospital-grade non-toxic, eco-friendly surface disinfectants',
      'Intensive bathroom descaling, mirror polish, and tile grout cleaning',
      'Kitchen degreasing, chimney exterior wipe down, and sink sanitization',
      'Verified technicians with mandatory background verification and photo ID',
      'Dedicated digital checklist signed off by you upon completion'
    ],
    inclusions: [
      'Floor scrubbing with single-disc motorized scrubber',
      'Cobweb removal, ceiling fans and tube light dry cleaning',
      'Window panes, mesh track scrubbing, and balcony jet wash',
      'All cleaning agents, chemicals, and industrial equipment provided'
    ],
    exclusions: [
      'Paint stain removal requiring chemical stripping',
      'Inside closed wardrobes / personal cupboards (unless requested)',
      'Exterior building facade or terrace waterproof cleaning'
    ]
  },
  'sv2': {
    id: 'sv2',
    title: 'Split AC Deep Jet Service & Gas Top-Up',
    subtitle: 'High-pressure indoor & outdoor unit coil wash, cooling optimization, and gas pressure diagnostics',
    price: 499,
    originalPrice: 899,
    discount: 44,
    rating: 4.8,
    reviewsCount: 1240,
    completedJobs: '3,800+',
    category: 'AC & Appliances',
    location: 'Swaraj Round, Thrissur',
    coverageRadius: 'All Thrissur locations',
    duration: '45 - 60 Mins / AC',
    tag: 'POPULAR',
    warranty: '90-Day Service Guarantee on Cooling',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-1',
      name: 'CoolTech Climate Care & Spares',
      rating: 4.8,
      reviews: '920+ reviews',
      location: 'West Fort, Thrissur',
      joined: 'Member since 2020',
      badge: 'Authorized Brand Technicians',
      phone: '+91 98470 55667',
      responseTime: 'Replies in 15 mins',
      onTimeRate: '98.8%'
    },
    packages: [
      { id: 'p1', name: '1 AC Foam & Deep Jet Wash', price: 499, originalPrice: 899, time: '45 Mins' },
      { id: 'p2', name: '2 AC Combo Jet Wash + Inspection', price: 899, originalPrice: 1699, time: '1.5 Hours', popular: true },
      { id: 'p3', name: 'Deep Jet Wash + Gas Leak & Top-Up', price: 1499, originalPrice: 2499, time: '2 Hours' }
    ],
    highlights: [
      '2x deeper jet cleaning using dedicated AC waterproof jacket setup',
      'Anti-fungal foam spray on cooling coil fins to eliminate odors',
      'Outdoor condenser coil high-pressure wash for optimal heat release',
      'Drain tray cleanup to resolve water leakages permanently',
      'Ampere, current load, and Freon gas pressure diagnostic test',
      '90-day guarantee on cooling performance post-service'
    ],
    inclusions: [
      'Indoor blower wheel scrubbing and filter disinfection',
      'Outdoor condenser unit deep wash with pressure pump',
      'Thermostat sensor calibration and remote testing',
      'Comprehensive safety check of electrical wiring and MCB'
    ],
    exclusions: [
      'Spare part replacements (capacitors, fan motors) charged at MRP',
      'Copper pipe extension or new bracket installation'
    ]
  },
  'sv3': {
    id: 'sv3',
    title: 'Full House Electrical Repair & Safety Audit',
    subtitle: 'Licensed electrician visit for short circuit resolution, MCB breaker replacement, wiring & switches',
    price: 399,
    originalPrice: 699,
    discount: 43,
    rating: 4.7,
    reviewsCount: 620,
    completedJobs: '1,900+',
    category: 'Electrical Services',
    location: 'West Fort, Thrissur',
    coverageRadius: 'Thrissur & suburbs',
    duration: '1 - 2 Hours',
    tag: 'EXPERT ELEC',
    warranty: 'Licensed Electrician Visit Guarantee',
    images: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-1',
      name: 'VoltMaster Licensed Electricals',
      rating: 4.8,
      reviews: '530+ reviews',
      location: 'West Fort, Thrissur',
      joined: 'Member since 2019',
      badge: 'Govt. Licensed Wiremen',
      phone: '+91 98472 88991',
      responseTime: 'Replies in 10 mins',
      onTimeRate: '99.1%'
    },
    packages: [
      { id: 'p1', name: 'General Diagnostic & Small Fix (up to 2 points)', price: 399, originalPrice: 699, time: '1 Hour' },
      { id: 'p2', name: 'Full House Safety Audit & Distribution Box Check', price: 699, originalPrice: 1199, time: '2 Hours', popular: true },
      { id: 'p3', name: 'Heavy Appliance Wiring / Inverter Hookup', price: 999, originalPrice: 1599, time: '3 Hours' }
    ],
    highlights: [
      'Govt. certified licensed electricians with calibrated multimeter tools',
      'Pinpoint detection of hidden short circuits and earthing faults',
      'Safe diagnosis and repair of main distribution boards and RCCBs',
      'Heavy appliance wiring for geysers, induction, and EV chargers',
      'Prompt emergency arrival within 60 minutes for urgent requests'
    ],
    inclusions: [
      'Diagnosis and standard repair labor for selected package points',
      'Voltage stability and earth leakage testing',
      'Safety inspection of main breaker switches'
    ],
    exclusions: [
      'Cost of physical switches, MCBs, wires or conduits replaced'
    ]
  },
  'sv4': {
    id: 'sv4',
    title: 'Emergency Plumbing & Pipe Leak Repair',
    subtitle: 'Rapid arrival plumbers for burst pipes, tap replacements, flush tank issues, and drain clogs',
    price: 349,
    originalPrice: 599,
    discount: 42,
    rating: 4.9,
    reviewsCount: 890,
    completedJobs: '3,100+',
    category: 'Plumbing Services',
    location: 'East Fort, Thrissur',
    coverageRadius: 'Thrissur Municipal Corporation & 20km',
    duration: '45 - 90 Mins',
    tag: 'FAST RESPONSE',
    warranty: '30-Day Leak-Free Guarantee',
    images: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-3',
      name: 'RapidFlow Plumbing Specialists',
      rating: 4.9,
      reviews: '780+ reviews',
      location: 'East Fort, Thrissur',
      joined: 'Member since 2021',
      badge: 'Master Plumber Certified',
      phone: '+91 98473 44556',
      responseTime: 'Replies in 5 mins',
      onTimeRate: '99.6%'
    },
    packages: [
      { id: 'p1', name: 'Tap / Mixer / Valve Repair (up to 2 units)', price: 349, originalPrice: 599, time: '45 Mins' },
      { id: 'p2', name: 'Blockage Clearing & Drain Unclogging', price: 549, originalPrice: 899, time: '1 Hour', popular: true },
      { id: 'p3', name: 'Concealed Pipe Leak Detection & Fix', price: 999, originalPrice: 1599, time: '2.5 Hours' }
    ],
    highlights: [
      'Specialized acoustic leak detection and pressure testing',
      'Clog removal with heavy-duty steel snake drain augers',
      'Sanitary fittings, shower mixers, and ceramic cartridge fixes',
      'Overhead tank float valve and pressure pump troubleshooting',
      'Clean post-job cleanup with zero debris left behind'
    ],
    inclusions: [
      'Plumbing labor and diagnostic inspection',
      'Teflon tape, standard washers, and joint sealants',
      'Post-repair pressure testing to confirm 100% leak seal'
    ],
    exclusions: [
      'New brass taps, diverters, or CPVC piping materials'
    ]
  },
  'sv5': {
    id: 'sv5',
    title: 'Sofa & Upholstery Foam Extraction Cleaning',
    subtitle: 'Deep suction injection extraction to remove stubborn stains, dirt, dust mites, and odors',
    price: 899,
    originalPrice: 1499,
    discount: 40,
    rating: 4.8,
    reviewsCount: 430,
    completedJobs: '1,400+',
    category: 'Fabric & Sofa Care',
    location: 'MG Road, Thrissur',
    coverageRadius: 'Thrissur District',
    duration: '1.5 - 2.5 Hours',
    tag: 'DEEP CLEAN',
    warranty: 'Stain-Free & Quick-Dry Finish Guarantee',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-4',
      name: 'VelvetCare Sofa & Fabric Spa',
      rating: 4.8,
      reviews: '310+ reviews',
      location: 'Crafts Square, Thrissur',
      joined: 'Member since 2022',
      badge: 'Certified Fabric Expert',
      phone: '+91 98474 11223',
      responseTime: 'Replies in 15 mins',
      onTimeRate: '98.5%'
    },
    packages: [
      { id: 'p1', name: '3-Seater Sofa Shampoo & Extraction', price: 899, originalPrice: 1499, time: '1.5 Hours' },
      { id: 'p2', name: '5-Seater (3+1+1 or L-Shape) Deep Care', price: 1399, originalPrice: 2199, time: '2.5 Hours', popular: true },
      { id: 'p3', name: 'Complete Living Room (Sofa + Dining Chairs + Carpet)', price: 2199, originalPrice: 3499, time: '3.5 Hours' }
    ],
    highlights: [
      'German high-vacuum injection extraction technology',
      'Stain-specific spot treatment for oil, food, ink, and pet stains',
      'Color-safe, pH-neutral enzyme fabric cleaners',
      'Eliminates 99.9% of dust mites, bacteria, and allergens',
      'Fast moisture extraction allowing sofa to dry in 3-4 hours'
    ],
    inclusions: [
      'Complete dry vacuuming of fabric surface and crevices',
      'Shampoo foam agitation and motorized scrubbing',
      'Deep suction extraction and anti-microbial deodorizer spray'
    ],
    exclusions: [
      'Re-stitching of torn upholstery fabric or leather recoloring'
    ]
  },
  'sv6': {
    id: 'sv6',
    title: 'Washing Machine & Appliance Repair',
    subtitle: 'Diagnostic inspection and repairs for front load, top load, and semi-automatic machines',
    price: 299,
    originalPrice: 499,
    discount: 40,
    rating: 4.6,
    reviewsCount: 510,
    completedJobs: '1,850+',
    category: 'Appliance Repair',
    location: 'Punkunnam, Thrissur',
    coverageRadius: 'Thrissur & within 20km',
    duration: '45 - 60 Mins',
    tag: 'GENUINE SPARES',
    warranty: '90-Day Guarantee on Replaced Spares',
    images: [
      'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-1',
      name: 'ApplianceDoctor Service Hub',
      rating: 4.7,
      reviews: '410+ reviews',
      location: 'Punkunnam, Thrissur',
      joined: 'Member since 2021',
      badge: 'Multi-Brand Authorized',
      phone: '+91 98475 77889',
      responseTime: 'Replies in 15 mins',
      onTimeRate: '98.9%'
    },
    packages: [
      { id: 'p1', name: 'Doorstep Checkup & Problem Diagnosis', price: 299, originalPrice: 499, time: '45 Mins' },
      { id: 'p2', name: 'Descaling & Full Drum Jet Cleaning', price: 599, originalPrice: 999, time: '1.5 Hours', popular: true },
      { id: 'p3', name: 'Major Repair (Motor/PCB/Bearing overhaul)', price: 899, originalPrice: 1499, time: '2.5 Hours' }
    ],
    highlights: [
      'Expert technicians trained across LG, Samsung, Bosch, Whirlpool, IFB',
      'Rapid resolution for drum vibration, drainage errors, and water leakage',
      '100% genuine OEM spare parts with official manufacturer warranty',
      'Diagnostic fee adjusted against total bill if repair is approved'
    ],
    inclusions: [
      'Doorstep visit and complete fault diagnosis',
      'Filter clearing, inlet valve check, and belt tension adjustment',
      'Written estimate before any component replacement'
    ],
    exclusions: [
      'Cost of PCB boards, replacement motors, or inlet hoses'
    ]
  },
  'sv7': {
    id: 'sv7',
    title: 'Modular Kitchen & Furniture Carpenter Care',
    subtitle: 'Cabinet hinge alignment, hydraulic strut fixes, drawer channel replacement, and custom woodwork',
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.9,
    reviewsCount: 380,
    completedJobs: '950+',
    category: 'Carpentry & Woodwork',
    location: 'Kokkalai, Thrissur',
    coverageRadius: 'Thrissur District',
    duration: '2 - 4 Hours',
    tag: 'MASTER CRAFT',
    warranty: '1-Year Workmanship Warranty',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-4',
      name: 'Heritage WoodCraft & Carpentry',
      rating: 4.9,
      reviews: '290+ reviews',
      location: 'Kokkalai, Thrissur',
      joined: 'Member since 2019',
      badge: 'Master Artisan Guild',
      phone: '+91 98476 33221',
      responseTime: 'Replies in 20 mins',
      onTimeRate: '99.0%'
    },
    packages: [
      { id: 'p1', name: 'Hinge / Channel / Lock Realignment (up to 3 units)', price: 599, originalPrice: 999, time: '2 Hours' },
      { id: 'p2', name: 'Modular Kitchen Cabinet Service & Hydraulic Lift Fix', price: 999, originalPrice: 1599, time: '3.5 Hours', popular: true },
      { id: 'p3', name: 'Custom Shelving & Full Wardrobe Overhaul', price: 1799, originalPrice: 2899, time: 'Full Day' }
    ],
    highlights: [
      'Master carpenters with high-precision laser leveling tools',
      'Soft-close telescopic channel and 3D concealed hinge installation',
      'Water damage remediation on kitchen sink base cabinets',
      'Termite inspection and anti-borer wood sealant treatment'
    ],
    inclusions: [
      'Comprehensive carpentry labor and precision fitting',
      'Screws, rawl plugs, and heavy-duty wood adhesives',
      'Smooth functioning alignment of all doors and drawers'
    ],
    exclusions: [
      'Cost of new plywood sheets, laminate sheets, or hardware handles'
    ]
  },
  '101': {
    id: '101',
    title: 'Deep Home Cleaning & Housekeeping Pro',
    subtitle: 'Top-to-bottom sanitization and cleaning for apartments, houses, and workspaces',
    price: 499,
    originalPrice: 899,
    discount: 44,
    rating: 4.9,
    reviewsCount: 820,
    completedJobs: '2,400+',
    category: 'Home Cleaning',
    location: 'Thrissur & Regional Kerala',
    coverageRadius: 'Within 25 km radius',
    duration: '2 - 3 Hours',
    tag: 'TOP RATED',
    warranty: 'Eco-Friendly & 100% Satisfaction Guaranteed',
    images: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-3',
      name: 'CleanPro Hygiene Services',
      rating: 4.9,
      reviews: '640+ reviews',
      location: 'Swaraj Round, Thrissur',
      joined: 'Member since 2021',
      badge: 'Certified Clean Partner',
      phone: '+91 98471 22334',
      responseTime: 'Replies in 10 mins',
      onTimeRate: '99.4%'
    },
    packages: [
      { id: 'p1', name: 'Standard 2-Hour Cleaning Visit', price: 499, originalPrice: 899, time: '2 Hours' },
      { id: 'p2', name: 'Deep Sanitization & Kitchen/Bath Scrub', price: 999, originalPrice: 1599, time: '3.5 Hours', popular: true }
    ],
    highlights: [
      'Top-to-bottom sanitization with organic, non-toxic cleaners',
      'Floor scrubbing, bathroom descaling, and grease removal',
      'Background-checked uniformed cleaning crew'
    ],
    inclusions: ['All cleaning supplies & machinery', 'Floor and tile buffing'],
    exclusions: ['Exterior roof or paint stripping']
  },
  '102': {
    id: '102',
    title: 'AC & Fridge Maintenance & Fast Repair',
    subtitle: 'Certified technicians for quick troubleshooting and repair of all major household appliances',
    price: 799,
    originalPrice: 1299,
    discount: 38,
    rating: 4.8,
    reviewsCount: 940,
    completedJobs: '2,900+',
    category: 'AC & Appliances',
    location: 'Thrissur Town',
    coverageRadius: 'Within 25 km radius',
    duration: '1 - 2 Hours',
    tag: 'FAST RESPONSE',
    warranty: '90-Day Repair Warranty',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-1',
      name: 'CoolTech Climate Care',
      rating: 4.8,
      reviews: '920+ reviews',
      location: 'West Fort, Thrissur',
      joined: 'Member since 2020',
      badge: 'Authorized Brand Technicians',
      phone: '+91 98470 55667',
      responseTime: 'Replies in 15 mins',
      onTimeRate: '98.8%'
    },
    packages: [
      { id: 'p1', name: 'Standard Maintenance Visit', price: 799, originalPrice: 1299, time: '1 Hour' },
      { id: 'p2', name: 'Complete Gas Leak Diagnostic & Fix', price: 1399, originalPrice: 2199, time: '2 Hours', popular: true }
    ],
    highlights: ['Certified appliance specialists', 'Same-day urgent booking', '90-day warranty on spare parts'],
    inclusions: ['Complete inspection', 'Filter and coil cleaning'],
    exclusions: ['Compressor replacement cost']
  },
  '103': {
    id: '103',
    title: 'Emergency Plumbing & 24/7 Leak Fix',
    subtitle: 'Rapid response plumbers for pipe leaks, bathroom fittings, and drain clearance',
    price: 599,
    originalPrice: 999,
    discount: 40,
    rating: 4.9,
    reviewsCount: 780,
    completedJobs: '2,100+',
    category: 'Plumbing Services',
    location: 'Thrissur City',
    coverageRadius: 'All suburbs',
    duration: '1 Hour',
    tag: '24/7 SERVICE',
    warranty: 'Licensed Plumber Guarantee',
    images: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-3',
      name: 'RapidFlow Plumbing Specialists',
      rating: 4.9,
      reviews: '780+ reviews',
      location: 'East Fort, Thrissur',
      joined: 'Member since 2021',
      badge: 'Master Plumber Certified',
      phone: '+91 98473 44556',
      responseTime: 'Replies in 5 mins',
      onTimeRate: '99.6%'
    },
    packages: [
      { id: 'p1', name: 'Emergency Plumber Visit & Fix', price: 599, originalPrice: 999, time: '1 Hour' },
      { id: 'p2', name: 'Full Bathroom Fittings & Leak Seal', price: 1099, originalPrice: 1799, time: '2.5 Hours', popular: true }
    ],
    highlights: ['Rapid dispatch within 45 mins', 'Motorized auger drain clearing', 'No mess left behind'],
    inclusions: ['Standard leak seal labor', 'Basic sealants and washers'],
    exclusions: ['Cost of high-end brass fittings']
  },
  '104': {
    id: '104',
    title: 'Coding & Math Personal 1-on-1 Tutor',
    subtitle: 'Personalized private learning sessions for Computer Science, Web Development, and Calculus',
    price: 299,
    originalPrice: 499,
    discount: 40,
    rating: 4.9,
    reviewsCount: 310,
    completedJobs: '850+',
    category: 'Tutors & Education',
    location: 'Remote / Online & Home Visit',
    coverageRadius: 'Online or Thrissur Town',
    duration: '1 Hour Session',
    tag: 'TOP RATED',
    warranty: 'Free 20-Min Trial Available',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80'
    ],
    provider: {
      id: 'shop-1',
      name: 'EduTech Academy Pro',
      rating: 4.9,
      reviews: '240+ reviews',
      location: 'Thrissur IT Hub',
      joined: 'Member since 2022',
      badge: 'Verified Senior Educators',
      phone: '+91 98479 00112',
      responseTime: 'Replies in 10 mins',
      onTimeRate: '100%'
    },
    packages: [
      { id: 'p1', name: '1-Hour Live Mentorship Class', price: 299, originalPrice: 499, time: '1 Hour' },
      { id: 'p2', name: '5-Session Intensive Mastery Pack', price: 1299, originalPrice: 2299, time: '5 Hours', popular: true }
    ],
    highlights: ['Curriculum customized to your goals', 'Interactive screen sharing and coding exercises', 'Flexible rescheduling'],
    inclusions: ['1-on-1 session recording & code notes', 'Homework review'],
    exclusions: ['External certified exam registration fees']
  }
};

export default function DetailedService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authUser = useAuth();

  // Selected state
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // overview, inclusions, process, reviews, faqs
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1: Date & Time, 2: Address & Contact, 3: Payment & Review, 4: Confirmed
  const [bookingDate, setBookingDate] = useState('tomorrow'); // 'today', 'tomorrow', 'custom'
  const [customDate, setCustomDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM - 01:00 PM');
  const [serviceNotes, setServiceNotes] = useState('');
  
  // Contact & Address
  const [customerName, setCustomerName] = useState(authUser?.name || 'Rahul Varma');
  const [customerPhone, setCustomerPhone] = useState(authUser?.phone || '+91 98471 88220');
  const [customerEmail, setCustomerEmail] = useState(authUser?.email || 'customer@eshop.com');
  const [addressLine, setAddressLine] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Thrissur');
  const [pincode, setPincode] = useState('680001');
  const [addressType, setAddressType] = useState('Home');
  const [saveAddressForFuture, setSaveAddressForFuture] = useState(true);

  // Payment choice
  const [paymentMethod, setPaymentMethod] = useState('pay-after'); // 'pay-after', 'online-upi'
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derive service object
  const service = useMemo(() => {
    if (id && SERVICES_DATA[id]) {
      return SERVICES_DATA[id];
    }
    // Fallback dynamic object for unknown ID
    return {
      id: id || 'sv1',
      title: 'Professional Home & Repair Service',
      subtitle: 'Expert technician visit with verified tools, satisfaction warranty, and transparent rates',
      price: 499,
      originalPrice: 899,
      discount: 44,
      rating: 4.8,
      reviewsCount: 520,
      completedJobs: '1,200+',
      category: 'Services',
      location: 'Thrissur Town & Surrounds',
      coverageRadius: 'Within 25 km radius',
      duration: '1 - 2 Hours',
      tag: 'VERIFIED PRO',
      warranty: 'Satisfaction Guarantee',
      images: [
        'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1000&q=80'
      ],
      provider: {
        id: 'shop-1',
        name: 'E-SHOP Verified Service Network',
        rating: 4.8,
        reviews: '500+ reviews',
        location: 'Thrissur Central',
        joined: 'Member since 2021',
        badge: 'Verified Marketplace Partner',
        phone: '+91 98470 12345',
        responseTime: 'Replies in 15 mins',
        onTimeRate: '99%'
      },
      packages: [
        { id: 'p1', name: 'Standard Inspection & Service Call', price: 499, originalPrice: 899, time: '1 Hour' },
        { id: 'p2', name: 'Comprehensive Deep Care Package', price: 899, originalPrice: 1499, time: '2.5 Hours', popular: true }
      ],
      highlights: [
        'Experienced & background-verified technicians',
        'Doorstep inspection with transparent upfront quote',
        'Free 30-day service warranty on completed jobs',
        'Clean & sanitized work protocol'
      ],
      inclusions: ['Complete technician labor', 'Basic consumables & diagnostics'],
      exclusions: ['Cost of major spare parts or materials']
    };
  }, [id]);

  // Set default package
  useEffect(() => {
    if (service && service.packages && service.packages.length > 0) {
      const popular = service.packages.find(p => p.popular);
      setSelectedPackageId(popular ? popular.id : service.packages[0].id);
    }
  }, [service]);

  // Auto-fill address from address book if available
  useEffect(() => {
    const saved = getAddresses();
    if (saved && saved.length > 0) {
      const def = saved.find(a => a.isDefault) || saved[0];
      if (def) {
        setAddressLine(def.street || def.address || '');
        setLandmark(def.landmark || '');
        setCity(def.city || 'Thrissur');
        setPincode(def.pincode || '680001');
        if (def.name) setCustomerName(def.name);
        if (def.phone) setCustomerPhone(def.phone);
        if (def.type) setAddressType(def.type);
      }
    }
  }, []);

  const activePackage = useMemo(() => {
    if (!service.packages) return null;
    return service.packages.find(p => p.id === selectedPackageId) || service.packages[0];
  }, [service, selectedPackageId]);

  const currentPrice = activePackage ? activePackage.price : service.price;
  const currentOriginalPrice = activePackage ? activePackage.originalPrice : service.originalPrice;
  const currentDiscount = currentOriginalPrice > currentPrice 
    ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
    : 0;

  // Format today / tomorrow strings
  const todayStr = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }, []);

  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }, []);

  const dayAfterStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }, []);

  const selectedDateDisplay = useMemo(() => {
    if (bookingDate === 'today') return `Today (${todayStr})`;
    if (bookingDate === 'tomorrow') return `Tomorrow (${tomorrowStr})`;
    if (bookingDate === 'dayAfter') return dayAfterStr;
    if (customDate) return new Date(customDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    return `Tomorrow (${tomorrowStr})`;
  }, [bookingDate, customDate, todayStr, tomorrowStr, dayAfterStr]);

  // Handle Booking submission
  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedBookingId = `SRV-${Math.floor(1000 + Math.random() * 9000)}`;
      const newBooking = {
        id: generatedBookingId,
        service: service.title,
        packageName: activePackage ? activePackage.name : 'Standard Service',
        note: serviceNotes || (activePackage ? activePackage.name : 'Standard Service Package'),
        customer: customerName,
        phone: customerPhone,
        email: customerEmail,
        address: `${addressLine}${landmark ? `, Near ${landmark}` : ''}, ${city} - ${pincode}`,
        addressType: addressType,
        time: `${selectedDateDisplay} · ${timeSlot}`,
        dateString: selectedDateDisplay,
        timeSlot: timeSlot,
        price: currentPrice,
        originalPrice: currentOriginalPrice,
        paymentMethod: paymentMethod === 'pay-after' ? 'Pay After Service (Cash/UPI)' : 'Online Paid (UPI / Card)',
        paymentStatus: paymentMethod === 'pay-after' ? 'Pending upon completion' : 'Paid Online',
        status: 'Requested',
        createdAt: new Date().toISOString(),
        serviceId: service.id,
        provider: service.provider
      };

      // Persist to localStorage
      try {
        const existingRaw = localStorage.getItem('eshop_service_bookings');
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [newBooking, ...existing];
        localStorage.setItem('eshop_service_bookings', JSON.stringify(updated));
        window.dispatchEvent(new Event('eshop-service-bookings-updated'));
      } catch (err) {
        console.error('Failed to save booking to localStorage:', err);
      }

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);
      setBookingStep(4);
    }, 600);
  };

  const faqs = [
    {
      q: 'How does doorstep service booking work on E-SHOP?',
      a: 'Choose your desired date, time slot, and provide your address. A background-verified expert is immediately assigned to your booking. You can pay conveniently via cash or UPI after the service is executed to your 100% satisfaction.'
    },
    {
      q: 'What if spare parts or additional work is required?',
      a: 'Technicians carry standard diagnostic tools and genuine spares. If an unexpected component needs replacement, the pro will explain the issue and present an official rate card for your approval before commencing work. No surprise charges!'
    },
    {
      q: 'Can I reschedule or cancel my booking?',
      a: 'Yes, absolutely! You can reschedule or cancel your booking for free up to 2 hours before the scheduled time slot through your account dashboard or by calling our priority customer support.'
    },
    {
      q: 'Are the service providers background checked?',
      a: 'Yes. Every technician on the E-SHOP platform undergoes police verification, identity check, and hands-on trade certification. They arrive in uniform with official photo ID badges and sanitized gear.'
    },
    {
      q: 'What is covered under the Service Warranty?',
      a: 'Most services include a 30 to 90-day post-service warranty. If the exact same issue resurfaces within the warranty window, a technician will re-visit and resolve it completely free of charge.'
    }
  ];

  // Related Services
  const relatedServices = useMemo(() => {
    return Object.values(SERVICES_DATA)
      .filter(s => s.id !== service.id)
      .slice(0, 4);
  }, [service.id]);

  return (
    <UserLayout>
      {/* Top Banner / Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link to="/marketplace?category=Services" className="hover:text-primary transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400">{service.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-[300px]">{service.title}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Pro Network
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Express Slots Available Today
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT: Image Gallery & Provider Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Visual Showcase */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-md group">
              <div className="aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden">
                <img 
                  src={service.images[selectedImage] || service.images[0]} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

              {/* Badges Top Left & Right */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 z-10">
                <span className="bg-white/95 backdrop-blur-md text-slate-900 font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm border border-slate-200/80 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {service.tag || 'TOP PRO'}
                </span>
                <span className="bg-blue-600 text-white font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  GUARANTEED
                </span>
              </div>

              <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-sm ${
                    isWishlisted 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                      : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-600'
                  }`}
                  aria-label="Save service"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Image Footer Information inside image */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white text-xs z-10">
                <span className="flex items-center gap-1.5 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Est. Duration: {service.duration}
                </span>
                <span className="flex items-center gap-1.5 font-medium bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {service.coverageRadius}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {service.images && service.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                {service.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer ${
                      selectedImage === idx
                        ? 'border-primary ring-2 ring-primary/20 shadow-sm scale-[1.02]'
                        : 'border-slate-200/80 hover:border-slate-300 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Verified Service Provider Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Fulfillment Partner</span>
                <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available Now
                </span>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0">
                  {service.provider?.name?.charAt(0) || 'S'}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 text-sm truncate">{service.provider?.name}</h4>
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    {service.provider?.location}
                  </p>
                  
                  <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <span className="inline-flex items-center gap-1 font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {service.provider?.rating}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] font-semibold text-slate-500">{service.provider?.reviews}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[11px] font-semibold text-emerald-600">{service.provider?.onTimeRate} On-Time</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Response Time</span>
                  <span className="font-bold text-slate-800 text-xs">{service.provider?.responseTime}</span>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Completed Orders</span>
                  <span className="font-bold text-slate-800 text-xs">{service.completedJobs}</span>
                </div>
              </div>

              <div className="mt-3.5 flex items-center gap-2">
                <a 
                  href={`tel:${service.provider?.phone}`}
                  className="flex-1 text-center py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  Call Partner
                </a>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="flex-1 py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-primary" />
                  Schedule Visit
                </button>
              </div>
            </div>

            {/* Service Safety & Quality Assurances */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white shadow-sm space-y-3.5">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                E-SHOP Service Protection
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Zero Advance Required:</strong> You only pay after work is done and verified.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>{service.warranty}:</strong> Free revisit if problem persists.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Background Checked:</strong> Police-verified local professionals.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT: Service Details & Booking Configuration (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header / Title block */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full">
                  {service.category}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500 text-xs font-medium">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {service.location}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                {service.title}
              </h1>

              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {service.subtitle}
              </p>

              {/* Rating and Social Proof */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-sm">
                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="font-extrabold text-amber-900">{service.rating}</span>
                </div>
                <span className="text-slate-500 font-semibold text-xs">
                  ({service.reviewsCount?.toLocaleString()} verified customer reviews)
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-emerald-700 font-bold text-xs bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {service.completedJobs} Bookings Completed
                </span>
              </div>
            </div>

            {/* Refined Modern Pricing & Package Selection Box */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
              
              {/* Dynamic Price Display */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Service Estimate
                  </span>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      ₹{currentPrice.toLocaleString('en-IN')}
                    </span>
                    {currentOriginalPrice && (
                      <span className="text-sm font-medium text-slate-400 line-through">
                        ₹{currentOriginalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                    {currentDiscount > 0 && (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                        {currentDiscount}% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Taxes & doorstep visit charge included · Zero hidden fees
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-3.5 py-2 text-right self-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 flex items-center justify-end gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available Today
                  </span>
                  <span className="text-xs font-semibold text-slate-800 block mt-0.5">
                    Next: 3:30 PM
                  </span>
                </div>
              </div>

              {/* Package Selector */}
              {service.packages && service.packages.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 tracking-tight">Select Package:</span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {service.packages.length} options available
                    </span>
                  </div>

                  <div className="space-y-2">
                    {service.packages.map((pkg) => {
                      const isSelected = selectedPackageId === pkg.id;
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isSelected
                              ? 'border-primary bg-blue-50/20 ring-1 ring-primary/30 shadow-2xs'
                              : 'border-slate-200/80 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected ? 'border-primary bg-primary' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-xs sm:text-[13px] text-slate-800">{pkg.name}</span>
                                {pkg.popular && (
                                  <span className="bg-amber-50 text-amber-700 border border-amber-200/70 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                                    Popular
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3 text-slate-400" />
                                {pkg.time}
                              </span>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-sm sm:text-base font-bold text-slate-900 block">
                              ₹{pkg.price.toLocaleString('en-IN')}
                            </span>
                            {pkg.originalPrice && (
                              <span className="text-[11px] text-slate-400 line-through block">
                                ₹{pkg.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* BOOK SERVICE BUTTON (Call to Action) */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => {
                    setBookingStep(1);
                    setIsBookingOpen(true);
                  }}
                  className="w-full py-3.5 px-5 rounded-xl bg-primary hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Service Now</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>

                <div className="flex items-center justify-center gap-3 text-[11px] text-slate-500 font-medium text-center">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Pay After Job
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                    Free Rescheduling
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    {service.warranty.split(' ')[0]} Guarantee
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Highlights Bullet Points */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Key Service Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 font-medium">
                {service.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Tabs: Inclusions, Process, Reviews, FAQs */}
            <div className="space-y-4 pt-2">
              {/* Tab navigation */}
              <div className="flex border-b border-slate-200 gap-1 overflow-x-auto">
                {[
                  { id: 'overview', label: "What's Included", icon: CheckCircle2 },
                  { id: 'process', label: 'How It Works', icon: Zap },
                  { id: 'reviews', label: `Reviews (${service.reviewsCount})`, icon: Star },
                  { id: 'faqs', label: 'FAQs', icon: HelpCircle }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-3 px-4 text-xs font-bold whitespace-nowrap border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'border-primary text-primary bg-blue-50/30'
                          : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Inclusions & Exclusions */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  {/* Included */}
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      What is Included
                    </div>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {service.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Excluded */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
                      <AlertCircle className="w-4 h-4 text-slate-400" />
                      What is Excluded
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {service.exclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <X className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: How It Works */}
              {activeTab === 'process' && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 animate-fadeIn">
                  <h4 className="font-bold text-slate-900 text-sm">Step-by-Step Service Delivery</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { step: '01', title: 'Schedule Online', desc: 'Pick your preferred date, time slot, and enter your doorstep address.' },
                      { step: '02', title: 'Verified Pro Assigned', desc: 'A background-checked specialist arrives on time with professional gear.' },
                      { step: '03', title: 'Service Execution', desc: 'Thorough inspection and transparent execution following our standard checklist.' },
                      { step: '04', title: 'Verify & Pay', desc: 'Inspect the completed work and pay cash or UPI with official digital warranty.' }
                    ].map((st, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <span className="text-xl font-black text-primary/40 shrink-0">{st.step}</span>
                        <div>
                          <h5 className="font-bold text-xs text-slate-900">{st.title}</h5>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Reviews */}
              {activeTab === 'reviews' && (
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-black text-slate-900">{service.rating}</span>
                        <div className="flex text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Based on {service.reviewsCount} customer experiences in Thrissur
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                        99% Satisfaction Rate
                      </span>
                    </div>
                  </div>

                  {/* Sample Reviews list */}
                  <div className="space-y-3.5">
                    {[
                      {
                        author: 'Arun V.',
                        date: 'Yesterday',
                        rating: 5,
                        text: 'Punctual, professional, and very thorough. The pro explained everything before starting and left the area spotless. Highly recommended!'
                      },
                      {
                        author: 'Kavitha R.',
                        date: '3 days ago',
                        rating: 5,
                        text: 'Booking was super simple. Arrived within the selected morning slot and solved the problem in under an hour. Great value!'
                      }
                    ].map((rev, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{rev.author}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{rev.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: FAQs */}
              {activeTab === 'faqs' && (
                <div className="space-y-2.5 animate-fadeIn">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                        <button
                          onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                          className="w-full text-left p-3.5 sm:p-4 flex items-center justify-between gap-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELATED / OTHER SERVICES CAROUSEL */}
        <div className="mt-16 pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Other Popular Services in Thrissur
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Verified home care, maintenance and repair pros on demand
              </p>
            </div>
            <Link
              to="/marketplace?category=Services"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              View All Services
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedServices.map((rel) => (
              <ProductCard
                key={rel.id}
                item={{
                  ...rel,
                  image: (rel.images && rel.images[0]) || rel.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&h=300',
                  price: `₹${rel.price.toLocaleString('en-IN')}`,
                  originalPrice: rel.originalPrice ? `₹${rel.originalPrice.toLocaleString('en-IN')}` : null,
                  category: rel.category
                }}
                linkPrefix="/service"
              />
            ))}
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM BAR ON MOBILE */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-3 shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Starting from</span>
          <span className="text-xl font-black text-slate-900">₹{currentPrice.toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={() => {
            setBookingStep(1);
            setIsBookingOpen(true);
          }}
          className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-primary hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5"
        >
          <CalendarCheck className="w-4 h-4" />
          Book Service
        </button>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE BOOK SERVICE MODAL (Date, Time, Address, Confirmation)        */}
      {/* ========================================================================= */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 sticky top-0 z-20 backdrop-blur-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                    {bookingStep === 4 ? 'Booking Confirmed!' : 'Book Doorstep Service'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium truncate max-w-[280px]">
                    {service.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsBookingOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"
                aria-label="Close booking modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Progress Indicator (for steps 1-3) */}
            {bookingStep < 4 && (
              <div className="px-5 pt-3 pb-1 border-b border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                  <span className={bookingStep >= 1 ? 'text-primary' : ''}>1. Schedule Slot</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span className={bookingStep >= 2 ? 'text-primary' : ''}>2. Address & Info</span>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                  <span className={bookingStep >= 3 ? 'text-primary' : ''}>3. Pay & Confirm</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${(bookingStep / 3) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Modal Body */}
            <div className="p-5 space-y-5 flex-grow">

              {/* ---------------------------------------------------- */}
              {/* STEP 1: Date & Time Slot Selection                   */}
              {/* ---------------------------------------------------- */}
              {bookingStep === 1 && (
                <div className="space-y-4">
                  {/* Selected Package summary pill */}
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{activePackage ? activePackage.name : service.title}</span>
                      <span className="text-slate-500 text-[11px]">Est. Duration: {activePackage?.time || service.duration}</span>
                    </div>
                    <span className="text-sm font-black text-primary">₹{currentPrice.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Choose Service Date */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Select Preferred Date:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setBookingDate('today')}
                        className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                          bookingDate === 'today'
                            ? 'border-primary bg-blue-50 text-primary font-bold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                        }`}
                      >
                        <span className="block text-xs font-extrabold">Today</span>
                        <span className="text-[10px] text-slate-500 block">{todayStr}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingDate('tomorrow')}
                        className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                          bookingDate === 'tomorrow'
                            ? 'border-primary bg-blue-50 text-primary font-bold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                        }`}
                      >
                        <span className="block text-xs font-extrabold">Tomorrow</span>
                        <span className="text-[10px] text-slate-500 block">{tomorrowStr}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setBookingDate('dayAfter')}
                        className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                          bookingDate === 'dayAfter'
                            ? 'border-primary bg-blue-50 text-primary font-bold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                        }`}
                      >
                        <span className="block text-xs font-extrabold">Next Day</span>
                        <span className="text-[10px] text-slate-500 block">{dayAfterStr}</span>
                      </button>
                    </div>

                    {/* Or custom date picker */}
                    <div className="pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-500 font-semibold">Or pick a custom date:</span>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={customDate}
                          onChange={(e) => {
                            setCustomDate(e.target.value);
                            setBookingDate('custom');
                          }}
                          className="text-xs p-1.5 border border-slate-200 rounded-lg outline-none focus:border-primary font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Choose Time Slot */}
                  <div className="space-y-2 pt-1">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Select Preferred Arrival Time Window:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { slot: '09:00 AM - 11:30 AM', label: 'Morning Slot' },
                        { slot: '11:30 AM - 02:00 PM', label: 'Mid-Day Slot' },
                        { slot: '02:00 PM - 05:00 PM', label: 'Afternoon Slot' },
                        { slot: '05:00 PM - 07:30 PM', label: 'Evening Slot' }
                      ].map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTimeSlot(s.slot)}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            timeSlot === s.slot
                              ? 'border-primary bg-blue-50/70 text-primary font-bold ring-1 ring-primary'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 font-medium'
                          }`}
                        >
                          <span className="block text-xs font-bold">{s.slot}</span>
                          <span className="text-[10px] text-slate-400 block">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Instructions or Problem Notes */}
                  <div className="space-y-1.5 pt-1">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Specific Instructions or Problem Description (Optional):
                    </label>
                    <textarea
                      rows={2}
                      value={serviceNotes}
                      onChange={(e) => setServiceNotes(e.target.value)}
                      placeholder="e.g. AC unit is on the 2nd floor balcony, please bring a ladder. Water leakage near valve."
                      className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-slate-800"
                    />
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 2: Address & Contact Details                    */}
              {/* ---------------------------------------------------- */}
              {bookingStep === 2 && (
                <div className="space-y-3.5">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                    <span className="font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      Slot: {selectedDateDisplay} · {timeSlot}
                    </span>
                    <button 
                      onClick={() => setBookingStep(1)} 
                      className="text-primary font-bold hover:underline"
                    >
                      Change
                    </button>
                  </div>

                  {/* Customer Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-800"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98470 00000"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  {/* Street Address / Flat */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Doorstep Address (House / Flat / Building No.) *
                    </label>
                    <input
                      type="text"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="e.g. Flat 4B, Skyline Riverdale, West Fort"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-800"
                      required
                    />
                  </div>

                  {/* Landmark, City & Pincode */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div className="space-y-1 col-span-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Landmark
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        placeholder="Near Temple / Bank"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-800"
                      />
                    </div>

                    <div className="space-y-1 col-span-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Town / City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-800"
                        required
                      />
                    </div>

                    <div className="space-y-1 col-span-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-primary font-semibold text-slate-800"
                        required
                      />
                    </div>
                  </div>

                  {/* Address Type Selector */}
                  <div className="space-y-1 pt-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Address Type
                    </label>
                    <div className="flex items-center gap-2">
                      {[
                        { key: 'Home', icon: HomeIcon },
                        { key: 'Apartment', icon: Building },
                        { key: 'Office / Work', icon: Briefcase }
                      ].map((t) => {
                        const Icon = t.icon;
                        const isSelected = addressType === t.key;
                        return (
                          <button
                            key={t.key}
                            type="button"
                            onClick={() => setAddressType(t.key)}
                            className={`flex-1 py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-primary bg-blue-50 text-primary shadow-2xs'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{t.key}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 3: Payment Preference & Final Review            */}
              {/* ---------------------------------------------------- */}
              {bookingStep === 3 && (
                <div className="space-y-4">
                  {/* Summary of slot & address */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2.5 text-xs">
                    <div className="flex items-start justify-between pb-2 border-b border-slate-200/70">
                      <div>
                        <span className="font-bold text-slate-900 text-sm block">{service.title}</span>
                        <span className="text-slate-500 font-medium text-[11px]">
                          Package: {activePackage ? activePackage.name : 'Standard Visit'}
                        </span>
                      </div>
                      <span className="text-sm font-black text-slate-900">
                        ₹{currentPrice.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px]">
                      <div>
                        <span className="text-slate-400 font-bold block uppercase text-[10px]">When</span>
                        <span className="font-semibold text-slate-800">{selectedDateDisplay}</span>
                        <span className="block text-slate-500">{timeSlot}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block uppercase text-[10px]">Doorstep Address</span>
                        <span className="font-semibold text-slate-800 truncate block">{customerName}</span>
                        <span className="text-slate-500 truncate block">{addressLine}, {city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Mode Choice */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
                      Choose How You Want to Pay:
                    </label>

                    <div className="space-y-2">
                      <div
                        onClick={() => setPaymentMethod('pay-after')}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          paymentMethod === 'pay-after'
                            ? 'border-primary bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                            <Banknote className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-slate-900">Pay After Service (Recommended)</span>
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                                Safest
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-500 block">
                              Pay via Cash or UPI QR Code directly to technician once work is finished
                            </span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          paymentMethod === 'pay-after' ? 'border-primary bg-primary' : 'border-slate-300'
                        }`}>
                          {paymentMethod === 'pay-after' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div
                        onClick={() => setPaymentMethod('online-upi')}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          paymentMethod === 'online-upi'
                            ? 'border-primary bg-blue-50/40 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-100 text-primary flex items-center justify-center shrink-0">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-900 block">Instant Online Pay</span>
                            <span className="text-[11px] text-slate-500 block">
                              Google Pay, PhonePe, UPI, Credit/Debit Cards, NetBanking
                            </span>
                          </div>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          paymentMethod === 'online-upi' ? 'border-primary bg-primary' : 'border-slate-300'
                        }`}>
                          {paymentMethod === 'online-upi' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost breakdown calculation */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Service Price</span>
                      <span>₹{currentPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Doorstep Inspection & Travel</span>
                      <span className="text-emerald-600 font-bold">FREE (₹0)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Taxes & Service Guarantee</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between font-black text-sm text-slate-900">
                      <span>Total Amount to Pay</span>
                      <span className="text-primary">₹{currentPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* STEP 4: Confirmed Success Screen                     */}
              {/* ---------------------------------------------------- */}
              {bookingStep === 4 && confirmedBooking && (
                <div className="text-center py-4 space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 block">
                      Booking Confirmed
                    </span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                      Service Scheduled Successfully!
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Booking ID: <strong className="text-slate-900 font-mono text-sm">{confirmedBooking.id}</strong>
                    </p>
                  </div>

                  {/* Summary receipt card */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Service:</span>
                      <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">{confirmedBooking.service}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Scheduled Date & Time:</span>
                      <span className="font-bold text-slate-900 text-right">{confirmedBooking.time}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Service Location:</span>
                      <span className="font-bold text-slate-900 text-right truncate max-w-[220px]">{confirmedBooking.address}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-slate-200">
                      <span className="text-slate-500 font-semibold">Payment Method:</span>
                      <span className="font-bold text-emerald-700 text-right">{confirmedBooking.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between pt-1 font-black text-slate-900 text-sm">
                      <span>Total:</span>
                      <span className="text-primary">₹{confirmedBooking.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 font-medium">
                    A confirmation SMS & WhatsApp message with technician details has been sent to {confirmedBooking.phone}.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
                    <Link
                      to="/account?tab=orders"
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                    >
                      View in My Bookings
                    </Link>
                    <button
                      onClick={() => setIsBookingOpen(false)}
                      className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
                    >
                      Done / Close
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Controls (Steps 1 to 3) */}
            {bookingStep < 4 && (
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3 sticky bottom-0 z-20 backdrop-blur-md">
                {bookingStep > 1 ? (
                  <button
                    onClick={() => setBookingStep(bookingStep - 1)}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    onClick={() => setIsBookingOpen(false)}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 bg-white text-slate-500 font-bold text-xs hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                )}

                {bookingStep === 1 && (
                  <button
                    onClick={() => setBookingStep(2)}
                    className="flex-1 max-w-[240px] py-2.5 px-5 rounded-xl bg-primary hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Continue to Address</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {bookingStep === 2 && (
                  <button
                    onClick={() => {
                      if (!addressLine.trim()) {
                        alert('Please enter your house / flat address.');
                        return;
                      }
                      if (!customerPhone.trim()) {
                        alert('Please provide your phone number.');
                        return;
                      }
                      setBookingStep(3);
                    }}
                    className="flex-1 max-w-[240px] py-2.5 px-5 rounded-xl bg-primary hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>Proceed to Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {bookingStep === 3 && (
                  <button
                    disabled={isSubmitting}
                    onClick={handleConfirmBooking}
                    className="flex-1 max-w-[260px] py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Scheduling...
                      </span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Schedule Visit</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </UserLayout>
  );
}
