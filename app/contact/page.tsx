import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Beaker } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
              <Beaker size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Chem<span className="text-primary">Direct</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/contact" className="text-primary transition-colors">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-foreground mb-4">Contact Our Specialists</h1>
          <p className="text-xl text-muted-foreground">We are here to assist with enterprise procurement and clinical inquiries.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-card rounded-3xl p-8 md:p-12 border border-border shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
            <div className="space-y-6 text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email Inquiries</p>
                  <p>clinical@chemdirect.example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Global Support</p>
                  <p>+1 (800) 555-CHEM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Headquarters</p>
                  <p>1280 Life Science Parkway, CA 94080</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
                <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" placeholder="Dr. Jane Smith" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Institution</label>
                <input type="text" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" placeholder="Research Lab / University" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Message</label>
                <textarea rows={4} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" placeholder="How can we assist?"></textarea>
              </div>
              <button type="button" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
