import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface LeaderboardScore {
  id: number;
  userId: number | null;
  score: number;
  travelerType: string;
  createdAt: string;
}

export default function Leaderboard() {
  const [limit, setLimit] = useState(5);

  const { data: scores, isLoading, error } = useQuery({
    queryKey: ['/api/game/leaderboard', limit],
    queryFn: async () => {
      const response = await fetch(`/api/game/leaderboard?limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      return response.json() as Promise<LeaderboardScore[]>;
    }
  });

  const getIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-800" />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
          Travel Adventure Leaderboard
        </CardTitle>
        <CardDescription>
          Top travelers who have completed the Qatar Travel Adventure
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">
            Failed to load leaderboard data. Please try again.
          </div>
        ) : scores?.length === 0 ? (
          <div className="p-4 text-center text-slate-500">
            No scores recorded yet. Be the first to complete the game!
          </div>
        ) : (
          <div className="space-y-4">
            {scores?.map((score, index) => (
              <div
                key={score.id}
                className={`flex items-center p-3 rounded-lg ${
                  index === 0 ? 'bg-amber-50' : ''
                }`}
              >
                <div className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-slate-100 mr-4">
                  {getIcon(index) || <span className="font-bold">{index + 1}</span>}
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-semibold truncate">
                      {score.travelerType}
                    </div>
                    <div className="font-bold text-lg text-amber-800">
                      {score.score} pts
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(score.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {(scores?.length || 0) >= limit && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => setLimit(limit + 5)}
          >
            Show More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}