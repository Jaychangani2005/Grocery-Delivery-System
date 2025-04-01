
import { useState, useEffect } from "react";
import { ChevronRight, Sparkles, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const benefits = [
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Same-day delivery"
    },
    {
      icon: <Shield className="w-4 h-4" />,
      text: "Fresh guarantee"
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      text: "Quality products"
    }
  ];

  return (
    <div className="relative overflow-hidden pt-20 md:pt-32 pb-16">
      {/* Background elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/5 rounded-full blur-2xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className={cn(
            "text-center md:text-left space-y-6 transition-all duration-700 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Fresh Produce Delivered
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block">Fresh groceries</span>
              <span className="block text-primary">delivered to your door</span>
            </h1>
            <p className="md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Shop from our wide selection of fresh produce, pantry essentials, and household items. 
              Enjoy same-day delivery and our freshness guarantee.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="rounded-full shadow-button font-medium px-6 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                asChild
              >
                <Link to="/shop">
                  Start Shopping
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full font-medium px-6 transform transition duration-300 hover:-translate-y-1"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
            
            {/* Benefits */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className={cn(
                    "flex items-center gap-2 text-sm text-muted-foreground transition-all duration-700 delay-300",
                    loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                  style={{ transitionDelay: `₹{300 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    {benefit.icon}
                  </div>
                  {benefit.text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Hero Image */}
          <div className={cn(
            "transition-all duration-1000 delay-200 transform",
            loaded ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          )}>
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/10 mix-blend-multiply"></div>
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1553546895-531931aa1aa8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80')] bg-cover bg-center transform transition duration-700 hover:scale-105"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
              
              {/* Featured Products Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <div className="glass rounded-xl p-4 backdrop-blur-md">
                  <h3 className="font-medium text-sm mb-3">Featured Categories</h3>
                  <div className="flex space-x-2">
                    {["Organic", "Fresh Produce", "Snacks"].map((cat, i) => (
                      <span 
                        key={i} 
                        className="inline-block text-xs bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-foreground/90"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
