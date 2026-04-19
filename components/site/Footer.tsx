import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-2xl font-bold">
              <span className="inline-block h-4 w-4 rounded-full bg-gradient-berry shadow-glow" />
              berry<span className="text-gradient-berry">design</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              A design & development studio crafting fast, beautiful, SEO-first
              websites. Based remote, working worldwide.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Studio
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/portfolio" className="hover:text-gradient-berry">Work</Link></li>
              <li><Link href="/services" className="hover:text-gradient-berry">Services</Link></li>
              <li><Link href="/about" className="hover:text-gradient-berry">About</Link></li>
              <li><Link href="/blog" className="hover:text-gradient-berry">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-gradient-berry">Contact</Link></li>
              <li>
                <a href="mailto:hello@berrydesign.online" className="hover:text-gradient-berry">
                  hello@berrydesign.online
                </a>
              </li>
              <li><a href="#" className="hover:text-gradient-berry">LinkedIn</a></li>
              <li><a href="#" className="hover:text-gradient-berry">Dribbble</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} BerryDesign. All rights reserved.</p>
          <p>Crafted with care · berrydesign.online</p>
        </div>
      </div>
    </footer>
  );
}
