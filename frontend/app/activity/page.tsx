"use client";

import React, { useEffect, useState } from "react";
import { getActivity } from "@/lib/api";

import ActivityFeed from "@/components/ActivityFeed";

export default function ActivityPage() {
  const [activity, setActivity] = useState<any[]>([]);

  const fetchActivity = async () => {
    try {
      const data = await getActivity();
      setActivity(data);
    } catch (err) {
      // keep simple: log to console for now
      // eslint-disable-next-line no-console
      console.error("Failed to fetch activity", err);
    }
  };

  useEffect(() => {
    fetchActivity();
    const id = setInterval(fetchActivity, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-teal-50 p-8">
      <ActivityFeed events={activity} />
    </div>
  );
}
