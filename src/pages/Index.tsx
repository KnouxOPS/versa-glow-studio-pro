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
      { id: "skin-smoother", name: "Advanced Skin Refinement", description: "تقنية AI لتنعيم البشرة وإزالة العيوب بدقة عالية" },
      { id: "eye-brightener", name: "Eye Enhancement Pro", description: "تفتيح وتوضيح العيون مع الحفاظ على الطبيعية" },
      { id: "nose-slimmer", name: "Nose Contouring AI", description: "تعديل شكل الأنف بنسب ذهبية مثالية" },
      { id: "lip-enhancer", name: "Lip Perfection Suite", description: "تحديد وتلوين الشفاه مع محاكاة المكياج الاحترافي" },
      { id: "face-symmetry", name: "Facial Harmony Optimizer", description: "تحقيق التماثل المثالي بين جانبي الوجه بتقنية متطورة" }
    ]
  },
  {
    id: "body-shape",
    title: "Body Shape Lab",
    icon: "🏋️‍♀️",
    description: "نحت جسمك بذكاء",
    tools: [
      { id: "slim-waist", name: "Intelligent Waist Sculptor", description: "تنحيف الخصر بخوارزمية متطورة مع الحفاظ على النسب الطبيعية" },
      { id: "chest-enhancer", name: "Chest Definition Pro", description: "إبراز وتحديد عضلات الصدر أو منطقة الصدر بواقعية عالية" },
      { id: "height-illusion", name: "Posture & Height Optimizer", description: "تحسين القوام وإطالة القامة بتقنيات بصرية متقدمة" },
      { id: "leg-sculptor", name: "Leg Contouring Master", description: "نحت وتشكيل الساقين بنسب مثالية وطبيعية" },
      { id: "back-curve", name: "Spinal Alignment Pro", description: "تحسين انحناء الظهر والقوام لمظهر أكثر جاذبية وثقة" }
    ]
  },
  {
    id: "outfit-generator",
    title: "Outfit Generator",
    icon: "👕",
    description: "أزياء بلا حدود في ثوانٍ",
    tools: [
      { id: "shirt-switch", name: "Smart Garment Replacement", description: "تبديل القمصان والملابس العلوية بدقة فوتوريالستيك" },
      { id: "outfit-replace", name: "Complete Wardrobe AI", description: "تغيير كامل للزي بناءً على الوصف النصي أو النمط المرغوب" },
      { id: "hijab-generator", name: "Hijab & Headwear Studio", description: "توليد أغطية رأس متنوعة بأناقة وطبيعية عالية" },
      { id: "business-suit", name: "Executive Fashion Suite", description: "البدلات الرسمية والأزياء المهنية بجودة استوديو" },
      { id: "jersey-look", name: "Sports & Athletic Wear", description: "الملابس الرياضية وقمصان الأندية بتفاصيل واقعية" }
    ]
  },
  {
    id: "ai-beautify",
    title: "AI Beautify One-Touch",
    icon: "✨",
    description: "الجمال بلمسة واحدة",
    tools: [
      { id: "full-retouch", name: "Professional Auto-Retouch", description: "تحسين شامل: تبييض، تنحيف، وتلميع بجودة استوديو احترافي" },
      { id: "smart-filter", name: "Adaptive Filter Intelligence", description: "فلاتر ذكية تتكيف مع ملامح الوجه ونوع البشرة تلقائياً" },
      { id: "background-blur", name: "Cinematic Background Blur", description: "عزل الخلفية بتقنية البوكيه السينمائي المتطور" },
      { id: "color-harmonizer", name: "Advanced Color Correction", description: "توازن مثالي للألوان والدرجات اللونية للبشرة والملابس" },
      { id: "glam-mode", name: "Magazine Cover Glamour", description: "تطبيق مظهر المجلات الفاخرة بلمسة واحدة" }
    ]
  },
  {
    id: "fantasy-looks",
    title: "Fantasy Looks",
    icon: "🐉",
    description: "اطلق العنان لجانبك الخيالي",
    tools: [
      { id: "anime-me", name: "Anime Art Transformation", description: "تحويل احترافي لأسلوب الأنمي بجودة استوديو" },
      { id: "elf-fairy", name: "Mythical Character Creator", description: "تحويل لشخصيات خيالية: الجان، الحوريات، والكائنات السحرية" },
      { id: "cyber-warrior", name: "Cyberpunk Metamorphosis", description: "مظهر سايبربانك مستقبلي بتفاصيل نيون وتقنية متقدمة" },
      { id: "kingdom-prince", name: "Royal Heritage Generator", description: "أزياء ملكية تاريخية من مختلف الحضارات والعصور" },
      { id: "game-avatar", name: "Gaming Character Suite", description: "تحويل لشخصيات ألعاب RPG وMMORPG بجودة عالية" }
    ]
  },
  {
    id: "gender-flip",
    title: "Gender Flip Studio",
    icon: "⚧️",
    description: "تجربة ممتعة لتغيير الجنس",
    tools: [
      { id: "male-to-female", name: "Complete Feminine Transformation", description: "تحويل شامل للمظهر الأنثوي مع الحفاظ على الهوية الأساسية" },
      { id: "female-to-male", name: "Complete Masculine Transformation", description: "تحويل شامل للمظهر الذكوري بواقعية وطبيعية عالية" },
      { id: "face-gender-swap", name: "Facial Gender Morphing", description: "تحويل ملامح الوجه فقط بدقة متناهية" },
      { id: "feminine-makeup", name: "Professional Makeup Application", description: "تطبيق مكياج أنثوي احترافي بأساليب متنوعة" },
      { id: "neutral-gender", name: "Androgynous Styling Suite", description: "أسلوب جمالي محايد ومتوازن بين الجنسين" }
    ]
  },
  {
    id: "age-modulator",
    title: "Age Modulator",
    icon: "⏳",
    description: "رحلة عبر الزمن لصورك",
    tools: [
      { id: "age-down", name: "Youth Restoration Engine", description: "العودة لسنوات الشباب والمراهقة بواقعية مذهلة" },
      { id: "age-up", name: "Mature Age Progression", description: "محاكاة التقدم في العمر بدقة علمية" },
      { id: "age-slider", name: "Temporal Age Controller", description: "التحكم الدقيق في العمر الظاهري بنسب متدرجة" },
      { id: "wrinkle-remover", name: "Advanced Anti-Aging Suite", description: "إزالة التجاعيد وعلامات التقدم بالعمر" },
      { id: "gray-hair", name: "Hair Maturation Simulator", description: "محاكاة الشيب الطبيعي وتدرجات اللون الفضي" }
    ]
  },
  {
    id: "celeb-style",
    title: "Celeb Style Clone",
    icon: "📸",
    description: "كن نجمًا بضغطة زر",
    tools: [
      { id: "kim-style", name: "Kardashian Glamour Suite", description: "أسلوب المكياج والإطلالة الهوليوودية الفاخرة" },
      { id: "ronaldo-look", name: "Athletic Icon Transformation", description: "مظهر النجوم الرياضيين الأسطوريين" },
      { id: "arabic-celeb", name: "Arabic Star Style Bank", description: "إطلالات نجوم الوطن العربي المميزة" },
      { id: "youtuber-look", name: "Content Creator Aesthetics", description: "أساليب وإطلالات صناع المحتوى المؤثرين" },
      { id: "tiktok-trend", name: "Viral Trend Replicator", description: "محاكاة الترندات الفيروسية وأساليب التجميل العصرية" }
    ]
  },
  {
    id: "ai-mirror",
    title: "AI Mirror Live",
    icon: "🪞",
    description: "مرآتك الذكية في الزمن الحقيقي",
    tools: [
      { id: "split-view", name: "Interactive Comparison View", description: "مقارنة تفاعلية للنتائج قبل وبعد التحسين" },
      { id: "live-tracking", name: "Real-time Face Analysis", description: "تحليل الوجه المباشر وتتبع التغييرات" },
      { id: "style-switcher", name: "Dynamic Style Preview", description: "معاينة فورية للأنماط المختلفة" },
      { id: "auto-suggestions", name: "AI Enhancement Advisor", description: "مساعد ذكي لاقتراح التحسينات الأمثل" },
      { id: "history-timeline", name: "Enhancement History Manager", description: "إدارة تاريخ التعديلات والعودة لأي مرحلة" }
    ]
  },
  {
    id: "pro-studio",
    title: "Pro Studio Editor",
    icon: "🎨",
    description: "استوديو فوتوشوب بقوة الذكاء الاصطناعي",
    tools: [
      { id: "brush-tool", name: "Precision Brush Suite", description: "أدوات فرشاة احترافية للتعديلات المحلية الدقيقة" },
      { id: "magic-remove", name: "Object Removal Specialist", description: "إزالة العناصر غير المرغوبة بذكاء اصطناعي متطور" },
      { id: "ai-mask", name: "Smart Masking System", description: "نظام أقنعة ذكي لتحديد دقيق للمناطق" },
      { id: "prompt-style", name: "Text-to-Style Generator", description: "تحويل الأوصاف النصية إلى أنماط فنية" },
      { id: "batch-processor", name: "Enterprise Batch Engine", description: "معالجة مجمعة للصور بكفاءة عالية" }
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
        title: "تحميل الصورة مكتمل بنجاح ✨",
        description: "جاهز لتطبيق التحسينات الاحترافية - اختر الأداة المناسبة من القائمة",
      });
    };
    reader.readAsDataURL(file);
  }, [toast]);

  const handleProcessImage = useCallback(() => {
    if (!inputImage) {
      toast({
        title: "تحذير: لا توجد صورة للمعالجة ⚠️",
        description: "يرجى تحميل صورة أولاً لبدء عملية التحسين",
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
        title: `${activeTool.name} - اكتمل بنجاح! 🎉`,
        description: "تم تطبيق التحسينات بجودة احترافية عالية",
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
                تحميل صورة جديدة
              </Button>
              
              <Button className="btn-neon" onClick={handleProcessImage} disabled={!inputImage || isProcessing}>
                {isProcessing ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    معالجة بالذكاء الاصطناعي...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    تطبيق التحسين الاحترافي
                  </>
                )}
              </Button>

              <Button variant="outline" className="btn-glass" disabled={!outputImage}>
                <Download className="w-4 h-4 mr-2" />
                تصدير بجودة عالية
              </Button>

              <Button variant="outline" className="btn-glass" disabled={!outputImage}>
                <Share2 className="w-4 h-4 mr-2" />
                مشاركة النتيجة
              </Button>

              <Button variant="outline" className="btn-glass">
                <Undo2 className="w-4 h-4 mr-2" />
                استعادة الأصلية
              </Button>

              <Button variant="outline" className="btn-glass">
                <Settings className="w-4 h-4 mr-2" />
                إعدادات متقدمة
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;