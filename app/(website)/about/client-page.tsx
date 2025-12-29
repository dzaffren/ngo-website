"use client"

import { useLivePreview } from '@payloadcms/live-preview-react'
import { RichText } from "@/components/RichText"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger 
} from "@/components/ui/dialog"
import { Users, ArrowRight, Quote, BookOpen, GraduationCap, Building2, Laptop, Handshake, Heart, Linkedin } from "lucide-react"

// --- HELPER: Image URL ---
const SAMPLE_HERO = {
  established: "Established 2008",
  heading: "About EduEquality Foundation",
  text: "Committed to bridging the education gap and creating equal opportunities for all children.",
  image: { url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" }
}
const getImageUrl = (url?: string | null, fallback?: string) => {
  if (!url) return fallback || "";
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}${url}`;
}

// --- ICON MAPPER ---
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'book': return <BookOpen size={24} />
    case 'users': return <Users size={24} />
    case 'cap': return <GraduationCap size={24} />
    case 'building': return <Building2 size={24} />
    case 'laptop': return <Laptop size={24} />
    case 'handshake': return <Handshake size={24} />
    default: return <Users size={24} />
  }
}

// --- 1. HERO SECTION (Dark) ---
const HeroBlock = ({ data }: { data: any }) => (
  <section className="relative py-32 flex items-center justify-center overflow-hidden bg-slate-900 mt-20">
    <div className="absolute inset-0">
      <img 
        src={getImageUrl(data?.hero?.image?.url, "https://images.unsplash.com/photo-1524178232363-1fb2b075b655")} 
        alt="About Hero" 
        className="w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
    </div>
    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <Badge variant="outline" className="mb-6 text-white border-white/30 bg-white/10 backdrop-blur-sm px-4 py-1">
        {data?.hero?.established || "Established 2008"}
      </Badge>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
        {data?.hero?.heading || "About EduEquality Foundation"}
      </h1>
      <p className="text-xl text-slate-200 max-w-2xl mx-auto leading-relaxed">
        {data?.hero?.text || "Committed to bridging the education gap and creating equal opportunities for all children."}
      </p>
    </div>
  </section>
)

// --- 2. OUR STORY ---
const StoryBlock = ({ data }: { data: any }) => (
  <section className="py-24 bg-white">
    <div className="max-w-4xl mx-auto px-4 text-center">
       <h2 className="text-3xl font-bold mb-8 text-slate-900">Our Story</h2>
       
       <div className="prose prose-lg prose-slate mx-auto text-slate-600 mb-16">
         {typeof data?.story === 'string' ? (
            <p>{data.story}</p>
         ) : (
            <RichText content={data?.story} />
         )}
       </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
             <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <Heart size={20} /> Mission
             </h3>
             <p className="text-slate-700 leading-relaxed text-lg">{data?.mission}</p>
          </div>
          <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
             <h3 className="text-xl font-bold text-orange-600 mb-4 flex items-center gap-2">
                <Quote size={20} className="rotate-180" /> Vision
             </h3>
             <p className="text-slate-700 leading-relaxed text-lg">{data?.vision}</p>
          </div>
       </div>
    </div>
  </section>
)

// --- 3. CORE VALUES ---
const CoreValuesBlock = ({ values }: { values: any[] }) => (
  <section className="py-24 bg-slate-50 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Our Core Values</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">The principles that guide our every action and decision.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values?.map((value: any, i: number) => (
          <Card key={i} className="p-8 border-none shadow-sm hover:shadow-md transition-all hover:-translate-y-1 bg-white">
             <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-orange-600 shadow-inner">
                <Users size={24} />
             </div>
             <h3 className="text-xl font-bold mb-3 text-slate-900 tracking-tight">{value.title}</h3>
             <p className="text-slate-600 leading-relaxed text-sm">{value.description}</p>
          </Card>
        ))}
      </div>
    </div>
  </section>
)

// --- 4. DEPARTMENTS ---
const DepartmentsBlock = ({ departments }: { departments: any[] }) => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Our Departments</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">Specialized, collaborative teams working together.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments?.map((dept: any, i: number) => {
          
          const deptMembers = dept.members || []

          return (
            <Dialog key={i}>
              <DialogTrigger asChild>
                <Card className="p-8 cursor-pointer group hover:border-orange-200 hover:shadow-lg transition-all duration-300 text-left relative overflow-hidden bg-slate-50 border-slate-100">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                     <ArrowRight className="text-orange-500" />
                  </div>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 text-slate-600 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors shadow-inner">
                      {getIcon(dept.icon || 'users')}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors text-slate-900 tracking-tight">{dept.name || dept.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{dept.description}</p>
                  <Badge variant="outline" className="text-xs font-medium text-slate-500 bg-white border-slate-100">
                    {deptMembers.length} Team Members
                  </Badge>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-white">
                 <DialogHeader>
                   <DialogTitle className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">{dept.name || dept.title}</DialogTitle>
                   <DialogDescription className="text-slate-600 text-lg leading-relaxed">
                     {dept.description}
                   </DialogDescription>
                 </DialogHeader>

                 <div className="mt-8 border-t border-slate-100 pt-8">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Department Team</h4>
                    
                    {deptMembers.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {deptMembers.map((member: any, j: number) => (
                            <div key={j} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 shadow-inner">
                               <img 
                                 src={getImageUrl(member.image?.url, "https://via.placeholder.com/150")} 
                                 alt={member.name}
                                 className="w-14 h-14 rounded-full object-cover shadow-md bg-white"
                               />
                               <div>
                                  <p className="font-bold text-slate-900">{member.name}</p>
                                  <p className="text-xs text-orange-600 font-semibold uppercase tracking-wider">{member.role}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-slate-50 rounded-lg text-slate-500 italic">
                         No team members assigned yet.
                      </div>
                    )}
                 </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </div>
  </section>
)

// --- 5. LEADERSHIP (UPDATED: Removed Hover Badge) ---
const LeadershipBlock = ({ leaders }: { leaders: any[] }) => (
  <section className="py-24 bg-slate-950 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Leadership Team</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">The experienced and passionate individuals driving our global mission forward.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {leaders?.map((leader: any, i: number) => (
          
          <Dialog key={i}>
            <DialogTrigger asChild>
              <div className="group text-center flex flex-col items-center cursor-pointer">
                 <div className="relative mb-8 inline-block">
                    {/* Decorative rotated background */}
                    <div className="absolute inset-0 bg-orange-600 rounded-3xl rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 shadow-xl" />
                    
                    {/* Image */}
                    <img 
                      src={getImageUrl(leader.image?.url, "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2")} 
                      alt={leader.name}
                      className="relative w-72 h-80 object-cover rounded-2xl shadow-2xl z-10 transition-all duration-300 group-hover:-translate-y-3 group-hover:scale-[1.02]"
                    />
                    
                    {/* REMOVED THE HOVER BADGE DIV HERE */}
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">{leader.name}</h3>
                 <p className="text-orange-500 font-semibold text-sm mb-5 tracking-widest uppercase">{leader.role}</p>
                 <div className="relative max-w-xs mx-auto">
                    <Quote size={32} className="absolute -top-3 -left-5 text-white/5 rotate-180" />
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto italic relative z-10 line-clamp-2">
                      "{leader.quote || 'Leading with passion and integrity.'}"
                    </p>
                 </div>
              </div>
            </DialogTrigger>

            {/* --- MODAL CONTENT --- */}
            <DialogContent className="sm:max-w-[700px] flex flex-col sm:flex-row gap-0 p-0 overflow-hidden bg-white border-none">
                {/* Image Side */}
                <div className="sm:w-2/5 h-64 sm:h-auto relative bg-slate-100">
                   <img 
                      src={getImageUrl(leader.image?.url, "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2")} 
                      alt={leader.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Text Side */}
                <div className="flex-1 p-8 sm:p-10 flex flex-col">
                  <DialogHeader className="mb-6">
                    <DialogTitle className="text-3xl font-bold text-slate-900 mb-1 text-left">
                        {leader.name}
                    </DialogTitle>
                    <div className="text-orange-600 font-bold uppercase tracking-wider text-sm text-left">{leader.role}</div>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {leader.bio ? (
                        <p className="text-slate-600 leading-relaxed text-base text-left">
                            {leader.bio}
                        </p>
                    ) : (
                        <p className="text-slate-400 italic text-left">No detailed biography available.</p>
                    )}
                    
                    <blockquote className="border-l-4 border-orange-200 pl-4 italic text-slate-500 text-left">
                        "{leader.quote || 'Leading with passion and integrity.'}"
                    </blockquote>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                      {leader.linkedin && (
                        <a 
                            href={leader.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-[#0077b5] transition-colors"
                        >
                            <Linkedin className="w-5 h-5 mr-2" /> Connect on LinkedIn
                        </a>
                      )}
                  </div>
                </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  </section>
)

// --- 6. ALUMNI ---
const AlumniBlock = ({ stories }: { stories: any[] }) => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">Alumni Success Stories</h2>
          <p className="text-slate-600">See the profound, life-long impact of quality education through the stories of our graduates.</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories?.map((story: any, i: number) => (
             <Card key={i} className="bg-white p-8 border-none shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center">
                <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden mb-6 shadow-md bg-white">
                  <img 
                    src={getImageUrl(story.image?.url, "https://via.placeholder.com/150")} 
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Quote className="w-10 h-10 text-orange-200 mx-auto mb-5 rotate-180" />
                <p className="text-slate-600 italic mb-8 leading-relaxed text-lg flex-grow">"{story.quote}"</p>
                <div className="mt-auto w-full border-t border-slate-100 pt-6">
                    <h4 className="font-bold text-slate-900 text-base tracking-tight">{story.name}</h4>
                    <p className="text-orange-600 text-xs font-bold uppercase tracking-wider mt-1">{story.achievement || story.title}</p>
                    <Badge variant="secondary" className="text-xs mt-2 font-medium bg-slate-100 border-none text-slate-600 px-3 py-0.5 rounded-full">
                      {story.year}
                    </Badge>
                </div>
             </Card>
          ))}
       </div>
    </div>
  </section>
)

// --- MAIN CLIENT COMPONENT ---
export default function ClientAboutPage({ data }: { data: any }) {
  
  const { data: liveData } = useLivePreview({
    initialData: data, 
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  // Arrays from single object
  const departments = liveData?.departments || []
  const leaders = liveData?.leaders || []
  const alumni = liveData?.alumni || []

  return (
    <div className="bg-background min-h-screen flex flex-col">
       <HeroBlock data={liveData} />
       <StoryBlock data={liveData} />
       <CoreValuesBlock values={liveData?.values} />
       
       <DepartmentsBlock departments={departments} />
       
       <LeadershipBlock leaders={leaders} />
       <AlumniBlock stories={alumni} />
    </div>
  )
}