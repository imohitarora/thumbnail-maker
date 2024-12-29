import ThumbnailGenerator from '@/components/ThumbnailGenerator';
import { Camera } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Camera className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Website Thumbnail Generator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Generate beautiful thumbnails from any website URL. Perfect for previews, 
            social media cards, and documentation.
          </p>
        </div>
        
        <ThumbnailGenerator />
      </div>
    </main>
  );
}