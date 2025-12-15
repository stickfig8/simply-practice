import type { PracticeLog } from "@/types/practiceDataTypes";
import { useEffect, useState } from "react";

export function useDashboardSection() {
  const [logData, setLogdata] = useState<PracticeLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLogData() {
      setLoading(true);

      try {
        const res = await fetch("/data/dummydata.json", { method: "GET" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        setLogdata(data);
      } catch (e) {
        console.error("fetch 실패", e);
      } finally {
        setLoading(false);
      }
    }

    fetchLogData();
  }, []);

  return { logData, loading };
}
