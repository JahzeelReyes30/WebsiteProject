import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";
import { BookingStatusControl } from "@/components/admin/BookingStatusControl";
import type { BookingStatus } from "@/lib/validation";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  note: string | null;
  status: BookingStatus;
  created_at: string;
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Booking[]>();

  return (
    <div className="min-h-screen bg-[#FAF7F0] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#0A0A0A]">Bookings</h1>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-[#E8DFC4] px-4 py-1.5 text-sm font-semibold text-[#0A0A0A] hover:bg-white"
            >
              Sign out
            </button>
          </form>
        </div>

        {!bookings || bookings.length === 0 ? (
          <p className="text-[#55504A]">No booking requests yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-[#E8DFC4] bg-white">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[#E8DFC4] bg-[#FBF3DC] text-[#0A0A0A]">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Requested</th>
                  <th className="px-4 py-3">Note</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-[#E8DFC4] last:border-0">
                    <td className="px-4 py-3 font-medium text-[#0A0A0A]">{booking.name}</td>
                    <td className="px-4 py-3 text-[#55504A]">
                      <div>{booking.email}</div>
                      <div>{booking.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-[#55504A]">
                      {booking.preferred_date} at {booking.preferred_time}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-[#55504A]">
                      {booking.note || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <BookingStatusControl id={booking.id} status={booking.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
