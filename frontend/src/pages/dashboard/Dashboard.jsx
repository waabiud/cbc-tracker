import DashboardLayout from "../../components/common/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Select a student to record or review assessments.
      </p>
    </DashboardLayout>
  );
}
