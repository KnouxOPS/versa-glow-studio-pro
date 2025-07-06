import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Zap, Settings2, Play } from "lucide-react";
import { useState } from "react";

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

interface ToolPanelProps {
  panel: Panel;
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  onProcess: () => void;
  isProcessing: boolean;
}

export const ToolPanel = ({ 
  panel, 
  activeTool, 
  onToolChange, 
  onProcess, 
  isProcessing 
}: ToolPanelProps) => {
  const [intensity, setIntensity] = useState([75]);
  const [smoothness, setSmoothness] = useState([50]);
  const [enhancement, setEnhancement] = useState([60]);

  return (
    <Card className="glass-panel space-y-6">
      {/* Panel Header */}
      <div className="text-center">
        <div className="text-4xl mb-2">{panel.icon}</div>
        <h2 className="text-xl font-bold text-primary-glow">
          {panel.title}
        </h2>
        <p className="text-sm text-muted-foreground">
          {panel.description}
        </p>
      </div>

      <Separator className="bg-border/50" />

      {/* Tool Selection */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-secondary-glow flex items-center gap-2">
          <Zap className="w-4 h-4" />
          أدوات القسم
        </h3>
        
        <div className="space-y-2">
          {panel.tools.map((tool) => (
            <Button
              key={tool.id}
              variant="ghost"
              onClick={() => onToolChange(tool)}
              className={`
                w-full justify-start h-auto p-3 text-right
                ${activeTool.id === tool.id 
                  ? 'bg-primary/20 border border-primary/50 text-primary' 
                  : 'hover:bg-white/5 border border-transparent'
                }
              `}
            >
              <div className="flex-1 text-right">
                <div className="font-medium text-sm">
                  {tool.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {tool.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Active Tool Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-accent" />
          <h3 className="text-lg font-semibold text-accent-glow">
            إعدادات الأداة
          </h3>
        </div>

        <div className="glass-card p-4 space-y-4">
          <div className="text-center">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {activeTool.name}
            </Badge>
          </div>

          {/* Intensity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">الشدة</span>
              <span className="text-sm text-muted-foreground">{intensity[0]}%</span>
            </div>
            <Slider
              value={intensity}
              onValueChange={setIntensity}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Smoothness Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">النعومة</span>
              <span className="text-sm text-muted-foreground">{smoothness[0]}%</span>
            </div>
            <Slider
              value={smoothness}
              onValueChange={setSmoothness}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          {/* Enhancement Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">التحسين</span>
              <span className="text-sm text-muted-foreground">{enhancement[0]}%</span>
            </div>
            <Slider
              value={enhancement}
              onValueChange={setEnhancement}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* Process Button */}
      <div className="text-center">
        <Button 
          onClick={onProcess}
          disabled={isProcessing}
          className="btn-neon w-full py-4 text-lg"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              معالجة...
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              تطبيق التحسين
            </>
          )}
        </Button>
      </div>

      {/* Quick Tips */}
      <div className="glass-card p-3 border border-secondary/30">
        <h4 className="text-sm font-semibold text-secondary-glow mb-2">
          💡 نصائح سريعة:
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• ابدأ بشدة منخفضة للحصول على نتائج طبيعية</li>
          <li>• استخدم النعومة العالية للبشرة الحساسة</li>
          <li>• التحسين العالي للحصول على نتائج أكثر وضوحاً</li>
        </ul>
      </div>
    </Card>
  );
};