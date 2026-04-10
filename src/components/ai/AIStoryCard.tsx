'use client';

import React, { useState } from 'react';
import { useDashboardStore } from '@/store/dashboardStore';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { generateAIStory } from '@/lib/anthropic';

export function AIStoryCard() {
  const { data, filters } = useDashboardStore();
  const [story, setStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!data) return;
    setIsLoading(true);
    setError(null);
    try {
      const sampleRows = data.rows.slice(0, 20);
      const result = await generateAIStory({
        columnProfiles: data.profiles,
        sampleRows,
        filters
      });
      setStory(result.story);
    } catch (err) {
      setError('Failed to generate story. Please check your API key.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-2 border-blue-100 dark:border-blue-900 overflow-hidden">
      <CardHeader className="bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-900 dark:text-blue-100 uppercase tracking-wider text-xs font-black">AI Data Story</CardTitle>
          </div>
          {story && !isLoading && (
            <Button variant="ghost" size="sm" onClick={handleGenerate} className="h-8 text-blue-600">
              <RefreshCw className="w-3.5 h-3.5 mr-2" />
              Regenerate
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <div className="space-y-1">
              <p className="font-bold text-gray-900 dark:text-gray-100">Analyzing your data...</p>
              <p className="text-sm text-gray-500">Claude-3.5 Sonnet is looking for patterns.</p>
            </div>
          </div>
        ) : story ? (
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {story}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-blue-400" />
            </div>
            <div className="space-y-1 max-w-xs">
              <p className="font-bold">No insights generated yet</p>
              <p className="text-sm text-gray-500">Click the button below to have AI analyze your CSV and write a summary of the most interesting trends.</p>
            </div>
          </div>
        )}
        
        {error && (
          <p className="mt-4 text-sm text-red-500 text-center font-medium bg-red-50 dark:bg-red-900/20 py-2 rounded-lg border border-red-100 dark:border-red-900">
            {error}
          </p>
        )}
      </CardContent>

      {!story && !isLoading && (
        <CardFooter className="bg-gray-50 dark:bg-gray-900/50 p-4 border-t border-gray-100 dark:border-gray-800">
          <Button onClick={handleGenerate} className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20" size="lg">
            <Sparkles className="w-5 h-5 mr-3" />
            Generate AI Insight Paragraph
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
