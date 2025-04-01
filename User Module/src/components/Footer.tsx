
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const footerLinks = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/shop" },
        { label: "Categories", href: "/categories" },
        { label: "Special Offers", href: "/offers" },
        { label: "New Arrivals", href: "/new" },
        { label: "Bestsellers", href: "/bestsellers" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
        { label: "Sustainability", href: "/sustainability" }
      ]
    },
    {
      title: "Help",
      links: [
        { label: "FAQs", href: "/faqs" },
        { label: "Contact Us", href: "/contact" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Returns & Exchanges", href: "/returns" },
        { label: "Privacy Policy", href: "/privacy" }
      ]
    }
  ];

  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo and info */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-grocery-green to-grocery-light-green">
                GroceryHub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Fresh groceries, delivered to your door. We source the best quality products to ensure your satisfaction.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  123 Fresh Street, Produce City, PC 12345
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm text-muted-foreground">
                  (123) 456-7890
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm text-muted-foreground">
                  support@groceryhub.com
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h3 className="font-medium text-foreground mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-medium text-foreground mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="rounded-full bg-muted/50"
                />
                <Button 
                  type="submit" 
                  className="rounded-full shadow-button"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h3 className="font-medium text-foreground mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted/70">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted/70">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted/70">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 hover:bg-muted/70">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {year} GroceryHub. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link
              to="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/cookies"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
