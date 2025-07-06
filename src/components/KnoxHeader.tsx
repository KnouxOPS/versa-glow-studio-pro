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
              Vanity Studio Pro MAX v2.5
            </p>
            <p className="text-muted-foreground text-sm">
              استوديو الجمال الذكي المحلي - Professional AI Beauty Suite
            </p>
          </div>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3 flex-wrap">
          <Badge className="status-online">
            <Zap className="w-3 h-3 mr-1" />
            GPU Accelerated
          </Badge>
          
          <Badge className="glass-card px-3 py-1 border-primary/30">
            <Sparkles className="w-3 h-3 mr-1" />
            Stable Diffusion XL Turbo
          </Badge>
          
          <Badge className="glass-card px-3 py-1 border-secondary/30">
            <Crown className="w-3 h-3 mr-1" />
            Enterprise License
          </Badge>
        </div>
      </div>

      {/* Tagline */}
      <div className="mt-6 text-center">
        <p className="text-lg text-muted-foreground">
          🚀 <span className="text-primary-glow">تقنية الذكاء الاصطناعي المتطورة لتحسين الصور - 100% محلي وآمن</span> ✨
        </p>
        <div className="flex items-center justify-center gap-2 mt-2 text-sm text-muted-foreground">
          <span>🔐 بياناتك محمية محلياً</span>
          <span>•</span>
          <span>⚡ معالجة فورية بالـ GPU</span>
          <span>•</span>
          <span>🎨 10 استوديوهات متخصصة</span>
          <span>•</span>
          <span>🌟 جودة احترافية</span>
        </div>
      </div>
    </header>
  );
};