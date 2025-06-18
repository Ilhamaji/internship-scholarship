"use client";
import React, { useState } from "react";
import { DateRangePicker } from "@heroui/date-picker";
import { getLocalTimeZone, DateValue } from "@internationalized/date";
import { format } from "date-fns";

interface DateRange {
  start: DateValue | null;
  end: DateValue | null;
}

export default function Page() {
  const [selectedDateRange, setSelectedDateRange] = useState<string[]>([]);

  const handleDateChange = (range: DateRange) => {
    setSelectedDateRange([
      range.start
        ? format(range.start.toDate(getLocalTimeZone()), "dd-MM-yyyy")
        : "",
      range.end
        ? format(range.end.toDate(getLocalTimeZone()), "dd-MM-yyyy")
        : "",
    ]);
  };

  return (
    <div className="w-full h-screen">
      <div className="px-36">
        <DateRangePicker
          onChange={handleDateChange}
          className="max-w-xs"
          label="Stay duration"
        />
        Formatted: {selectedDateRange[0]} - {selectedDateRange[1]}
      </div>
    </div>
  );
}
