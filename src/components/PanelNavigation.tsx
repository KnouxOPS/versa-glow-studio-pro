import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Panel {
  id: string;
  title: string;
  icon: string;
  description: string;
  tools: any[];
}

interface PanelNavigationProps {
  panels: Panel[];
  activePanel: Panel;
  onPanelChange: (panel: Panel) => void;
}

export const PanelNavigation = ({ panels, activePanel, onPanelChange }: PanelNavigationProps) => {
  return (
    <div className="glass-panel">
      <h3 className="text-lg font-semibold text-primary-glow mb-4 text-center">
        الأقسام المتخصصة - Professional Panels
      </h3>
      
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-4 min-w-max">
          {panels.map((panel) => (
            <Button
              key={panel.id}
              variant="ghost"
              onClick={() => onPanelChange(panel)}
              className={`
                flex-shrink-0 h-auto p-4 rounded-xl border transition-all duration-300
                ${activePanel.id === panel.id 
                  ? 'bg-primary/20 border-primary neon-glow-primary text-primary' 
                  : 'glass-card border-white/10 hover:border-primary/50 hover:bg-primary/10'
                }
              `}
            >
              <div className="flex flex-col items-center gap-2 min-w-[100px]">
                <div className="text-2xl">{panel.icon}</div>
                <div className="text-center">
                  <div className="font-medium text-sm whitespace-nowrap">
                    {panel.title}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 max-w-[90px] leading-tight">
                    {panel.description}
                  </div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};