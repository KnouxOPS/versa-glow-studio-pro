import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  Zap, 
  Image as ImageIcon, 
  CheckCircle, 
  Clock,
  Wifi,
  Shield
} from "lucide-react";

interface Tool {
  id: string;
  name: string;
  description: string;
}

interface Panel {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools: Tool[];
}

interface StatusBarProps {
  activePanel: Panel;
  activeTool: Tool;
  isProcessing: boolean;
  hasInputImage: boolean;
}

export const StatusBar = ({ 
  activePanel, 
  activeTool, 
  isProcessing, 
  hasInputImage 
}: StatusBarProps) => {
  return (
    <Card className="glass-panel">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left Section - Active Status */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="text-lg">{activePanel.icon}</div>
            <div>
              <h3 className="text-sm font-semibold text-primary-glow">
                {activePanel.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {activeTool.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge 
              className={`
                ${isProcessing 
                  ? 'status-processing' 
                  : hasInputImage 
                    ? 'status-online' 
                    : 'bg-muted/20 text-muted-foreground border-muted/30'
                }
              `}
            >
              {isProcessing ? (
                <>
                  <Zap className="w-3 h-3 mr-1 animate-pulse" />
                  معالجة نشطة
                </>
              ) : hasInputImage ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  جاهز للمعالجة
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3 mr-1" />
                  بانتظار الصورة
                </>
              )}
            </Badge>
          </div>
        </div>

        {/* Center Section - Processing Progress */}
        {isProcessing && (
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium">AI Processing</span>
            </div>
            <div className="flex-1">
              <Progress value={75} className="h-2" />
            </div>
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
        )}

        {/* Right Section - System Status */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Local Processing Badge */}
          <Badge className="glass-card px-3 py-1 border-green-500/30 text-green-400">
            <Shield className="w-3 h-3 mr-1" />
            محلي 100%
          </Badge>

          {/* Offline Mode */}
          <Badge className="glass-card px-3 py-1 border-blue-500/30 text-blue-400">
            <Wifi className="w-3 h-3 mr-1" />
            Offline Mode
          </Badge>

          {/* Performance */}
          <Badge className="glass-card px-3 py-1 border-purple-500/30 text-purple-400">
            <Cpu className="w-3 h-3 mr-1" />
            GPU Turbo
          </Badge>

          {/* Processing Time */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>~3s</span>
          </div>
        </div>
      </div>

      {/* Additional Info Bar */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>🔐 معالجة محلية 100% آمنة</span>
            <span>⚡ GPU Turbo Engine</span>
            <span>🎨 جودة استوديو احترافية</span>
            <span>🚀 تحديثات ذكية مستمرة</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span>Engine: SDXL Turbo + ControlNet</span>
            <span>Resolution: 2048x2048 HDR</span>
            <span>Format: RAW/PNG/HEIF</span>
            <span>Processing: CUDA/OpenCL</span>
          </div>
        </div>
      </div>
    </Card>
  );
};