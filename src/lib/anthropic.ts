export interface AIStoryParams {
  columnProfiles: any;
  sampleRows: any[];
  filters?: any;
}

export async function generateAIStory({ columnProfiles, sampleRows, filters }: AIStoryParams) {
  const response = await fetch('/api/ai-story', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ columnProfiles, sampleRows, filters }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate AI story');
  }

  return response.json();
}
