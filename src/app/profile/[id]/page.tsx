import ProfileClient from "./ProfileClient";

export default function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  // This id comes from URL → /profile/123
  return <ProfileClient id={params.id} />;
}