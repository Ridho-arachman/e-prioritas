// app/lurah/dashboard/components/DateRangeFilter.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

interface DateRangeFilterProps {
  startDate: string;
  endDate: string;
  onStartChange: (date: string) => void;
  onEndChange: (date: string) => void;
  onApply: () => void;
}

export default function DateRangeFilter({
  startDate,
  endDate,
  onStartChange,
  onEndChange,
  onApply,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="date"
        value={startDate}
        onChange={(e) => onStartChange(e.target.value)}
        className="w-36"
        placeholder="Start"
      />
      <span>-</span>
      <Input
        type="date"
        value={endDate}
        onChange={(e) => onEndChange(e.target.value)}
        className="w-36"
        placeholder="End"
      />
      <Button size="sm" onClick={onApply}>
        <Calendar className="h-4 w-4" />
      </Button>
    </div>
  );
}
