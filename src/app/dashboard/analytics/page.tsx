import AnalyticsChart from "@/components/AnalyticsChart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsChart title="Links Opened" />
      <AnalyticsChart title="WhatsApp Clicks" />
    </div>
  );
}
