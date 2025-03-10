import { useQuery } from "@tanstack/react-query";
import { API_ROUTE, ApiResponse, payloadMaker } from "../api";
import { useAuth } from "../store/use-auth";
import { fetchWithAuth } from "../fetch";

interface UserStats {
  totalUsers: number;
  todayUsers: number;
  updatedAt: string;
}

export const userKeys = {
  stats: ["user", "stats"] as const,
};

export function useUserStats() {
  const { accessToken, isAuthenticated } = useAuth();

  return useQuery<UserStats, Error>({
    queryKey: userKeys.stats,
    queryFn: async () => {
      const { url, config } = payloadMaker({
        ...API_ROUTE.USER.STATISTIC,
      });

      const response = await fetchWithAuth(url, config);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "사용자 통계를 가져오는데 실패했습니다"
        );
      }

      const { data } = (await response.json()) as ApiResponse<UserStats>;
      return data;
    },
    enabled: !!isAuthenticated && !!accessToken,
    refetchInterval: 1000 * 60 * 5, // 5분마다 갱신
  });
}
