export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Bot, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Calendar,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Wrench,
  Clock,
  TrendingUp,
  Shield,
  Building2
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-slate-900">OttoManagerPro</span>
              <span className="text-[10px] text-blue-600 font-medium -mt-0.5">AI-Powered Shop Manager</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-md">Meet Otto</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto text-center">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-blue-100">Now with AI-Powered Customer Retention</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-400">Otto</span>,<br />
            Your AI Shop Manager
          </h1>
          
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Otto automatically tracks your customers, sends smart service reminders, 
            and brings them back before they go to competitors. The manager who 
            never sleeps, never forgets a customer, and helps you grow 20-30%.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2 text-lg px-8 bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/25">
                Hire Otto — Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 border-slate-400 text-slate-200 hover:bg-slate-800 hover:text-white">
                See Otto in Action
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-slate-400 mt-4">No credit card required • Setup in 5 minutes • Cancel anytime</p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 pt-12 border-t border-slate-700">
            <div>
              <p className="text-3xl font-bold text-white">20-30%</p>
              <p className="text-sm text-slate-400">More Repeat Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">15 hrs</p>
              <p className="text-sm text-slate-400">Saved Per Week</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-sm text-slate-400">Otto Never Sleeps</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Otto Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                Who is Otto?
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Best Employee Who Never Sleeps</h2>
              <p className="text-slate-600 text-lg mb-6">
                Otto is an AI manager that works 24/7 to keep your customers coming back. 
                He remembers every oil change, every brake job, and every customer's preferences.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <Calendar className="w-5 h-5 text-blue-600" />, text: "Tracks every customer and their service history automatically" },
                  { icon: <MessageSquare className="w-5 h-5 text-teal-600" />, text: "Sends personalized SMS reminders at the perfect time" },
                  { icon: <TrendingUp className="w-5 h-5 text-amber-500" />, text: "Identifies lost customers and brings them back" },
                  { icon: <Clock className="w-5 h-5 text-slate-500" />, text: "Works 24/7 so you can focus on running your shop" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5">{item.icon}</div>
                    <span className="text-slate-700">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 border border-blue-100">
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Otto</p>
                    <p className="text-xs text-slate-500">AI Shop Manager</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-slate-50 rounded-lg p-3">
                    <p className="text-sm text-slate-600">📋 Tracked 47 customers today</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-sm text-blue-700">📱 Sent 12 SMS reminders</p>
                  </div>
                  <div className="bg-teal-50 rounded-lg p-3">
                    <p className="text-sm text-teal-700">✅ 3 appointments booked</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <p className="text-sm text-amber-700">🎯 Found 5 lost customers to re-engage</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-100 text-center">
                  <p className="text-sm text-slate-500">Otto works while you sleep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Problem Otto Solves</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Service shops lose 30–50% of repeat business because customers forget 
              when their next service is due. Until now.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ProblemCard 
              icon={<Users className="w-8 h-8 text-red-500" />}
              stat="30-50%"
              label="Lost Customers"
              description="Of customers don't return simply because they forget"
            />
            <ProblemCard 
              icon={<Clock className="w-8 h-8 text-amber-500" />}
              stat="10+ Hours"
              label="Weekly Admin"
              description="Manual follow-ups, spreadsheets, and forgotten calls"
            />
            <ProblemCard 
              icon={<TrendingUp className="w-8 h-8 text-blue-500" />}
              stat="$0"
              label="Visibility"
              description="No system to track who's due and when"
            />
          </div>
        </div>
      </section>

      {/* How Otto Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              How It Works
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Otto Runs Your Follow-Ups</h2>
            <p className="text-lg text-slate-600">From customer data to booked appointments — automatically</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
              number="1"
              icon={<Wrench className="w-6 h-6" />}
              title="Connect Your Data"
              description="Import from QuickBooks, CSV, or enter manually. Otto learns your customer history."
            />
            <StepCard 
              number="2"
              icon={<Bot className="w-6 h-6" />}
              title="Otto Monitors Everything"
              description="Otto tracks every customer, calculates due dates, and watches for patterns."
            />
            <StepCard 
              number="3"
              icon={<MessageSquare className="w-6 h-6" />}
              title="Smart SMS Reminders"
              description="Otto sends personalized texts at the perfect time. Customers reply to book instantly."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything Otto Does</h2>
            <p className="text-lg text-slate-600">
              One AI manager that handles your entire customer retention system
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Users className="w-6 h-6 text-blue-600" />}
              bgColor="bg-blue-50"
              title="Smart Customer Tracking"
              description="Otto remembers every customer, their vehicles, and service history. No spreadsheets needed."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-6 h-6 text-teal-600" />}
              bgColor="bg-teal-50"
              title="AI SMS Reminders"
              description="Personalized text messages sent at the perfect time. Customers reply to book instantly."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-6 h-6 text-amber-500" />}
              bgColor="bg-amber-50"
              title="Lost Customer Recovery"
              description="Otto identifies customers who haven't returned and re-engages them automatically."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6 text-blue-600" />}
              bgColor="bg-blue-50"
              title="Retention Analytics"
              description="See exactly how many customers Otto brought back and your ROI in real-time."
            />
            <FeatureCard 
              icon={<Building2 className="w-6 h-6 text-teal-600" />}
              bgColor="bg-teal-50"
              title="Multi-Location"
              description="One Otto manages all your locations. Track performance across shops from one dashboard."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6 text-slate-600" />}
              bgColor="bg-slate-50"
              title="TCPA Compliant"
              description="Built-in consent management and opt-out handling. Otto keeps you legally protected."
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm mb-6">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Real Results from Real Shops
              </div>
              <h2 className="text-3xl font-bold mb-4">Shops Using Otto See Real Growth</h2>
              <p className="text-slate-300 text-lg mb-6">
                Don't just take our word for it. Otto tracks every metric so you can 
                see exactly how much revenue he brings back to your shop.
              </p>
              <ul className="space-y-3">
                {[
                  "Track retention rates by month and location",
                  "See which reminders drive the most bookings",
                  "Identify your most valuable customers",
                  "Measure Otto's ROI in real dollars"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <div>
                    <p className="font-medium">Customers Tracked</p>
                    <p className="text-sm text-slate-400">This month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white">1,247</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                  <div>
                    <p className="font-medium text-green-100">SMS Reminders Sent</p>
                    <p className="text-sm text-green-300">Otto working 24/7</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-400">342</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-amber-500/20 rounded-lg border border-amber-500/30">
                  <div>
                    <p className="font-medium text-amber-100">Appointments Booked</p>
                    <p className="text-sm text-amber-300">From Otto reminders</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-amber-400">89</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div>
                    <p className="font-medium text-blue-100">Customer Retention</p>
                    <p className="text-sm text-blue-300">+23% this month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-400">94%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Hire Otto</h2>
            <p className="text-lg text-slate-600">Choose the plan that fits your shop. Otto works 24/7 on all plans.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2 text-slate-900">Otto Starter</h3>
                <p className="text-slate-500 mb-6">For single-location shops</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">$2,000</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">one-time setup</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Otto tracks up to 500 customers",
                    "Automated SMS reminders",
                    "Basic reporting dashboard",
                    "30-day support",
                    "2-week setup"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full" variant="outline">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="relative border-blue-600 shadow-xl shadow-blue-500/10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2 text-slate-900">Otto Professional</h3>
                <p className="text-slate-500 mb-6">For growing multi-location shops</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">$5,000</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">one-time setup</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Otto tracks unlimited customers",
                    "Multi-location support",
                    "Advanced analytics dashboard",
                    "Custom reminder rules",
                    "60-day priority support",
                    "4-week setup"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Hire Otto Pro</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="relative border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-2 text-slate-900">Otto Enterprise</h3>
                <p className="text-slate-500 mb-6">For chains & franchises</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-slate-900">$10,000+</span>
                </div>
                <p className="text-sm text-slate-500 mb-6">custom pricing</p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Custom Otto deployment",
                    "Full API integrations",
                    "White-label option",
                    "Dedicated support",
                    "Custom features",
                    "8+ week setup"
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/sign-up">
                  <Button className="w-full" variant="outline">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
          
          <p className="text-center text-slate-500 mt-8">
            All plans include 30-day money-back guarantee. Otto pays for himself in retained customers.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm mb-8">
            <Bot className="w-4 h-4 text-amber-400" />
            <span className="text-blue-100">Ready to meet Otto?</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Stop Losing Customers to Forgetfulness
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join shops using Otto to automate follow-ups and increase retention by 20-30%.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2 text-lg px-8 bg-amber-500 hover:bg-amber-600 text-white shadow-xl shadow-amber-500/25">
                Hire Otto — Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-slate-400 mt-4">
            Setup takes 5 minutes. Otto works while you sleep.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 bg-slate-950 text-slate-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">OttoManagerPro</span>
                <span className="text-xs text-slate-500">Your AI Shop Manager</span>
              </div>
            </div>
            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/sign-in" className="hover:text-white transition-colors">Sign In</Link>
              <Link href="/sign-up" className="hover:text-white transition-colors">Hire Otto</Link>
              <a href="mailto:hello@ottomanagerpro.com" className="hover:text-white transition-colors">Contact</a>
            </nav>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm">
            <p>© 2026 OttoManagerPro. Otto never forgets a customer.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProblemCard({ icon, stat, label, description }: { 
  icon: React.ReactNode
  stat: string
  label: string
  description: string 
}) {
  return (
    <Card className="text-center border-slate-200">
      <CardContent className="p-8">
        <div className="flex justify-center mb-4">{icon}</div>
        <p className="text-4xl font-bold text-slate-900 mb-1">{stat}</p>
        <p className="font-semibold text-slate-700 mb-2">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description, bgColor }: { 
  icon: React.ReactNode
  title: string
  description: string
  bgColor: string
}) {
  return (
    <Card className="border-slate-200 hover:border-blue-300 transition-colors">
      <CardContent className="p-6">
        <div className={`p-3 ${bgColor} rounded-xl w-fit mb-4`}>
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2 text-slate-900">{title}</h3>
        <p className="text-slate-600 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({ number, icon, title, description }: { 
  number: string
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-teal-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
        {icon}
      </div>
      <div className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-bold text-slate-700 mb-3">
        {number}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}
