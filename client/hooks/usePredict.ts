import { useEffect, useState } from "react";
import usePredictStore from "@/store/usePredictStore";
import toast from "react-hot-toast";
import { PredictResultToast } from "@/components/toast/PredictResultToast";

export const usePredict = () => {
  const {
    activePredict,
    lastResult,
    isLoading,
    error,
    startPredict,
    clearError,
    reset,
    stats,
    fetchStats,
  } = usePredictStore();

  const [canPredict, setCanPredict] = useState(true);

  // Reset prediction state when component unmounts
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Calculate remaining time for active prediction
  const getRemainingTime = (): number => {
    if (!activePredict) return 0;
    const remaining = activePredict.finishedAt - Date.now();
    return remaining > 0 ? remaining : 0;
  };

  useEffect(() => {
    if (!activePredict) {
      setCanPredict(true);
      return;
    }

    const checkPredictStatus = () => {
      const now = Date.now();
      if (now >= activePredict.finishedAt) {
        reset();
        setCanPredict(true);
      } else {
        setCanPredict(false);
      }
    };

    const interval = setInterval(checkPredictStatus, 100);
    return () => clearInterval(interval);
  }, [activePredict, reset]);

  // 결과 수신 시 canPredict 상태 업데이트 추가
  useEffect(() => {
    if (lastResult) {
      // 즉시 예측 가능 상태로 변경하고 상태 리셋
      setCanPredict(true);
      reset();
    }
  }, [lastResult, reset]);

  return {
    // State
    activePredict,
    lastResult,
    isLoading,
    error,
    remainingTime: getRemainingTime(),
    canPredict,

    // Actions
    startPredict,
    clearError,
    reset,
    fetchStats,
    stats,
  };
};
