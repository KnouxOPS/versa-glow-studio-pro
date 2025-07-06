import React, { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, Zap, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ImageWorkspaceProps {
  inputImage: string | null;
  outputImage: string | null;
  isProcessing: boolean;
  onImageUpload: (file: File) => void;
  onProcess: () => void;
}

export const ImageWorkspace = ({ 
  inputImage, 
  outputImage, 
  isProcessing, 
  onImageUpload, 
  onProcess 
}: ImageWorkspaceProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  // Simulate progress for demo
  React.useEffect(() => {
    if (isProcessing) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  return (
    <Card className="glass-panel space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary-glow mb-2">
          منطقة المعالجة الذكية - Smart Processing Zone
        </h2>
        <p className="text-muted-foreground">
          اسحب وأفلت صورتك أو انقر لرفعها
        </p>
      </div>

      {/* Before & After Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Image */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-secondary-glow">
              📸 الصورة الأصلية
            </h3>
          </div>
          
          <div
            className={`
              relative aspect-square rounded-2xl border-2 border-dashed transition-all duration-300
              ${dragOver 
                ? 'border-primary bg-primary/10 drop-zone dragover' 
                : 'border-primary/30 drop-zone'
              }
            `}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {inputImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={inputImage} 
                  alt="Input" 
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white font-medium">صورة محملة ✨</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 animate-float">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  اسحب صورتك هنا
                </h4>
                <p className="text-muted-foreground mb-4">
                  أو انقر لاختيار ملف
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button className="btn-neon">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  اختر صورة
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Processing Arrow */}
        <div className="hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="glass-card p-4 rounded-full neon-glow-primary">
            {isProcessing ? (
              <Zap className="w-6 h-6 text-primary animate-pulse" />
            ) : (
              <ArrowRight className="w-6 h-6 text-primary" />
            )}
          </div>
        </div>

        {/* Output Image */}
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-accent-glow">
              ✨ النتيجة المحسنة
            </h3>
          </div>
          
          <div className="relative aspect-square rounded-2xl glass-card border border-accent/30">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-full p-8">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-4 pulse-neon">
                  <Zap className="w-8 h-8 text-accent animate-pulse" />
                </div>
                <h4 className="text-lg font-semibold text-accent mb-4">
                  جاري المعالجة...
                </h4>
                <div className="w-full max-w-xs">
                  <Progress value={progress} className="h-2 mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    {Math.round(progress)}% مكتمل
                  </p>
                </div>
              </div>
            ) : outputImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={outputImage} 
                  alt="Output" 
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/30 to-transparent rounded-2xl" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white font-medium">تم التحسين بنجاح! 🎉</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mb-4">
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="text-lg font-semibold text-muted-foreground mb-2">
                  النتيجة ستظهر هنا
                </h4>
                <p className="text-muted-foreground">
                  بعد معالجة الصورة
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};