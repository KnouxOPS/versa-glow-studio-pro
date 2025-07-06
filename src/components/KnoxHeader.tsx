import { Sparkles, Zap, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const KnoxHeader = () => {
  return (
    <header className="glass-card mx-4 mt-4 p-6">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Logo and Branding */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-primary p-4 neon-glow-primary pulse-neon">
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-gradient-secondary rounded-lg opacity-80"></div>
                <div className="absolute inset-2 bg-background rounded-md flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">KV</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-neon mb-2">
              KNOX VERSA
            </h1>
            <p className="text-secondary-glow text-lg font-medium">
              Vanity Studio Pro MAX
            </p>
            <p className="text-muted-foreground text-sm">
              استوديو الجمال الذكي المحلي
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="status-online">
            <Zap className="w-3 h-3 mr-1" />
            VIP Mode On
          </Badge>
          
          <Badge className="glass-card px-3 py-1 border-primary/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Model: SDXL
          </Badge>
          
          <Badge className="glass-card px-3 py-1 border-secondary/30">
            <Crown className="w-3 h-3 mr-1" />
            Pro Max
          </Badge>
        </div>
      </div>

      {/* Tagline */}
      <div className="mt-6 text-center">
        <p className="text-lg text-muted-foreground">
          🚀 <span className="text-primary-glow">انطلاق نحو الكمال البصري والخصوصية المطلقة</span> ✨
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
          <span>🔐 خصوصية مطلقة</span>
          <span>•</span>
          <span>⚡ معالجة محلية</span>
          <span>•</span>
          <span>🎨 إبداع بلا حدود</span>
        </div>
      </div>
    </header>
  );
};