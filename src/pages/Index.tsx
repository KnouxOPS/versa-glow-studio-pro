import { useState, useCallback } from "react";
import { Upload, Download, Share2, Undo2, Settings, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { KnoxHeader } from "@/components/KnoxHeader";
import { PanelNavigation } from "@/components/PanelNavigation";
import { ImageWorkspace } from "@/components/ImageWorkspace";
import { ToolPanel } from "@/components/ToolPanel";
import { StatusBar } from "@/components/StatusBar";
import { useToast } from "@/hooks/use-toast";

// Panel definitions matching the specifications
export const PANELS = [
  {
    id: "face-refiner",
    title: "Face Refiner",
    icon: "🌟",
    description: "لمسة سحرية لوجه مثالي",
    tools: [
      { id: "skin-smoother", name: "Skin Smoother", description: "تنعيم البشرة وإزالة العيوب" },
      { id: "eye-brightener", name: "Eye Brightener", description: "تفتيح العيون وتوضيحها" },
      { id: "nose-slimmer", name: "Nose Slimmer", description: "تصغير الأنف" },
      { id: "lip-enhancer", name: "Lip Enhancer", description: "تحديد وتلوين الشفاه" },
      { id: "face-symmetry", name: "Face Symmetry Fixer", description: "تحسين التماثل بين جانبي الوجه" }
    ]
  },
  {
    id: "body-shape",
    title: "Body Shape Lab",
    icon: "🏋️‍♀️",
    description: "نحت جسمك بذكاء",
    tools: [
      { id: "slim-waist", name: "Slim Waist AI", description: "تنحيف الخصر تلقائي" },
      { id: "chest-enhancer", name: "Chest Enhancer", description: "إبراز العضلات/الصدر" },
      { id: "height-illusion", name: "Height Illusion", description: "تعديل الطول بصريًا" },
      { id: "leg-sculptor", name: "Leg Sculptor", description: "تنحيف أو تكبير الساق" },
      { id: "back-curve", name: "Back Curve Fix", description: "تعديل انحناء الظهر للجمال" }
    ]
  },
  {
    id: "outfit-generator",
    title: "Outfit Generator",
    icon: "👕",
    description: "أزياء بلا حدود في ثوانٍ",
    tools: [
      { id: "shirt-switch", name: "AI Shirt Switch", description: "تغيير القميص لأي نوع" },
      { id: "outfit-replace", name: "Full Outfit Replace", description: "تغيير الملابس كاملة بوصف" },
      { id: "hijab-generator", name: "Hijab Generator", description: "توليد حجاب طبيعي أنيق" },
      { id: "business-suit", name: "Business Suit Up", description: "تركيب بدلة فاخرة" },
      { id: "jersey-look", name: "Jersey Look Mode", description: "توليد لبس رياضي" }
    ]
  },
  {
    id: "ai-beautify",
    title: "AI Beautify One-Touch",
    icon: "✨",
    description: "الجمال بلمسة واحدة",
    tools: [
      { id: "full-retouch", name: "Full Retouch AI", description: "تبييض + تنحيف + تلميع بضغطة" },
      { id: "smart-filter", name: "Smart Filter Matching", description: "فلاتر ذكية حسب الشكل" },
      { id: "background-blur", name: "Background Blur", description: "عزل الخلفية تلقائيًا" },
      { id: "color-harmonizer", name: "Color Harmonizer", description: "توازن ألوان البشرة والملابس" },
      { id: "glam-mode", name: "Instant Glam Mode", description: "وضع الجمال الحادّ بنمط المجلات" }
    ]
  },
  {
    id: "fantasy-looks",
    title: "Fantasy Looks",
    icon: "🐉",
    description: "اطلق العنان لجانبك الخيالي",
    tools: [
      { id: "anime-me", name: "Anime Me!", description: "تحويل للصورة بأسلوب أنمي" },
      { id: "elf-fairy", name: "Elf / Fairy Mode", description: "مظهر خيالي كامل" },
      { id: "cyber-warrior", name: "Cyber Warrior", description: "مظهر سايبربانك قوي" },
      { id: "kingdom-prince", name: "Old Kingdom Prince", description: "توليد زيّ ملكي" },
      { id: "game-avatar", name: "Game Avatar Style", description: "مظهر لعبة RPG" }
    ]
  },
  {
    id: "gender-flip",
    title: "Gender Flip Studio",
    icon: "⚧️",
    description: "تجربة ممتعة لتغيير الجنس",
    tools: [
      { id: "male-to-female", name: "Male to Female Full", description: "تحويل كامل من ذكر لأنثى" },
      { id: "female-to-male", name: "Female to Male Full", description: "تحويل كامل من أنثى لذكر" },
      { id: "face-gender-swap", name: "Face Gender Swap Only", description: "تغيير جنس الوجه فقط" },
      { id: "feminine-makeup", name: "Add Feminine Makeup", description: "إضافة مكياج أنثوي" },
      { id: "neutral-gender", name: "Neutral Gender Mode", description: "وضع الجنس المحايد" }
    ]
  },
  {
    id: "age-modulator",
    title: "Age Modulator",
    icon: "⏳",
    description: "رحلة عبر الزمن لصورك",
    tools: [
      { id: "age-down", name: "Age Down", description: "العودة للطفولة والمراهقة" },
      { id: "age-up", name: "Age Up", description: "التقدم للأربعين والسبعين" },
      { id: "age-slider", name: "AI Age Slider", description: "سلايدر التحكم في العمر" },
      { id: "wrinkle-remover", name: "Wrinkle Remover", description: "إزالة التجاعيد" },
      { id: "gray-hair", name: "Gray Hair Generator", description: "توليد الشعر الأبيض" }
    ]
  },
  {
    id: "celeb-style",
    title: "Celeb Style Clone",
    icon: "📸",
    description: "كن نجمًا بضغطة زر",
    tools: [
      { id: "kim-style", name: "Copy Kim Kardashian Style", description: "نسخ أسلوب كيم كارداشيان" },
      { id: "ronaldo-look", name: "Ronaldo Look Generator", description: "مظهر رونالدو الأسطوري" },
      { id: "arabic-celeb", name: "Arabic Celebrity Mode", description: "نجوم عرب (رامز، نانسي، الخ)" },
      { id: "youtuber-look", name: "YouTuber Look Matching", description: "مظهر يوتيوبر مشهور" },
      { id: "tiktok-trend", name: "AI Inspired from TikTok Trend", description: "مستوحى من ترند تيك توك" }
    ]
  },
  {
    id: "ai-mirror",
    title: "AI Mirror Live",
    icon: "🪞",
    description: "مرآتك الذكية في الزمن الحقيقي",
    tools: [
      { id: "split-view", name: "Before / After Split View", description: "عرض مقسم قبل/بعد" },
      { id: "live-tracking", name: "Live Face Tracking", description: "تتبع الوجه المباشر" },
      { id: "style-switcher", name: "Instant Style Switcher", description: "تبديل الأنماط الفوري" },
      { id: "auto-suggestions", name: "Auto Fix Suggestions", description: "اقتراحات الإصلاح التلقائي" },
      { id: "history-timeline", name: "History Timeline", description: "الجدول الزمني للتاريخ" }
    ]
  },
  {
    id: "pro-studio",
    title: "Pro Studio Editor",
    icon: "🎨",
    description: "استوديو فوتوشوب بقوة الذكاء الاصطناعي",
    tools: [
      { id: "brush-tool", name: "Brush Tool for Local Edits", description: "أداة الفرشاة للتعديلات المحلية" },
      { id: "magic-remove", name: "Magic Remove", description: "حذف العناصر بالسحر" },
      { id: "ai-mask", name: "AI Mask Editor", description: "محرر الأقنعة الذكي" },
      { id: "prompt-style", name: "Prompt-to-Style", description: "من وصف لنمط فني" },
      { id: "batch-processor", name: "Batch Image Processor", description: "معالج الصور المتعدد" }
    ]
  }
];

const Index = () => {
  const [activePanel, setActivePanel] = useState(PANELS[0]);
  const [activeTool, setActiveTool] = useState(PANELS[0].tools[0]);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setInputImage(result);
      toast({
        title: "تم رفع الصورة بنجاح ✨",
        description: "يمكنك الآن تطبيق التحسينات المذهلة",
      });
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleProcessImage = useCallback(() => {
    if (!inputImage) {
      toast({
        title: "خطأ في المعالجة ❌",
        description: "يرجى رفع صورة أولاً",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setOutputImage(inputImage); // For demo purposes
      setIsProcessing(false);
      toast({
        title: `${activeTool.name} مكتمل! 🎉`,
        description: "تم تطبيق التحسينات بنجاح",
      });
    }, 3000);
  }, [inputImage, activeTool, toast]);

  return (
    <div className="min-h-screen bg-gradient-dark relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <KnoxHeader />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6 space-y-6">
          {/* Panel Navigation */}
          <PanelNavigation 
            panels={PANELS}
            activePanel={activePanel}
            onPanelChange={setActivePanel}
          />

          {/* Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Processing Area */}
            <div className="lg:col-span-2">
              <ImageWorkspace
                inputImage={inputImage}
                outputImage={outputImage}
                isProcessing={isProcessing}
                onImageUpload={handleImageUpload}
                onProcess={handleProcessImage}
              />
            </div>

            {/* Tool Panel */}
            <div className="lg:col-span-1">
              <ToolPanel
                panel={activePanel}
                activeTool={activeTool}
                onToolChange={setActiveTool}
                onProcess={handleProcessImage}
                isProcessing={isProcessing}
              />
            </div>
          </div>

          {/* Status Bar */}
          <StatusBar
            activePanel={activePanel}
            activeTool={activeTool}
            isProcessing={isProcessing}
            hasInputImage={!!inputImage}
          />

          {/* Action Buttons */}
          <Card className="glass-panel">
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Button variant="outline" className="btn-glass">
                <Upload className="w-4 h-4 mr-2" />
                رفع صورة جديدة
              </Button>
              
              <Button className="btn-neon" onClick={handleProcessImage} disabled={!inputImage || isProcessing}>
                {isProcessing ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    معالجة...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    تطبيق التحسين
                  </>
                )}
              </Button>

              <Button variant="outline" className="btn-glass" disabled={!outputImage}>
                <Download className="w-4 h-4 mr-2" />
                حفظ النتيجة
              </Button>

              <Button variant="outline" className="btn-glass" disabled={!outputImage}>
                <Share2 className="w-4 h-4 mr-2" />
                مشاركة
              </Button>

              <Button variant="outline" className="btn-glass">
                <Undo2 className="w-4 h-4 mr-2" />
                تراجع
              </Button>

              <Button variant="outline" className="btn-glass">
                <Settings className="w-4 h-4 mr-2" />
                إعدادات
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;